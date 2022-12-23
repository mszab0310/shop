package com.mali.shop.controller;

import com.mali.shop.dto.UserDataDto;
import com.mali.shop.service.AuthService;
import com.mali.shop.util.AuthHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/private/auth")
public class PrivateAuthController {

    @GetMapping("/current")
    public UserDataDto getCurrentUserDetails(){
        return AuthHelper.getCurrentUserData();
    }
}
