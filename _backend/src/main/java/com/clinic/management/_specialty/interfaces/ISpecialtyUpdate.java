package com.clinic.management._specialty.interfaces;

import com.clinic.management.common.enums.SpecialtyStatus;
import com.clinic.management._specialty.dtos.ProfileUpdateRequest;
import com.clinic.management._specialty.entities.Specialty;
import java.util.List;

public interface ISpecialtyUpdate{
	Specialty updateProfile(String specialtyId, ProfileUpdateRequest request);
	Specialty updateStatus(String specialtyId, SpecialtyStatus status);

}