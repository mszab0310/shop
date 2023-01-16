package com.mali.shop.repository;

import com.mali.shop.model.User;
import com.mali.shop.model.UserProductBids;
import com.mali.shop.model.product.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserProductBidsRepository extends JpaRepository<UserProductBids, Long> {
    @Query("SELECT b.product FROM UserProductBids b WHERE b.user = :user")
    List<Product> findAllProductsByUser(@Param("user") User user);
}
