package com.mali.shop.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    private String name;
    private String description;
    private BigDecimal startingPrice;
    private BigDecimal highestBid;

    @JoinColumn(name="seller_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User seller;
    @Column(name = "seller_id")
    private Long seller_id;

}
