package com.clinic.management.common.enums;

public enum StaffPosition {
    RECEPTIONIST("Lễ tân tiếp đón"),
    CASHIER("Thu ngân viện phí");

    private final String description;
    private StaffPosition(String description) {
        this.description = description;
    }
    
    @Override
    public String toString() {
        return this.description;
    }
}
