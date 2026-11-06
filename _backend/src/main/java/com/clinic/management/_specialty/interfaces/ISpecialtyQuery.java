package com.clinic.management._specialty.interfaces;

import com.clinic.management.common.enums.SpecialtyStatus;
import com.clinic.management._specialty.entities.Specialty;
import org.springframework.data.domain.Page;
import java.util.List;

public interface ISpecialtyQuery{
    Page<Specialty> findAll(int page, int size, SpecialtyStatus status, String search);
    List<Specialty> findAll();
    Specialty findById(String specialtyId);
}