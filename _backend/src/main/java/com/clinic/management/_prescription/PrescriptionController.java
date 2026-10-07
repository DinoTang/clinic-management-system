package com.clinic.management._prescription;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping
    public ResponseEntity<?> createPrescription(@RequestBody Prescription prescription) {
        try {
            return ResponseEntity.ok(prescriptionService.createPrescription(prescription));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<?> getByMedicalRecordId(@PathVariable String medicalRecordId) {
        try {
            return ResponseEntity.ok(prescriptionService.getByMedicalRecordId(medicalRecordId));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("message", e.getMessage()));
        }
    }
}