package com.clinic.management._billing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {

    List<Invoice> findByPaymentStatusAndDeletedFalseOrderByCreatedAtDesc(String paymentStatus);

    boolean existsByMedicalRecordIdAndDeletedFalse(String medicalRecordId);

    @Query(value = "SELECT MAHOADON FROM hoadon WHERE MAHOADON REGEXP '^HD[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MAHOADON, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxId();
}
