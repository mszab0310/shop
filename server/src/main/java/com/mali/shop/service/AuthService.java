package com.mali.shop.service;

import com.mali.shop.dto.JwtDTO;
import com.mali.shop.dto.RegisterUserDTO;
import com.mali.shop.dto.SigninDTO;
import com.mali.shop.dto.UserDataDto;
import com.mali.shop.enums.RoleEnum;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.model.Role;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
    private JwtUtil jwtUtil;

    public void registerUser(RegisterUserDTO newUser) throws UserException {
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

    public JwtDTO doSignin(SigninDTO signinDTO) {
        log.info("Trying to sign in user with username {}", signinDTO.getUsername());
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
    }

    public UserDataDto getCurrentUserData() {
        UserDataDto userDataDto = new UserDataDto();
        ShopUserDetails userDetails = (ShopUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userDataDto.setFirstname(userDetails.getFirstName());
        userDataDto.setLastName(userDetails.getLastName());
        userDataDto.setUsername(userDetails.getUsername());
        userDataDto.setEmail(userDetails.getEmail());
        return userDataDto;
    }
}
