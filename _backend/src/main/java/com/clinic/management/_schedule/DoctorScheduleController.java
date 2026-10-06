package com.clinic.management._schedule;

import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._doctor.repositories.DoctorRepository;
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
    private final DoctorRepository doctorRepository;

    public DoctorScheduleController(
            DoctorScheduleService scheduleService,
            DoctorRepository doctorRepository) {
        this.scheduleService = scheduleService;
        this.doctorRepository = doctorRepository;
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
    public DoctorSchedule createSchedule(@RequestBody DoctorScheduleRequest request) {
        return scheduleService.createSchedule(toSchedule(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorSchedule> updateSchedule(
            @PathVariable String id,
            @RequestBody DoctorScheduleRequest request) {
        DoctorSchedule updated = scheduleService.updateSchedule(id, toSchedule(request));
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    private DoctorSchedule toSchedule(DoctorScheduleRequest request) {
        DoctorSchedule schedule = new DoctorSchedule();
        DoctorScheduleRequest.DoctorReference doctorReference = request.getDoctor();
        if (doctorReference != null && doctorReference.getId() != null
                && !doctorReference.getId().isBlank()) {
            Doctor doctor = doctorRepository.findById(doctorReference.getId()).orElse(null);
            schedule.setDoctor(doctor);
        }
        schedule.setRoomId(request.getRoomId());
        schedule.setExaminationDate(request.getExaminationDate());
        schedule.setStartTime(request.getStartTime());
        schedule.setEndTime(request.getEndTime());
        schedule.setMaxPatients(request.getMaxPatients());
        schedule.setStatus(request.getStatus());
        return schedule;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable String id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/doctor/{doctorId}/date")
    public ResponseEntity<List<DoctorSchedule>> getSchedulesByDoctorAndDate(
            @PathVariable String doctorId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(scheduleService.getSchedulesByDoctorAndDate(doctorId, date));
    }
}