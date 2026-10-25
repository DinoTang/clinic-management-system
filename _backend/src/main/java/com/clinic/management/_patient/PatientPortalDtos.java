package com.clinic.management._patient;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

/** DTO cho các API phía bệnh nhân (mobile) — không expose password hay dữ liệu nội bộ. */
public final class PatientPortalDtos {

    private PatientPortalDtos() {
    }

    public record ProfileDto(
            String patientId,
            String fullName,
            LocalDate birthDate,
            String gender,
            String phone,
            String email,
            String address,
            String medicalHistory,
            String bloodGroup,
            String healthInsuranceNumber
    ) {
    }

    public record AppointmentDto(
            String id,
            String status,
            LocalDate date,
            LocalTime time,
            LocalTime endTime,
            String reason,
            String doctorId,
            String doctorName,
            String specialtyName,
            String roomId,
            String roomName,
            String scheduleId
    ) {
    }

    public record CancelRequest(String patientId) {
    }

    public record MedicineLineDto(
            String medicineId,
            String medicineName,
            String unit,
            Integer quantity,
            String dosage,
            BigDecimal unitPrice,
            BigDecimal totalPrice
    ) {
    }

    public record PrescriptionDto(
            String id,
            LocalDate date,
            String advice,
            List<MedicineLineDto> medicines
    ) {
    }

    public record InvoiceLineDto(
            String itemName,
            String itemType,
            Integer quantity,
            BigDecimal unitPrice,
            BigDecimal totalPrice
    ) {
    }

    public record InvoiceDto(
            String id,
            BigDecimal total,
            String paymentStatus,
            String paymentMethod,
            LocalDateTime paidAt,
            LocalDateTime createdAt,
            List<InvoiceLineDto> items
    ) {
    }

    public record MedicalRecordDto(
            String id,
            LocalDate date,
            String receptionId,
            String doctorId,
            String doctorName,
            String specialtyName,
            String symptoms,
            String diagnosis,
            String notes,
            PrescriptionDto prescription,
            InvoiceDto invoice
    ) {
    }
}
