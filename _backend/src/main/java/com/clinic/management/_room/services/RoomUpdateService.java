package com.clinic.management._room.services;

import com.clinic.management.common.enums.RoomStatus;
import com.clinic.management._specialty.interfaces.ISpecialtyQuery;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._room.dtos.ProfileCreateRequest;
import com.clinic.management._room.dtos.ProfileUpdateRequest;
import com.clinic.management._room.dtos.UpdateStatusRequest;
import com.clinic.management._room.interfaces.IRoomUpdate;
import com.clinic.management._room.entities.Room;
import com.clinic.management._room.repositories.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomUpdateService implements IRoomUpdate{
	private final ISpecialtyQuery specialtyQueryService;
	private final RoomRepository roomRepository;

	public RoomUpdateService(
		ISpecialtyQuery specialtyQueryService,
		RoomRepository roomRepository
	){
		this.specialtyQueryService=specialtyQueryService;
		this.roomRepository = roomRepository;
	}

	@Override
	public Room updateProfile(ProfileUpdateRequest request){
		Room room = roomRepository.findById(request.getRoomId()).
			orElseThrow(
				() -> new RuntimeException("Phòng khám không tồn tại")
			);
		Specialty specialty = specialtyQueryService.findById(request.getSpecialtyId());

		room.setSpecialty(specialty);
		room.setRoomNumber(request.getRoomNumber());
		room.setRoomName(request.getRoomName());
		room.setFloor(request.getFloor());

		return roomRepository.save(room);		
	}

	@Override
    public Room updateStatus(UpdateStatusRequest request){
		Room room = roomRepository.findById(request.getRoomId()).
			orElseThrow(
				() -> new RuntimeException("Phòng khám không tồn tại")
			);
		room.setStatus(request.getStatus());
		return roomRepository.save(room);
    }

}