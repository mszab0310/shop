package com.mali.shop.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="user_company")
public class UserCompany {
    @Id
    @Column(name = "user_company_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String companyName;

    @Column(unique = true)
    private String cui;
}
