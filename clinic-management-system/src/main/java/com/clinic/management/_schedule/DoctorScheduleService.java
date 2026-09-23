package com.clinic.management._schedule;

import java.time.LocalDate;
import java.util.List;

public interface DoctorScheduleService {
    List<DoctorSchedule> getAllSchedules();
    DoctorSchedule getScheduleById(String id);
    List<DoctorSchedule> getSchedulesByDoctor(String doctorId);
    List<DoctorSchedule> getSchedulesByDate(LocalDate date);
    DoctorSchedule createSchedule(DoctorSchedule schedule);
    DoctorSchedule updateSchedule(String id, DoctorSchedule schedule);
    void deleteSchedule(String id);
}