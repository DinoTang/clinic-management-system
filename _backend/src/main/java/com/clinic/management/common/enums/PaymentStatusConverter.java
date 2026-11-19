package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PaymentStatusConverter implements AttributeConverter<PaymentStatus, String> {

    @Override
    public String convertToDatabaseColumn(PaymentStatus attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public PaymentStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        String normalized = dbData.trim().toUpperCase();
        if ("DATHANHTOAN".equals(normalized)) return PaymentStatus.PAID;
        if ("CHUATHANHTOAN".equals(normalized)) return PaymentStatus.UNPAID;

        try {
            return PaymentStatus.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return PaymentStatus.UNPAID;
        }
    }
}
