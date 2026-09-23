package com.clinic.management._room;

import jakarta.persistence.*;

@Entity
@Table(name = "phongkham")
public class Room {

    @Id
    @Column(name = "MAPHONG", length = 10)
    private String id;

    @Column(name = "MACHUYENKHOA", length = 20)
    private String specialtyId;

    @Column(name = "SOPHONG", length = 20)
    private String roomNumber;

    @Column(name = "TENPHONG", length = 100)
    private String roomName;

    @Column(name = "TANG", length = 20)
    private String floor;

    @Column(name = "TRANGTHAI", length = 30)
    private String status;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public Room() {
    }

    public Room(String id, String specialtyId, String roomNumber, String roomName, String floor, String status, Boolean deleted) {
        this.id = id;
        this.specialtyId = specialtyId;
        this.roomNumber = roomNumber;
        this.roomName = roomName;
        this.floor = floor;
        this.status = status;
        this.deleted = deleted;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSpecialtyId() {
        return specialtyId;
    }

    public void setSpecialtyId(String specialtyId) {
        this.specialtyId = specialtyId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}