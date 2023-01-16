package com.mali.shop.util;

import com.mali.shop.dto.UserDataDto;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthHelper {

    public static UserDataDto getCurrentUserData() {
        UserDataDto userDataDto = new UserDataDto();
        ShopUserDetails userDetails = (ShopUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userDataDto.setId(userDetails.getId());
        userDataDto.setFirstname(userDetails.getFirstName());
        userDataDto.setLastName(userDetails.getLastName());
        userDataDto.setUsername(userDetails.getUsername());
        userDataDto.setEmail(userDetails.getEmail());
        return userDataDto;
    }

}

