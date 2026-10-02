package com.clinic.management._patient;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;
    private final PatientRepository patientRepository;

    public PatientController(PatientService patientService, PatientRepository patientRepository) {
        this.patientService = patientService;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Patient> getPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable String id) {
        return patientService.getPatientById(id);
    }

    @GetMapping("/next-id")
    public ResponseEntity<Map<String, String>> getNextPatientId() {
        String maxId = patientRepository.findMaxPatientId();
        int nextNumber = maxId == null ? 1 : Integer.parseInt(maxId.substring(2)) + 1;
        String nextId = String.format("BN%03d", nextNumber);
        return ResponseEntity.ok(Map.of("nextId", nextId));
    }
}