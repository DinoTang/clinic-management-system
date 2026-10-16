package com.clinic.management._patient;

import com.clinic.management._user.entities.User;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;

@Data
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
}