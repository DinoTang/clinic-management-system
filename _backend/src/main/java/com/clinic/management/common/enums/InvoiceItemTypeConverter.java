package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class InvoiceItemTypeConverter implements AttributeConverter<InvoiceItemType, String> {

    @Override
    public String convertToDatabaseColumn(InvoiceItemType attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public InvoiceItemType convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        try {
            return InvoiceItemType.valueOf(dbData.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return InvoiceItemType.SERVICE;
        }
    }
}
