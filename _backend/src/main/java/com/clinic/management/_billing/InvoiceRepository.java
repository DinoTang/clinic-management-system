package com.clinic.management._billing;

import com.clinic.management.common.enums.PaymentStatus;
import com.clinic.management._dashboard.MonthlyRevenueProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {

    List<Invoice> findByPaymentStatusAndDeletedFalseOrderByCreatedAtDesc(String paymentStatus);

    List<Invoice> findByDeletedFalseOrderByCreatedAtDesc();

    boolean existsByMedicalRecordIdAndDeletedFalse(String medicalRecordId);

    java.util.Optional<Invoice> findByMedicalRecordIdAndDeletedFalse(String medicalRecordId);

    @Query(value = "SELECT MAHOADON FROM hoadon WHERE MAHOADON REGEXP '^HD[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MAHOADON, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxId();

    long countByPaymentStatusAndDeletedFalse(PaymentStatus paymentStatus);

    @Query(value = """
        SELECT 
            MONTH(hd.NGAYTAO) AS month,
            COALESCE(SUM(hd.TONGTIEN), 0) AS revenue
        FROM hoadon hd
        WHERE COALESCE(hd.TRANGTHAIXOA, 0) = 0
          AND hd.TRANGTHAITHANHTOAN = 'PAID'
          AND YEAR(hd.NGAYTAO) = :year
        GROUP BY MONTH(hd.NGAYTAO)
        ORDER BY MONTH(hd.NGAYTAO) ASC
    """, nativeQuery = true)
    List<MonthlyRevenueProjection> sumMonthlyRevenueByYear(@Param("year") int year);

    @Query(value = """
        SELECT COALESCE(SUM(hd.TONGTIEN), 0)
        FROM hoadon hd
        WHERE COALESCE(hd.TRANGTHAIXOA, 0) = 0
          AND hd.TRANGTHAITHANHTOAN = 'PAID'
          AND DATE(hd.NGAYTAO) BETWEEN :startDate AND :endDate
    """, nativeQuery = true)
    BigDecimal sumRevenueBetweenDates(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

}
