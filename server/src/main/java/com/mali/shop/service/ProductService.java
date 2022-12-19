package com.mali.shop.service;

import com.mali.shop.dto.ProductDTO;
import com.mali.shop.model.product.Product;
import com.mali.shop.repository.ProductRepository;
import com.mali.shop.util.ShopUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public void addProduct(ProductDTO newProduct){
        // maybe do some checks if product name/description is SFW/appropiate
        // not that important
        log.info("Trying to add new product {}", newProduct.getName());
        Product product = new Product();
        product.setName(newProduct.getName());
        product.setDescription(newProduct.getDescription());
        product.setStartingPrice(newProduct.getStartingPrice());
        product.setSeller_id(getCurrentUserID());
        productRepository.save(product);

     }

     public List<ProductDTO> getAllProducts(){
        log.info("Loading all products");
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        products.forEach( product -> {
            productDTOS.add(daoToDTO(product));
        });
        return productDTOS;
     }

     private Long getCurrentUserID(){
        log.info("Getting id of current user");
         ShopUserDetails currentUserDetails = (ShopUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
         return currentUserDetails.getId();
     }

     private ProductDTO daoToDTO(Product product){
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setStartingPrice(product.getStartingPrice());
        return productDTO;
     }
}
