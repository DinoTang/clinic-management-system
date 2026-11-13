package com.clinic.management._room.dtos;
import lombok.Data;
import com.clinic.management.common.enums.RoomStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class UpdateStatusRequest {

    @NotBlank(message="Mã phòng không được để trống")
    private String roomId;

    @NotNull(message = "Trạng thái không được để trống")
    private RoomStatus status;

    UpdateStatusRequest(){}
    UpdateStatusRequest(String roomId, RoomStatus status){
    	this.roomId=roomId;
    	this.status=status;
    }
}
