package com.clinic.management._medicine;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "thuoc")
public class Medicine {

    @Id
    @Column(name = "MATHUOC", length = 20)
    private String id;

    @Column(name = "TENTHUOC", length = 150, nullable = false)
    private String name;

    @Column(name = "HOATCHAT", length = 150)
    private String activeIngredient;

    @Column(name = "DONVITINH", length = 20)
    private String unit;

    @Column(name = "DONGIA", precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "SOLUONGTON")
    private Integer stock;

    @Column(name = "HUONGDANDUNG", length = 255)
    private String usage;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public Medicine() {
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

    public String getActiveIngredient() {
        return activeIngredient;
    }

    public void setActiveIngredient(String activeIngredient) {
        this.activeIngredient = activeIngredient;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getUsage() {
        return usage;
    }

    public void setUsage(String usage) {
        this.usage = usage;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
