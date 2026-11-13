package com.clinic.management._reception;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReceptionRepository extends JpaRepository<Reception, String> {

    List<Reception> findByDeletedFalse();

    List<Reception> findByPatientIdAndDeletedFalseOrderByReceptionDateDesc(String patientId);

    List<Reception> findByAppointmentIdAndDeletedFalse(String appointmentId);

    @Query("SELECT r FROM Reception r WHERE r.receptionDate < :today " +
            "AND r.queueStatus IN ('ChoKham', 'DangKham', 'BoQua') " +
            "AND r.deleted = false")
    List<Reception> findPastUnfinished(@Param("today") LocalDate today);

    @Query("SELECT r FROM Reception r WHERE r.receptionDate = :date AND r.deleted = false " +
            "ORDER BY CASE " +
            "  WHEN r.queueStatus = 'DangKham' THEN 1 " +
            "  WHEN r.queueStatus = 'ChoKham' AND r.deferredAt IS NULL THEN 2 " +
            "  WHEN r.queueStatus = 'ChoKham' AND r.deferredAt IS NOT NULL THEN 3 " +
            "  WHEN r.queueStatus = 'BoQua' THEN 4 " +
            "  WHEN r.queueStatus = 'DaKham' THEN 5 " +
            "  WHEN r.queueStatus = 'QuaHan' THEN 6 " +
            "  ELSE 7 " +
            "END ASC, r.deferredAt ASC, r.queueNumber ASC")
    List<Reception> findByDate(@Param("date") LocalDate date);

    @Query("SELECT r FROM Reception r WHERE r.roomId = :roomId AND r.receptionDate = :date AND r.deleted = false " +
            "ORDER BY CASE " +
            "  WHEN r.queueStatus = 'DangKham' THEN 1 " +
            "  WHEN r.queueStatus = 'ChoKham' AND r.deferredAt IS NULL THEN 2 " +
            "  WHEN r.queueStatus = 'ChoKham' AND r.deferredAt IS NOT NULL THEN 3 " +
            "  WHEN r.queueStatus = 'BoQua' THEN 4 " +
            "  WHEN r.queueStatus = 'DaKham' THEN 5 " +
            "  WHEN r.queueStatus = 'QuaHan' THEN 6 " +
            "  ELSE 7 " +
            "END ASC, r.deferredAt ASC, r.queueNumber ASC")
    List<Reception> findByRoomAndDate(@Param("roomId") String roomId, @Param("date") LocalDate date);

    @Query("SELECT r FROM Reception r WHERE r.doctorId = :doctorId AND r.receptionDate = :date AND r.deleted = false " +
            "ORDER BY CASE " +
            "  WHEN r.queueStatus = 'DangKham' THEN 1 " +
            "  WHEN r.queueStatus = 'ChoKham' AND r.deferredAt IS NULL THEN 2 " +
            "  WHEN r.queueStatus = 'ChoKham' AND r.deferredAt IS NOT NULL THEN 3 " +
            "  WHEN r.queueStatus = 'BoQua' THEN 4 " +
            "  WHEN r.queueStatus = 'DaKham' THEN 5 " +
            "  WHEN r.queueStatus = 'QuaHan' THEN 6 " +
            "  ELSE 7 " +
            "END ASC, r.deferredAt ASC, r.queueNumber ASC")
    List<Reception> findByDoctorAndDate(@Param("doctorId") String doctorId, @Param("date") LocalDate date);

    @Query("SELECT COALESCE(MAX(r.queueNumber), 0) FROM Reception r WHERE r.roomId = :roomId AND r.receptionDate = :date AND r.deleted = false")
    Integer findMaxQueue(@Param("roomId") String roomId, @Param("date") LocalDate date);

    @Query(value = "SELECT MATIEPDON FROM tiepdonkham WHERE MATIEPDON REGEXP '^TD[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MATIEPDON, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxId();
}
