package com.clinic.management._service_assignment;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceAssignmentServiceImpl implements ServiceAssignmentService {

    private final ServiceAssignmentRepository assignmentRepository;

    public ServiceAssignmentServiceImpl(ServiceAssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public ServiceAssignment assignService(ServiceAssignment assignment) {
        assignment.setAssignedTime(LocalDateTime.now());
        return assignmentRepository.save(assignment);
    }

    @Override
    public List<ServiceAssignment> getByMedicalRecord(String medicalRecordId) {
        return assignmentRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    @Override
    public ServiceAssignment updateResult(String id, String result, String resultFile) {
        ServiceAssignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chỉ định dịch vụ"));
        assignment.setResult(result);
        assignment.setResultFile(resultFile);
        assignment.setResultTime(LocalDateTime.now());
        assignment.setStatus("COMPLETED");
        return assignmentRepository.save(assignment);
    }
}