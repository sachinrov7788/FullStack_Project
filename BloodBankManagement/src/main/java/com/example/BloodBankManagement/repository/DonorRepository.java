package com.example.BloodBankManagement.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.BloodBankManagement.model.Donors;

public interface DonorRepository extends MongoRepository<Donors, String>{
    
    Donors findByDonorId(String donorId);
    List<Donors> findByBloodGroup(String bloodGroup);
    List<Donors> findByCity(String city);
}
