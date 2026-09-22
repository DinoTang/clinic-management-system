package com.clinic.management._schedule;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DoctorScheduleServiceImpl implements DoctorScheduleService {

    private final DoctorScheduleRepository scheduleRepository;

    public DoctorScheduleServiceImpl(DoctorScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public List<DoctorSchedule> getSchedulesByDoctor(String doctorId) {
        return scheduleRepository.findByDoctor_IdAndDeletedFalse(doctorId);
    }

    @Override
    public List<DoctorSchedule> getSchedulesByDate(LocalDate date) {
        return scheduleRepository.findByExaminationDateAndDeletedFalse(date);
    }

    @Override
    public DoctorSchedule createSchedule(DoctorSchedule schedule) {
        return scheduleRepository.save(schedule);
    }

    @Override
    public List<DoctorSchedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }
}