package com.clinic.management.common.enums;

public enum ServiceCatalogStatus {
	ACTIVE("Đang hoạt động"),
	INACTIVE("Dịch vụ ngừng hoạt động");

	private final String description;

	private ServiceCatalogStatus(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.description;
    }

}
