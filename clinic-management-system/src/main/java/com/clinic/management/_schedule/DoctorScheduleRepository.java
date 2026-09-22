package com.clinic.management._schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, String> {
    List<DoctorSchedule> findByDoctor_IdAndDeletedFalse(String doctorId);
    List<DoctorSchedule> findByExaminationDateAndDeletedFalse(LocalDate date);
}