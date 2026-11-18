package com.clinic.management._medicine;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class MedicineUpdateRequest {

    @NotBlank(message = "Mã thuốc không được để trống")
    private String id;

    @NotBlank(message = "Tên thuốc không được để trống")
    @Size(max = 150, message = "Tên thuốc tối đa 150 ký tự")
    private String name;

    @NotBlank(message = "Hoạt chất không được để trống")
    @Size(max = 150, message = "Hoạt chất tối đa 150 ký tự")
    private String activeIngredient;

    @NotBlank(message = "Đơn vị tính không được để trống")
    @Size(max = 20, message = "Đơn vị tính tối đa 20 ký tự")
    private String unit;

    @NotNull(message = "Đơn giá không được để trống")
    @Min(value = 0, message = "Đơn giá không được âm")
    private BigDecimal price;

    @NotNull(message = "Số lượng tồn không được để trống")
    @Min(value = 0, message = "Số lượng tồn không được âm")
    private Integer stock;

    @NotBlank(message = "Hướng dẫn dùng không được để trống")
    @Size(max = 255, message = "Hướng dẫn dùng tối đa 255 ký tự")
    private String usage;
}
