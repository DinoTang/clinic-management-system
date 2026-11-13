package com.clinic.management._room.services;

import com.clinic.management.common.enums.RoomStatus;
import com.clinic.management._room.interfaces.IRoomQuery;
import com.clinic.management._room.entities.Room;
import com.clinic.management._room.repositories.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class RoomQueryService implements IRoomQuery{
	private final RoomRepository roomRepository;

	public RoomQueryService(
		RoomRepository roomRepository
	){
		this.roomRepository = roomRepository;
	}


    public Page<Room> findAll(int page, int size, RoomStatus status, String search) {
        Pageable pageable = PageRequest.of(page, size);

        return roomRepository.findAll((root, query, cb) -> cb.and(

            status == null
                ? cb.conjunction() 
                : cb.equal(root.get("status"), status),

            search == null || search.isBlank()
                ? cb.conjunction()
                : cb.or(
                    cb.like(cb.lower(root.get("id")), "%" + search.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("roomName")), "%" + search.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("roomNumber")), "%" + search.toLowerCase() + "%")
                )
        ), pageable);
    }

	@Override
	public Room findById(String roomId){
		Room room = roomRepository.findById(roomId)
			.orElseThrow(
				() -> new RuntimeException("Phòng khám không tồn tại: " + roomId)
			);
		return room;
	}

	@Override
	public Page<Room> findBySpecialtyId(String specialtyId, int page, int size){
	    Pageable pageable = PageRequest.of(page, size);
		return roomRepository.findBySpecialtyId(specialtyId, pageable);
	}
}