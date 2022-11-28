package com.mali.shop.controller;


import com.mali.shop.service.ShopUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    @Autowired
    private ShopUserDetailsService userDetailsService;

    @PostMapping("/register")
    public void registerUser(@RequestBody String email, @RequestBody String firstName, @RequestBody String lastName, @RequestBody String password){
        userDetailsService.saveUser(email,firstName,lastName,password);
    }
}
