package com.clinic.management._specialty.entities;

import com.clinic.management.common.enums.SpecialtyStatus;
import com.clinic.management.common.enums.SpecialtyStatusConverter;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
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

    @Convert(converter = SpecialtyStatusConverter.class)
    @Column(name = "TRANGTHAI", length = 20, nullable = false)
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
}
