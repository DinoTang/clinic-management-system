package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class UserStatusConverter implements AttributeConverter<UserStatus, String> {

    @Override
    public String convertToDatabaseColumn(UserStatus attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public UserStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        try {
            return UserStatus.valueOf(dbData.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return UserStatus.ACTIVE;
        }
    }
}
