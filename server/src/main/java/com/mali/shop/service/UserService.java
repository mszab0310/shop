package com.mali.shop.service;


import com.mali.shop.dto.ProductDTO;
import com.mali.shop.dto.UserDataDto;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;


    public List<ProductDTO> getProductsForUser() throws UserException {
        User user = userRepository.findUserById(getCurrentUserID()).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));
        List<Product> products = productRepository.findProductBySeller_id(user.getId());
        List<ProductDTO> productDTOS = new ArrayList<>();
        products.forEach(product -> {
            try {
                if (product.getBiddingClosesOn().before(new Date())) {
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

    private Long getCurrentUserID() {
        log.info("Getting id of current user");
        ShopUserDetails currentUserDetails = (ShopUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return currentUserDetails.getId();
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
        if (productDTO.getBidderID() != null)
            productDTO.setBidderID(productDTO.getBidderID());
        productDTO.setId(product.getProductId());
        return productDTO;
    }

    private UserDataDto getSellerData(Long id) throws UserException {
        User seller = userRepository.findUserById(id).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(seller, UserDataDto.class);
    }
}
