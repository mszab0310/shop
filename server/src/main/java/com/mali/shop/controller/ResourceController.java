package com.mali.shop.controller;

import com.mali.shop.security.SecurityConfiguration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceController {

    @GetMapping("/resource")
    public String getResource(){
        String message = "";
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return name;
    }
}
