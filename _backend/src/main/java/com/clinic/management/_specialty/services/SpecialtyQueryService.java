package com.clinic.management._specialty.services;

import com.clinic.management._specialty.interfaces.ISpecialtyQuery;
import com.clinic.management.common.enums.SpecialtyStatus;
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


    public Page<Specialty> findAll(int page, int size, SpecialtyStatus status, String search) {
        Pageable pageable = PageRequest.of(page, size);

        return specialtyRepository.findAll((root, query, cb) -> cb.and(

            status == null
                ? cb.conjunction() 
                : cb.equal(root.get("status"), status),

            search == null || search.isBlank()
                ? cb.conjunction()
                : cb.or(
                    cb.like(cb.lower(root.get("id")), "%" + search.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("description")), "%" + search.toLowerCase() + "%")
                )
        ), pageable);
    }

    @Override
    public List<Specialty> findAll() {
        return specialtyRepository.findAll();
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