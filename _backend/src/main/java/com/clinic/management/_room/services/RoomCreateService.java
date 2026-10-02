package com.clinic.management._room.services;

import org.springframework.stereotype.Service;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.interfaces.ISpecialtyQuery;
import com.clinic.management._room.entities.Room;
import com.clinic.management._room.dtos.ProfileCreateRequest;
import com.clinic.management._room.interfaces.IRoomCreate;
import com.clinic.management._room.interfaces.IRoomGenerator;
import com.clinic.management._room.repositories.RoomRepository;

@Service
public class RoomCreateService implements IRoomCreate {

    private final IRoomGenerator roomGeneratorService;    
    private final ISpecialtyQuery specialtyQueryService;
    private final RoomRepository roomRepository;

    public RoomCreateService(
        IRoomGenerator roomGeneratorService,
        ISpecialtyQuery specialtyQueryService,
        RoomRepository roomRepository
    ){
        this.roomGeneratorService=roomGeneratorService;
        this.specialtyQueryService=specialtyQueryService;
        this.roomRepository = roomRepository;
    }

    @Override
    public Room create(ProfileCreateRequest request){
        if(roomRepository.existsBySpecialtyId(request.getSpecialtyId())){
            throw new RuntimeException("Đã phòng khám có mã chuyên khoa "+request.getSpecialtyId());
        }

        String roomId = roomGeneratorService.generateId();
        Specialty specialty = specialtyQueryService.findById(request.getSpecialtyId());
        Room room = new Room(
            specialty,
            request.getRoomNumber(),
            request.getRoomName(),
            request.getFloor()
        );
        room.setId(roomId);
        return roomRepository.save(room);
    }
}