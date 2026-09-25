package com.clinic.management.common.enums;

public enum UserStatus {
	ACTIVE("Đang hoạt động"),
	LOCKED("Đã khóa");

	private final String description;

	private UserStatus(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.description;
    }

}
