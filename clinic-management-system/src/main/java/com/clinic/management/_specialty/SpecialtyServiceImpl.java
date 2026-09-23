package com.clinic.management._specialty;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {

    private final SpecialtyRepository specialtyRepository;

    public SpecialtyServiceImpl(SpecialtyRepository specialtyRepository) {
        this.specialtyRepository = specialtyRepository;
    }

    @Override
    public List<Specialty> getAllSpecialties() {
        return specialtyRepository.findByDeletedFalse();
    }

    @Override
    public Specialty getSpecialtyById(String id) {
        return specialtyRepository.findById(id)
                .filter(s -> !Boolean.TRUE.equals(s.getDeleted()))
                .orElse(null);
    }

    @Override
    public Specialty createSpecialty(Specialty specialty) {
        specialty.setDeleted(false);
        return specialtyRepository.save(specialty);
    }

    @Override
    public Specialty updateSpecialty(String id, Specialty specialty) {
        Specialty existing = specialtyRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setName(specialty.getName());
        existing.setDescription(specialty.getDescription());
        existing.setStandardFee(specialty.getStandardFee());
        existing.setStatus(specialty.getStatus());
        return specialtyRepository.save(existing);
    }

    @Override
    public void deleteSpecialty(String id) {
        Specialty existing = specialtyRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setDeleted(true);
            specialtyRepository.save(existing);
        }
    }
}