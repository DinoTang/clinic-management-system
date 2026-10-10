package com.clinic.management._billing;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "chitiethoadon")
public class InvoiceDetail {

    @Id
    @Column(name = "MACHITIETHOADON", length = 20)
    private String id;

    @Column(name = "MAHOADON", length = 20, nullable = false)
    private String invoiceId;

    /** PhiKham / DichVu / Thuoc */
    @Column(name = "LOAIMUCTHU", length = 20)
    private String itemType;

    @Column(name = "MAMUCTHU", length = 20)
    private String itemId;

    @Column(name = "TENMUCTHU", length = 150, nullable = false)
    private String itemName;

    @Column(name = "SOLUONG", nullable = false)
    private Integer quantity = 1;

    @Column(name = "DONGIA", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "THANHTIEN", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String note;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public InvoiceDetail() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
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

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
