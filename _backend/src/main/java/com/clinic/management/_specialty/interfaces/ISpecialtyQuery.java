package com.clinic.management._specialty.interfaces;

import com.clinic.management._specialty.entities.Specialty;
import java.util.List;

public interface ISpecialtyQuery {
    Specialty findById(String specialtyId);
}