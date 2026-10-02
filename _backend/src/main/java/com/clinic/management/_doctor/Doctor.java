package com.clinic.management._doctor;

import com.clinic.management._user.entities.User;
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

    @Column(name = "MACHUYENKHOA", length = 20)
    private String departmentId;

    @Column(name = "HOCVI", length = 50)
    private String academicDegree;

    @Column(name = "NAMKINHNGHIEM")
    private Integer experienceYears;

    @Column(name = "TIEUSU", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "PHIKHAM", precision = 10, scale = 2)
    private BigDecimal examinationFee;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    // Constructor
    public Doctor() {
    }

    // Constructor
    public Doctor(String id, User user, String departmentId, String academicDegree,
                  Integer experienceYears, String bio, BigDecimal examinationFee, Boolean deleted) {
        this.id = id;
        this.user = user;
        this.departmentId = departmentId;
        this.academicDegree = academicDegree;
        this.experienceYears = experienceYears;
        this.bio = bio;
        this.examinationFee = examinationFee;
        this.deleted = deleted;
    }

    // --- GETTER & SETTER ---

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getAcademicDegree() {
        return academicDegree;
    }

    public void setAcademicDegree(String academicDegree) {
        this.academicDegree = academicDegree;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public BigDecimal getExaminationFee() {
        return examinationFee;
    }

    public void setExaminationFee(BigDecimal examinationFee) {
        this.examinationFee = examinationFee;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}