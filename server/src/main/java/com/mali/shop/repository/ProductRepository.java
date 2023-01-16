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

    Optional<Product> findProductByProductId(Long product_id);
    List<Product> findProductBySeller_id(Long seller_id);

    @Query("SELECT p FROM Product p WHERE " +
            "p.name LIKE CONCAT('%',:query, '%')" +
            "Or p.description LIKE CONCAT('%', :query, '%')")
    List<Product> searchProducts(String query);
}
