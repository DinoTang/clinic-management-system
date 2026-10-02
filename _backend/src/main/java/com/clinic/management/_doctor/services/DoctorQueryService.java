package com.clinic.management._doctor.services;

import com.clinic.management._doctor.interfaces.IDoctorQuery;
import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._doctor.repositories.DoctorRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class DoctorQueryService implements IDoctorQuery{
	private final DoctorRepository doctorRepository;

	public DoctorQueryService(
		DoctorRepository doctorRepository
	){
		this.doctorRepository = doctorRepository;
	}

	@Override
	public Page<Doctor> findAll(int page, int size) {
	    Pageable pageable = PageRequest.of(page, size);

	    return doctorRepository.findAll(pageable);
	}

	@Override
	public Doctor findById(String doctorId){
		Doctor doctor = doctorRepository.findById(doctorId)
			.orElseThrow(
				() -> new RuntimeException("Bác sĩ không tồn tại: " + doctorId)
			);
		return doctor;
	}

	@Override
	public boolean existsByUserId(String userId){
		return doctorRepository.existsByUserId(userId);
	}
}