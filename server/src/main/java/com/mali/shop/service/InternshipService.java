package com.mali.shop.service;

import com.mali.shop.dto.InternshipDTO;
import com.mali.shop.dto.UserDataDto;
import com.mali.shop.exceptions.InternshipException;
import com.mali.shop.exceptions.UserException;
import com.mali.shop.model.User;
import com.mali.shop.model.product.Internship;
import com.mali.shop.repository.InternshipRepository;
import com.mali.shop.repository.UserInternshipAppliesRepository;
import com.mali.shop.repository.UserRepository;
import com.mali.shop.util.ShopUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInternshipAppliesRepository userInternshipAppliesRepository;

    public void addInternship(InternshipDTO newProduct) {
        // maybe do some checks if internship name/description is SFW/appropriate
        // not that important
        log.info("Trying to add new internship {}", newProduct.getName());
        Internship internship = new Internship();
        internship.setName(newProduct.getName());
        internship.setDescription(newProduct.getDescription());
        internship.setOpenPositions(newProduct.getOpenPositions());
        internship.setRecruiter_id(getCurrentUserID());
        internship.setActive(true);
        internship.setActiveUntil(newProduct.getActiveUntil());
        internship.setCompanyName(newProduct.getCompanyName());
        internship.setListedAtDate(newProduct.getListedAt());
        internshipRepository.save(internship);
    }

    public List<InternshipDTO> getAllInternships() {
        log.info("Loading all internships");
        List<Internship> internships = internshipRepository.findAll();
        List<InternshipDTO> internshipDTOS = new ArrayList<>();
        internships.forEach(internship -> {
            try {
                if (checkIfInternshipIsExpired(internship)) {
                    internship.setActive(false);
                    internshipRepository.save(internship);
                }
                internshipDTOS.add(daoToDTO(internship));
            } catch (UserException e) {
                throw new RuntimeException(e);
            }
        });
        return internshipDTOS;
    }

    public InternshipDTO getInternshipById(Long id) throws Exception {
        log.info("Trying to get internship with ID {}", id);
        Internship internship = internshipRepository.findByInternshipId(id).orElseThrow(() -> new InternshipException(InternshipException.INTERNSHIP_NOT_FOUND));
        return daoToDTO(internship);
    }

    public List<InternshipDTO> searchInternships(String query) {
        log.info("Searching internships in database by query {}", query);
        List<InternshipDTO> internshipDTOS = new ArrayList<>();
        List<Internship> internships = internshipRepository.searchInternships(query);
        internships.forEach((product) -> {
            try {
                internshipDTOS.add(daoToDTO(product));
            } catch (UserException e) {
                throw new RuntimeException(e);
            }
        });
        return internshipDTOS;
    }

    public InternshipDTO daoToDTO(Internship internship) throws UserException {
        InternshipDTO internshipDTO = new InternshipDTO();
        internshipDTO.setName(internship.getName());
        internshipDTO.setDescription(internship.getDescription());
        internshipDTO.setCompanyName(internship.getCompanyName());
        internshipDTO.setOpenPositions(internship.getOpenPositions());
        internshipDTO.setListedAt(internship.getListedAtDate());
        internshipDTO.setActiveUntil(internship.getActiveUntil());
        internshipDTO.setIsActive(internship.isActive());
        internshipDTO.setRecruiterData(getSellerData(internship.getRecruiter_id()));
        internshipDTO.setId(internship.getInternshipId());
        return internshipDTO;
    }

    @Transactional
    public void deleteProduct(Long id) throws UserException, InternshipException {
        User user = userRepository.findUserById(getCurrentUserID()).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));
        Internship internship = internshipRepository.findByInternshipId(id).orElseThrow(() -> new InternshipException(InternshipException.INTERNSHIP_NOT_FOUND));
        if (!internship.getRecruiter_id().equals(user.getId())) {
            throw new InternshipException(InternshipException.INTERNSHIP_ACTION_INVALID);
        }
        internshipRepository.removeByInternshipId(id);
    }

    private boolean checkIfInternshipIsExpired(Internship internship) {
        return internship.getActiveUntil().before(new Date());
    }

    private Long getCurrentUserID() {
        log.info("Getting id of current user");
        ShopUserDetails currentUserDetails = (ShopUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return currentUserDetails.getId();
    }

    private UserDataDto getSellerData(Long id) throws UserException {
        User seller = userRepository.findUserById(id).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(seller, UserDataDto.class);
    }
}
