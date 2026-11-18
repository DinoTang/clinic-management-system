package com.clinic.management._schedule;

import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._room.entities.Room; 
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

@Data
@Entity
@Table(name = "lichtrucbacsi")
public class DoctorSchedule {

    @Id
    @Column(name = "MALICHTRUC", length = 20)
    private String id;

    @ManyToOne
    @JoinColumn(name = "MABACSI", referencedColumnName = "MABACSI")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "MAPHONG", referencedColumnName = "MAPHONG")
    private Room room;

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

    public DoctorSchedule(String id, Doctor doctor, Room room, LocalDate examinationDate,
                          LocalTime startTime, LocalTime endTime, Integer maxPatients, String status, Boolean deleted) {
        this.id = id;
        this.doctor = doctor;
        this.room = room;
        this.examinationDate = examinationDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxPatients = maxPatients;
        this.status = status;
        this.deleted = deleted;
    }
}
