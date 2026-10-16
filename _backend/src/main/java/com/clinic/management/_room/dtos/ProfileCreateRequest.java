package com.clinic.management._room.dtos;

import com.clinic.management.common.enums.RoomStatus;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class ProfileCreateRequest {

    private String specialtyId;
    private String roomNumber;
    private String roomName;
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