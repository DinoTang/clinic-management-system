package com.clinic.management._appointment;

import com.clinic.management.common.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends
        JpaRepository<Appointment, String>,
        JpaSpecificationExecutor<Appointment> {

    List<Appointment> findByDeletedFalse();

    List<Appointment> findByDoctorIdAndDeletedFalse(String doctorId);

    List<Appointment> findByPatientIdAndDeletedFalse(String patientId);

    List<Appointment> findByScheduleIdAndDeletedFalse(String scheduleId);

    List<Appointment> findByAppointmentDateAndDeletedFalse(LocalDate date);

    boolean existsByPatientIdAndScheduleIdAndDeletedFalseAndStatusNot(
            String patientId, 
            String scheduleId, 
            AppointmentStatus status
    );

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.scheduleId = :scheduleId AND a.deleted = false AND a.status <> com.clinic.management.common.enums.AppointmentStatus.CANCELLED")
    long countActiveAppointmentsByScheduleId(@Param("scheduleId") String scheduleId);

    @Query(value = "SELECT MALICHHEN FROM lichhenkham WHERE MALICHHEN REGEXP '^LH[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MALICHHEN, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findLatestAppointmentId();
}
