package com.clinic.management._room.interfaces;

import com.clinic.management._room.entities.Room;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IRoomQuery{
	Page<Room> findAll(int page, int size);
	Page<Room> findBySpecialtyId(String specialtyId, int page, int size);
	Room findById(String RoomId);
}