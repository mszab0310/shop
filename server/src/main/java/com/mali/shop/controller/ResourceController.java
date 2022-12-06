package com.mali.shop.controller;

import com.mali.shop.enums.RoleEnum;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
public class ResourceController {

    @GetMapping("/resource")
    @RolesAllowed(RoleEnum.Names.USER)
    public String getResource(){
        String message = "";
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return name;
    }
}
