package com.clinic.management._billing;

import com.clinic.management.common.enums.InvoiceItemType;
import com.clinic.management.common.enums.InvoiceItemTypeConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chitiethoadon")
public class InvoiceDetail {

    @Id
    @Column(name = "MACHITIETHOADON", length = 20)
    private String id;

    @Column(name = "MAHOADON", length = 20, nullable = false)
    private String invoiceId;

    @Convert(converter = InvoiceItemTypeConverter.class)
    @Column(name = "LOAIMUCTHU", length = 20)
    private InvoiceItemType itemType;

    @Column(name = "MAMUCTHU", length = 20)
    private String itemId;

    @Column(name = "TENMUCTHU", length = 150, nullable = false)
    private String itemName;

    @Builder.Default
    @Column(name = "SOLUONG", nullable = false)
    private Integer quantity = 1;

    @Column(name = "DONGIA", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "THANHTIEN", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "GHICHU", columnDefinition = "TEXT")
    private String note;

    @Builder.Default
    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;
}
