package com.mali.shop.repository;

import com.mali.shop.model.product.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InternshipRepository extends JpaRepository<Internship,Long> {

     List<Internship> findAll();
    Optional<Internship> findByInternshipId(Long internship_id);
    List<Internship> findByRecruiter_id(Long recruiter_id);
    void removeByInternshipId(Long id);

    @Query("SELECT p FROM Internship p WHERE " +
            "UPPER(p.name) LIKE CONCAT('%',UPPER(:query), '%')" +
            "Or UPPER(p.description) LIKE CONCAT('%', UPPER(:query), '%')")
    List<Internship> searchInternships(String query);

    @Query("SELECT p FROM Internship p WHERE p.isActive=true")
    List<Internship> getInternshipsByActiveTrue();
}
