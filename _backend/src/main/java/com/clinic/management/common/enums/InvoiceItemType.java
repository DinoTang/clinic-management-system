package com.clinic.management.common.enums;

public enum InvoiceItemType {
    EXAMINATION_FEE("Phí khám"),
    SERVICE("Dịch vụ"),
    MEDICINE("Thuốc"),
    ;

    private final String description;

    InvoiceItemType(String description) {
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
