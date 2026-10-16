package com.clinic.management._service_assignment;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity
@Table(name = "CHIDINHDICHVU")
public class ServiceAssignment {

    @Id
    @Column(name = "MACHIDINH", length = 20)
    private String id;

    @Column(name = "MABENHAN", length = 20)
    private String medicalRecordId;

    @Column(name = "MADICHVU", length = 20)
    private String serviceId;

    @Column(name = "SOLUONG")
    private Integer quantity;

    @Column(name = "DONGIA", precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "TRANGTHAI", length = 20)
    private String status;

    @Column(name = "KETQUA", columnDefinition = "TEXT")
    private String result;

    @Column(name = "FILEKETQUA", length = 255)
    private String resultFile;

    @Column(name = "THOIGIANCHIDINH")
    private LocalDateTime assignedTime;

    @Column(name = "THOIGIANKETQUA")
    private LocalDateTime resultTime;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public ServiceAssignment() {
    }

    public ServiceAssignment(String id, String medicalRecordId, String serviceId, Integer quantity,
                             BigDecimal unitPrice, String status, String result, String resultFile,
                             LocalDateTime assignedTime, LocalDateTime resultTime, Boolean deleted) {
        this.id = id;
        this.medicalRecordId = medicalRecordId;
        this.serviceId = serviceId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.status = status;
        this.result = result;
        this.resultFile = resultFile;
        this.assignedTime = assignedTime;
        this.resultTime = resultTime;
        this.deleted = deleted;
    }

}