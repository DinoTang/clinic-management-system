package com.clinic.management.common.enums;

public enum RoomStatus {
	ACTIVE("Đang hoạt động"),
	INACTIVE("Phòng khám ngừng hoạt động");

	private final String description;

	private RoomStatus(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.description;
    }

}
