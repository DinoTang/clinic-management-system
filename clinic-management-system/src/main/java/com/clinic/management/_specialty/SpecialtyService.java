package com.clinic.management._specialty;

import java.util.List;

public interface SpecialtyService {
    List<Specialty> getAllSpecialties();
    Specialty getSpecialtyById(String id);
    Specialty createSpecialty(Specialty specialty);
    Specialty updateSpecialty(String id, Specialty specialty);
    void deleteSpecialty(String id);
}