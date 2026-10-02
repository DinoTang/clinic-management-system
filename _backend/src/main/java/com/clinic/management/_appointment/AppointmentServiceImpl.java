package com.clinic.management._appointment;

import com.clinic.management._patient.PatientRepository;
import com.clinic.management._schedule.DoctorSchedule;
import com.clinic.management._schedule.DoctorScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final PatientRepository patientRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
                                  DoctorScheduleRepository scheduleRepository,
                                  PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.scheduleRepository = scheduleRepository;
        this.patientRepository = patientRepository;
    }

    private synchronized String generateNextAppointmentId() {
        String latestId = appointmentRepository.findLatestAppointmentId();
        int nextNumber = 1;
        if (latestId != null && latestId.startsWith("LH")) {
            try {
                nextNumber = Integer.parseInt(latestId.substring(2)) + 1;
            } catch (NumberFormatException ignored) {
            }
        }
        return String.format("LH%03d", nextNumber);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findByDeletedFalse();
    }

    @Override
    public Appointment getAppointmentById(String id) {
        return appointmentRepository.findById(id)
                .filter(a -> !Boolean.TRUE.equals(a.getDeleted()))
                .orElse(null);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(String doctorId) {
        return appointmentRepository.findByDoctorIdAndDeletedFalse(doctorId);
    }

    @Override
    public List<Appointment> getAppointmentsByPatient(String patientId) {
        return appointmentRepository.findByPatientIdAndDeletedFalse(patientId);
    }

    @Override
    public List<Appointment> getAppointmentsBySchedule(String scheduleId) {
        return appointmentRepository.findByScheduleIdAndDeletedFalse(scheduleId);
    }

    @Override
    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDateAndDeletedFalse(date);
    }

    @Override
    @Transactional
    public Appointment createAppointment(Appointment appointment) {
        if (appointment == null
                || isBlank(appointment.getPatientId())
                || isBlank(appointment.getDoctorId())
                || isBlank(appointment.getScheduleId())
                || appointment.getAppointmentDate() == null
                || appointment.getAppointmentTime() == null) {
            throw new IllegalArgumentException("Bệnh nhân, bác sĩ, ca trực, ngày và giờ hẹn là bắt buộc.");
        }
        if (patientRepository.findByIdAndDeletedFalse(appointment.getPatientId()).isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy bệnh nhân: " + appointment.getPatientId());
        }

        DoctorSchedule schedule = scheduleRepository.findById(appointment.getScheduleId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy thông tin ca trực: " + appointment.getScheduleId()));

        if (Boolean.TRUE.equals(schedule.getDeleted())) {
            throw new IllegalStateException("Ca trực này hiện không còn khả dụng!");
        }
        if (schedule.getDoctor() == null
                || !appointment.getDoctorId().equals(schedule.getDoctor().getId())
                || !appointment.getAppointmentDate().equals(schedule.getExaminationDate())
                || schedule.getStartTime() == null
                || schedule.getEndTime() == null
                || appointment.getAppointmentTime().isBefore(schedule.getStartTime())
                || !appointment.getAppointmentTime().isBefore(schedule.getEndTime())) {
            throw new IllegalArgumentException("Ngày, giờ hoặc bác sĩ không khớp với ca trực đã chọn.");
        }

        boolean alreadyBooked = appointmentRepository.existsByPatientIdAndScheduleIdAndDeletedFalseAndStatusNot(
                appointment.getPatientId(), appointment.getScheduleId(), "DaHuy"
        );
        if (alreadyBooked) {
            throw new IllegalStateException("Bệnh nhân này đã có lịch hẹn trong ca trực hiện tại!");
        }

        long currentBookings = appointmentRepository.countActiveAppointmentsByScheduleId(appointment.getScheduleId());
        if (schedule.getMaxPatients() != null && currentBookings >= schedule.getMaxPatients()) {
            throw new IllegalStateException("Ca khám này đã đủ số lượng bệnh nhân (Tối đa: " + schedule.getMaxPatients() + " BN)!");
        }

        if (appointment.getId() == null || appointment.getId().isBlank()) {
            appointment.setId(generateNextAppointmentId());
        }
        appointment.setDeleted(false);
        if (appointment.getStatus() == null || appointment.getStatus().isBlank()) {
            appointment.setStatus("DaDat");
        }
        Appointment savedAppointment = appointmentRepository.save(appointment);

        if (schedule.getMaxPatients() != null && (currentBookings + 1) >= schedule.getMaxPatients()) {
            schedule.setStatus("DaDay");
            scheduleRepository.save(schedule);
        }

        return savedAppointment;
    }

    @Override
    public Appointment updateAppointment(String id, Appointment appointment) {
        Appointment existing = appointmentRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setPatientId(appointment.getPatientId());
        existing.setDoctorId(appointment.getDoctorId());
        existing.setScheduleId(appointment.getScheduleId());
        existing.setAppointmentDate(appointment.getAppointmentDate());
        existing.setAppointmentTime(appointment.getAppointmentTime());
        existing.setReason(appointment.getReason());
        existing.setStatus(appointment.getStatus());
        return appointmentRepository.save(existing);
    }

    @Override
    public void deleteAppointment(String id) {
        Appointment existing = appointmentRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setDeleted(true);
            appointmentRepository.save(existing);
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}