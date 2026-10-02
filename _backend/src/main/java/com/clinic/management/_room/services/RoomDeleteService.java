package com.clinic.management._room.services;

import org.springframework.stereotype.Service;
import com.clinic.management._room.entities.Room;
import com.clinic.management._room.interfaces.IRoomDelete;
import com.clinic.management._room.repositories.RoomRepository;

@Service
public class RoomDeleteService implements IRoomDelete {

    private final RoomRepository roomRepository;

    public RoomDeleteService(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    @Override
    public Room softDeleteById(String roomId) {
        Room room = roomRepository.softDeleteById(roomId);
        return room;
    }

    @Override
    public Room hardDeleteById(String roomId) {
        Room room =roomRepository.hardDeleteById(roomId);
        return room;
    }

    @Override
    public Room restoreById(String roomId) {
        Room room =roomRepository.restoreById(roomId);
        return room;
    }

}