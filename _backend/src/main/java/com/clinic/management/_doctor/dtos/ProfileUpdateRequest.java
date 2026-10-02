package com.clinic.management._doctor.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.*;
import java.math.BigDecimal;


public class ProfileUpdateRequest {

    @NotBlank(message="Mã chuyên khoa không được để trống")
    private String specialtyId;
    private String academicDegree;
    private int experienceYears;
    private String bio;
    private BigDecimal examinationFee;

    public ProfileUpdateRequest() {}
    public ProfileUpdateRequest(
        String specialtyId,
        String academicDegree,
        int experienceYears,
        String bio,
        BigDecimal examinationFee
    ) {
        this.specialtyId = specialtyId;
        this.academicDegree = academicDegree;
        this.experienceYears = experienceYears;
        this.bio = bio;
        this.examinationFee = examinationFee;
    }

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