package com.mali.shop.repository;

import com.mali.shop.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    public List<Product> findAll();
    public List<Product> getProductsByActiveTrue();
}
