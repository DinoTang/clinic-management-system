package com.clinic.management._prescription;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping
    public Prescription createPrescription(@RequestBody Prescription prescription) {
        return prescriptionService.createPrescription(prescription);
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public Prescription getByMedicalRecordId(@PathVariable String medicalRecordId) {
        return prescriptionService.getByMedicalRecordId(medicalRecordId);
    }
}