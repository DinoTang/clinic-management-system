package com.clinic.management.common.enums;

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

}
