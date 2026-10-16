package com.clinic.management._auth.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message="Tên đăng nhập không được để trống")
    @Size(min=5, max=20, message="Tên đăng nhập từ 2 đến 20 ký tự")
    private String username;

    @NotBlank(message="Mật khẩu không được để trống")
    @Size(min=8, max=20, message="Mật khẩu từ 8 đến 20 ký tự")
    private String password;

    public LoginRequest(){}
    public LoginRequest(String username, String password){
    	this.username=username;
    	this.password=password;
    }
    
}
