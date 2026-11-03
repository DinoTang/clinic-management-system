package com.clinic.management._patient;

import com.clinic.management._appointment.Appointment;
import com.clinic.management._appointment.AppointmentRepository;
import com.clinic.management._billing.Invoice;
import com.clinic.management._billing.InvoiceDetail;
import com.clinic.management._billing.InvoiceDetailRepository;
import com.clinic.management._billing.InvoiceRepository;
import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._doctor.repositories.DoctorRepository;
import com.clinic.management._medicine.Medicine;
import com.clinic.management._medicine.MedicineRepository;
import com.clinic.management._medical_record.MedicalRecord;
import com.clinic.management._medical_record.MedicalRecordRepository;
import com.clinic.management._prescription.Prescription;
import com.clinic.management._prescription.PrescriptionDetail;
import com.clinic.management._prescription.PrescriptionRepository;
import com.clinic.management._reception.Reception;
import com.clinic.management._reception.ReceptionRepository;
import com.clinic.management._room.entities.Room;
import com.clinic.management._room.repositories.RoomRepository;
import com.clinic.management._schedule.DoctorSchedule;
import com.clinic.management._schedule.DoctorScheduleRepository;
import com.clinic.management._user.entities.User;
import com.clinic.management._user.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * API nội bộ cho ứng dụng mobile của bệnh nhân.
 * Chỉ đọc/ghi dữ liệu của chính bệnh nhân (patientId), không phụ trách
 * luồng admin/staff/doctor — những endpoint đó giữ nguyên như cũ.
 */
@Service
public class PatientPortalService {

    private static final String STATUS_CANCELLED = "DaHuy";

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final DoctorRepository doctorRepository;
    private final RoomRepository roomRepository;
    private final ReceptionRepository receptionRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final MedicineRepository medicineRepository;
    private final InvoiceRepository invoiceRepository;
    private final InvoiceDetailRepository invoiceDetailRepository;

    public PatientPortalService(
            PatientRepository patientRepository,
            UserRepository userRepository,
            AppointmentRepository appointmentRepository,
            DoctorScheduleRepository scheduleRepository,
            DoctorRepository doctorRepository,
            RoomRepository roomRepository,
            ReceptionRepository receptionRepository,
            MedicalRecordRepository medicalRecordRepository,
            PrescriptionRepository prescriptionRepository,
            MedicineRepository medicineRepository,
            InvoiceRepository invoiceRepository,
            InvoiceDetailRepository invoiceDetailRepository
    ) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.scheduleRepository = scheduleRepository;
        this.doctorRepository = doctorRepository;
        this.roomRepository = roomRepository;
        this.receptionRepository = receptionRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.medicineRepository = medicineRepository;
        this.invoiceRepository = invoiceRepository;
        this.invoiceDetailRepository = invoiceDetailRepository;
    }

    /* ------------------------------------------------------------------ */
    /* Hồ sơ                                                              */
    /* ------------------------------------------------------------------ */

    @Transactional(readOnly = true)
    public PatientPortalDtos.ProfileDto getProfile(String patientId) {
        Patient patient = requirePatient(patientId);
        return toProfile(patient);
    }

    @Transactional
    public PatientPortalDtos.ProfileDto updateProfile(String patientId, PatientPortalDtos.ProfileDto input) {
        Patient patient = requirePatient(patientId);

        String fullName = trimToNull(input.fullName());
        if (fullName == null) {
            throw new IllegalArgumentException("Họ và tên không được để trống.");
        }
        if (input.birthDate() != null && input.birthDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Ngày sinh không hợp lệ.");
        }

        String phone = trimToNull(input.phone());
        String email = trimToNull(input.email());

        if (email != null) {
            User existing = userRepository.findByEmail(email);
            if (existing != null && (patient.getUser() == null
                    || !Objects.equals(existing.getId(), patient.getUser().getId()))) {
                throw new IllegalArgumentException("Email đã được sử dụng bởi tài khoản khác.");
            }
        }

        patient.setFullName(fullName);
        patient.setDateOfBirth(input.birthDate());
        patient.setGender(trimToNull(input.gender()));
        patient.setPhoneNumber(phone);
        patient.setEmail(email);
        patient.setAddress(trimToNull(input.address()));
        patient.setMedicalHistory(trimToNull(input.medicalHistory()));
        patient.setBloodGroup(trimToNull(input.bloodGroup()));
        patient.setHealthInsuranceNumber(trimToNull(input.healthInsuranceNumber()));
        patientRepository.save(patient);

        User user = patient.getUser();
        if (user != null) {
            user.setFullName(fullName);
            user.setPhone(phone);
            user.setEmail(email);
            userRepository.save(user);
        }

        return toProfile(patient);
    }

    /* ------------------------------------------------------------------ */
    /* Lịch hẹn                                                           */
    /* ------------------------------------------------------------------ */

    @Transactional(readOnly = true)
    public List<PatientPortalDtos.AppointmentDto> getAppointments(String patientId) {
        requirePatient(patientId);
        return appointmentRepository.findByPatientIdAndDeletedFalse(patientId).stream()
                .sorted(Comparator
                        .comparing(Appointment::getAppointmentDate, Comparator.reverseOrder())
                        .thenComparing(Appointment::getAppointmentTime, Comparator.reverseOrder()))
                .map(this::toAppointment)
                .collect(Collectors.toList());
    }

    @Transactional
    public PatientPortalDtos.AppointmentDto cancelAppointment(String appointmentId, String patientId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .filter(a -> !Boolean.TRUE.equals(a.getDeleted()))
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy lịch hẹn: " + appointmentId));

        if (!Objects.equals(appointment.getPatientId(), patientId)) {
            throw new IllegalArgumentException("Lịch hẹn không thuộc hồ sơ bệnh nhân này.");
        }
        if (STATUS_CANCELLED.equalsIgnoreCase(appointment.getStatus())) {
            return toAppointment(appointment);
        }
        if (!"DaDat".equalsIgnoreCase(appointment.getStatus())) {
            throw new IllegalStateException(
                    "Lịch hẹn đã được tiếp đón, vui lòng liên hệ quầy lễ tân để thay đổi.");
        }

        appointment.setStatus(STATUS_CANCELLED);
        appointmentRepository.save(appointment);
        return toAppointment(appointment);
    }

    /* ------------------------------------------------------------------ */
    /* Bệnh án / đơn thuốc / hóa đơn                                      */
    /* ------------------------------------------------------------------ */

    @Transactional(readOnly = true)
    public List<PatientPortalDtos.MedicalRecordDto> getMedicalRecords(String patientId) {
        requirePatient(patientId);

        List<Reception> receptions =
                receptionRepository.findByPatientIdAndDeletedFalseOrderByReceptionDateDesc(patientId);

        List<PatientPortalDtos.MedicalRecordDto> result = new ArrayList<>();
        for (Reception reception : receptions) {
            MedicalRecord record = medicalRecordRepository
                    .findByReceptionIdAndDeletedFalse(reception.getId())
                    .orElse(null);
            if (record == null) {
                continue; // lượt khám chưa có bệnh án (chưa hoàn tất)
            }
            Doctor doctor = findDoctor(reception.getDoctorId());
            result.add(new PatientPortalDtos.MedicalRecordDto(
                    record.getId(),
                    record.getExaminationDate(),
                    reception.getId(),
                    reception.getDoctorId(),
                    doctorName(doctor),
                    specialtyName(doctor),
                    record.getSymptoms(),
                    record.getDiagnosis(),
                    record.getNotes(),
                    toPrescription(record.getId()),
                    toInvoice(record.getId())
            ));
        }
        return result;
    }

    /* ------------------------------------------------------------------ */
    /* Helpers                                                             */
    /* ------------------------------------------------------------------ */

    private Patient requirePatient(String patientId) {
        return patientRepository.findByIdAndDeletedFalse(patientId)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy bệnh nhân: " + patientId));
    }

    private PatientPortalDtos.ProfileDto toProfile(Patient patient) {
        User user = patient.getUser();
        return new PatientPortalDtos.ProfileDto(
                patient.getId(),
                firstNonBlank(patient.getFullName(), user != null ? user.getFullName() : null),
                patient.getDateOfBirth(),
                patient.getGender(),
                firstNonBlank(patient.getPhoneNumber(), user != null ? user.getPhone() : null),
                firstNonBlank(patient.getEmail(), user != null ? user.getEmail() : null),
                patient.getAddress(),
                patient.getMedicalHistory(),
                patient.getBloodGroup(),
                patient.getHealthInsuranceNumber()
        );
    }

    private PatientPortalDtos.AppointmentDto toAppointment(Appointment appointment) {
        DoctorSchedule schedule = appointment.getScheduleId() == null
                ? null
                : scheduleRepository.findById(appointment.getScheduleId()).orElse(null);
        Doctor doctor = schedule != null ? schedule.getDoctor() : findDoctor(appointment.getDoctorId());
        String roomId = schedule != null ? schedule.getRoomId() : null;

        Reception reception = receptionRepository
                .findByAppointmentIdAndDeletedFalse(appointment.getId())
                .stream()
                .findFirst()
                .orElse(null);

        Integer queueNumber = reception != null ? reception.getQueueNumber() : null;
        String queueStatus = reception != null ? reception.getQueueStatus() : null;

        if (reception != null && reception.getRoomId() != null) {
            roomId = reception.getRoomId();
        }

        String roomName = null;
        if (roomId != null) {
            roomName = roomRepository.findById(roomId)
                    .map(Room::getRoomName)
                    .orElse(roomId);
        }

        return new PatientPortalDtos.AppointmentDto(
                appointment.getId(),
                appointment.getStatus(),
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime() != null
                        ? appointment.getAppointmentTime()
                        : (schedule != null ? schedule.getStartTime() : null),
                schedule != null ? schedule.getEndTime() : null,
                appointment.getReason(),
                appointment.getDoctorId(),
                doctorName(doctor),
                specialtyName(doctor),
                roomId,
                roomName,
                appointment.getScheduleId(),
                queueNumber,
                queueStatus
        );
    }

    private PatientPortalDtos.PrescriptionDto toPrescription(String medicalRecordId) {
        Prescription prescription = prescriptionRepository
                .findByMedicalRecordIdAndDeletedFalse(medicalRecordId)
                .orElse(null);
        if (prescription == null) {
            return null;
        }

        List<PatientPortalDtos.MedicineLineDto> medicines = new ArrayList<>();
        if (prescription.getDetails() != null) {
            for (PrescriptionDetail detail : prescription.getDetails()) {
                if (Boolean.TRUE.equals(detail.getDeleted())) {
                    continue;
                }
                Medicine medicine = detail.getMedicineId() == null
                        ? null
                        : medicineRepository.findById(detail.getMedicineId()).orElse(null);
                medicines.add(new PatientPortalDtos.MedicineLineDto(
                        detail.getMedicineId(),
                        medicine != null ? medicine.getName() : detail.getMedicineId(),
                        medicine != null ? medicine.getUnit() : null,
                        detail.getQuantity(),
                        detail.getDosage(),
                        detail.getUnitPrice(),
                        detail.getTotalPrice()
                ));
            }
        }

        return new PatientPortalDtos.PrescriptionDto(
                prescription.getId(),
                prescription.getPrescriptionDate(),
                prescription.getAdvice(),
                medicines
        );
    }

    private PatientPortalDtos.InvoiceDto toInvoice(String medicalRecordId) {
        Invoice invoice = invoiceRepository
                .findByMedicalRecordIdAndDeletedFalse(medicalRecordId)
                .orElse(null);
        if (invoice == null) {
            return null;
        }

        List<PatientPortalDtos.InvoiceLineDto> items = invoiceDetailRepository
                .findByInvoiceIdAndDeletedFalse(invoice.getId()).stream()
                .filter(d -> !Boolean.TRUE.equals(d.getDeleted()))
                .map(d -> new PatientPortalDtos.InvoiceLineDto(
                        d.getItemName(),
                        d.getItemType(),
                        d.getQuantity(),
                        d.getUnitPrice(),
                        d.getTotalPrice()
                ))
                .collect(Collectors.toList());

        return new PatientPortalDtos.InvoiceDto(
                invoice.getId(),
                invoice.getTotal(),
                invoice.getPaymentStatus(),
                invoice.getPaymentMethod(),
                invoice.getPaidAt(),
                invoice.getCreatedAt(),
                items
        );
    }

    private Doctor findDoctor(String doctorId) {
        if (doctorId == null || doctorId.isBlank()) {
            return null;
        }
        return doctorRepository.findById(doctorId).orElse(null);
    }

    private String doctorName(Doctor doctor) {
        if (doctor == null) {
            return null;
        }
        User user = doctor.getUser();
        return user != null ? user.getFullName() : null;
    }

    private String specialtyName(Doctor doctor) {
        if (doctor == null || doctor.getSpecialty() == null) {
            return null;
        }
        return doctor.getSpecialty().getName();
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private String firstNonBlank(String a, String b) {
        if (a != null && !a.isBlank()) {
            return a;
        }
        return b != null && !b.isBlank() ? b : null;
    }
}
