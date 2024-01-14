package com.mali.shop.service;


import com.mali.shop.dto.InternshipDTO;
import com.mali.shop.dto.UserDataDto;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInternshipAppliesRepository userInternshipAppliesRepository;

    @Autowired
    private InternshipRepository internshipRepository;


    public List<InternshipDTO> getInternshipsForUser() throws UserException {
        User user = userRepository.findUserById(getCurrentUserID()).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));
        List<Internship> internships = internshipRepository.findByRecruiter_id(user.getId());
        return getInternshipDTOS(internships);
    }

    public List<InternshipDTO> getAppliedInternshipsForUser() throws UserException {
        User user = userRepository.findUserById(getCurrentUserID()).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));
        List<Internship> internships = userInternshipAppliesRepository.findAllInternshipsByUser(user);
        return getInternshipDTOS(internships);
    }

    private Long getCurrentUserID() {
        log.info("Getting id of current user");
        ShopUserDetails currentUserDetails = (ShopUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return currentUserDetails.getId();
    }

    private List<InternshipDTO> getInternshipDTOS(List<Internship> internships) {
        List<InternshipDTO> internshipDTOS = new ArrayList<>();
        internships.forEach(internship -> {
            try {
                if (internship.getActiveUntil().before(new Date())) {
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

    private InternshipDTO daoToDTO(Internship internship) throws UserException {
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

    private UserDataDto getSellerData(Long id) throws UserException {
        User seller = userRepository.findUserById(id).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(seller, UserDataDto.class);
    }
}
