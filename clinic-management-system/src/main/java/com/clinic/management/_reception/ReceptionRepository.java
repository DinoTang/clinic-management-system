package com.clinic.management._reception;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReceptionRepository extends JpaRepository<Reception, String> {

    // 1. Danh sách chưa xoá
    List<Reception> findByDeletedFalse();

    // 2. Theo ngày: dùng @Query để bỏ đoạn OrderBy dài dòng
    @Query("SELECT r FROM Reception r WHERE r.receptionDate = :date AND r.deleted = false ORDER BY r.queueNumber ASC")
    List<Reception> findByDate(@Param("date") LocalDate date);

    // 3. Theo phòng và ngày
    @Query("SELECT r FROM Reception r WHERE r.roomId = :roomId AND r.receptionDate = :date AND r.deleted = false ORDER BY r.queueNumber ASC")
    List<Reception> findByRoomAndDate(@Param("roomId") String roomId, @Param("date") LocalDate date);

    // 4. Theo bác sĩ và ngày
    @Query("SELECT r FROM Reception r WHERE r.doctorId = :doctorId AND r.receptionDate = :date AND r.deleted = false ORDER BY r.queueNumber ASC")
    List<Reception> findByDoctorAndDate(@Param("doctorId") String doctorId, @Param("date") LocalDate date);

    // 5. STT lớn nhất theo phòng và ngày
    @Query("SELECT COALESCE(MAX(r.queueNumber), 0) FROM Reception r WHERE r.roomId = :roomId AND r.receptionDate = :date AND r.deleted = false")
    Integer findMaxQueue(@Param("roomId") String roomId, @Param("date") LocalDate date);

    // 6. Mã tiếp đón TDxxx lớn nhất
    @Query("SELECT MAX(r.id) FROM Reception r WHERE r.id LIKE 'TD%'")
    String findMaxId();
}