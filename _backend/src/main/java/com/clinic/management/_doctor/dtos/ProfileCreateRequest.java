package com.clinic.management._doctor.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProfileCreateRequest {

    @NotBlank(message="Mã tài khoản không được để trống")
    private String userId;

    @NotBlank(message="Mã chuyên khoa không được để trống")    
    private String specialtyId;

    private String academicDegree;

    @NotNull(message="Số năm kinh nghiệm không được để trống") 
    @Min(value = 0, message = "Số năm kinh nghiệm không được là số âm")
    private Integer experienceYears; 

    private String bio;
    private BigDecimal examinationFee;

    public ProfileCreateRequest() {}
    
    public ProfileCreateRequest(
        String userId,
        String specialtyId,
        String academicDegree,
        Integer experienceYears,
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
