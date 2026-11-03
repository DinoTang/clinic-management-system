package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RoomStatusConverter implements AttributeConverter<RoomStatus, String> {

    @Override
    public String convertToDatabaseColumn(RoomStatus attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public RoomStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        try {
            return RoomStatus.valueOf(dbData.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return RoomStatus.ACTIVE;
        }
    }
}
