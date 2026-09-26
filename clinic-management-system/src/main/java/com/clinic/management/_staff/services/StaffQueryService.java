package com.clinic.management._staff.services;

import com.clinic.management._staff.interfaces.IStaffQuery;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.repositories.StaffRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StaffQueryService implements IStaffQuery{
	private final StaffRepository staffRepository;

	public StaffQueryService(
		StaffRepository staffRepository
	){
		this.staffRepository = staffRepository;
	}

	@Override
	public List<Staff> findAll(){
		return staffRepository.findAll();
	}

}