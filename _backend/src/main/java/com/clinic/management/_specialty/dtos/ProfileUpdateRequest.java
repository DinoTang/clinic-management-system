package com.clinic.management._specialty.dtos;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ProfileUpdateRequest {

    private String name;
    private String description;
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