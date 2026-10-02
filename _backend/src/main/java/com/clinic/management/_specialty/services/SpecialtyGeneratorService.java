package com.clinic.management._specialty.services;

import org.springframework.stereotype.Service;
import com.clinic.management._specialty.interfaces.ISpecialtyGenerator;
import com.clinic.management._specialty.repositories.SpecialtyRepository;

@Service
public class SpecialtyGeneratorService implements ISpecialtyGenerator {

    private final SpecialtyRepository specialtyRepository;

    public SpecialtyGeneratorService(SpecialtyRepository specialtyRepository){
        this.specialtyRepository = specialtyRepository;
    }

    @Override
    public String generateId(){
        long quantity = specialtyRepository.count();
        return String.format("CK%05d", quantity+1);
    }
}