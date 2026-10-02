package com.clinic.management._doctor.entities;

import com.clinic.management._user.entities.User;
import com.clinic.management._specialty.entities.Specialty;
import jakarta.persistence.*;
import java.math.BigDecimal;

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
    private int experienceYears;

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
        int experienceYears,
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

    // --- GETTER & SETTER ---

    public String getId() {return id;}
    public void setId(String id) {this.id = id;}

    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}

    public Specialty getSpecialty() {return specialty;}
    public void setSpecialty(Specialty specialty) {this.specialty = specialty;}

    public String getAcademicDegree() {return academicDegree;}
    public void setAcademicDegree(String academicDegree) {this.academicDegree = academicDegree;}

    public int getExperienceYears() {return experienceYears;}
    public void setExperienceYears(int experienceYears) {this.experienceYears = experienceYears;}

    public String getBio() {return bio;}
    public void setBio(String bio) {this.bio = bio;}

    public BigDecimal getExaminationFee() {return examinationFee;}
    public void setExaminationFee(BigDecimal examinationFee) {this.examinationFee = examinationFee;}

    public boolean getDeleted() {return deleted;}
    public void setDeleted(boolean deleted) {this.deleted = deleted;}
}