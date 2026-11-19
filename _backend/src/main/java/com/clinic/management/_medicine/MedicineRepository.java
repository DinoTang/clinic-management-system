package com.clinic.management._medicine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, String>, JpaSpecificationExecutor<Medicine> {
    long count();
    List<Medicine> findByDeletedFalse();

    long countByStockLessThanAndDeletedFalse(Integer threshold);
}