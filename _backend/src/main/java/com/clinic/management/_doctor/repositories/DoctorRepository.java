package com.clinic.management._doctor.repositories;

import com.clinic.management._doctor.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, String> {

    long count();
    boolean existsByUserId(String userId);

    default Doctor softDeleteById(String doctorId) {
        Doctor doctor = this.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Bác sĩ không tồn tại: " + doctorId));
        
        doctor.setDeleted(true);
        
        return this.save(doctor);
    }

    default Doctor hardDeleteById(String doctorId) {
        Doctor doctor = this.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Bác sĩ không tồn tại: " + doctorId));
        
        this.deleteById(doctorId);
        
        return doctor;
    }

    default Doctor restoreById(String doctorId) {
        Doctor doctor = this.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Bác sĩ không tồn tại: " + doctorId));
        
        doctor.setDeleted(false);
        
        return this.save(doctor);
    }
}