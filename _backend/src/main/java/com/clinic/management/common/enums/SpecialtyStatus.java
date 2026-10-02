package com.clinic.management.common.enums;

public enum SpecialtyStatus {
	ACTIVE("Đang hoạt động"),
	INACTIVE("Chuyên khoa ngừng hoạt động");

	private final String description;

	private SpecialtyStatus(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.description;
    }

}
