package com.mali.shop.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BidDTO {
    private BigDecimal bid;
    private Long productId;
}
