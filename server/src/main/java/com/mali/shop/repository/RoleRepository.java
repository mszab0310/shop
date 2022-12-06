package com.mali.shop.repository;

import com.mali.shop.enums.RoleEnum;
import com.mali.shop.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleEnum name);
}
