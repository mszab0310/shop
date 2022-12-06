package com.mali.shop.controller;


import com.mali.shop.dto.JwtDTO;
import com.mali.shop.dto.RegisterUserDTO;
import com.mali.shop.dto.SigninDTO;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.service.ShopUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private ShopUserDetailsService userDetailsService;


    @PostMapping(value = "/register", consumes = "application/json")
    public void registerUser(@RequestBody RegisterUserDTO newUser) throws UserException {
        userDetailsService.registerUser(newUser);
    }

    @PostMapping(value = "/signin", consumes = "application/json")
    public JwtDTO signIn(@RequestBody SigninDTO signinDTO){
        return userDetailsService.doSignin(signinDTO);
    }
}
