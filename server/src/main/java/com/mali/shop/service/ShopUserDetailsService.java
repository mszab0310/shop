package com.mali.shop.service;

import com.mali.shop.model.ShopUserDetails;
import com.mali.shop.model.User;
import com.mali.shop.repository.RoleRepository;
import com.mali.shop.repository.UserRepository;
import com.mali.shop.security.UserPasswordEncoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ShopUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Trying to load user with username {}", username);
        User user = userRepository.findUserByUsername(username).orElseThrow( () -> new UsernameNotFoundException("User not found with username " +  username));
        log.info("{} user loaded", username);
        return new ShopUserDetails(user);
    }

}
