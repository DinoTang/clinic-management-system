package com.clinic.management._room.interfaces;

import com.clinic.management._room.entities.Room;

public interface IRoomDelete {
    Room softDeleteById(String roomId);
    Room hardDeleteById(String roomId);
    Room restoreById(String roomId);
}