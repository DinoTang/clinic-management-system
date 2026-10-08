package com.clinic.management._medical_record;

import java.time.LocalDate;

/**
 * Payload POST /api/medical-records từ trang khám của bác sĩ.
 */
public class MedicalRecordRequest {

    private String recordId;
    private String receptionId;
    private String patientId;
    private String doctorId;
    private String symptoms;
    private String generalExam;
    private String localExam;
    private String diagnosis;
    private String prognosis;
    private String notes;
    private LocalDate examinationDate;

    public MedicalRecordRequest() {
    }

    public String getRecordId() {
        return recordId;
    }

    public void setRecordId(String recordId) {
        this.recordId = recordId;
    }

    public String getReceptionId() {
        return receptionId;
    }

    public void setReceptionId(String receptionId) {
        this.receptionId = receptionId;
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

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getPrognosis() {
        return prognosis;
    }

    public void setPrognosis(String prognosis) {
        this.prognosis = prognosis;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDate getExaminationDate() {
        return examinationDate;
    }

    public void setExaminationDate(LocalDate examinationDate) {
        this.examinationDate = examinationDate;
    }
}
