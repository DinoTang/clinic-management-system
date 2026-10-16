package com.clinic.management._room.entities;

import com.clinic.management.common.enums.RoomStatus;
import com.clinic.management._specialty.entities.Specialty;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "phongkham")
public class Room {

    @Id
    @Column(name = "MAPHONG", length = 10)
    private String id;

    @ManyToOne
    @JoinColumn(name = "MACHUYENKHOA", referencedColumnName = "MACHUYENKHOA")
    private Specialty specialty;

    @Column(name = "SOPHONG", length = 20)
    private String roomNumber;

    @Column(name = "TENPHONG")
    private String roomName;

    @Column(name = "TANG", length = 20)
    private String floor;

    @Column(name = "TRANGTHAI", columnDefinition = "bit")
    private RoomStatus status;

    @Column(name = "TRANGTHAIXOA")
    private boolean deleted;

    public Room() {}
    public Room(
        Specialty specialty,
        String roomNumber,
        String roomName,
        String floor
    ) {
        this.specialty = specialty;
        this.roomNumber = roomNumber;
        this.roomName = roomName;
        this.floor = floor;
        this.status = RoomStatus.ACTIVE;
        this.deleted = false;
    }

}