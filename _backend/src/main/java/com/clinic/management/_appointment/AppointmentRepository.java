package com.clinic.management._appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, String> {

    List<Appointment> findByDeletedFalse();

    List<Appointment> findByDoctorIdAndDeletedFalse(String doctorId);

    List<Appointment> findByPatientIdAndDeletedFalse(String patientId);

    List<Appointment> findByScheduleIdAndDeletedFalse(String scheduleId);

    List<Appointment> findByAppointmentDateAndDeletedFalse(LocalDate date);

    // Kiểm tra bệnh nhân đã đặt ca này chưa
    boolean existsByPatientIdAndScheduleIdAndDeletedFalseAndStatusNot(String patientId, String scheduleId, String status);

    // Đếm số lượng bệnh nhân đã đặt thành công trong ca trực
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.scheduleId = :scheduleId AND a.deleted = false AND a.status <> 'DaHuy'")
    long countActiveAppointmentsByScheduleId(@Param("scheduleId") String scheduleId);

    @Query(value = "SELECT MALICHHEN FROM lichhenkham WHERE MALICHHEN REGEXP '^LH[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MALICHHEN, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findLatestAppointmentId();
}