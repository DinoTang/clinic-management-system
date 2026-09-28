package com.clinic.management._prescription;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, String> {
    Optional<Prescription> findByMedicalRecordIdAndDeletedFalse(String medicalRecordId);
}