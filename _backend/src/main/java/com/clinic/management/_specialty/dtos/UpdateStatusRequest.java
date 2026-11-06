package com.clinic.management._specialty.dtos;
import lombok.Data;
import com.clinic.management.common.enums.SpecialtyStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class UpdateStatusRequest {

    @NotBlank(message="Mã chuyên khoa không được để trống")
    private String specialtyId;

    @NotNull(message = "Trạng thái không được để trống")
    private SpecialtyStatus status;

    UpdateStatusRequest(){}
    UpdateStatusRequest(String specialtyId, SpecialtyStatus status){
    	this.specialtyId=specialtyId;
    	this.status=status;
    }
}
