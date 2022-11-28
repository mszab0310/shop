package com.mali.shop.controller;


import com.mali.shop.dto.RegisterUserDTO;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.service.ShopUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthenticationController {
    @Autowired
    private ShopUserDetailsService userDetailsService;

    @PostMapping(value ="/register",consumes="application/json")
    public void registerUser(@RequestBody RegisterUserDTO newUser) throws UserException {
        log.info("Recieved register request with data {} {} {} ",newUser.getEmail(),newUser.getFirstName(),newUser.getLastName());
        if(userDetailsService.checkIfUserExistsByEmail(newUser.getEmail())){
            log.error("User already exists with email {}",newUser.getEmail());
            throw new UserException(UserException.EMAIL_TAKEN);
        }else {
            userDetailsService.saveUser(newUser.getEmail(), newUser.getFirstName(), newUser.getLastName(), newUser.getPassword());
        }
    }


}
