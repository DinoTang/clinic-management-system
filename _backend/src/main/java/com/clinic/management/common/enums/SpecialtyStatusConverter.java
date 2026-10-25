package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class SpecialtyStatusConverter implements AttributeConverter<SpecialtyStatus, String> {

    @Override
    public String convertToDatabaseColumn(SpecialtyStatus attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public SpecialtyStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        try {
            return SpecialtyStatus.valueOf(dbData.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return SpecialtyStatus.ACTIVE;
        }
    }
}
