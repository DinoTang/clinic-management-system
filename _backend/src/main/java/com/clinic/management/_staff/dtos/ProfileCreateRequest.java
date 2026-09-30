package com.clinic.management._staff.dtos;

import com.clinic.management.common.enums.StaffPosition;

public class ProfileCreateRequest{
	private String userId;
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
