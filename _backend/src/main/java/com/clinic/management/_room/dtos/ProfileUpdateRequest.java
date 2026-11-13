package com.clinic.management._room.dtos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProfileUpdateRequest {
    @NotBlank(message="Mã phòng không được để trống")
    private String roomId;

    @NotBlank(message="Mã chuyên khoa không được để trống")
    private String specialtyId;

    @NotBlank(message="Số phòng không được để trống")
    private String roomNumber;

    @NotBlank(message="Tên phòng không được để trống")
    private String roomName;

    @NotBlank(message="Số tầng không được để trống")    
    private String floor;

    public ProfileUpdateRequest() {}

    public ProfileUpdateRequest(
    	String roomId,
        String specialtyId,
        String roomNumber,
        String roomName,
        String floor
    ) {
    	this.roomId=roomId;
        this.specialtyId = specialtyId;
        this.roomNumber = roomNumber;
        this.roomName = roomName;
        this.floor = floor;
    }

}