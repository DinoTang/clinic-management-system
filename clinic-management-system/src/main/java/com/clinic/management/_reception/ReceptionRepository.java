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

    // Lọc theo ngày tiếp đón
    List<Reception> findByReceptionDateAndDeletedFalse(LocalDate date);

    // Lọc theo phòng khám và ngày (dùng cho màn hình gọi số theo phòng)
    List<Reception> findByRoomIdAndReceptionDateAndDeletedFalseOrderByQueueNumberAsc(String roomId, LocalDate date);

    // Lọc theo bác sĩ và ngày
    List<Reception> findByDoctorIdAndReceptionDateAndDeletedFalseOrderByQueueNumberAsc(String doctorId, LocalDate date);

    // Tìm số thứ tự lớn nhất trong ngày tại 1 phòng khám để cấp STT tiếp theo
    @Query("SELECT COALESCE(MAX(r.queueNumber), 0) FROM Reception r " +
            "WHERE r.roomId = :roomId AND r.receptionDate = :date AND r.deleted = false")
    Integer findMaxQueueNumberByRoomAndDate(@Param("roomId") String roomId, @Param("date") LocalDate date);

    // Tìm mã tiếp đón mới nhất dạng TDxxx để tự tăng
    @Query(value = "SELECT MATIEPDON FROM tiepdonkham WHERE MATIEPDON REGEXP '^TD[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MATIEPDON, 3) AS UNSIGNED) DESC LIMIT 1",
            nativeQuery = true)
    String findLatestReceptionId();
}