package com.clinic.management._specialty.interfaces;

import com.clinic.management.common.enums.SpecialtyStatus;
import com.clinic.management._specialty.dtos.ProfileUpdateRequest;
import com.clinic.management._specialty.dtos.UpdateStatusRequest;
import com.clinic.management._specialty.entities.Specialty;
import java.util.List;

public interface ISpecialtyUpdate{
	Specialty updateProfile(ProfileUpdateRequest request);
	Specialty updateStatus(UpdateStatusRequest status);

}