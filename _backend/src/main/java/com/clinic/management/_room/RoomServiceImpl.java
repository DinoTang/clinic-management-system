package com.clinic.management._room;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findByDeletedFalse();
    }

    @Override
    public Room getRoomById(String id) {
        return roomRepository.findById(id)
                .filter(r -> !Boolean.TRUE.equals(r.getDeleted()))
                .orElse(null);
    }

    @Override
    public List<Room> getRoomsBySpecialty(String specialtyId) {
        return roomRepository.findBySpecialtyIdAndDeletedFalse(specialtyId);
    }

    @Override
    public Room createRoom(Room room) {
        room.setDeleted(false);
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(String id, Room room) {
        Room existing = roomRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setSpecialtyId(room.getSpecialtyId());
        existing.setRoomNumber(room.getRoomNumber());
        existing.setRoomName(room.getRoomName());
        existing.setFloor(room.getFloor());
        existing.setStatus(room.getStatus());
        return roomRepository.save(existing);
    }

    @Override
    public void deleteRoom(String id) {
        Room existing = roomRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setDeleted(true);
            roomRepository.save(existing);
        }
    }
}