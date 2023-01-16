package com.mali.shop.controller;

import com.mali.shop.dto.BidDTO;
import com.mali.shop.dto.ProductDTO;
import com.mali.shop.enums.ProductCondition;
import com.mali.shop.exceptions.ProductException;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.service.ProductService;
import com.mali.shop.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@Slf4j
public class ProductsController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

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

    /*
    * This will be a polling endpoint for when a user accesses a product page and wants to see live bid
    * */
    @GetMapping("/api/private/product/highestbid")
    public BigDecimal getHighestbidOfProduct(@RequestParam Long id) throws Exception {
        log.info("Fetching bid for product with id {}",id);
        return productService.getHighestBidOfProduct(id);
    }

    @PostMapping(value = "/api/private/product/bid", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void submitBidForProduct(@RequestBody BidDTO bidDTO) throws Exception{
        log.info("Recieved request to submit bid {} for product {}",bidDTO.getBid(),bidDTO.getProductId());
        productService.addBidToProduct(bidDTO);
    }

    @GetMapping(value = "/api/private/products/search")
    public List<ProductDTO> searchProducts(@RequestParam String query) throws Exception {
        log.info("Recieved request to search for products by query {}", query);
        return productService.searchProducts(query);
    }

    @GetMapping(value = "/api/private/user/products")
    public List<ProductDTO> searchUserProducts() throws Exception {
        log.info("Recieved request to return products listed by user");
        return userService.getProductsForUser();
    }

    @GetMapping(value = "/api/private/user/products/bids")
    public List<ProductDTO> getUserBidProducts() throws Exception {
        log.info("Recieved request to return products bidded by user");
        return userService.getBiddedProductsForUser();
    }

    @DeleteMapping("/api/private/product")
    public void deleteProduct(@RequestParam Long id) throws UserException, ProductException {
        log.info("Recieved request to delete product with id {}",id );
        productService.deleteProduct(id);
    }

}
