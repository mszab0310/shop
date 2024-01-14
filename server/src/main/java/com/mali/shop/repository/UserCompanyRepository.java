package com.mali.shop.repository;

import com.mali.shop.model.UserCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCompanyRepository extends JpaRepository<UserCompany, Long> {
}
