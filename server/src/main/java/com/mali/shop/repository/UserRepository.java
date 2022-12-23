package com.mali.shop.repository;

import com.mali.shop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findUserByUsername(String username);
    Optional<User> findUserById(Long id);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
