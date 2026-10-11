package com.clinic.management._checkin;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Lưu vết mỗi lần quét QR / tra cứu lịch hẹn tại quầy tiếp đón (bảng lichsucheckin).
 * Một dòng = một lần quét, kèm kết quả xử lý để tra soát về sau.
 */
@Entity
@Table(name = "lichsucheckin")
public class CheckInLog {

    /** Quét hợp lệ, lịch hẹn chưa được tiếp đón. */
    public static final String RESULT_SUCCESS = "ThanhCong";
    /** Quét lại lịch đã được tiếp đón trước đó (lichhenkham.TRANGTHAI = DaDen). */
    public static final String RESULT_ALREADY_CHECKED_IN = "DaCheckIn";
    /** Lịch hẹn đã bị huỷ, không được tiếp đón. */
    public static final String RESULT_CANCELLED = "DaHuy";
    /** Mã QR không khớp lịch hẹn nào. */
    public static final String RESULT_NOT_FOUND = "KhongTimThay";

    @Id
    @Column(name = "MALICHSU", length = 20)
    private String id;

    @Column(name = "MALICHHEN", length = 20, nullable = false)
    private String appointmentId;

    @Column(name = "MABENHNHAN", length = 20)
    private String patientId;

    @Column(name = "MATIEPDON", length = 20)
    private String receptionId;

    @Column(name = "MANHANVIEN", length = 20)
    private String employeeId;

    @Column(name = "PHUONGTHUC", length = 20, nullable = false)
    private String method = "QR";

    @Column(name = "KETQUA", length = 30, nullable = false)
    private String result;

    @Column(name = "GHICHU", length = 255)
    private String note;

    @Column(name = "THOIGIANQUET", nullable = false)
    private LocalDateTime scannedAt = LocalDateTime.now();

    public CheckInLog() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getReceptionId() {
        return receptionId;
    }

    public void setReceptionId(String receptionId) {
        this.receptionId = receptionId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDateTime getScannedAt() {
        return scannedAt;
    }

    public void setScannedAt(LocalDateTime scannedAt) {
        this.scannedAt = scannedAt;
    }
}
