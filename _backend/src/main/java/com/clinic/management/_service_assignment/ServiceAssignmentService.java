package com.clinic.management._service_assignment;

import java.util.List;

public interface ServiceAssignmentService {
    ServiceAssignment assignService(ServiceAssignment assignment);
    List<ServiceAssignment> getByMedicalRecord(String medicalRecordId);
    ServiceAssignment updateResult(String id, String result, String resultFile);
}