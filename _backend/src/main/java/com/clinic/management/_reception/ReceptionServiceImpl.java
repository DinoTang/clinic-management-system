package com.clinic.management._reception;

import com.clinic.management._appointment.AppointmentRepository;
import com.clinic.management._patient.Patient;
import com.clinic.management._patient.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReceptionServiceImpl implements ReceptionService {

    private final ReceptionRepository receptionRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    public ReceptionServiceImpl(ReceptionRepository receptionRepository,
                                PatientRepository patientRepository,
                                AppointmentRepository appointmentRepository) {
        this.receptionRepository = receptionRepository;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<Reception> getAllReceptions() {
        return receptionRepository.findByDeletedFalse();
    }

    @Override
    public Reception getReceptionById(String id) {
        return receptionRepository.findById(id)
                .filter(r -> !Boolean.TRUE.equals(r.getDeleted()))
                .orElse(null);
    }

    @Override
    public List<Reception> getReceptionsByDate(LocalDate date) {
        return receptionRepository.findByDate(date);
    }

    @Override
    public List<Reception> getQueueByRoomAndDate(String roomId, LocalDate date) {
        return receptionRepository.findByRoomAndDate(roomId, date);
    }

    @Override
    public List<Reception> getQueueByDoctorAndDate(String doctorId, LocalDate date) {
        return receptionRepository.findByDoctorAndDate(doctorId, date);
    }

    @Override
    @Transactional
    public Reception createReception(Reception reception) {
        if (reception == null) {
            throw new IllegalArgumentException("Thông tin tiếp đón không được để trống");
        }
        if (reception.getPatientId() == null || reception.getPatientId().isBlank()) {
            reception.setPatientId(generateNextPatientId());
        }
        requireValue(reception.getEmployeeId(), "Mã nhân viên không được để trống");
        requireValue(reception.getRoomId(), "Mã phòng không được để trống");
        requireValue(reception.getDoctorId(), "Mã bác sĩ không được để trống");

        if (reception.getAppointmentId() == null
                || reception.getAppointmentId().trim().isEmpty()
                || "null".equalsIgnoreCase(reception.getAppointmentId().trim())) {
            reception.setAppointmentId(null);
        }

        if (patientRepository.findByIdAndDeletedFalse(reception.getPatientId()).isEmpty()) {
            if (patientRepository.existsById(reception.getPatientId())) {
                throw new IllegalArgumentException("Bệnh nhân đã bị xóa: " + reception.getPatientId());
            }
            Patient newPatient = new Patient();
            newPatient.setId(reception.getPatientId());
            newPatient.setFullName(
                    (reception.getPatientName() != null && !reception.getPatientName().isBlank())
                            ? reception.getPatientName()
                            : "Bệnh nhân " + reception.getPatientId()
            );
            newPatient.setPhoneNumber(reception.getPatientPhone());
            newPatient.setGender(reception.getPatientGender());
            newPatient.setDateOfBirth(reception.getPatientDob());
            newPatient.setAddress(reception.getPatientAddress());
            newPatient.setUser(null);
            newPatient.setDeleted(false);
            patientRepository.save(newPatient);
        }

        if (reception.getId() == null || reception.getId().isBlank()) {
            reception.setId(generateNextReceptionId());
        }

        if (reception.getReceptionDate() == null) {
            reception.setReceptionDate(LocalDate.now());
        }

        if (reception.getQueueNumber() == null || reception.getQueueNumber() <= 0) {
            Integer maxQueue = receptionRepository.findMaxQueue(
                    reception.getRoomId(), reception.getReceptionDate()
            );
            int currentMax = (maxQueue != null) ? maxQueue : 0;
            reception.setQueueNumber(currentMax + 1);
        }

        if (reception.getQueueStatus() == null || reception.getQueueStatus().isBlank()) {
            reception.setQueueStatus("ChoKham");
        }

        reception.setDeleted(false);
        if (reception.getAppointmentId() != null) {
            var appointment = appointmentRepository.findById(reception.getAppointmentId())
                    .filter(a -> !Boolean.TRUE.equals(a.getDeleted()))
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Không tìm thấy lịch hẹn: " + reception.getAppointmentId()));
            appointment.setStatus("DaDen");
            appointmentRepository.save(appointment);
        }

        return receptionRepository.save(reception);
    }

    @Override
    @Transactional
    public Reception updateReception(String id, Reception reception) {
        Reception existing = receptionRepository.findById(id)
                .filter(r -> !Boolean.TRUE.equals(r.getDeleted()))
                .orElse(null);
        if (existing == null) {
            return null;
        }

        existing.setRoomId(reception.getRoomId());
        existing.setDoctorId(reception.getDoctorId());
        existing.setInitialSymptoms(reception.getInitialSymptoms());
        existing.setPulse(reception.getPulse());
        existing.setTemperature(reception.getTemperature());
        existing.setBloodPressure(reception.getBloodPressure());
        existing.setWeight(reception.getWeight());
        existing.setHeight(reception.getHeight());
        existing.setQueueStatus(reception.getQueueStatus());

        return receptionRepository.save(existing);
    }

    @Override
    @Transactional
    public Reception updateQueueStatus(String id, String status) {
        Reception reception = receptionRepository.findById(id)
                .filter(r -> !Boolean.TRUE.equals(r.getDeleted()))
                .orElse(null);
        if (reception == null) {
            return null;
        }
        reception.setQueueStatus(status);
        return receptionRepository.save(reception);
    }

    @Override
    @Transactional
    public void deleteReception(String id) {
        receptionRepository.findById(id).ifPresent(r -> {
            r.setDeleted(true);
            receptionRepository.save(r);
        });
    }

    private String generateNextReceptionId() {
        String maxId = receptionRepository.findMaxId();
        int nextNum = maxId == null ? 1 : Integer.parseInt(maxId.substring(2)) + 1;
        return String.format("TD%03d", nextNum);
    }

    private String generateNextPatientId() {
        String maxId = patientRepository.findMaxPatientId();
        int nextNum = maxId == null ? 1 : Integer.parseInt(maxId.substring(2)) + 1;
        return String.format("BN%03d", nextNum);
    }

    private void requireValue(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(message);
        }
    }
}