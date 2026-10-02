package com.clinic.management._specialty.dtos;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

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

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public BigDecimal getStandardFee() {return standardFee;}
    public void setStandardFee(BigDecimal standardFee) {this.standardFee = standardFee;}
}