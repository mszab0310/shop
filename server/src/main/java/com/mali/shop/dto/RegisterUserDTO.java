package com.mali.shop.dto;

import lombok.Data;

@Data
public class RegisterUserDTO {
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private String password;
}
