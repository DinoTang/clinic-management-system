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
    // Getter and Setter 
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}

    public String getFullName() {return fullName;}
    public void setFullName(String fullName) {this.fullName = fullName;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getPhone() {return phone;}
    public void setPhone(String phone) {this.phone = phone;}

    public Role getRole() {return role;}
    public void setRole(Role role) {this.role = role;}

    public UserStatus getStatus() {return status;}
    public void setStatus(UserStatus status) {this.status = status;}

    public Boolean getDeleted() {return deleted;}
}