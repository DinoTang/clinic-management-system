package com.clinic.management._prescription;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    @Override
    public Prescription createPrescription(Prescription prescription) {
        prescription.setPrescriptionDate(LocalDate.now());
        if (prescription.getDetails() != null) {
            prescription.getDetails().forEach(detail -> detail.setPrescription(prescription));
        }
        return prescriptionRepository.save(prescription);
    }

    @Override
    public Prescription getByMedicalRecordId(String medicalRecordId) {
        return prescriptionRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn thuốc theo mã bệnh án"));
    }
}