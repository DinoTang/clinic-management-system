package com.clinic.management._service_catalog;

import com.clinic.management.common.enums.ServiceCatalogStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class ServiceCatalogCreateRequest {

    @NotBlank(message = "Mã chuyên khoa không được để trống")
    @Size(max = 20, message = "Mã chuyên khoa không được vượt quá 20 ký tự")
    private String specialtyId;

    @NotBlank(message = "Tên dịch vụ không được để trống")
    @Size(max = 150, message = "Tên dịch vụ không được vượt quá 150 ký tự")
    private String name;

    @NotNull(message = "Đơn giá không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Đơn giá phải lớn hơn hoặc bằng 0")
    private BigDecimal price;

    @NotBlank(message = "Đơn vị tính không được để trống")
    @Size(max = 20, message = "Đơn vị tính không được vượt quá 20 ký tự")
    private String unit;

    @NotBlank(message = "Mô tả dịch vụ không được để trống")
    private String description;

}
