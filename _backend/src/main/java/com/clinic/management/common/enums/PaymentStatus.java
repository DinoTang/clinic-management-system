package com.clinic.management.common.enums;

public enum PaymentStatus {
    UNPAID("Chưa thanh toán"),
    PAID("Đã thanh toán"),
    CANCELLED("Đã hủy"),
    ;

    private final String description;

    PaymentStatus(String description) {
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
