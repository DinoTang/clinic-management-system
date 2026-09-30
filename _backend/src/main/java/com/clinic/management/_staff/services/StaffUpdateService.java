package com.clinic.management._staff.services;

import com.clinic.management.common.enums.StaffPosition;
import com.clinic.management._staff.interfaces.IStaffUpdate;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.repositories.StaffRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StaffUpdateService implements IStaffUpdate{
	private final StaffRepository staffRepository;

	public StaffUpdateService(
		StaffRepository staffRepository
	){
		this.staffRepository = staffRepository;
	}

	@Override
	public Staff updatePosition(String staffId, StaffPosition position){
		Staff staff = staffRepository.findById(staffId).
			orElseThrow(
				() -> new RuntimeException("Nhân viên không tồn tại")
			);
		staff.setPosition(position);
		return staffRepository.save(staff);
	}

}