package com.clinic.management._staff.interfaces;

import com.clinic.management._staff.entities.Staff;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IStaffQuery{
	Page<Staff> findAll(int page, int size);
	Staff findById(String staffId);
	boolean existsByUserId(String userId);
}