package com.example.BloodBankManagement.service;
import com.example.BloodBankManagement.exception.ResourceNotFoundException;
import com.example.BloodBankManagement.model.Donors;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DonorService {
    Page<Donors> getAllDonors(Pageable pageable) throws ResourceNotFoundException;
    Donors getDonorByDonorId(String donorId) throws ResourceNotFoundException;
    Donors addDonor(Donors donor) throws ResourceNotFoundException ;
    Donors updateDonor(String donorId, Donors donor) throws ResourceNotFoundException;
    void deleteDonor(String donorId) throws ResourceNotFoundException;
    List<Donors> getDonorsByBloodGroup(String bloodGroup) throws ResourceNotFoundException;
    List<Donors> getDonorByCity(String city) throws ResourceNotFoundException;
}
