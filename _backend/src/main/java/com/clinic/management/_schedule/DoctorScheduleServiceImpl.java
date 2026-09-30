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

    private String generateNextScheduleId() {
        String maxId = scheduleRepository.findMaxScheduleId();
        if (maxId == null || !maxId.startsWith("LT")) {
            return "LT001";
        }
        try {
            int currentNum = Integer.parseInt(maxId.substring(2));
            return String.format("LT%03d", currentNum + 1);
        } catch (NumberFormatException e) {
            return "LT001";
        }
    }

    @Override
    public List<DoctorSchedule> getAllSchedules() {
        return scheduleRepository.findAll().stream()
                .filter(s -> !Boolean.TRUE.equals(s.getDeleted()))
                .toList();
    }

    @Override
    public DoctorSchedule getScheduleById(String id) {
        return scheduleRepository.findById(id)
                .filter(s -> !Boolean.TRUE.equals(s.getDeleted()))
                .orElse(null);
    }

    @Override
    public List<DoctorSchedule> getSchedulesByDoctor(String doctorId) {
        return scheduleRepository.findByDoctor_Id(doctorId).stream()
                .filter(s -> !Boolean.TRUE.equals(s.getDeleted()))
                .toList();
    }

    @Override
    public List<DoctorSchedule> getSchedulesByDate(LocalDate date) {
        return scheduleRepository.findByExaminationDate(date).stream()
                .filter(s -> !Boolean.TRUE.equals(s.getDeleted()))
                .toList();
    }

    @Override
    public DoctorSchedule createSchedule(DoctorSchedule schedule) {
        if (schedule.getDoctor() == null || schedule.getDoctor().getId() == null || schedule.getDoctor().getId().isBlank()) {
            throw new IllegalArgumentException("Bác sĩ không được để trống!");
        }
        if (schedule.getRoomId() == null || schedule.getRoomId().isBlank()) {
            throw new IllegalArgumentException("Phòng khám không được để trống!");
        }
        if (schedule.getExaminationDate() == null) {
            throw new IllegalArgumentException("Ngày khám không được để trống!");
        }
        if (schedule.getStartTime() != null && schedule.getEndTime() != null) {
            if (!schedule.getEndTime().isAfter(schedule.getStartTime())) {
                throw new IllegalArgumentException("Giờ kết thúc phải sau giờ bắt đầu!");
            }
        }
        if (schedule.getMaxPatients() == null || schedule.getMaxPatients() <= 0) {
            throw new IllegalArgumentException("Số bệnh nhân tối đa phải lớn hơn 0!");
        }

        schedule.setId(generateNextScheduleId());
        schedule.setDeleted(false);
        return scheduleRepository.save(schedule);
    }

    @Override
    public DoctorSchedule updateSchedule(String id, DoctorSchedule schedule) {
        DoctorSchedule existing = scheduleRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setDoctor(schedule.getDoctor());
        existing.setRoomId(schedule.getRoomId());
        existing.setExaminationDate(schedule.getExaminationDate());
        existing.setStartTime(schedule.getStartTime());
        existing.setEndTime(schedule.getEndTime());
        existing.setMaxPatients(schedule.getMaxPatients());
        existing.setStatus(schedule.getStatus());
        return scheduleRepository.save(existing);
    }

    @Override
    public void deleteSchedule(String id) {
        DoctorSchedule existing = scheduleRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setDeleted(true);
            scheduleRepository.save(existing);
        }
    }


}