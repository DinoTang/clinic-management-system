package com.clinic.management._prescription;

public interface PrescriptionService {
    Prescription createPrescription(Prescription prescription);
    Prescription getByMedicalRecordId(String medicalRecordId);
}