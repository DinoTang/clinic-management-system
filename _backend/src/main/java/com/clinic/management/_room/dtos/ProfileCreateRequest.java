package com.clinic.management._room.dtos;

import com.clinic.management.common.enums.RoomStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class ProfileCreateRequest {
    @NotBlank(message="Mã chuyên khoa không được để trống")
    private String specialtyId;

    @NotBlank(message="Số phòng không được để trống")
    private String roomNumber;

    @NotBlank(message="Tên phòng không được để trống")
    private String roomName;

    @NotBlank(message="Số tầng không được để trống")    
    private String floor;


    public ProfileCreateRequest() {}
    public ProfileCreateRequest(
        String specialtyId,
        String roomNumber,
        String roomName,
        String floor
    ) {
        this.specialtyId = specialtyId;
        this.roomNumber = roomNumber;
        this.roomName = roomName;
        this.floor = floor;
    }

}