package com.mali.shop.service;

import com.mali.shop.dto.RegisterUserDTO;
import com.mali.shop.enums.Roles;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.model.Role;
import com.mali.shop.model.ShopUserDetails;
import com.mali.shop.model.User;
import com.mali.shop.repository.RoleRepository;
import com.mali.shop.repository.UserRepository;
import com.mali.shop.security.UserPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class ShopUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserPasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username).orElseThrow( () -> new UsernameNotFoundException("User not found with username " +  username));
        return new ShopUserDetails(user);
    }

    public void registerUser(RegisterUserDTO newUser) throws UserException {
        if(userRepository.existsByEmail(newUser.getEmail())){
            throw new UserException(UserException.EMAIL_TAKEN);
        }else if(userRepository.existsByUsername(newUser.getUsername())){
            throw new UserException(UserException.USERNAME_TAKEN);
        }else {
            User user = new User();
            user.setEmail(newUser.getEmail());
            user.setUsername(newUser.getUsername());
            user.setFirstName(newUser.getFirstName());
            user.setLastName(newUser.getLastName());
            user.setPassword(passwordEncoder.encode(newUser.getPassword()));
            user.setActive(true);
            Role userRole = roleRepository.findByName(Roles.USER);
            user.setRoles(Collections.singleton(userRole));
            userRepository.save(user);
        }

    }
}
