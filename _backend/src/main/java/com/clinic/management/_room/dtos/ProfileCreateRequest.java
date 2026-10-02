package com.clinic.management._room.dtos;

import com.clinic.management.common.enums.RoomStatus;
import jakarta.persistence.*;

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

    public String getSpecialtyId() {return specialtyId;}
    public void setSpecialtyId(String specialtyId) {this.specialtyId = specialtyId;}

    public String getRoomNumber() {return roomNumber;}
    public void setRoomNumber(String roomNumber) {this.roomNumber = roomNumber;}

    public String getRoomName() {return roomName;}
    public void setRoomName(String roomName) {this.roomName = roomName;}

    public String getFloor() {return floor;}
    public void setFloor(String floor) {this.floor = floor;}

}