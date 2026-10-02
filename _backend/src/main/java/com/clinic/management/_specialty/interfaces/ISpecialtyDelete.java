package com.clinic.management._specialty.interfaces;

import com.clinic.management._specialty.entities.Specialty;

public interface ISpecialtyDelete {
    Specialty softDeleteById(String specialtyId);
    Specialty hardDeleteById(String specialtyId);
    Specialty restoreById(String specialtyId);
}