package com.clinic.management._medical_record;

import jakarta.persistence.*;
import java.time.LocalDate;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReceptionId() {
        return receptionId;
    }

    public void setReceptionId(String receptionId) {
        this.receptionId = receptionId;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getGeneralExam() {
        return generalExam;
    }

    public void setGeneralExam(String generalExam) {
        this.generalExam = generalExam;
    }

    public String getLocalExam() {
        return localExam;
    }

    public void setLocalExam(String localExam) {
        this.localExam = localExam;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPrognosis() {
        return prognosis;
    }

    public void setPrognosis(String prognosis) {
        this.prognosis = prognosis;
    }

    public LocalDate getExaminationDate() {
        return examinationDate;
    }

    public void setExaminationDate(LocalDate examinationDate) {
        this.examinationDate = examinationDate;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
