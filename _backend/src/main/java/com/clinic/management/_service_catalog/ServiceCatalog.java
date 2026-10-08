package com.clinic.management._service_catalog;

import jakarta.persistence.*;
import java.math.BigDecimal;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSpecialtyId() {
        return specialtyId;
    }

    public void setSpecialtyId(String specialtyId) {
        this.specialtyId = specialtyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
