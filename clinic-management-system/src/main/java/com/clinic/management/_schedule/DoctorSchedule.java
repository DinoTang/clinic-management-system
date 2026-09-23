package com.clinic.management._schedule;

import com.clinic.management._doctor.Doctor;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "LICHTRUCBACSI")
public class DoctorSchedule {

    @Id
    @Column(name = "MALICHTRUC", length = 20)
    private String id;

    @ManyToOne
    @JoinColumn(name = "MABACSI", referencedColumnName = "MABACSI")
    private Doctor doctor;

    @Column(name = "MAPHONG", length = 20)
    private String roomId;

    @Column(name = "NGAYKHAM")
    private LocalDate examinationDate;

    @Column(name = "GIOBATDAU")
    private LocalTime startTime;

    @Column(name = "GIOKETTHUC")
    private LocalTime endTime;

    @Column(name = "SOLUONGTOIDA")
    private Integer maxPatients;

    @Column(name = "TRANGTHAI", length = 20)
    private String status;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public DoctorSchedule() {
    }

    public DoctorSchedule(String id, Doctor doctor, String roomId, LocalDate examinationDate,
                          LocalTime startTime, LocalTime endTime, Integer maxPatients, String status, Boolean deleted) {
        this.id = id;
        this.doctor = doctor;
        this.roomId = roomId;
        this.examinationDate = examinationDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxPatients = maxPatients;
        this.status = status;
        this.deleted = deleted;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public LocalDate getExaminationDate() {
        return examinationDate;
    }

    public void setExaminationDate(LocalDate examinationDate) {
        this.examinationDate = examinationDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public Integer getMaxPatients() {
        return maxPatients;
    }

    public void setMaxPatients(Integer maxPatients) {
        this.maxPatients = maxPatients;
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