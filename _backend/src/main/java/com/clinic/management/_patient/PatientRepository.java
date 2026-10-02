package com.clinic.management._patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {

    List<Patient> findByDeletedFalse();

    Optional<Patient> findByIdAndDeletedFalse(String id);

    Optional<Patient> findByUserId(String userId);

    Optional<Patient> findByHealthInsuranceNumber(String healthInsuranceNumber);

    @Query(value = "SELECT MABENHNHAN FROM benhnhan WHERE MABENHNHAN REGEXP '^BN[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MABENHNHAN, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxPatientId();
}