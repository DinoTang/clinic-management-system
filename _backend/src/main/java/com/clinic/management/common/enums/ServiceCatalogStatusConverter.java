package com.clinic.management.common.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ServiceCatalogStatusConverter implements AttributeConverter<ServiceCatalogStatus, String> {

    @Override
    public String convertToDatabaseColumn(ServiceCatalogStatus attribute) {
        return attribute != null ? attribute.name() : null;
    }

    @Override
    public ServiceCatalogStatus convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return null;
        }
        try {
            return ServiceCatalogStatus.valueOf(dbData.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ServiceCatalogStatus.ACTIVE;
        }
    }
}
