package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class RoleConverter implements AttributeConverter<Role, String> {

    @Override
    public String convertToDatabaseColumn(Role role) {
        return role == null ? null : role.name();
    }

    @Override
    public Role convertToEntityAttribute(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return switch (value.trim().toUpperCase()) {
            case "PATIENT", "BENHNHAN", "0" -> Role.PATIENT;
            case "STAFF", "NHANVIEN", "1" -> Role.STAFF;
            case "DOCTOR", "BACSI", "2" -> Role.DOCTOR;
            case "ADMIN", "QUANTRIVIEN", "3" -> Role.ADMIN;
            default -> throw new IllegalArgumentException("Unknown user role: " + value);
        };
    }
}
