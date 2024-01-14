package com.mali.shop.dto;

import lombok.Data;

@Data
public class RegisterRecruiterDTO extends RegisterUserDTO{
    private String companyName;
    private String cui;
}
