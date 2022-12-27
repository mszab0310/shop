package com.mali.shop.repository;

import com.mali.shop.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
     List<Product> findAll();
    @Query("SELECT p FROM Product p WHERE p.isActive=true")
     List<Product> getProductsByActiveTrue();

    Optional<Product> getProductByProduct_id(Long id);
}
