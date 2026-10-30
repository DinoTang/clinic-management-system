package com.clinic.management._doctor.entities;

import com.clinic.management._user.entities.User;
import com.clinic.management._specialty.entities.Specialty;
import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Data;

@Data
@Entity
@Table(name = "BACSI")
public class Doctor {

    @Id
    @Column(name = "MABACSI", length = 20)
    private String id;

    @OneToOne
    @JoinColumn(name = "MANGUOIDUNG", referencedColumnName = "MANGUOIDUNG")
    private User user;

    @ManyToOne
    @JoinColumn(name = "MACHUYENKHOA", referencedColumnName = "MACHUYENKHOA")
    private Specialty specialty;

    @Column(name = "HOCVI", length = 50)
    private String academicDegree;

    @Column(name = "NAMKINHNGHIEM")
    private Integer experienceYears;

    @Column(name = "TIEUSU", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "PHIKHAM", precision = 10, scale = 2)
    private BigDecimal examinationFee;

    @Column(name = "TRANGTHAIXOA")
    private boolean deleted = false;

    public Doctor() {}
    public Doctor(
        User user,
        Specialty specialty,
        String academicDegree,
        Integer experienceYears,
        String bio,
        BigDecimal examinationFee
    ) {
        this.user = user;
        this.specialty = specialty;
        this.academicDegree = academicDegree;
        this.experienceYears = experienceYears;
        this.bio = bio;
        this.examinationFee = examinationFee;
        this.deleted = false;
    }
}