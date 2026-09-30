package com.clinic.management._staff.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.clinic.management._staff.entities.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
    long count();
    boolean existsByUserId(String userId);

    default Staff softDeleteById(String staffId) {
        Staff staff = this.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại: " + staffId));
        
        staff.setDeleted(true);
        
        return this.save(staff);
    }

    default Staff hardDeleteById(String staffId) {
        Staff staff = this.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại: " + staffId));
        
        this.deleteById(staffId);
        
        return staff;
    }

    default Staff restoreById(String staffId) {
        Staff staff = this.findById(staffId)
            .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại: " + staffId));
        
        staff.setDeleted(false);
        
        return this.save(staff);
    }
}