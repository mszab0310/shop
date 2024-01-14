package com.mali.shop.controller;

import com.mali.shop.dto.InternshipDTO;
import com.mali.shop.exceptions.InternshipException;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.service.InternshipService;
import com.mali.shop.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
public class InternshipsController {

    @Autowired
    private InternshipService internshipService;

    @Autowired
    private UserService userService;

    @GetMapping("/api/public/internships")
    public List<InternshipDTO> getAllInternships() {
        log.info("Fetching all internships");
        return internshipService.getAllInternships();
    }

    @GetMapping("/api/private/internship")
    public InternshipDTO getInternshipById(@RequestParam Long id) throws Exception {
        log.info("Received request to load internship with id {}", id);
        return internshipService.getInternshipById(id);
    }

    @DeleteMapping("/api/private/internship")
    public void deleteProduct(@RequestParam Long id) throws UserException, InternshipException {
        log.info("Received request to delete internship with id {}", id);
        internshipService.deleteProduct(id);
    }

    @GetMapping(value = "/api/private/internship/search")
    public List<InternshipDTO> searchInternships(@RequestParam String query) {
        log.info("Received request to search for products by query {}", query);
        return internshipService.searchInternships(query);
    }

    @PostMapping("/api/private/internships/new")
    public void addNewInternship(@RequestBody InternshipDTO internshipDTO) {
        log.info("Request received to add new internship {} {} ", internshipDTO.getName(), internshipDTO.getOpenPositions());
        internshipService.addInternship(internshipDTO);
    }

    @GetMapping(value = "/api/private/user/internships")
    public List<InternshipDTO> searchUserInternships() throws Exception {
        log.info("Received request to return internships listed by user");
        return userService.getInternshipsForUser();
    }

    @GetMapping(value = "/api/private/user/internships/applied")
    public List<InternshipDTO> getUserAppliedInternships() throws Exception {
        log.info("Received request to return internships applied by user");
        return userService.getAppliedInternshipsForUser();
    }

}
