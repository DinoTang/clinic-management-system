package com.clinic.management._service_assignment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceAssignmentRepository extends JpaRepository<ServiceAssignment, String> {
    List<ServiceAssignment> findByMedicalRecordIdAndDeletedFalse(String medicalRecordId);
}