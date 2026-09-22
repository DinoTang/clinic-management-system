package com.clinic.management._prescription;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "DONTHUOC")
public class Prescription {

    @Id
    @Column(name = "MADONTHUOC", length = 20)
    private String id;

    @Column(name = "MABENHAN", length = 20)
    private String medicalRecordId;

    @Column(name = "NGAYKEDON")
    private LocalDate prescriptionDate;

    @Column(name = "LOIDAN", columnDefinition = "TEXT")
    private String advice;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL)
    private List<PrescriptionDetail> details;

    public Prescription() {
    }

    public Prescription(String id, String medicalRecordId, LocalDate prescriptionDate,
                        String advice, Boolean deleted, List<PrescriptionDetail> details) {
        this.id = id;
        this.medicalRecordId = medicalRecordId;
        this.prescriptionDate = prescriptionDate;
        this.advice = advice;
        this.deleted = deleted;
        this.details = details;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMedicalRecordId() {
        return medicalRecordId;
    }

    public void setMedicalRecordId(String medicalRecordId) {
        this.medicalRecordId = medicalRecordId;
    }

    public LocalDate getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(LocalDate prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public List<PrescriptionDetail> getDetails() {
        return details;
    }

    public void setDetails(List<PrescriptionDetail> details) {
        this.details = details;
    }
}