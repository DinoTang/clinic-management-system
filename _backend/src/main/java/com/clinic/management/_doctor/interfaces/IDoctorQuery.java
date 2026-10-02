package com.clinic.management._doctor.interfaces;

import com.clinic.management._doctor.entities.Doctor;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IDoctorQuery{
	Page<Doctor> findAll(int page, int size);
	Doctor findById(String doctorId);
	boolean existsByUserId(String userId);
}