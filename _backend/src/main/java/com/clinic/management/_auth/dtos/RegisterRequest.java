package com.clinic.management._auth.dtos;

import com.clinic.management._user.entities.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

public class RegisterRequest {

    @NotBlank(message="Tên đăng nhập không được để trống")
    @Size(min=5, max=20, message="Tên đăng nhập từ 2 đến 20 ký tự")
    private String username;

    @NotBlank(message="Mật khẩu không được để trống")
    @Size(min=8, max=20, message="Mật khẩu từ 8 đến 20 ký tự")
    private String password;

    @NotBlank(message="Họ tên không được để trống")
    @Size(min=5, max=20, message="Họ tên từ 2 đến 50 ký tự")
    private String fullName;

    @Email(message="Hãy cung cấp địa chỉ email hợp lệ")
    @NotBlank(message="Email không được để trống")
    private String email;

    @NotBlank(message="Số điện thoại không được để trống")
    @Pattern(
        regexp="^0\\d{9}$",
        message="Phải bắt đầu bằng 0 và đủ 10 số"
    )
    private String phone;

    public RegisterRequest(){}
    public RegisterRequest(
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
    }
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

}
