package com.clinic.management._specialty.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProfileCreateRequest {

    @NotBlank(message="Tên chuyên khoa không được để trống")
    private String name;
    private String description;

    @NotBlank(message="Phí khám chuẩn không được để trống")
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

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public BigDecimal getStandardFee() {return standardFee;}
    public void setStandardFee(BigDecimal standardFee) {this.standardFee = standardFee;}
}