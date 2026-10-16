package com.clinic.management._service_catalog;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Data;

@Data
@Entity
@Table(name = "dichvu")
public class ServiceCatalog {

    @Id
    @Column(name = "MADICHVU", length = 20)
    private String id;

    @Column(name = "MACHUYENKHOA", length = 20)
    private String specialtyId;

    @Column(name = "TENDICHVU", length = 150, nullable = false)
    private String name;

    @Column(name = "DONGIA", precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "DONVITINH", length = 20)
    private String unit;

    @Column(name = "MOTA", columnDefinition = "TEXT")
    private String description;

    @Column(name = "TRANGTHAI")
    private Boolean active = true;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public ServiceCatalog() {
    }

}
