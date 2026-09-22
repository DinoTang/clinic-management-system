package com.clinic.management._schedule;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/doctor-schedules")
public class DoctorScheduleController {

    private final DoctorScheduleService scheduleService;

    public DoctorScheduleController(DoctorScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/doctor/{doctorId}")
    public List<DoctorSchedule> getByDoctor(@PathVariable String doctorId) {
        return scheduleService.getSchedulesByDoctor(doctorId);
    }

    @GetMapping("/date")
    public List<DoctorSchedule> getByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return scheduleService.getSchedulesByDate(date);
    }

    @GetMapping
    public List<DoctorSchedule> getAllSchedules() {
        return scheduleService.getAllSchedules(); // gọi service lấy tất cả
    }

    @PostMapping
    public DoctorSchedule createSchedule(@RequestBody DoctorSchedule schedule) {
        return scheduleService.createSchedule(schedule);
    }
}