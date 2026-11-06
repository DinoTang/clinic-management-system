package com.clinic.management._specialty.controllers;

import com.clinic.management.common.enums.SpecialtyStatus;
import com.clinic.management._specialty.dtos.ProfileCreateRequest;
import com.clinic.management._specialty.dtos.ProfileUpdateRequest;
import com.clinic.management._specialty.dtos.UpdateStatusRequest;
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
import jakarta.validation.Valid;

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
    public List<Specialty> findAll() {
        return specialtyQueryService.findAll();
    }

    @GetMapping("/v2")
    public ResponseEntity<Page<Specialty>> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String search
    ) {

        SpecialtyStatus statusEnum = (status == null || status.equalsIgnoreCase("all"))
            ? null : SpecialtyStatus.valueOf(status.toUpperCase());

        Page<Specialty> specialtys = specialtyQueryService.findAll(page, size, statusEnum, search);

        return ResponseEntity.ok(specialtys);
    }

    @GetMapping("/{specialtyId}")
    public ResponseEntity<Specialty> findById(
        @PathVariable String specialtyId
    ){
        Specialty result = specialtyQueryService.findById(specialtyId);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Specialty> create(
        @Valid
        @RequestBody ProfileCreateRequest request){
        Specialty specialty = specialtyCreateService.create(request);
        return ResponseEntity.ok(specialty);
    }

    @PutMapping("/update-profile")
    public ResponseEntity<Specialty> updateProfile(
        @Valid
        @RequestBody ProfileUpdateRequest request){
        Specialty specialty = specialtyUpdateService.updateProfile(request);
        return ResponseEntity.ok(specialty);
    }

    @PutMapping("/update-status")
    public ResponseEntity<Specialty> updateStatus(
        @Valid
        @RequestBody UpdateStatusRequest request){
        Specialty specialty = specialtyUpdateService.updateStatus(request);
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