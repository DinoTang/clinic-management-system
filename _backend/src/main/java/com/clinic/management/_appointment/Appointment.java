package com.clinic.management._appointment;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "lichhenkham")
public class Appointment {

    @Id
    @Column(name = "MALICHHEN", length = 10)
    private String id;

    @Column(name = "MABENHNHAN", length = 10, nullable = false)
    private String patientId;

    @Column(name = "MABACSI", length = 10, nullable = false)
    private String doctorId;

    @Column(name = "MALICHTRUC", length = 10, nullable = false)
    private String scheduleId;

    @Column(name = "NGAYHEN", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "GIOHEN", nullable = false)
    private LocalTime appointmentTime;

    @Column(name = "LYDOKHAM", columnDefinition = "TEXT")
    private String reason;

    @Column(name = "NGAYTAO", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Column(name = "TRANGTHAI", length = 30)
    private String status = "DaDat";

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public Appointment() {
    }

    public Appointment(String id, String patientId, String doctorId, String scheduleId,
                       LocalDate appointmentDate, LocalTime appointmentTime,
                       String reason, LocalDateTime createdAt, String status, Boolean deleted) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.scheduleId = scheduleId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.reason = reason;
        this.createdAt = createdAt;
        this.status = status;
        this.deleted = deleted;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}