package com.mali.shop.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserPasswordEncoder {

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public PasswordEncoder getEncoder() {
        return passwordEncoder;
    }

    public String encode(String password){
        return passwordEncoder.encode(password);
    }

}
