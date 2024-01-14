package com.mali.shop.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class InternshipDTO {
    private String name;
    private String description;
    private String companyName;
    private Long openPositions;
    private Date listedAt;
    private Date activeUntil;
    private Boolean isActive;
    private UserDataDto recruiterData;
    private Long userID;
    private Long id;
}
