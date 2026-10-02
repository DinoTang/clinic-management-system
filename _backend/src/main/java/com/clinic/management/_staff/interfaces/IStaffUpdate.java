package com.clinic.management._staff.interfaces;

import com.clinic.management.common.enums.StaffPosition;
import com.clinic.management._staff.entities.Staff;
import java.util.List;

public interface IStaffUpdate{
	Staff updatePosition(String staffId, StaffPosition position);
}