package com.example.BloodBankManagement.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.BloodBankManagement.model.User;


public interface UserRepository extends MongoRepository<User, String>{

    public User findByEmail(String email);
    public boolean existsByEmail(String email);
    public void deleteByEmail(String email);
}
