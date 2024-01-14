package com.mali.shop.repository;

import com.mali.shop.model.User;
import com.mali.shop.model.UserInternshipApplies;
import com.mali.shop.model.product.Internship;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserInternshipAppliesRepository extends JpaRepository<UserInternshipApplies, Long> {
    @Query("SELECT b.internship FROM UserInternshipApplies b WHERE b.user = :user")
    List<Internship> findAllInternshipsByUser(@Param("user") User user);
}
