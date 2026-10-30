package com.clinic.management._patient;

import com.clinic.management.common.enums.UserStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;

@Service
public class PatientService implements IPatient {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findByDeletedFalse();
    }

    @Override
    public Patient getPatientById(String id) {
        return patientRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh nhân với ID: " + id));
    }

    @Override
    public Page<Patient> findAll(int page, int size, UserStatus status, String search) {
        Pageable pageable = PageRequest.of(page, size);

        return patientRepository.findAll((root, query, cb) -> cb.and(
            status == null
                ? cb.conjunction() : cb.equal(root.get("user").get("status"), status),
            search == null || search.isBlank()
            ? cb.conjunction()
            : cb.or(
                cb.like(cb.lower(root.get("address")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("id")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("user").get("username")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("user").get("phone")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("user").get("email")), "%" + search.toLowerCase() + "%")
            )
        ), pageable);
    }

}