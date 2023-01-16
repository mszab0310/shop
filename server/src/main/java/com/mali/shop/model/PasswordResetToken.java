package com.mali.shop.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PasswordResetToken {

    private static final int EXPIRATION = 60 * 24;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private Date expiryDate;
    private boolean isVerified;

    public PasswordResetToken(String token, User user) {
        this.token = token;
        this.user = user;
        this.isVerified = false;
        this.expiryDate = new Date(System.currentTimeMillis() + 8 * 60 * 60 * 1000);
    }
}
