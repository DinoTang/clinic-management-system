package com.clinic.management._doctor.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProfileCreateRequest {

    @NotBlank(message="Mã tài khoản không được để trống")
    private String userId;

    @NotBlank(message="Mã chuyên khoa không được để trống")    
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

}