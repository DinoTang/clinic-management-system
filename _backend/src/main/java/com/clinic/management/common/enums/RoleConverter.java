package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RoleConverter implements AttributeConverter<Role, String> {

    @Override
    public String convertToDatabaseColumn(Role attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public Role convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        try {
            return Role.valueOf(dbData.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return Role.PATIENT;
        }
    }
}
