package com.clinic.management._user.dtos;

import com.clinic.management.common.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ProfileUpdateRequest{

    @NotBlank(message="Mã tài khoản không được để trống")
    private String userId;

    @NotBlank(message="Tên đăng nhập không được để trống")
    @Size(min=5, max=20, message="Tên đăng nhập từ 2 đến 20 ký tự")
    private String username;

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
    
	public ProfileUpdateRequest(){}
	public ProfileUpdateRequest(
		String userId,
		String username,
		String fullName,
		String email,
		String phone
	){
		this.userId=userId;
		this.username=username;
		this.fullName=fullName;
		this.email=email;
		this.phone=phone;
	}

}
