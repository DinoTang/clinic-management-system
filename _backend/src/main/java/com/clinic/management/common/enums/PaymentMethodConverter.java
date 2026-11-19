package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PaymentMethodConverter implements AttributeConverter<PaymentMethod, String> {

    @Override
    public String convertToDatabaseColumn(PaymentMethod attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public PaymentMethod convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        String normalized = dbData.trim().toUpperCase();
        if ("TIENMAT".equals(normalized)) return PaymentMethod.CASH;
        if ("CHUYENKHOAN".equals(normalized)) return PaymentMethod.TRANSFER;

        try {
            return PaymentMethod.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
