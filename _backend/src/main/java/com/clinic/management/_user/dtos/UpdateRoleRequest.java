package com.clinic.management._user.dtos;
import lombok.Data;
import com.clinic.management.common.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class UpdateRoleRequest {

    @NotBlank(message="Mã tài khoản không được để trống")
    private String userId;

    @NotNull(message = "Vai trò không được để trống")
    private Role role;

    UpdateRoleRequest(){}
    UpdateRoleRequest(String userId, Role role){
    	this.userId=userId;
    	this.role=role;
    }
}
