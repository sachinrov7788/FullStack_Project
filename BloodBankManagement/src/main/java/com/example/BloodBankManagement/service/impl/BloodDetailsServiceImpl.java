package com.example.BloodBankManagement.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BloodBankManagement.exception.ResourceNotFoundException;
import com.example.BloodBankManagement.model.BloodDetails;
import com.example.BloodBankManagement.repository.BloodDetailsRepository;
import com.example.BloodBankManagement.service.BloodDetailsService;

@Service
public class BloodDetailsServiceImpl implements BloodDetailsService {

    @Autowired
    private BloodDetailsRepository bloodDetailsRepository;

    @Override
    public List<BloodDetails> getAllBloodDetails() {
        List<BloodDetails> bloodDetailsList = bloodDetailsRepository.findAll();
        if (bloodDetailsList.isEmpty()) {
            throw new ResourceNotFoundException("Blood Details", "No records found", "");
        }
        return bloodDetailsList;
    }

    @Override
    public BloodDetails getBloodDetailsByBloodGroup(String bloodGroup) {
        BloodDetails bloodDetails = bloodDetailsRepository.findByBloodGroup(bloodGroup);
        if (bloodDetails == null) {
            throw new ResourceNotFoundException("Blood Details", "Blood Group", bloodGroup);
        }
        return bloodDetails;
    }

    @Override
    public String addBloodDetails(String bloodGroup, int units) {
        BloodDetails bloodDetail = bloodDetailsRepository.findByBloodGroup(bloodGroup);
        if (bloodDetail != null) {
            bloodDetail.setUnits(bloodDetail.getUnits() + units);
            bloodDetailsRepository.save(bloodDetail);
        } else {
            BloodDetails blood = new BloodDetails();
            blood.setBloodGroup(bloodGroup);
            blood.setUnits(units);
            bloodDetailsRepository.save(blood);
        }

        return "CREATED";
    }

    @Override
    public BloodDetails updateBloodDetails(String bloodGroup, BloodDetails bloodDetails) {
        BloodDetails existingBloodDetails = getBloodDetailsByBloodGroup(bloodGroup);
        existingBloodDetails.setUnits(bloodDetails.getUnits());
        BloodDetails updatedBloodDetails = bloodDetailsRepository.save(existingBloodDetails);
        System.out.println("Blood details updated successfully: " + updatedBloodDetails.getBloodGroup());
        return updatedBloodDetails;
    }

    @Override
    public void deleteBloodDetails(String bloodGroup) {
        BloodDetails existingBloodDetails = getBloodDetailsByBloodGroup(bloodGroup);
        bloodDetailsRepository.delete(existingBloodDetails);
        System.out.println("Blood details deleted successfully: " + bloodGroup);
    }

    @Override
    public String updateBloodUnits(String bloodGroup, Integer units) {
        BloodDetails bloodDetails = bloodDetailsRepository.findByBloodGroup(bloodGroup);
        if (bloodDetails != null) {
            bloodDetails.setUnits(bloodDetails.getUnits() + units);
            bloodDetails.setId(bloodDetails.getId());
            bloodDetailsRepository.save(bloodDetails);
        } else {
            BloodDetails blood = new BloodDetails();
            blood.setBloodGroup(bloodGroup);
            blood.setUnits(units);
            bloodDetailsRepository.save(blood);
        }
        return "UPDATED";
    }

    @Override
    public int getAllUnits() {
        List<BloodDetails> bloodDetailsList = bloodDetailsRepository.findAll();
        int totalUnits = 0;
        for (BloodDetails bloodDetails : bloodDetailsList) {
            totalUnits += bloodDetails.getUnits();
        }
        return totalUnits;
    }


}