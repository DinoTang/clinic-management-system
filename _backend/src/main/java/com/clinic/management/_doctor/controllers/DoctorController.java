package com.clinic.management._doctor.controllers;

import com.clinic.management._doctor.dtos.ProfileCreateRequest;
import com.clinic.management._doctor.dtos.ProfileUpdateRequest;
import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._doctor.interfaces.IDoctorCreate;
import com.clinic.management._doctor.interfaces.IDoctorDelete;
import com.clinic.management._doctor.interfaces.IDoctorUpdate;
import com.clinic.management._doctor.interfaces.IDoctorQuery;
import com.clinic.management.common.enums.UserStatus;
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
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    private final IDoctorCreate doctorCreateService;
    private final IDoctorDelete doctorDeleteService;
    private final IDoctorUpdate doctorUpdateService;
    private final IDoctorQuery doctorQueryService;    

    public DoctorController(
        IDoctorUpdate doctorUpdateService,
        IDoctorDelete doctorDeleteService,
        IDoctorQuery doctorQueryService,
        IDoctorCreate doctorCreateService
    ){
        this.doctorUpdateService=doctorUpdateService;
        this.doctorDeleteService = doctorDeleteService;
        this.doctorQueryService=doctorQueryService;
        this.doctorCreateService=doctorCreateService;
    }

    @PostMapping
    public ResponseEntity<Doctor> create(
        @Valid
        @RequestBody ProfileCreateRequest request
    ){
        Doctor result = doctorCreateService.create(request);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<Page<Doctor>> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String specialty,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String search
    ) {
        UserStatus statusEnum = (status == null || status.equalsIgnoreCase("all"))
            ? null : UserStatus.valueOf(status.toUpperCase());

        String specialtyId = (specialty == null || specialty.equalsIgnoreCase("all")) ? null : specialty;

        Page<Doctor> doctors = doctorQueryService.findAll(
            page, size, specialtyId, statusEnum, search
        );

        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<Doctor> findById(
        @PathVariable String doctorId
    ){
        Doctor doctor = doctorQueryService.findById(doctorId);
        return ResponseEntity.ok(doctor);
    }

    @PutMapping("/update-profile")
    public ResponseEntity<Doctor> updateProfile(
        @RequestBody ProfileUpdateRequest request
    ){
        Doctor doctor = doctorUpdateService.updateProfile(request);
        return ResponseEntity.ok(doctor);
    }

    @DeleteMapping("/soft-delete/{doctorId}")
    public ResponseEntity<Doctor> softDeleteById(
        @PathVariable String doctorId
    ){
        Doctor doctor = doctorDeleteService.softDeleteById(doctorId);
        return ResponseEntity.ok(doctor);
    }

    @DeleteMapping("/hard-delete/{doctorId}")
    public ResponseEntity<Doctor> hardDeleteById(
        @PathVariable String doctorId
    ){
        Doctor doctor = doctorDeleteService.hardDeleteById(doctorId);
        return ResponseEntity.ok(doctor);
    }

    @PutMapping("/restore/{doctorId}")
    public ResponseEntity<Doctor> restoreById(
        @PathVariable String doctorId
    ){
        Doctor doctor = doctorDeleteService.restoreById(doctorId);
        return ResponseEntity.ok(doctor);
    }
}