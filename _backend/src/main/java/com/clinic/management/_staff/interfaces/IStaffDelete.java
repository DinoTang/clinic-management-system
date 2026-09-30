package com.clinic.management._staff.interfaces;

import com.clinic.management._staff.entities.Staff;

public interface IStaffDelete {
    Staff softDeleteById(String staffId);
    Staff hardDeleteById(String staffId);
    Staff restoreById(String staffId);
}