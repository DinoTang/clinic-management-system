package com.clinic.management._user.dtos;
import lombok.Data;
import com.clinic.management.common.enums.UserStatus;

@Data
public class UpdateStatusRequest {
    private String userId;
    private UserStatus status;

    UpdateStatusRequest(){}
    UpdateStatusRequest(String userId, UserStatus status){
    	this.userId=userId;
    	this.status=status;
    }
}
