package com.clinic.management._prescription;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "CHITIETDONTHUOC")
public class PrescriptionDetail {

    @Id
    @Column(name = "MACHITIETDONTHUOC", length = 20)
    private String id;

    @ManyToOne
    @JoinColumn(name = "MADONTHUOC", referencedColumnName = "MADONTHUOC")
    @JsonIgnore
    private Prescription prescription;

    @Column(name = "MATHUOC", length = 20)
    private String medicineId;

    @Column(name = "SOLUONG")
    private Integer quantity;

    @Column(name = "DONGIA", precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "LIEUDUNG", length = 100)
    private String dosage;

    @Column(name = "THANHTIEN", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public PrescriptionDetail() {
    }

    public PrescriptionDetail(String id, Prescription prescription, String medicineId,
                              Integer quantity, BigDecimal unitPrice, String dosage,
                              BigDecimal totalPrice, Boolean deleted) {
        this.id = id;
        this.prescription = prescription;
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.dosage = dosage;
        this.totalPrice = totalPrice;
        this.deleted = deleted;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

    public String getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(String medicineId) {
        this.medicineId = medicineId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}