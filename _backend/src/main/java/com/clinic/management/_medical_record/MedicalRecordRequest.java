package com.clinic.management._medical_record;

import java.time.LocalDate;
import lombok.Data;

@Data
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
}
