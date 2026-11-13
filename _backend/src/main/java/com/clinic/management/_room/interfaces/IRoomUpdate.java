package com.clinic.management._room.interfaces;

import com.clinic.management.common.enums.RoomStatus;
import com.clinic.management._room.dtos.ProfileUpdateRequest;
import com.clinic.management._room.dtos.UpdateStatusRequest;
import com.clinic.management._room.entities.Room;
import java.util.List;

public interface IRoomUpdate{
	Room updateProfile(ProfileUpdateRequest request);
	Room updateStatus(UpdateStatusRequest status);

}