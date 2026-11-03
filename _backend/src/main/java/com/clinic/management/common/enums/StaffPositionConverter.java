package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StaffPositionConverter implements AttributeConverter<StaffPosition, String> {

    @Override
    public String convertToDatabaseColumn(StaffPosition attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public StaffPosition convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        try {
            return StaffPosition.valueOf(dbData.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return StaffPosition.RECEPTIONIST;
        }
    }
}
