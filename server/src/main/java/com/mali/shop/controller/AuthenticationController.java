package com.mali.shop.controller;


import com.mali.shop.dto.*;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.model.PasswordResetToken;
import com.mali.shop.model.User;
import com.mali.shop.repository.PasswordTokenRepository;
import com.mali.shop.service.AuthService;
import com.mali.shop.util.AuthHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthService authService;




    @PostMapping(value = "/register", consumes = "application/json")
    public void registerUser(@RequestBody RegisterUserDTO newUser) throws UserException {
        authService.registerUser(newUser);
    }

    @PostMapping(value = "/signin", consumes = "application/json")
    public JwtDTO signIn(@RequestBody SigninDTO signinDTO) throws UserException{
        return authService.doSignin(signinDTO);
    }

    @GetMapping("/current")
    public UserDataDto getCurrentUserDetails(){
        return AuthHelper.getCurrentUserData();
    }

    @PostMapping(value="/resetPassword",consumes = MediaType.APPLICATION_JSON_VALUE)
    public String resetPassword(@RequestBody EmailDTO emailDTO) throws UserException {
        log.info("Received request to start reset password mechanism for user with email {}", emailDTO.getEmail());
        String parsedEmail = emailDTO.getEmail();
        User user = authService.findUserByEmail(parsedEmail);

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken =  authService.createPasswordResetTokenForUser(user, token);

        String appURL = "http://localhost:8080/api/auth/user/forgot-password"; //request.getRequestURL().toString();
        log.info("Current app url is {}", appURL);
        authService.notifyKafka(resetToken,parsedEmail,appURL);
        return resetToken.getToken();
    }

    @GetMapping("/user/forgot-password")
    public void validateToken(@RequestParam String token){
        log.info("Trying to validate token {}", token);
        boolean valid = authService.validatePasswordResetToken(token);
        log.info("Token {} is valid: {}",token,valid);
        PasswordResetToken passwordResetToken = authService.findTokenByToken(token);
        if(passwordResetToken != null){
            log.info("Updating token {} validity in database to {}",token,valid);
            passwordResetToken.setVerified(valid);
            authService.updateToken(passwordResetToken);
        }
    }


}
