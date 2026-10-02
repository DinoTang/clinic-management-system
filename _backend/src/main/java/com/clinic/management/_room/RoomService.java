package com.clinic.management._room;

import java.util.List;

public interface RoomService {
    List<Room> getAllRooms();
    Room getRoomById(String id);
    List<Room> getRoomsBySpecialty(String specialtyId);
    Room createRoom(Room room);
    Room updateRoom(String id, Room room);
    void deleteRoom(String id);
}