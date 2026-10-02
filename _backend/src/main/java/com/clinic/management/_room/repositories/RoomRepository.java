package com.clinic.management._room.repositories;

import com.clinic.management._room.entities.Room;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    long count();
    boolean existsBySpecialtyId(String specialtyId);
    Page<Room> findBySpecialtyId(String specialtyId, Pageable pageable);

    default Room softDeleteById(String roomId) {
        Room room = this.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Phòng khám không tồn tại: " + roomId));
        
        room.setDeleted(true);
        
        return this.save(room);
    }

    default Room hardDeleteById(String roomId) {
        Room room = this.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Phòng khám không tồn tại: " + roomId));
        
        this.deleteById(roomId);
        
        return room;
    }

    default Room restoreById(String roomId) {
        Room room = this.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Phòng khám không tồn tại: " + roomId));
        
        room.setDeleted(false);
        
        return this.save(room);
    }
}