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
        if (assignment.getMedicalRecordId() == null || assignment.getMedicalRecordId().isBlank()) {
            throw new IllegalArgumentException("BR-041: chỉ định dịch vụ phải gắn với mã bệnh án.");
        }
        if (assignment.getServiceId() == null || assignment.getServiceId().isBlank()) {
            throw new IllegalArgumentException("Thiếu mã dịch vụ.");
        }
        if (assignment.getQuantity() == null || assignment.getQuantity() <= 0) {
            throw new IllegalArgumentException("Số lượng dịch vụ phải lớn hơn 0.");
        }
        if (assignment.getDeleted() == null) {
            assignment.setDeleted(false);
        }
        if (assignment.getStatus() == null || assignment.getStatus().isBlank()) {
            assignment.setStatus("DaChiDinh");
        }
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