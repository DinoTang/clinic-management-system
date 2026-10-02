package com.clinic.management._room.interfaces;

import com.clinic.management.common.enums.RoomStatus;
import com.clinic.management._room.dtos.ProfileCreateRequest;
import com.clinic.management._room.entities.Room;
import java.util.List;

public interface IRoomUpdate{
	Room updateProfile(String roomId, ProfileCreateRequest request);
	Room updateStatus(String roomId, RoomStatus status);
}