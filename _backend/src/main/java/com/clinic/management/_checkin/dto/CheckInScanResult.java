package com.clinic.management._checkin.dto;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Kết quả quét QR: vừa trả thông tin để đổ sẵn vào form tiếp đón,
 * vừa cho biết lần quét này có hợp lệ hay không.
 */
public class CheckInScanResult {

    private boolean ok;
    private String result;
    private String message;
    private boolean alreadyCheckedIn;
    private String logId;

    private String appointmentId;
    private String appointmentStatus;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String reason;
    private String scheduleId;

    private String patientId;
    private String patientName;
    private String patientPhone;

    private String doctorId;
    private String doctorName;

    private String roomId;

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isAlreadyCheckedIn() {
        return alreadyCheckedIn;
    }

    public void setAlreadyCheckedIn(boolean alreadyCheckedIn) {
        this.alreadyCheckedIn = alreadyCheckedIn;
    }

    public String getLogId() {
        return logId;
    }

    public void setLogId(String logId) {
        this.logId = logId;
    }

    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getAppointmentStatus() {
        return appointmentStatus;
    }

    public void setAppointmentStatus(String appointmentStatus) {
        this.appointmentStatus = appointmentStatus;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPatientPhone() {
        return patientPhone;
    }

    public void setPatientPhone(String patientPhone) {
        this.patientPhone = patientPhone;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}
