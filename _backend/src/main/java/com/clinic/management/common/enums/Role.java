package com.clinic.management.common.enums;
import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
    DEV("Nhà phát triển"),
	ADMIN("Quản trị viên"),
	STAFF("Nhân viên"),
	DOCTOR("Bác sĩ"),
	PATIENT("Bệnh nhân"),
    ;

    private final String description;


    Role(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.description;
    }

    @JsonCreator
    public static Role fromValue(int value) {
        return switch (value) {
            case 0 -> DEV;
            case 1 -> ADMIN;
            case 2 -> STAFF;
            case 3 -> DOCTOR;
            case 4 -> PATIENT;
            default -> throw new IllegalArgumentException("Không tồn tại: " + value);
        };
    }
    
}
