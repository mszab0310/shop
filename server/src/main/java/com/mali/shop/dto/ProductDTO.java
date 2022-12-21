package com.mali.shop.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class ProductDTO {
    private String name;
    private String description;
    private String productCondition;
    private BigDecimal startingPrice;
    private BigDecimal highestBid;
    private Date listedAt;
    private Date biddingClosesOn;
    private Boolean isActive;

}
