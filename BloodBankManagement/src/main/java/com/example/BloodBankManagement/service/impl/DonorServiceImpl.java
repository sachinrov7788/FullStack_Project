package com.example.BloodBankManagement.service.impl;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.BloodBankManagement.model.Donors;
import com.example.BloodBankManagement.repository.DonorRepository;
import com.example.BloodBankManagement.service.BloodDetailsService;
import com.example.BloodBankManagement.service.DonorService;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private BloodDetailsService bloodDetailsService;
    
    @Autowired
    private DonorRepository donorRepository;

    @Override
    public Page<Donors> getAllDonors(Pageable pageable) {
        return donorRepository.findAll(pageable);
    }

    @Override
    public Donors getDonorByDonorId(String donorId) {
        return donorRepository.findByDonorId(donorId);
    }

    @Override
    public Donors addDonor(Donors donor) {
        donor.setDate(new Date());
        Donors addedDonor = donorRepository.save(donor);
        bloodDetailsService.addBloodDetails(donor.getBloodGroup(), donor.getUnits());
        System.out.println("New donor added successfully: "+addedDonor.getName());
        return addedDonor;
    }

    @Override
    public Donors updateDonor(String donorId, Donors donor) {
        Donors existingDonor = donorRepository.findByDonorId(donorId);
        existingDonor.setName(donor.getName());
        Donors updatedDonor = donorRepository.save(existingDonor);
        System.out.println("Donor updated successfully: " + updatedDonor.getName());
        return updatedDonor;
    }

    @Override
    public void deleteDonor(String donorId) {
        Donors existingDonor = donorRepository.findByDonorId(donorId);
        donorRepository.delete(existingDonor);
        System.out.println("Donor deleted successfully: " + existingDonor.getName());
    }

    public List<Donors> getDonorsByBloodGroup(String bloodGroup) {
        return donorRepository.findByBloodGroup(bloodGroup);
    }

    @Override
    public List<Donors> getDonorByCity(String city) {
        return donorRepository.findByCity(city);
    }
}