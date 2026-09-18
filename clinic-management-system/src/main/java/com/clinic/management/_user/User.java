package com.clinic.management._user;

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


    @Column(name = "VAITRO")
    private String role;


    @Column(name = "TRANGTHAI")
    private Boolean status;


    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted;

}