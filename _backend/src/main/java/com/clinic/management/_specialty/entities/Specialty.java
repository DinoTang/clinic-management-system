package com.clinic.management._specialty.entities;

import com.clinic.management.common.enums.SpecialtyStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "chuyenkhoa")
public class Specialty {

    @Id
    @Column(name = "MACHUYENKHOA", length = 20)
    private String id;

    @Column(name = "TENCHUYENKHOA", nullable = false, length = 100)
    private String name;

    @Column(name = "MOTA", columnDefinition = "TEXT")
    private String description;

    @Column(name = "PHIKHAMCHUAN", precision = 12, scale = 2)
    private BigDecimal standardFee;

    @Column(name = "TRANGTHAI", columnDefinition = "bit")
    private SpecialtyStatus status;

    @Column(name = "TRANGTHAIXOA")
    private boolean deleted;

    @Column(name = "NGAYTAO", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    public Specialty() {
    }

    public Specialty(
        String name,
        String description,
        BigDecimal standardFee
    ) {
        this.name = name;
        this.description = description;
        this.standardFee = standardFee;
        this.status = SpecialtyStatus.ACTIVE;
        this.deleted = false;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {return id;}
    public void setId(String id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public BigDecimal getStandardFee() {return standardFee;}
    public void setStandardFee(BigDecimal standardFee) {this.standardFee = standardFee;}

    public SpecialtyStatus getStatus() {return status;}
    public void setStatus(SpecialtyStatus status) {this.status = status;}

    public boolean getDeleted() {return deleted;}
    public void setDeleted(boolean deleted) {this.deleted = deleted;}

    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}
}