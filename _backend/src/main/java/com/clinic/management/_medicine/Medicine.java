package com.clinic.management._medicine;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Data;

@Data
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
}
