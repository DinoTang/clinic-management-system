package com.clinic.management._specialty.services;

import com.clinic.management.common.enums.SpecialtyStatus;
import com.clinic.management._specialty.dtos.ProfileUpdateRequest;
import com.clinic.management._specialty.interfaces.ISpecialtyUpdate;
import com.clinic.management._specialty.interfaces.ISpecialtyQuery;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.repositories.SpecialtyRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SpecialtyUpdateService implements ISpecialtyUpdate{

	private final ISpecialtyQuery specialtyQueryService;
	private final SpecialtyRepository specialtyRepository;

	public SpecialtyUpdateService(
		ISpecialtyQuery specialtyQueryService,
		SpecialtyRepository specialtyRepository
	){
		this.specialtyQueryService=specialtyQueryService;
		this.specialtyRepository = specialtyRepository;
	}

	@Override
	public Specialty updateProfile(String specialtyId, ProfileUpdateRequest request){
		Specialty specialty = specialtyRepository.findById(specialtyId).
			orElseThrow(
				() -> new RuntimeException("Chuyên khoa không tồn tại")
			);
		specialty.setName(request.getName());
		specialty.setDescription(request.getDescription());
		specialty.setStandardFee(request.getStandardFee());

		return specialtyRepository.save(specialty);
	}

	@Override
    public Specialty updateStatus(String specialtyId, SpecialtyStatus status){
        Specialty specialty = specialtyQueryService.findById(specialtyId);
        specialty.setStatus(status);
        return specialtyRepository.save(specialty);
    }

}