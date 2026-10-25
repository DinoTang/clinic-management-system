package com.clinic.management._user.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdatePasswordRequest{

    @NotBlank(message="Mã tài khoản không được để trống")
    private String userId;

    @NotBlank(message="Mật khẩu không được để trống")
    @Size(min=8, max=20, message="Mật khẩu từ 8 đến 20 ký tự")
    private String password;

	public UpdatePasswordRequest(){}
	public UpdatePasswordRequest(
		String userId,
		String password
	){
		this.userId=userId;
		this.password=password;
	}

}
