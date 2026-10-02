package com.clinic.management._doctor.dtos;

import jakarta.persistence.*;
import java.math.BigDecimal;


public class ProfileCreateRequest {

    private String userId;
    private String specialtyId;
    private String academicDegree;
    private int experienceYears;
    private String bio;
    private BigDecimal examinationFee;

    public ProfileCreateRequest() {}
    public ProfileCreateRequest(
        String userId,
        String specialtyId,
        String academicDegree,
        int experienceYears,
        String bio,
        BigDecimal examinationFee
    ) {
        this.userId = userId;
        this.specialtyId = specialtyId;
        this.academicDegree = academicDegree;
        this.experienceYears = experienceYears;
        this.bio = bio;
        this.examinationFee = examinationFee;
    }


    public String getUserId() {return userId;}
    public void setUserId(String userId) {this.userId = userId;}

    public String getSpecialtyId() {return specialtyId;}
    public void setSpecialtyId(String specialtyId) {this.specialtyId = specialtyId;}

    public String getAcademicDegree() {return academicDegree;}
    public void setAcademicDegree(String academicDegree) {this.academicDegree = academicDegree;}

    public int getExperienceYears() {return experienceYears;}
    public void setExperienceYears(int experienceYears) {this.experienceYears = experienceYears;}

    public String getBio() {return bio;}
    public void setBio(String bio) {this.bio = bio;}

    public BigDecimal getExaminationFee() {return examinationFee;}
    public void setExaminationFee(BigDecimal examinationFee) {this.examinationFee = examinationFee;}
}