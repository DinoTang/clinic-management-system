package com.clinic.management._reception;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity
@Table(name = "tiepdonkham")
public class Reception {

    @Id
    @Column(name = "MATIEPDON", length = 20)
    private String id;

    @Column(name = "MABENHNHAN", length = 20, nullable = false)
    private String patientId;

    @Column(name = "MANHANVIEN", length = 20, nullable = false)
    private String employeeId;

    @Column(name = "MAPHONG", length = 20, nullable = false)
    private String roomId;

    @Column(name = "MABACSI", length = 20, nullable = false)
    private String doctorId;

    @Column(name = "MALICHHEN", length = 20)
    private String appointmentId;

    @Column(name = "NGAYTIEPDON", nullable = false)
    private LocalDate receptionDate;

    @Column(name = "SOTHUTU", nullable = false)
    private Integer queueNumber;

    @Column(name = "LOAITIEPDON", length = 20)
    private String receptionType = "TrucTiep";

    @Column(name = "TRANGTHAIHANGDOI", length = 20)
    private String queueStatus = "ChoKham";

    @Column(name = "TRIEUCHUNGBANDAU", columnDefinition = "TEXT")
    private String initialSymptoms;

    @Column(name = "MACH")
    private Integer pulse;

    @Column(name = "NHIETDO", precision = 4, scale = 1)
    private BigDecimal temperature;

    @Column(name = "HUYETAP", length = 20)
    private String bloodPressure;

    @Column(name = "CANNANG", precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "CHIEUCAO", precision = 5, scale = 2)
    private BigDecimal height;

    @Column(name = "XTHOIGIANTIEPDON", insertable = false, updatable = false)
    private LocalDateTime receptionTime;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    @Transient
    private String patientName;

    @Transient
    private String patientPhone;

    @Transient
    private String patientGender;

    @Transient
    private LocalDate patientDob;

    @Transient
    private String patientAddress;

    public Reception() {
    }
}