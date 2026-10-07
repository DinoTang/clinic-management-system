package com.clinic.management._prescription;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, String> {
    Optional<Prescription> findByMedicalRecordIdAndDeletedFalse(String medicalRecordId);

    @Query(value = "SELECT MADONTHUOC FROM donthuoc WHERE MADONTHUOC REGEXP '^DT[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MADONTHUOC, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxId();
}