package com.clinic.management._schedule;

import com.clinic.management._doctor.entities.Doctor;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

@Data
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
}