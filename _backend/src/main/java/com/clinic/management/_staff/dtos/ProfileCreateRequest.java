package com.clinic.management._staff.dtos;

import com.clinic.management.common.enums.StaffPosition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProfileCreateRequest{
	
	@NotBlank(message="Mã tài khoản không được để trống")
	private String userId;

	@NotNull(message="Vị trí nhân viên không được để trống")
	private StaffPosition position;

	public ProfileCreateRequest(){}
	public ProfileCreateRequest(
		String userId,
		StaffPosition position
	){
		this.userId=userId;
		this.position=position;
	}

    public String getUserId() {return userId;}
    public void setUserId(String userId) {this.userId = userId;}

    public StaffPosition getPosition() {return position;}
    public void setStaffPosition(StaffPosition position) {this.position = position;}
}
