package com.clinic.management._doctor.services;

import com.clinic.management._doctor.dtos.ProfileCreateRequest;
import com.clinic.management._doctor.dtos.ProfileUpdateRequest;
import com.clinic.management._doctor.interfaces.IDoctorUpdate;
import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._doctor.repositories.DoctorRepository;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.interfaces.ISpecialtyQuery;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorUpdateService implements IDoctorUpdate{

    private final ISpecialtyQuery specialtyQueryService;
	private final DoctorRepository doctorRepository;

	public DoctorUpdateService(
        ISpecialtyQuery specialtyQueryService,
		DoctorRepository doctorRepository
	){
		this.specialtyQueryService=specialtyQueryService;
		this.doctorRepository = doctorRepository;
	}

	@Override
	public Doctor updateProfile(String doctorId, ProfileUpdateRequest request){
		Doctor doctor = doctorRepository.findById(doctorId).
			orElseThrow(
				() -> new RuntimeException("Bác sĩ không tồn tại")
			);
		Specialty specialty = specialtyQueryService.findById(request.getSpecialtyId());

		doctor.setSpecialty(specialty);
		doctor.setAcademicDegree(request.getAcademicDegree());
		doctor.setExperienceYears(request.getExperienceYears());
		doctor.setBio(request.getBio());
		doctor.setExaminationFee(request.getExaminationFee());

		return doctorRepository.save(doctor);
	}

}