package com.clinic.management._room.services;

import org.springframework.stereotype.Service;
import com.clinic.management._room.interfaces.IRoomGenerator;
import com.clinic.management._room.repositories.RoomRepository;

@Service
public class RoomGeneratorService implements IRoomGenerator {

    private final RoomRepository roomRepository;

    public RoomGeneratorService(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    @Override
    public String generateId(){
        long quantity = roomRepository.count();
        return String.format("PK%05d", quantity+1);
    }
}