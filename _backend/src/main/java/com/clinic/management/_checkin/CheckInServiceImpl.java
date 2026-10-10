package com.clinic.management._checkin;

import com.clinic.management._appointment.Appointment;
import com.clinic.management._appointment.AppointmentRepository;
import com.clinic.management._checkin.dto.CheckInScanRequest;
import com.clinic.management._checkin.dto.CheckInScanResult;
import com.clinic.management._doctor.repositories.DoctorRepository;
import com.clinic.management._patient.PatientRepository;
import com.clinic.management._schedule.DoctorScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CheckInServiceImpl implements CheckInService {

    private static final String STATUS_CANCELLED = "DaHuy";
    private static final String STATUS_ARRIVED = "DaDen";
    private static final String DEFAULT_METHOD = "QR";
    private static final int APPOINTMENT_ID_MAX = 20;
    private static final int NOTE_MAX = 255;

    private final CheckInLogRepository checkInLogRepository;
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final DoctorScheduleRepository scheduleRepository;

    public CheckInServiceImpl(CheckInLogRepository checkInLogRepository,
                              AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository,
                              DoctorScheduleRepository scheduleRepository) {
        this.checkInLogRepository = checkInLogRepository;
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    @Transactional
    public CheckInScanResult scan(CheckInScanRequest request) {
        String code = extractCode(request == null ? null : request.getCode());
        if (code.isEmpty()) {
            return buildResult(false, CheckInLog.RESULT_NOT_FOUND, null, false,
                    "Mã QR không hợp lệ. Vui lòng quét lại hoặc nhập mã lịch hẹn (ví dụ LH003).");
        }

        CheckInLog log = new CheckInLog();
        log.setId(generateNextLogId());
        log.setAppointmentId(truncate(code, APPOINTMENT_ID_MAX));
        log.setEmployeeId(request.getEmployeeId());
        log.setMethod(resolveMethod(request.getMethod()));
        log.setScannedAt(LocalDateTime.now());

        Appointment appointment = appointmentRepository.findById(code).orElse(null);
        if (appointment == null || Boolean.TRUE.equals(appointment.getDeleted())) {
            return saveFailure(log, CheckInLog.RESULT_NOT_FOUND,
                    "Không tìm thấy lịch hẹn " + code + " trong hệ thống.");
        }

        log.setPatientId(appointment.getPatientId());

        if (STATUS_CANCELLED.equalsIgnoreCase(appointment.getStatus())) {
            return saveFailure(log, CheckInLog.RESULT_CANCELLED,
                    "Lịch hẹn " + code + " đã bị huỷ, không thể tiếp đón.");
        }

        boolean alreadyCheckedIn = STATUS_ARRIVED.equalsIgnoreCase(appointment.getStatus());
        log.setResult(alreadyCheckedIn ? CheckInLog.RESULT_ALREADY_CHECKED_IN : CheckInLog.RESULT_SUCCESS);
        log.setNote(alreadyCheckedIn ? "Lịch hẹn đã được tiếp đón trước đó" : null);
        checkInLogRepository.save(log);

        CheckInScanResult result = buildResult(true, log.getResult(), log.getId(), alreadyCheckedIn,
                alreadyCheckedIn
                        ? "Bệnh nhân đã được tiếp đón trước đó. Kiểm tra kỹ trước khi tạo lượt mới."
                        : "Quét thành công. Kiểm tra thông tin rồi xác nhận tiếp đón.");
        fillAppointmentInfo(result, appointment);
        return result;
    }

    @Override
    public List<CheckInLog> getLogsByDate(LocalDate date) {
        LocalDate queryDate = (date != null) ? date : LocalDate.now();
        return checkInLogRepository.findByScannedAtBetweenOrderByScannedAtDesc(
                queryDate.atStartOfDay(), queryDate.plusDays(1).atStartOfDay());
    }

    @Override
    public List<CheckInLog> getLogsByAppointment(String appointmentId) {
        if (appointmentId == null || appointmentId.isBlank()) {
            return List.of();
        }
        return checkInLogRepository.findByAppointmentIdOrderByScannedAtDesc(appointmentId.trim());
    }

    @Override
    @Transactional
    public void linkReception(String appointmentId, String receptionId) {
        if (appointmentId == null || appointmentId.isBlank() || receptionId == null || receptionId.isBlank()) {
            return;
        }
        List<CheckInLog> pending = checkInLogRepository
                .findByAppointmentIdAndReceptionIdIsNullOrderByScannedAtDesc(appointmentId.trim());
        if (pending.isEmpty()) {
            return;
        }
        pending.forEach(log -> log.setReceptionId(receptionId));
        checkInLogRepository.saveAll(pending);
    }

    private CheckInScanResult buildResult(boolean ok, String resultCode, String logId,
                                          boolean alreadyCheckedIn, String message) {
        CheckInScanResult result = new CheckInScanResult();
        result.setOk(ok);
        result.setResult(resultCode);
        result.setLogId(logId);
        result.setAlreadyCheckedIn(alreadyCheckedIn);
        result.setMessage(message);
        return result;
    }

    private CheckInScanResult saveFailure(CheckInLog log, String resultCode, String message) {
        log.setResult(resultCode);
        log.setNote(truncate(message, NOTE_MAX));
        checkInLogRepository.save(log);
        return buildResult(false, resultCode, log.getId(), false, message);
    }

    private void fillAppointmentInfo(CheckInScanResult result, Appointment appointment) {
        result.setAppointmentId(appointment.getId());
        result.setAppointmentStatus(appointment.getStatus());
        result.setAppointmentDate(appointment.getAppointmentDate());
        result.setAppointmentTime(appointment.getAppointmentTime());
        result.setReason(appointment.getReason());
        result.setScheduleId(appointment.getScheduleId());
        result.setPatientId(appointment.getPatientId());
        result.setDoctorId(appointment.getDoctorId());

        patientRepository.findByIdAndDeletedFalse(appointment.getPatientId()).ifPresent(patient -> {
            result.setPatientName(patient.getFullName());
            result.setPatientPhone(patient.getPhoneNumber());
        });

        doctorRepository.findById(appointment.getDoctorId()).ifPresent(doctor -> {
            if (doctor.getUser() != null) {
                result.setDoctorName(doctor.getUser().getFullName());
            }
        });

        if (appointment.getScheduleId() != null) {
            scheduleRepository.findById(appointment.getScheduleId())
                    .ifPresent(schedule -> result.setRoomId(schedule.getRoomId()));
        }
    }

    /**
     * QR có thể chứa mã thuần (LH003) hoặc URL có kèm mã
     * (ví dụ http://host/checkin?code=LH003). Bóc lấy mã lịch hẹn.
     */
    private String extractCode(String raw) {
        if (raw == null) {
            return "";
        }
        String value = raw.trim();
        if (value.isEmpty()) {
            return "";
        }

        int queryIndex = value.indexOf('?');
        if (queryIndex >= 0) {
            String fromQuery = extractQueryCode(value.substring(queryIndex + 1));
            if (fromQuery != null) {
                return fromQuery;
            }
            value = value.substring(0, queryIndex);
        }

        int slashIndex = value.lastIndexOf('/');
        if (slashIndex >= 0) {
            value = value.substring(slashIndex + 1);
        }
        return value.trim();
    }

    private String extractQueryCode(String query) {
        for (String pair : query.split("&")) {
            String[] parts = pair.split("=", 2);
            if (parts.length == 2
                    && ("code".equalsIgnoreCase(parts[0]) || "ma".equalsIgnoreCase(parts[0]))) {
                String decoded = decode(parts[1]).trim();
                return decoded.isEmpty() ? null : decoded;
            }
        }
        return null;
    }

    private String decode(String value) {
        try {
            return URLDecoder.decode(value, StandardCharsets.UTF_8);
        } catch (IllegalArgumentException ex) {
            return value;
        }
    }

    private String resolveMethod(String method) {
        if (method == null || method.isBlank()) {
            return DEFAULT_METHOD;
        }
        return truncate(method.trim().toUpperCase(), 20);
    }

    private synchronized String generateNextLogId() {
        String latestId = checkInLogRepository.findLatestLogId();
        int nextNumber = 1;
        if (latestId != null && latestId.startsWith("LS")) {
            try {
                nextNumber = Integer.parseInt(latestId.substring(2)) + 1;
            } catch (NumberFormatException ignored) {
                // Giữ mặc định 1 nếu mã cũ không đúng định dạng.
            }
        }
        return String.format("LS%04d", nextNumber);
    }

    private String truncate(String value, int maxLength) {
        if (value == null) {
            return null;
        }
        return value.length() <= maxLength ? value : value.substring(0, maxLength);
    }
}
