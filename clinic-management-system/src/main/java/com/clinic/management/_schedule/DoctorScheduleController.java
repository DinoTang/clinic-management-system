package com.clinic.management._schedule;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/doctor-schedules")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorScheduleController {

    private final DoctorScheduleService scheduleService;

    public DoctorScheduleController(DoctorScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<DoctorSchedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorSchedule> getScheduleById(@PathVariable String id) {
        DoctorSchedule schedule = scheduleService.getScheduleById(id);
        if (schedule == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(schedule);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<DoctorSchedule> getByDoctor(@PathVariable String doctorId) {
        return scheduleService.getSchedulesByDoctor(doctorId);
    }

    @GetMapping("/date")
    public List<DoctorSchedule> getByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return scheduleService.getSchedulesByDate(date);
    }

    @PostMapping
    public DoctorSchedule createSchedule(@RequestBody DoctorSchedule schedule) {
        return scheduleService.createSchedule(schedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorSchedule> updateSchedule(@PathVariable String id, @RequestBody DoctorSchedule schedule) {
        DoctorSchedule updated = scheduleService.updateSchedule(id, schedule);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable String id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}