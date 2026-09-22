package com.clinic.management._schedule;

import java.time.LocalDate;
import java.util.List;

public interface DoctorScheduleService {
    List<DoctorSchedule> getSchedulesByDoctor(String doctorId);
    List<DoctorSchedule> getSchedulesByDate(LocalDate date);
    List<DoctorSchedule> getAllSchedules();
    DoctorSchedule createSchedule(DoctorSchedule schedule);
}