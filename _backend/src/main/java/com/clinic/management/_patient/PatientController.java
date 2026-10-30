package com.clinic.management._patient;

import com.clinic.management._patient.IPatient;
import com.clinic.management.common.enums.UserStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final IPatient patientService;
    private final PatientRepository patientRepository;

    public PatientController(PatientService patientService, PatientRepository patientRepository) {
        this.patientService = patientService;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Patient> getPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/v2")
    public ResponseEntity<Page<Patient>> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String search
    ) {
        UserStatus statusEnum = (status == null || status.equalsIgnoreCase("all"))
            ? null : UserStatus.valueOf(status.toUpperCase());

        Page<Patient> patients = patientService.findAll(
            page, size, statusEnum, search
        );

        return ResponseEntity.ok(patients);
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