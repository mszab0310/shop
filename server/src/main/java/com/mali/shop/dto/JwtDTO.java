package com.mali.shop.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JwtDTO {
    private String token;
    private String type = "Bearer";
    private String email;
    private String username;
    private List<String> roles;
}
