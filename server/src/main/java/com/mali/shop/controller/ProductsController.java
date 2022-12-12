package com.mali.shop.controller;

import com.mali.shop.dto.ProductDTO;
import com.mali.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductsController {

    @Autowired
    private ProductService productService;

    @PostMapping("/api/private/products/new")
    public void addNewProdut(@RequestBody ProductDTO productDTO){
        productService.addProduct(productDTO);
    }

    @GetMapping("/api/public/products")
    public List<ProductDTO> getAllProducts(){
        return productService.getAllProducts();
    }
}
