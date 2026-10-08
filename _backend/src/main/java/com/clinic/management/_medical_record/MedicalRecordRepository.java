package com.clinic.management._medical_record;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, String> {

    Optional<MedicalRecord> findByReceptionIdAndDeletedFalse(String receptionId);

    @Query(value = "SELECT MABENHAN FROM benhan WHERE MABENHAN REGEXP '^BA[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MABENHAN, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxId();
}
