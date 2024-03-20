package com.example.BloodBankManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BloodBankManagement.exception.ResourceNotFoundException;
import com.example.BloodBankManagement.model.BloodDetails;
import com.example.BloodBankManagement.service.BloodDetailsService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/blood-details")
public class BloodDetailController {

    @Autowired
    private BloodDetailsService bloodDetailsService;

    @GetMapping("/getTotalBloodGroups")
    // @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<BloodDetails>> getAllBloodDetails() {
        List<BloodDetails> bloodDetailsList = bloodDetailsService.getAllBloodDetails();
        return new ResponseEntity<>(bloodDetailsList, HttpStatus.OK);
    }

    @GetMapping("/getTotalUnits")
    public ResponseEntity<Integer> getTotalBloodUnits() {
        int totalUnits = bloodDetailsService.getAllUnits();
        return new ResponseEntity<>(totalUnits, HttpStatus.OK);
    }

    @GetMapping("/{bloodGroup}")
    public ResponseEntity<BloodDetails> getBloodDetailsByBloodGroup(@PathVariable String bloodGroup) {
        BloodDetails bloodDetails = bloodDetailsService.getBloodDetailsByBloodGroup(bloodGroup);
        return new ResponseEntity<>(bloodDetails, HttpStatus.OK);
    }

    @PutMapping("/{bloodGroup}")
    public ResponseEntity<BloodDetails> updateBloodDetails(@PathVariable String bloodGroup,
            @RequestBody BloodDetails bloodDetails) {
        BloodDetails updatedBloodDetails = bloodDetailsService.updateBloodDetails(bloodGroup, bloodDetails);
        return new ResponseEntity<>(updatedBloodDetails, HttpStatus.OK);
    }

    @DeleteMapping("/{bloodGroup}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteBloodDetails(@PathVariable String bloodGroup) {
        bloodDetailsService.deleteBloodDetails(bloodGroup);
        return new ResponseEntity<>("Blood details with blood group " + bloodGroup + " have been deleted",
                HttpStatus.OK);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
