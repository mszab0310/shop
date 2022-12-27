package com.mali.shop.controller;

import com.mali.shop.dto.ProductDTO;
import com.mali.shop.enums.ProductCondition;
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
        log.info("Fetchin all products");
        return productService.getAllProducts();
    }

    @GetMapping("/api/private/product")
    public ProductDTO getProductWithId(@RequestParam Long id) throws Exception {
        log.info("Received request to load product with id {}", id);
        return productService.getProductById(id);
    }

    @GetMapping("/api/private/products/new/condition")
    public List<String> getConditions(){
        log.info("Fetching product condtion types");
        return ProductCondition.getProductConditions();
    }
}
