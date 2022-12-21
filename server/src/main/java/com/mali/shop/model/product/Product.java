package com.mali.shop.model.product;

import com.mali.shop.model.User;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    private String name;
    private String description;
    private String productCondition;
    private BigDecimal startingPrice;
    private BigDecimal highestBid;

    @JoinColumn(name="highestBidder_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User highestBidder;
    @Column(name = "highestBidder_id")
    private Long highestBidder_id;

    private Date listedAtDate;
    private Date biddingClosesOn;
    private boolean isActive;


    @JoinColumn(name="seller_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User seller;
    @Column(name = "seller_id")
    private Long seller_id;

}
