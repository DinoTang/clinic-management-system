package com.clinic.management._specialty.controllers;

import com.clinic.management.common.enums.SpecialtyStatus;
import com.clinic.management._specialty.dtos.ProfileCreateRequest;
import com.clinic.management._specialty.dtos.ProfileUpdateRequest;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.interfaces.ISpecialtyCreate;
import com.clinic.management._specialty.interfaces.ISpecialtyUpdate;
import com.clinic.management._specialty.interfaces.ISpecialtyQuery;
import com.clinic.management._specialty.interfaces.ISpecialtyDelete;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity; 
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
@RestController
@RequestMapping("/api/specialties")
@CrossOrigin(origins = "http://localhost:5173")
public class SpecialtyController {

    private final ISpecialtyDelete specialtyDeleteService;
    private final ISpecialtyUpdate specialtyUpdateService;
    private final ISpecialtyQuery specialtyQueryService;
    private final ISpecialtyCreate specialtyCreateService;

    public SpecialtyController(
        ISpecialtyCreate specialtyCreateService,
        ISpecialtyDelete specialtyDeleteService,
        ISpecialtyUpdate specialtyUpdateService,
        ISpecialtyQuery specialtyQueryService
    ){
        this.specialtyCreateService = specialtyCreateService;
        this.specialtyDeleteService=specialtyDeleteService;
        this.specialtyUpdateService=specialtyUpdateService;
        this.specialtyQueryService = specialtyQueryService;
    }

    @GetMapping
    public ResponseEntity<Page<Specialty>> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Page<Specialty> specialtys = specialtyQueryService.findAll(page, size);

        return ResponseEntity.ok(specialtys);
    }

    @GetMapping("/{specialtyId}")
    public ResponseEntity<Specialty> findById(
        @PathVariable String specialtyId
    ){
        Specialty result = specialtyQueryService.findById(specialtyId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/update-profile/{specialtyId}")
    public ResponseEntity<Specialty> updateProfile(
        @PathVariable String specialtyId,
        @RequestBody ProfileUpdateRequest request){
        Specialty specialty = specialtyUpdateService.updateProfile(specialtyId, request);
        return ResponseEntity.ok(specialty);
    }

    @PutMapping("/update-status/{specialtyId}")
    public ResponseEntity<Specialty> updateStatus(
        @PathVariable String specialtyId,
        @RequestBody SpecialtyStatus request){
        Specialty specialty = specialtyUpdateService.updateStatus(specialtyId, request);
        return ResponseEntity.ok(specialty);
    }

    @PutMapping("/restore/{specialtyId}")
    public ResponseEntity<Specialty> restoreById(
        @PathVariable String specialtyId
    ){
        Specialty specialty = specialtyDeleteService.restoreById(specialtyId);
        return ResponseEntity.ok(specialty);
    }

    @DeleteMapping("/soft-delete/{specialtyId}")
    public ResponseEntity<Specialty> softDeleteById(
            @PathVariable String specialtyId
    ){
        Specialty specialty = specialtyDeleteService.softDeleteById(specialtyId);
        return ResponseEntity.ok(specialty);
    }

    @DeleteMapping("/hard-delete/{specialtyId}")
    public ResponseEntity<Specialty> hardDeleteById(
            @PathVariable String specialtyId
    ){
        Specialty specialty = specialtyDeleteService.hardDeleteById(specialtyId);
        return ResponseEntity.ok(specialty);
    }

}