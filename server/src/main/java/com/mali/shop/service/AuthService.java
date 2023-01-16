package com.mali.shop.service;

import com.mali.shop.dto.*;
import com.mali.shop.enums.RoleEnum;
import com.mali.shop.exceptions.PasswordResetException;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.model.PasswordResetToken;
import com.mali.shop.model.Role;
import com.mali.shop.repository.PasswordTokenRepository;
import com.mali.shop.util.ShopUserDetails;
import com.mali.shop.model.User;
import com.mali.shop.repository.RoleRepository;
import com.mali.shop.repository.UserRepository;
import com.mali.shop.security.UserPasswordEncoder;
import com.mali.shop.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserPasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final String TOPIC = "email-topic";

    private final KafkaProducerService producerService;

    public AuthService(KafkaProducerService producerService) {
        this.producerService = producerService;
    }


    public void registerUser(RegisterUserDTO newUser) throws UserException {
        if (newUser.getEmail().isEmpty() || newUser.getFirstName().isEmpty() ||
                newUser.getLastName().isEmpty() || newUser.getUsername().isEmpty() || newUser.getPassword().isEmpty()) {
            throw new UserException(UserException.INCOMPLETE_FIELDS);
        }
        log.info("Trying to register user with email {} and username {}", newUser.getEmail(), newUser.getUsername());
        if (userRepository.existsByEmail(newUser.getEmail())) {
            log.error(UserException.EMAIL_TAKEN + newUser.getEmail());
            throw new UserException(UserException.EMAIL_TAKEN + newUser.getEmail());
        } else if (userRepository.existsByUsername(newUser.getUsername())) {
            log.error(UserException.USERNAME_TAKEN + newUser.getUsername());
            throw new UserException(UserException.USERNAME_TAKEN + newUser.getUsername());
        } else {
            User user = new User();
            user.setEmail(newUser.getEmail());
            user.setUsername(newUser.getUsername());
            user.setFirstName(newUser.getFirstName());
            user.setLastName(newUser.getLastName());
            user.setPassword(passwordEncoder.encode(newUser.getPassword()));
            user.setActive(true);
            Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER);
            user.setRoles(Collections.singleton(userRole));
            userRepository.save(user);
            log.info("User registered with email {} and username {}", user.getEmail(), user.getUsername());
        }
    }

    public JwtDTO doSignin(SigninDTO signinDTO) throws UserException {
        log.info("Trying to sign in user with username {}", signinDTO.getUsername());
        if (signinDTO.getUsername().isEmpty() || signinDTO.getPassword().isEmpty()) {
            throw new UserException(UserException.INCOMPLETE_FIELDS);
        }
        if (!userRepository.existsByUsername(signinDTO.getUsername())) {
            throw new UserException(UserException.USER_NOT_FOUND);
        }
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinDTO.getUsername(), signinDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtil.generateJwtToken(authentication);

            ShopUserDetails userDetails = (ShopUserDetails) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

            JwtDTO response = new JwtDTO();
            response.setToken(jwt);
            response.setEmail(userDetails.getEmail());
            response.setUsername(userDetails.getUsername());
            response.setRoles(roles);
            log.info("User signed in with username {}", userDetails.getUsername());

            return response;
        } catch (AuthenticationException authentication) {
            throw new UserException(UserException.BAD_CREDENTIALS);
        }
    }

    public PasswordResetToken createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordTokenRepository.save(myToken);
        return myToken;
    }

    public User findUserByEmail(String email) throws UserException {
        User user = userRepository.findByEmail(email);
        if (user == null)
            throw new UserException(UserException.USER_NOT_FOUND);
        return user;
    }


    public void notifyKafka(PasswordResetToken token, String email, String appUrl) {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setEmail(email);
        String message = appUrl + "?token=" + token.getToken();
        emailDTO.setMessage(message);
        log.info("Trying to send notification to email server via kafka");
        producerService.sendMessage(TOPIC, emailDTO);

    }

    public boolean validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);

        return isTokenFound(passToken) && !isTokenExpired(passToken);
    }

    public PasswordResetToken findTokenByToken(String token) {
        return passwordTokenRepository.findByToken(token);
    }

    public void updateToken(PasswordResetToken token) {
        passwordTokenRepository.save(token);
    }

    private boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }

    public boolean verifyTokenAfterReset(String token) throws PasswordResetException {
        PasswordResetToken passwordResetToken = passwordTokenRepository.findByToken(token);
        if (passwordResetToken == null) {
            throw new PasswordResetException(PasswordResetException.TOKEN_NOT_FOUND);
        } else {
            return passwordResetToken.isVerified();
        }
    }

    public void changePassword(ResetPasswordDto resetPasswordDto) throws UserException, PasswordResetException {
        log.info("Trying to validate password for reseting");
        User user = userRepository.findByEmail(resetPasswordDto.getEmail());
        if(user == null) {
            throw new UserException(UserException.USER_NOT_FOUND);
        }
        if(!resetPasswordDto.getNewPassword().equals(resetPasswordDto.getConfirmPassword())){
            throw new PasswordResetException(PasswordResetException.NEW_PASSWORD_DIFFERENT);
        }
        String encodePassword = passwordEncoder.encode(resetPasswordDto.getNewPassword());
        if(encodePassword.equals(user.getPassword())){
            throw new PasswordResetException(PasswordResetException.PASSWORDS_MATCH);
        }
        //TODO: verify if reset token was created for user, if it is valid and has not expired yet
        user.setPassword(encodePassword);
        log.info("Password reset successfully");
        userRepository.save(user);
    }

}


