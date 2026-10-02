package com.clinic.management._room;

import com.clinic.management.common.enums.RoomStatus;
import com.clinic.management._room.dtos.ProfileCreateRequest;
import com.clinic.management._room.entities.Room;
import com.clinic.management._room.interfaces.IRoomCreate;
import com.clinic.management._room.interfaces.IRoomDelete;
import com.clinic.management._room.interfaces.IRoomUpdate;
import com.clinic.management._room.interfaces.IRoomQuery;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity; 
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {
    private final IRoomCreate roomCreateService;
    private final IRoomDelete roomDeleteService;
    private final IRoomUpdate roomUpdateService;
    private final IRoomQuery roomQueryService;    

    public RoomController(
        IRoomUpdate roomUpdateService,
        IRoomDelete roomDeleteService,
        IRoomQuery roomQueryService,
        IRoomCreate roomCreateService
    ){
        this.roomUpdateService=roomUpdateService;
        this.roomDeleteService = roomDeleteService;
        this.roomQueryService=roomQueryService;
        this.roomCreateService=roomCreateService;
    }

    @PostMapping
    public ResponseEntity<Room> create(
        @Valid
        @RequestBody ProfileCreateRequest request
    ){
        Room result = roomCreateService.create(request);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<Page<Room>> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Page<Room> rooms = roomQueryService.findAll(page, size);

        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<Room> findById(
        @PathVariable String roomId
    ){
        Room room = roomQueryService.findById(roomId);
        return ResponseEntity.ok(room);
    }

    @PutMapping("/update-status/{roomId}")
    public ResponseEntity<Room> updateStatus(
        @PathVariable String roomId,
        @RequestBody RoomStatus request
    ){
        Room room = roomUpdateService.updateStatus(roomId, request);
        return ResponseEntity.ok(room);
    }

    @DeleteMapping("/soft-delete/{roomId}")
    public ResponseEntity<Room> softDeleteById(
        @PathVariable String roomId
    ){
        Room room = roomDeleteService.softDeleteById(roomId);
        return ResponseEntity.ok(room);
    }

    @DeleteMapping("/hard-delete/{roomId}")
    public ResponseEntity<Room> hardDeleteById(
        @PathVariable String roomId
    ){
        Room room = roomDeleteService.hardDeleteById(roomId);
        return ResponseEntity.ok(room);
    }

    @PutMapping("/restore/{roomId}")
    public ResponseEntity<Room> restoreById(
        @PathVariable String roomId
    ){
        Room room = roomDeleteService.restoreById(roomId);
        return ResponseEntity.ok(room);
    }
}