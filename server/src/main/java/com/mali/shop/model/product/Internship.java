package com.mali.shop.model.product;

import com.mali.shop.model.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "internships")
public class Internship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "internship_id")
    private Long internshipId;

    private String name;
    private String description;
    private String companyName;
    private Long openPositions;

    private Date listedAtDate;
    private Date activeUntil;
    private boolean isActive;


    @JoinColumn(name = "recruiter_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User recruiter;
    @Column(name = "recruiter_id")
    private Long recruiter_id;

}
