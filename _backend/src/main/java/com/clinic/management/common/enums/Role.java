package com.clinic.management.common.enums;
import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
	PATIENT("Bệnh nhân"),
	STAFF("Nhân viên"),
	DOCTOR("Bác sĩ"),
	ADMIN("Quản trị viên");

	private final String description;
    @JsonCreator
    public static Role fromValue(int value) {
        return switch (value) {
            case 0 -> PATIENT;
            case 1 -> STAFF;
            case 2 -> DOCTOR;
            case 3 -> ADMIN;
            default -> throw new IllegalArgumentException("Không tồn tại: " + value);
        };
    }


	private Role(String description) {
        this.description = description;
    }
    
    @Override
    public String toString() {
        return this.description;
    }
}
