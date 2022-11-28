package com.mali.shop.model;

import lombok.Data;

@Data
public class RegisterUserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
}
