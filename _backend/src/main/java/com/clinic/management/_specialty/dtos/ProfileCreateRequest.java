package com.clinic.management._specialty.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ProfileCreateRequest {

    @NotBlank(message="Tên chuyên khoa không được để trống")
    private String name;
    private String description;

    @NotNull(message = "Phí khám chuẩn không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Phí khám chuẩn phải lớn hơn hoặc bằng 0")
    @Digits(integer = 12, fraction = 2, message = "Phí khám chuẩn không hợp lệ (tối đa 12 chữ số phần nguyên và 2 chữ số thập phân)")
    private BigDecimal standardFee;

    public ProfileCreateRequest() {}

    public ProfileCreateRequest(
        String name,
        String description,
        BigDecimal standardFee
    ) {
        this.name = name;
        this.description = description;
        this.standardFee = standardFee;
    }
}