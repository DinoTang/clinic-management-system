package com.clinic.management.common.enums;

public enum AppointmentStatus {
    BOOKED("Đã đặt"),
    ARRIVED("Đã đến"),
    EXAMINED("Đã khám"),
    COMPLETED("Hoàn tất"),
    CANCELLED("Đã hủy")
    ;

    private final String description;

    private AppointmentStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return this.description;
    }
}
