package com.clinic.management._user.entities;

import com.clinic.management.common.enums.Role;
import com.clinic.management.common.enums.UserStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "NGUOIDUNG")
@Data
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @Column(name = "MANGUOIDUNG", nullable = false)
    private String id;

    @Column(name = "TENDANGNHAP", unique = true)
    private String username;

    @Column(name = "MATKHAU")
    private String password;

    @Column(name = "HOTEN")
    private String fullName;

    @Column(name = "EMAIL", unique=true)
    private String email;

    @Column(name = "SODIENTHOAI")
    private String phone;

    @Column(name = "GOOGLE_ID", unique = true)
    private String googleId;

    @Enumerated(EnumType.STRING)
    @Column(name = "VAITRO", length = 20, nullable = false)
    private Role role = Role.PATIENT;

    @Enumerated(EnumType.STRING)
    @Column(name = "TRANGTHAI", length = 20, nullable = false)
    private UserStatus status = UserStatus.ACTIVE;
    
    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    @CreatedDate
    @Column(name = "NGAYTAO")
    private LocalDateTime createdAt;

    @LastModifiedDate 
    @Column(name = "NGAYCAPNHAT")
    private LocalDateTime updatedAt;

    public User() {}

    public User(
        String username,
        String password,
        String fullName,
        String email,
        String phone
    ) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
    }
}