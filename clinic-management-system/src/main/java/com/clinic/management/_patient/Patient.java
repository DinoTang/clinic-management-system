package com.clinic.management._patient;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "benhnhan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @Column(name = "MABENHNHAN", length = 20)
    private String id;

    // Cho phép nullable vì khách vãng lai không có tài khoản
    @Column(name = "MANGUOIDUNG", length = 20)
    private String userId;

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
    private String bloodType;

    @Column(name = "DIACHI", length = 255)
    private String address;

    @Column(name = "SOBHYT", length = 50)
    private String healthInsuranceNumber;

    @Column(name = "TIEUSUBENHAN", columnDefinition = "TEXT")
    private String medicalHistory;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;
}