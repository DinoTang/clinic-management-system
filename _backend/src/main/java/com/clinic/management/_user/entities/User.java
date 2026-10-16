package com.clinic.management._user.entities;

import com.clinic.management.common.enums.Role;
import com.clinic.management.common.enums.UserStatus;
import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "NGUOIDUNG")
@Data
public class User {

    @Id
    @Column(name = "MANGUOIDUNG")
    private String id;

    @Column(name = "TENDANGNHAP")
    private String username;

    @Column(name = "MATKHAU")
    private String password;

    @Column(name = "HOTEN")
    private String fullName;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "SODIENTHOAI")
    private String phone;

    @Column(name = "VAITRO", columnDefinition = "bit")
    private Role role;

    @Column(name = "TRANGTHAI", columnDefinition = "bit")
    private UserStatus status;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted;

    public User(){}
    public User(
        String username,
        String password,
        String fullName,
        String email,
        String phone){
        this.username = username;
        this.password=password;
        this.fullName=fullName;
        this.email=email;
        this.phone=phone;
        this.role=Role.PATIENT;
        this.status=UserStatus.ACTIVE;
        this.deleted=false;
    }
}