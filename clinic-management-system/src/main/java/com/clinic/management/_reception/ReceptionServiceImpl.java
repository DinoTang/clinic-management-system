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
                .filter(r -> !r.getDeleted())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lượt tiếp đón: " + id));
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
        // 1. Chuẩn hóa appointmentId
        if (reception.getAppointmentId() == null
                || reception.getAppointmentId().trim().isEmpty()
                || "null".equalsIgnoreCase(reception.getAppointmentId().trim())) {
            reception.setAppointmentId(null);
        }

        // 2. Chuẩn hóa employeeId
        if (reception.getEmployeeId() != null && reception.getEmployeeId().trim().isEmpty()) {
            reception.setEmployeeId(null);
        }

        // 3. Tự động lưu thông tin Bệnh nhân vãng lai nếu chưa tồn tại trong CSDL
        if (reception.getPatientId() != null && !patientRepository.existsById(reception.getPatientId())) {
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
            newPatient.setUserId(null);
            newPatient.setDeleted(false);
            patientRepository.save(newPatient);
        }

        // 4. Sinh mã tiếp đón TDxxx nếu chưa có
        if (reception.getId() == null || reception.getId().isBlank()) {
            reception.setId(generateNextReceptionId());
        }

        // 5. Ngày tiếp đón
        if (reception.getReceptionDate() == null) {
            reception.setReceptionDate(LocalDate.now());
        }

        // 6. Cấp STT tăng dần theo ngày & theo phòng (đã đổi tên gọi phương thức)
        if (reception.getQueueNumber() == null || reception.getQueueNumber() <= 0) {
            Integer maxQueue = receptionRepository.findMaxQueue(
                    reception.getRoomId(), reception.getReceptionDate()
            );
            int currentMax = (maxQueue != null) ? maxQueue : 0;
            reception.setQueueNumber(currentMax + 1);
        }

        // 7. Trạng thái mặc định
        if (reception.getQueueStatus() == null || reception.getQueueStatus().isBlank()) {
            reception.setQueueStatus("ChoKham");
        }

        reception.setDeleted(false);
        Reception saved = receptionRepository.save(reception);

        // 8. Cập nhật lịch hẹn nếu có
        if (reception.getAppointmentId() != null) {
            appointmentRepository.findById(reception.getAppointmentId()).ifPresent(app -> {
                app.setStatus("DaDen");
                appointmentRepository.save(app);
            });
        }

        return saved;
    }

    @Override
    @Transactional
    public Reception updateReception(String id, Reception reception) {
        Reception existing = receptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lượt tiếp đón với mã: " + id));

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
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lượt tiếp đón: " + id));
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
        // Đã đổi sang findMaxId()
        String maxId = receptionRepository.findMaxId();
        int nextNum = 1;
        if (maxId != null && maxId.startsWith("TD")) {
            try {
                nextNum = Integer.parseInt(maxId.substring(2)) + 1;
            } catch (NumberFormatException ignored) {}
        }
        return String.format("TD%03d", nextNum);
    }
}