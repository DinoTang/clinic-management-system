package com.clinic.management._specialty.dtos;

import jakarta.persistence.*;
import java.math.BigDecimal;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ProfileUpdateRequest {

    @NotBlank(message="Mã chuyên khoa không được để trống")
    private String specialtyId;

    private String name;
    private String description;

    @NotNull(message = "Phí khám chuẩn không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Phí khám chuẩn phải lớn hơn hoặc bằng 0")
    @Digits(integer = 12, fraction = 2, message = "Phí khám chuẩn không hợp lệ (tối đa 12 chữ số phần nguyên và 2 chữ số thập phân)")
    private BigDecimal standardFee;

    public ProfileUpdateRequest() {}

    public ProfileUpdateRequest(
        String name,
        String description,
        BigDecimal standardFee
    ) {
        this.name = name;
        this.description = description;
        this.standardFee = standardFee;
    }

}