package com.clinic.management._appointment;

import com.clinic.management.common.enums.AppointmentStatus;
import com.clinic.management.common.enums.AppointmentStatusConverter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "lichhenkham")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @Column(name = "MALICHHEN", length = 10)
    private String id;

    @Column(name = "MABENHNHAN", length = 10, nullable = false)
    private String patientId;

    @Column(name = "MABACSI", length = 10, nullable = false)
    private String doctorId;

    @Column(name = "MALICHTRUC", length = 10, nullable = false)
    private String scheduleId;

    @Column(name = "NGAYHEN", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "GIOHEN", nullable = false)
    private LocalTime appointmentTime;

    @Column(name = "LYDOKHAM", columnDefinition = "TEXT")
    private String reason;

    @Column(name = "NGAYTAO", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Builder.Default
    @Convert(converter = AppointmentStatusConverter.class)
    @Column(name = "TRANGTHAI", length = 20, nullable = false)
    private AppointmentStatus status = AppointmentStatus.BOOKED;

    @Builder.Default
    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;
}
