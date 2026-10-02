package com.clinic.management._specialty.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.clinic.management._specialty.entities.Specialty;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, String> {
    long count();

    default Specialty softDeleteById(String specialtyId) {
        Specialty specialty = this.findById(specialtyId)
            .orElseThrow(() -> new RuntimeException("Chuyên khoa không tồn tại: " + specialtyId));
        
        specialty.setDeleted(true);
        
        return this.save(specialty);
    }

    default Specialty hardDeleteById(String specialtyId) {
        Specialty specialty = this.findById(specialtyId)
            .orElseThrow(() -> new RuntimeException("Chuyên khoa không tồn tại: " + specialtyId));
        
        this.deleteById(specialtyId);
        
        return specialty;
    }

    default Specialty restoreById(String specialtyId) {
        Specialty specialty = this.findById(specialtyId)
            .orElseThrow(() -> new RuntimeException("Chuyên khoa không tồn tại: " + specialtyId));
        
        specialty.setDeleted(false);
        
        return this.save(specialty);
    }
}