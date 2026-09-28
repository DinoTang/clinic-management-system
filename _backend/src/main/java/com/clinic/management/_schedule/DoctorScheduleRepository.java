package com.clinic.management._schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, String> {

    @Query(value = "SELECT MALICHTRUC FROM lichtrucbacsi WHERE MALICHTRUC LIKE 'LT%' ORDER BY CAST(REGEXP_REPLACE(MALICHTRUC, '[^0-9]', '') AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxScheduleId();

    List<DoctorSchedule> findByDoctor_Id(String doctorId);

    List<DoctorSchedule> findByExaminationDate(LocalDate examinationDate);
}