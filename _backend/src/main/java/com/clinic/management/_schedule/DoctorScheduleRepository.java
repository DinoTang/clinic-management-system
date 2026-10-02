package com.clinic.management._schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, String> {

    List<DoctorSchedule> findByDeletedFalse();

    List<DoctorSchedule> findByExaminationDate(LocalDate examinationDate);
    List<DoctorSchedule> findByExaminationDateAndDeletedFalse(LocalDate examinationDate);

    List<DoctorSchedule> findByDoctor_Id(String doctorId);
    List<DoctorSchedule> findByDoctor_IdAndDeletedFalse(String doctorId);

    @Query("SELECT s FROM DoctorSchedule s WHERE s.doctor.id = :doctorId AND s.examinationDate = :date AND s.deleted = false")
    List<DoctorSchedule> findByDoctorIdAndExaminationDate(@Param("doctorId") String doctorId, @Param("date") LocalDate date);

    @Query(value = "SELECT MALICHTRUC FROM lichtrucbacsi WHERE MALICHTRUC REGEXP '^LT[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MALICHTRUC, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxScheduleId();
}