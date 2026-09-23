package com.clinic.management._service_assignment;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-assignments")
public class ServiceAssignmentController {

    private final ServiceAssignmentService assignmentService;

    public ServiceAssignmentController(ServiceAssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping
    public ServiceAssignment createAssignment(@RequestBody ServiceAssignment assignment) {
        return assignmentService.assignService(assignment);
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public List<ServiceAssignment> getByMedicalRecord(@PathVariable String medicalRecordId) {
        return assignmentService.getByMedicalRecord(medicalRecordId);
    }
}