package com.clinic.management._billing;

import com.clinic.management.common.enums.PaymentMethod;
import com.clinic.management.common.enums.PaymentMethodConverter;
import com.clinic.management.common.enums.PaymentStatus;
import com.clinic.management.common.enums.PaymentStatusConverter;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @Builder.Default
    @Column(name = "TIENKHACHDUA")
    private BigDecimal amountGiven = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "TIENTHOILAI")
    private BigDecimal changeAmount = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "TONGTIEN", nullable = false)
    private BigDecimal total = BigDecimal.ZERO;

    @Convert(converter = PaymentMethodConverter.class)
    @Column(name = "PHUONGTHUCTHANHTOAN", length = 20)
    private PaymentMethod paymentMethod;

    @Builder.Default
    @Convert(converter = PaymentStatusConverter.class)
    @Column(name = "TRANGTHAITHANHTOAN", length = 20)
    private PaymentStatus paymentStatus = PaymentStatus.UNPAID;

    @Column(name = "THOIGIANTHANHTOAN")
    private LocalDateTime paidAt;

    @Column(name = "NGAYTAO")
    private LocalDateTime createdAt;

    @Builder.Default
    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    /** Chi tiết hóa đơn — chỉ nạp khi xem chi tiết, không lưu ở bảng hoadon. */
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<InvoiceDetail> details;
}
