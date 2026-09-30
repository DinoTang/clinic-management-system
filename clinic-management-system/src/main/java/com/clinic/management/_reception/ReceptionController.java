package com.clinic.management._reception;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/receptions")
@CrossOrigin(origins = "http://localhost:5173")
public class ReceptionController {

    private final ReceptionService receptionService;

    public ReceptionController(ReceptionService receptionService) {
        this.receptionService = receptionService;
    }

    @GetMapping
    public List<Reception> getAllReceptions() {
        return receptionService.getAllReceptions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reception> getReceptionById(@PathVariable String id) {
        Reception reception = receptionService.getReceptionById(id);
        if (reception == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reception);
    }

    @GetMapping("/by-date")
    public List<Reception> getReceptionsByDate(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return receptionService.getReceptionsByDate(date);
    }

    @GetMapping("/queue/room/{roomId}")
    public List<Reception> getQueueByRoom(
            @PathVariable String roomId,
            @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate queryDate = (date != null) ? date : LocalDate.now();
        return receptionService.getQueueByRoomAndDate(roomId, queryDate);
    }

    @GetMapping("/queue/doctor/{doctorId}")
    public List<Reception> getQueueByDoctor(
            @PathVariable String doctorId,
            @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate queryDate = (date != null) ? date : LocalDate.now();
        return receptionService.getQueueByDoctorAndDate(doctorId, queryDate);
    }

    @PostMapping
    public Reception createReception(@RequestBody Reception reception) {
        return receptionService.createReception(reception);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reception> updateReception(@PathVariable String id, @RequestBody Reception reception) {
        Reception updated = receptionService.updateReception(id, reception);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // API nhanh để Bác sĩ/Điều dưỡng đổi trạng thái hàng đợi: ChoKham -> DangKham -> DaKham
    @PatchMapping("/{id}/status")
    public ResponseEntity<Reception> updateQueueStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Reception updated = receptionService.updateQueueStatus(id, status);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReception(@PathVariable String id) {
        receptionService.deleteReception(id);
        return ResponseEntity.noContent().build();
    }
}