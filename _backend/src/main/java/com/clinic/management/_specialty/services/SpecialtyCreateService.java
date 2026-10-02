package com.clinic.management._specialty.services;

import org.springframework.stereotype.Service;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.dtos.ProfileCreateRequest;
import com.clinic.management._specialty.interfaces.ISpecialtyCreate;
import com.clinic.management._specialty.interfaces.ISpecialtyGenerator;
import com.clinic.management._specialty.repositories.SpecialtyRepository;

@Service
public class SpecialtyCreateService implements ISpecialtyCreate {

    private final ISpecialtyGenerator specialtyGeneratorService;
    private final SpecialtyRepository specialtyRepository;

    public SpecialtyCreateService(
        ISpecialtyGenerator specialtyGeneratorService,
        SpecialtyRepository specialtyRepository
    ){
        this.specialtyGeneratorService=specialtyGeneratorService;
        this.specialtyRepository = specialtyRepository;
    }

    @Override
    public Specialty create(ProfileCreateRequest request){
        String specialtyId = specialtyGeneratorService.generateId();

        Specialty specialty = new Specialty(
            request.getName(),
            request.getDescription(),
            request.getStandardFee()
        );

        specialty.setId(specialtyId);
        return specialtyRepository.save(specialty);
    }
}