package com.clinic.management.common.enums;

public enum PaymentMethod {
    CASH("Tiền mặt"),
    TRANSFER("Chuyển khoản"),
    CARD("Thẻ"),
    ;

    private final String description;

    PaymentMethod(String description) {
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
