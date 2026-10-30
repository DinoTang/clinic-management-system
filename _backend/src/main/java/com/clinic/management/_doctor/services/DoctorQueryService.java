package com.clinic.management._doctor.services;

import com.clinic.management.common.enums.UserStatus;
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
    public Page<Doctor> findAll(int page, int size, String specialtyId, UserStatus status, String search) {
        Pageable pageable = PageRequest.of(page, size);

        return doctorRepository.findAll((root, query, cb) -> cb.and(
	        specialtyId == null || specialtyId.isBlank() 
	            ? cb.conjunction() 
	            : cb.equal(root.get("specialty").get("id"), specialtyId),
            status == null
                ? cb.conjunction() : cb.equal(root.get("user").get("status"), status),
            search == null || search.isBlank()
            ? cb.conjunction()
            : cb.or(
                cb.like(cb.lower(root.get("id")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("academicDegree")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("user").get("fullName")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("user").get("username")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("user").get("phone")), "%" + search.toLowerCase() + "%"),
                cb.like(cb.lower(root.get("user").get("email")), "%" + search.toLowerCase() + "%")
            )
        ), pageable);
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