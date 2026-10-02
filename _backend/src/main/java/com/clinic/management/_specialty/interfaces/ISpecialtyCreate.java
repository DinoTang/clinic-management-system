package com.clinic.management._specialty.interfaces;

import com.clinic.management._specialty.dtos.ProfileCreateRequest;
import com.clinic.management._specialty.entities.Specialty;
import java.util.List;

public interface ISpecialtyCreate {
    Specialty create(ProfileCreateRequest request);
}