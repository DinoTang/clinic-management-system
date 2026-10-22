package com.clinic.management._user.dtos;
import lombok.Data;
import com.clinic.management.common.enums.UserStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class UpdateStatusRequest {

    @NotBlank(message="Mã tài khoản không được để trống")
    private String userId;

    @NotNull(message = "Trạng thái không được để trống")
    private UserStatus status;

    UpdateStatusRequest(){}
    UpdateStatusRequest(String userId, UserStatus status){
    	this.userId=userId;
    	this.status=status;
    }
}
