package com.mali.shop.controller;

import com.mali.shop.dto.ProductDTO;
import com.mali.shop.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
public class ProductsController {

    @Autowired
    private ProductService productService;

    @PostMapping("/api/private/products/new")
    public void addNewProdut(@RequestBody ProductDTO productDTO){
        log.info("Request receievd to add new product {} {} ", productDTO.getName(), productDTO.getStartingPrice());
        productService.addProduct(productDTO);
    }

    @GetMapping("/api/public/products")
    public List<ProductDTO> getAllProducts(){
        return productService.getAllProducts();
    }
}
