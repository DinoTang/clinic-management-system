package com.clinic.management._patient;

import com.clinic.management._user.entities.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "BENHNHAN")
public class Patient {

    @Id
    @Column(name = "MABENHNHAN", length = 20)
    private String id;

    @OneToOne
    @JoinColumn(name = "MANGUOIDUNG", referencedColumnName = "MANGUOIDUNG")
    private User user;

    @Column(name = "HOTEN", length = 100)
    private String fullName;

    @Column(name = "SODIENTHOAI", length = 15)
    private String phoneNumber;

    @Column(name = "EMAIL", length = 100)
    private String email;

    @Column(name = "NGAYSINH")
    private LocalDate dateOfBirth;

    @Column(name = "GIOITINH", length = 10)
    private String gender;

    @Column(name = "NHOMMAU", length = 10)
    private String bloodGroup;

    @Column(name = "DIACHI", length = 255)
    private String address;

    @Column(name = "SOBHYT", length = 50)
    private String healthInsuranceNumber;

    @Column(name = "TIEUSUBENHAN", columnDefinition = "TEXT")
    private String medicalHistory;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public Patient() {
    }

    public Patient(String id, User user, LocalDate dateOfBirth, String gender, String bloodGroup,
                   String address, String healthInsuranceNumber, String medicalHistory, Boolean deleted) {
        this.id = id;
        this.user = user;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.address = address;
        this.healthInsuranceNumber = healthInsuranceNumber;
        this.medicalHistory = medicalHistory;
        this.deleted = deleted;
    }

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

    public String getFullName() {
        return fullName != null ? fullName : user != null ? user.getFullName() : null;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber != null ? phoneNumber : user != null ? user.getPhone() : null;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email != null ? email : user != null ? user.getEmail() : null;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHealthInsuranceNumber() {
        return healthInsuranceNumber;
    }

    public void setHealthInsuranceNumber(String healthInsuranceNumber) {
        this.healthInsuranceNumber = healthInsuranceNumber;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}