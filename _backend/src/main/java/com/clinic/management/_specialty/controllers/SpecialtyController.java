package com.clinic.management._specialty.controllers;

import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.interfaces.ISpecialtyQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/specialties")
@CrossOrigin(origins = "http://localhost:5173")
public class SpecialtyController {

    private final ISpecialtyQuery specialtyQueryService;

    public SpecialtyController(ISpecialtyQuery specialtyQueryService) {
        this.specialtyQueryService = specialtyQueryService;
    }


    @GetMapping("/{specialtyId}")
    public ResponseEntity<Specialty> findById(
        @PathVariable String specialtyId
    ) {
        Specialty specialty = specialtyQueryService.findById(specialtyId);
        return ResponseEntity.ok(specialty);
    }

}