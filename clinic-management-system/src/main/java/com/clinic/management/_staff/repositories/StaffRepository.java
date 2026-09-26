package com.clinic.management._staff.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.clinic.management._staff.entities.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
    long count();
}