package com.clinic.management.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum StaffPosition {
    RECEPTIONIST("Lễ tân tiếp đón"),
	CASHIER("Thu ngân viện phí");

	private final String description;
    @JsonCreator
    public static StaffPosition fromValue(int value) {
        return switch (value) {
            case 0 -> RECEPTIONIST;
            case 1 -> CASHIER;
            default -> throw new IllegalArgumentException("Không tồn tại: " + value);
        };
    }

	private StaffPosition(String description) {
        this.description = description;
    }
    
    @Override
    public String toString() {
        return this.description;
    }
}
