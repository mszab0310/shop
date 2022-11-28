package com.mali.shop.service;

import com.mali.shop.model.ShopUserDetails;
import com.mali.shop.model.User;
import com.mali.shop.repository.UserRepository;
import com.mali.shop.security.UserPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShopUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByUserName(username);

        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));

        return user.map(ShopUserDetails::new).get();
    }

    public void saveUser(String email, String firstName, String lastName, String password){
        String encryptedPassword = passwordEncoder.encode(password);
        User user = new User(email,firstName,lastName,encryptedPassword);
        userRepository.save(user);
    }
}
