package com.clinic.management._specialty;

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

    @Column(name = "TRANGTHAI")
    private Boolean status = true;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    @Column(name = "NGAYTAO", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    public Specialty() {
    }

    public Specialty(String id, String name, String description, BigDecimal standardFee, Boolean status, Boolean deleted, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.standardFee = standardFee;
        this.status = status;
        this.deleted = deleted;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getStandardFee() {
        return standardFee;
    }

    public void setStandardFee(BigDecimal standardFee) {
        this.standardFee = standardFee;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}