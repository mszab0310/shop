package com.mali.shop.service;

import com.mali.shop.dto.BidDTO;
import com.mali.shop.dto.ProductDTO;
import com.mali.shop.dto.UserDataDto;
import com.mali.shop.exceptions.ProductException;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.model.User;
import com.mali.shop.model.product.Product;
import com.mali.shop.repository.ProductRepository;
import com.mali.shop.repository.UserRepository;
import com.mali.shop.util.ShopUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public void addProduct(ProductDTO newProduct) {
        // maybe do some checks if product name/description is SFW/appropriate
        // not that important
        log.info("Trying to add new product {}", newProduct.getName());
        Product product = new Product();
        product.setName(newProduct.getName());
        product.setDescription(newProduct.getDescription());
        product.setStartingPrice(newProduct.getStartingPrice());
        product.setSeller_id(getCurrentUserID());
        product.setActive(true);
        product.setBiddingClosesOn(newProduct.getBiddingClosesOn());
        product.setProductCondition(newProduct.getProductCondition());
        product.setListedAtDate(newProduct.getListedAt());
        product.setHighestBid(BigDecimal.valueOf(0));
        productRepository.save(product);

    }

    public List<ProductDTO> getAllProducts() {
        log.info("Loading all products");
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        products.forEach(product -> {
            try {
                if(checkIfProductIsExpired(product)) {
                    product.setActive(false);
                    productRepository.save(product);
                }
                productDTOS.add(daoToDTO(product));
            } catch (UserException e) {
                throw new RuntimeException(e);
            }
        });
        return productDTOS;
    }

    private boolean checkIfProductIsExpired(Product product){
        return product.getBiddingClosesOn().before(new Date());
    }

    public ProductDTO getProductById(Long id) throws Exception {
        log.info("Trying to get product with ID {}", id);
        Product product = productRepository.findProductByProductId(id).orElseThrow(() -> new ProductException(ProductException.PRODUCT_NOT_FOUND));
        return daoToDTO(product);
    }

    public BigDecimal getHighestBidOfProduct(Long id) throws Exception{
        ProductDTO product = getProductById(id);
        return product.getHighestBid();
    }

    private Long getCurrentUserID() {
        log.info("Getting id of current user");
        ShopUserDetails currentUserDetails = (ShopUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return currentUserDetails.getId();
    }

    public List<ProductDTO> searchProducts(String query) throws Exception {
        log.info("Searching products in database by query {}", query);
        List<ProductDTO> productDTOS =  new ArrayList<>();
        List<Product> products = productRepository.searchProducts(query);
        products.forEach((product) -> {
            try {
                productDTOS.add(daoToDTO(product));
            } catch (UserException e) {
                throw new RuntimeException(e);
            }
        });
        return productDTOS;
    }

    public void addBidToProduct(BidDTO bid) throws ProductException {
        Long id = bid.getProductId();
        Long currentUserId = getCurrentUserID();
        BigDecimal bidValue = bid.getBid();
        Product product = productRepository.findProductByProductId(id).orElseThrow(() -> new ProductException(ProductException.PRODUCT_NOT_FOUND));
        //compareTo returns -1 if bid is less than parameter, 0 if equal, 1 if greater
        // we need it to be greater to be a valid bid
        if(Objects.equals(product.getSeller_id(), currentUserId)){
            throw new ProductException(ProductException.BID_ON_OWN_PRODUCT);
        }
        if(checkIfProductIsExpired(product)){
            throw new ProductException(ProductException.PRODUCT_EXPIRED);
        }
        if(bidValue.compareTo(product.getHighestBid()) > 0 && bidValue.compareTo(product.getStartingPrice()) > 0){
            product.setHighestBid(bidValue);
            product.setHighestBidder_id(getCurrentUserID());
            productRepository.save(product);
        }else{
            throw new ProductException(ProductException.PRODUCT_BID_INVALID);
        }
    }

    private ProductDTO daoToDTO(Product product) throws UserException {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setProductCondition(product.getProductCondition());
        productDTO.setStartingPrice(product.getStartingPrice());
        productDTO.setHighestBid(product.getHighestBid());
        productDTO.setListedAt(product.getListedAtDate());
        productDTO.setBiddingClosesOn(product.getBiddingClosesOn());
        productDTO.setIsActive(product.isActive());
        productDTO.setSellerData(getSellerData(product.getSeller_id()));
        productDTO.setId(product.getProductId());
        return productDTO;
    }

    private UserDataDto getSellerData(Long id) throws UserException {
        User seller = userRepository.findUserById(id).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(seller, UserDataDto.class);
    }
}
