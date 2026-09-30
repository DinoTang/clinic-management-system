package com.clinic.management._appointment;

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

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
                                  DoctorScheduleRepository scheduleRepository) {
        this.appointmentRepository = appointmentRepository;
        this.scheduleRepository = scheduleRepository;
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
        // 1. Kiểm tra tồn tại của Lịch trực
        DoctorSchedule schedule = scheduleRepository.findById(appointment.getScheduleId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy thông tin ca trực: " + appointment.getScheduleId()));

        if (Boolean.TRUE.equals(schedule.getDeleted())) {
            throw new IllegalStateException("Ca trực này hiện không còn khả dụng!");
        }

        // 2. Chống đặt trùng: Cùng 1 bệnh nhân không được đặt 2 lần trong 1 ca trực
        boolean alreadyBooked = appointmentRepository.existsByPatientIdAndScheduleIdAndDeletedFalseAndStatusNot(
                appointment.getPatientId(), appointment.getScheduleId(), "DaHuy"
        );
        if (alreadyBooked) {
            throw new IllegalStateException("Bệnh nhân này đã có lịch hẹn trong ca trực hiện tại!");
        }

        // 3. Kiểm tra số lượng bệnh nhân tối đa
        long currentBookings = appointmentRepository.countActiveAppointmentsByScheduleId(appointment.getScheduleId());
        if (schedule.getMaxPatients() != null && currentBookings >= schedule.getMaxPatients()) {
            // Tự động đóng ca trực nếu đã đủ số lượng
            schedule.setStatus("DaDay");
            scheduleRepository.save(schedule);
            throw new IllegalStateException("Ca khám này đã đủ số lượng bệnh nhân (Tối đa: " + schedule.getMaxPatients() + " BN)!");
        }

        // 4. Thiết lập thông tin và lưu lịch hẹn
        if (appointment.getId() == null || appointment.getId().isBlank()) {
            appointment.setId(generateNextAppointmentId());
        }
        appointment.setDeleted(false);
        if (appointment.getStatus() == null || appointment.getStatus().isBlank()) {
            appointment.setStatus("DaDat");
        }

        Appointment savedAppointment = appointmentRepository.save(appointment);

        // 5. Nếu lượt đặt này làm ca trực vừa tròn số lượng tối đa -> cập nhật trạng thái ca trực sang DaDay
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
}