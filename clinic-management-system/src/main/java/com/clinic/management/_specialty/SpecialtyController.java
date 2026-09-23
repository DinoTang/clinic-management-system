package com.clinic.management._specialty;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialties")
@CrossOrigin(origins = "http://localhost:5173")
public class SpecialtyController {

    private final SpecialtyService specialtyService;

    public SpecialtyController(SpecialtyService specialtyService) {
        this.specialtyService = specialtyService;
    }

    @GetMapping
    public List<Specialty> getAllSpecialties() {
        return specialtyService.getAllSpecialties();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Specialty> getSpecialtyById(@PathVariable String id) {
        Specialty specialty = specialtyService.getSpecialtyById(id);
        if (specialty == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(specialty);
    }

    @PostMapping
    public Specialty createSpecialty(@RequestBody Specialty specialty) {
        return specialtyService.createSpecialty(specialty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Specialty> updateSpecialty(@PathVariable String id, @RequestBody Specialty specialty) {
        Specialty updated = specialtyService.updateSpecialty(id, specialty);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpecialty(@PathVariable String id) {
        specialtyService.deleteSpecialty(id);
        return ResponseEntity.noContent().build();
    }
}