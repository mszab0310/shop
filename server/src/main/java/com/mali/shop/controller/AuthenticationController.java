package com.mali.shop.controller;


import com.mali.shop.dto.LoginDTO;
import com.mali.shop.dto.RegisterUserDTO;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.service.ShopUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.security.auth.message.AuthException;

@RestController
@Slf4j
public class AuthenticationController {
    @Autowired
    private ShopUserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value ="/register",consumes="application/json")
    public void registerUser(@RequestBody RegisterUserDTO newUser) throws UserException {
        log.info("Recieved register request with data {} {} {} ",newUser.getEmail(),newUser.getFirstName(),newUser.getLastName());
        if(userDetailsService.checkIfUserExistsByEmail(newUser.getEmail())){
            log.error("User already exists with email {}",newUser.getEmail());
            throw new UserException(UserException.EMAIL_TAKEN);
        }else {
            userDetailsService.saveUser(newUser.getEmail(), newUser.getFirstName(), newUser.getLastName(), newUser.getPassword());
        }
    }

    @PostMapping(value = "/login",consumes = "application/json")
    public void loginUser(@RequestBody LoginDTO loginDTO) throws UserException, AuthenticationException {


        log.info("Recieved login request for email {}", loginDTO.getEmail());
        if(userDetailsService.checkIfUserExistsByEmail(loginDTO.getEmail())){

        }else{
            log.info(UserException.USER_NOT_FOUND + loginDTO.getEmail());
            throw new UserException(UserException.USER_NOT_FOUND);
        }
    }


}
