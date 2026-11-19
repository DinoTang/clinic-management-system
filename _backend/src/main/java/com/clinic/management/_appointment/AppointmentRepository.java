package com.clinic.management._appointment;

import com.clinic.management._dashboard.SpecialtyVisitProjection;
import com.clinic.management._dashboard.RecentAppointmentProjection;
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

    long countByStatusAndDeletedFalse(AppointmentStatus status);

    @Query(value = """
        SELECT 
            ck.MACHUYENKHOA AS specialtyId,
            ck.TENCHUYENKHOA AS specialtyName,
            COUNT(lh.MALICHHEN) AS count
        FROM lichhenkham lh
        JOIN bacsi bs ON lh.MABACSI = bs.MABACSI
        JOIN chuyenkhoa ck ON bs.MACHUYENKHOA = ck.MACHUYENKHOA
        WHERE lh.TRANGTHAIXOA = 0
          AND ck.TRANGTHAIXOA = 0
          AND lh.TRANGTHAI IN ('Đã khám', 'Hoàn tất')
          AND YEAR(lh.NGAYHEN) = :year
          AND MONTH(lh.NGAYHEN) = :month
        GROUP BY ck.MACHUYENKHOA, ck.TENCHUYENKHOA
        ORDER BY COUNT(lh.MALICHHEN) DESC
    """, nativeQuery = true)
    List<SpecialtyVisitProjection> countMonthlyVisitsBySpecialty(
            @Param("year") int year,
            @Param("month") int month
    );

    @Query(value = """
        SELECT 
            lh.MALICHHEN AS appointmentId,
            nd_bn.HOTEN AS patientName,
            nd_bs.HOTEN AS doctorName,
            lh.NGAYHEN AS appointmentDate,
            lh.GIOHEN AS appointmentTime,
            lh.TRANGTHAI AS status
        FROM lichhenkham lh
        JOIN benhnhan bn ON lh.MABENHNHAN = bn.MABENHNHAN
        JOIN NGUOIDUNG nd_bn ON bn.MANGUOIDUNG = nd_bn.MANGUOIDUNG
        JOIN BACSI bs ON lh.MABACSI = bs.MABACSI
        JOIN NGUOIDUNG nd_bs ON bs.MANGUOIDUNG = nd_bs.MANGUOIDUNG
        WHERE COALESCE(lh.TRANGTHAIXOA, 0) = 0
        ORDER BY lh.NGAYTAO DESC, lh.NGAYHEN DESC, lh.GIOHEN DESC
        LIMIT :limit
    """, nativeQuery = true)
    List<RecentAppointmentProjection> findRecentAppointments(@Param("limit") int limit);


    // 1. Đếm lịch hẹn hôm nay (loại trừ lịch đã hủy)
    long countByAppointmentDateAndDeletedFalseAndStatusNot(
            LocalDate appointmentDate,
            AppointmentStatus status
    );

    // 2. Đếm lượt đã khám / hoàn tất trong ngày
    long countByAppointmentDateAndDeletedFalseAndStatusIn(
            LocalDate appointmentDate,
            List<AppointmentStatus> statuses
    );

}
