package com.mali.shop.repository;

import com.mali.shop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findUserByUsername(String username);

//    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmail(String email);
    Optional<User> findUserById(Long id);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
