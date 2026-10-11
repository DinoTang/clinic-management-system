package com.clinic.management._billing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, String> {

    List<InvoiceDetail> findByInvoiceIdAndDeletedFalse(String invoiceId);

    @Query(value = "SELECT MACHITIETHOADON FROM chitiethoadon WHERE MACHITIETHOADON REGEXP '^CTHD[0-9]+$' " +
            "ORDER BY CAST(SUBSTRING(MACHITIETHOADON, 5) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String findMaxId();
}
