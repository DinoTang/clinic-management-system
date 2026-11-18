package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class AppointmentStatusConverter implements AttributeConverter<AppointmentStatus, String> {

    @Override
    public String convertToDatabaseColumn(AppointmentStatus attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public AppointmentStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        try {
            return AppointmentStatus.valueOf(dbData.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return AppointmentStatus.BOOKED;
        }
    }
}
