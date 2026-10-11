package com.clinic.management._billing;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "hoadon")
public class Invoice {

    @Id
    @Column(name = "MAHOADON", length = 20)
    private String id;

    @Column(name = "MABENHAN", length = 20, nullable = false)
    private String medicalRecordId;

    @Column(name = "MANHANVIEN", length = 20, nullable = false)
    private String staffId;

    @Column(name = "TIENKHACHDUA")
    private BigDecimal amountGiven = BigDecimal.ZERO;

    @Column(name = "TIENTHOILAI")
    private BigDecimal changeAmount = BigDecimal.ZERO;

    @Column(name = "TONGTIEN", nullable = false)
    private BigDecimal total = BigDecimal.ZERO;

    @Column(name = "PHUONGTHUCTHANHTOAN", length = 20)
    private String paymentMethod;

    /** DB values: ChuaThanhToan / DaThanhToan (docs: UNPAID / PAID). */
    @Column(name = "TRANGTHAITHANHTOAN", length = 20)
    private String paymentStatus = "ChuaThanhToan";

    @Column(name = "THOIGIANTHANHTOAN")
    private LocalDateTime paidAt;

    @Column(name = "NGAYTAO")
    private LocalDateTime createdAt;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    /** Chi tiết hóa đơn — chỉ nạp khi xem chi tiết, không lưu ở bảng hoadon. */
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<InvoiceDetail> details;

    public Invoice() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMedicalRecordId() {
        return medicalRecordId;
    }

    public void setMedicalRecordId(String medicalRecordId) {
        this.medicalRecordId = medicalRecordId;
    }

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public BigDecimal getAmountGiven() {
        return amountGiven;
    }

    public void setAmountGiven(BigDecimal amountGiven) {
        this.amountGiven = amountGiven;
    }

    public BigDecimal getChangeAmount() {
        return changeAmount;
    }

    public void setChangeAmount(BigDecimal changeAmount) {
        this.changeAmount = changeAmount;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(LocalDateTime paidAt) {
        this.paidAt = paidAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public List<InvoiceDetail> getDetails() {
        return details;
    }

    public void setDetails(List<InvoiceDetail> details) {
        this.details = details;
    }
}
