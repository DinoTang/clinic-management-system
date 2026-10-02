package com.clinic.management._specialty.services;

import org.springframework.stereotype.Service;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.interfaces.ISpecialtyDelete;
import com.clinic.management._specialty.repositories.SpecialtyRepository;

@Service
public class SpecialtyDeleteService implements ISpecialtyDelete {

    private final SpecialtyRepository specialtyRepository;

    public SpecialtyDeleteService(SpecialtyRepository specialtyRepository){
        this.specialtyRepository = specialtyRepository;
    }

    @Override
    public Specialty softDeleteById(String specialtyId) {
        Specialty specialty = specialtyRepository.softDeleteById(specialtyId);
        return specialty;
    }

    @Override
    public Specialty hardDeleteById(String specialtyId) {
        Specialty specialty =specialtyRepository.hardDeleteById(specialtyId);
        return specialty;
    }

    @Override
    public Specialty restoreById(String specialtyId) {
        Specialty specialty =specialtyRepository.restoreById(specialtyId);
        return specialty;
    }

}