package com.clinic.management._checkin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CheckInLogRepository extends JpaRepository<CheckInLog, String> {

    List<CheckInLog> findByAppointmentIdOrderByScannedAtDesc(String appointmentId);

    List<CheckInLog> findByScannedAtBetweenOrderByScannedAtDesc(LocalDateTime from, LocalDateTime to);

    /** Các lần quét chưa được gắn với lượt tiếp đón nào. */
    List<CheckInLog> findByAppointmentIdAndReceptionIdIsNullOrderByScannedAtDesc(String appointmentId);

    @Query(value = "SELECT MALICHSU FROM lichsucheckin WHERE MALICHSU REGEXP '^LS[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MALICHSU, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findLatestLogId();
}
