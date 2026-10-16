package com.clinic.management._medical_record;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;

@Data
@Entity
@Table(name = "benhan")
public class MedicalRecord {

    @Id
    @Column(name = "MABENHAN", length = 20)
    private String id;

    @Column(name = "MATIEPDON", length = 20, nullable = false)
    private String receptionId;

    @Column(name = "CHUANDOAN", columnDefinition = "TEXT")
    private String diagnosis;

    @Column(name = "TRIEUCHUNG", columnDefinition = "TEXT")
    private String symptoms;

    @Column(name = "TOANTHAN", columnDefinition = "TEXT")
    private String generalExam;

    @Column(name = "TAICHUA", columnDefinition = "TEXT")
    private String localExam;

    @Column(name = "LOIDAN", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "TIENLUONG", columnDefinition = "TEXT")
    private String prognosis;

    @Column(name = "NGAYKHAM", nullable = false)
    private LocalDate examinationDate;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public MedicalRecord() {
    }
}
