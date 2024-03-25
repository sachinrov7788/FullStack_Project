package com.example.BloodBankManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.BloodBankManagement.exception.ResourceNotFoundException;
import com.example.BloodBankManagement.model.Donors;
import com.example.BloodBankManagement.service.DonorService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/donor")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @GetMapping("/getTotalDonors")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Donors>> getAllDonors(@RequestParam int pageIndex, @RequestParam int pageSize) {
        Pageable pageable = PageRequest.of(pageIndex, pageSize);
        Page<Donors> donor = donorService.getAllDonors(pageable);
        return new ResponseEntity<>(donor, HttpStatus.OK);
    }
    
    @GetMapping("/{donorId}")
    public ResponseEntity<Donors> getDonorByDonorId(@PathVariable String donorId) {
        Donors donor = donorService.getDonorByDonorId(donorId);
        return new ResponseEntity<>(donor, HttpStatus.OK);
    }

    @GetMapping("/bloodGroup/{bloodGroup}")
    // @PreAuthorize("hasRole('ADMIN', 'USER')")
    public ResponseEntity<List<Donors>> getDonorsByBloodGroup(@PathVariable String bloodGroup) {
        List<Donors> donors = donorService.getDonorsByBloodGroup(bloodGroup);
        if (donors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(donors, HttpStatus.OK);
    }

    @GetMapping("/city/{city}")
    // @PreAuthorize("hasRole('ADMIN', 'USER')")
    public ResponseEntity<List<Donors>> getDonorByCity(@PathVariable String city) {
        List<Donors> donors = donorService.getDonorByCity(city);

        if (donors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(donors, HttpStatus.OK);
    }

    @PostMapping("/addDonor")
    // @PreAuthorize("hasRole('ADMIN', 'USER')")
    public ResponseEntity<Donors> addDonor(@RequestBody Donors donor) {
        Donors addedDonor = donorService.addDonor(donor);
        return new ResponseEntity<>(addedDonor, HttpStatus.CREATED);
    }

    @PutMapping("/{donorId}")
    public ResponseEntity<Donors> updateDonor(@PathVariable String donorId, @RequestBody Donors donor) {
        Donors updatedDonor = donorService.updateDonor(donorId, donor);
        return new ResponseEntity<>(updatedDonor, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDonor(@PathVariable String donorId) {
        donorService.deleteDonor(donorId);
        return new ResponseEntity<>("Donor with donorId " + donorId + " has been deleted", HttpStatus.OK);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
