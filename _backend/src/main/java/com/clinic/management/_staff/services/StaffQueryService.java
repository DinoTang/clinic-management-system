package com.clinic.management._staff.services;

import com.clinic.management._staff.interfaces.IStaffQuery;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.repositories.StaffRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	public Page<Staff> findAll(int page, int size) {
	    Pageable pageable = PageRequest.of(page, size);

	    return staffRepository.findAll(pageable);
	}

	@Override
	public Staff findById(String staffId){
		Staff staff = staffRepository.findById(staffId)
			.orElseThrow(
				() -> new RuntimeException("Nhân viên không tồn tại: " + staffId)
			);
		return staff;
	}

	@Override
	public boolean existsByUserId(String userId){
		return staffRepository.existsByUserId(userId);
	}
}