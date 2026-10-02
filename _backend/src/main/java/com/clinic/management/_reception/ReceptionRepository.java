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

    @Query("SELECT r FROM Reception r WHERE r.receptionDate = :date AND r.deleted = false ORDER BY r.queueNumber ASC")
    List<Reception> findByDate(@Param("date") LocalDate date);

    @Query("SELECT r FROM Reception r WHERE r.roomId = :roomId AND r.receptionDate = :date AND r.deleted = false ORDER BY r.queueNumber ASC")
    List<Reception> findByRoomAndDate(@Param("roomId") String roomId, @Param("date") LocalDate date);

    @Query("SELECT r FROM Reception r WHERE r.doctorId = :doctorId AND r.receptionDate = :date AND r.deleted = false ORDER BY r.queueNumber ASC")
    List<Reception> findByDoctorAndDate(@Param("doctorId") String doctorId, @Param("date") LocalDate date);

    @Query("SELECT COALESCE(MAX(r.queueNumber), 0) FROM Reception r WHERE r.roomId = :roomId AND r.receptionDate = :date AND r.deleted = false")
    Integer findMaxQueue(@Param("roomId") String roomId, @Param("date") LocalDate date);

    @Query(value = "SELECT MATIEPDON FROM tiepdonkham WHERE MATIEPDON REGEXP '^TD[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MATIEPDON, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxId();
}