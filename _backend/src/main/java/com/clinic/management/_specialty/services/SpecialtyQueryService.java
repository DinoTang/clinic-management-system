package com.clinic.management._specialty.services;

import com.clinic.management._specialty.interfaces.ISpecialtyQuery;
import com.clinic.management._specialty.entities.Specialty;
import com.clinic.management._specialty.repositories.SpecialtyRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class SpecialtyQueryService implements ISpecialtyQuery{
    private final SpecialtyRepository specialtyRepository;

    public SpecialtyQueryService(
        SpecialtyRepository specialtyRepository
    ){
        this.specialtyRepository = specialtyRepository;
    }

    @Override
    public Page<Specialty> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return specialtyRepository.findAll(pageable);
    }

    @Override
    public Specialty findById(String specialtyId){
        Specialty specialty = specialtyRepository.findById(specialtyId)
            .orElseThrow(
                () -> new RuntimeException("Chuyên khoa không tồn tại: " + specialtyId)
            );
        return specialty;
    }
}