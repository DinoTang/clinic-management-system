# API Contract - Hệ thống quản lý phòng khám

## Quy ước chung

Base URL:

`/api/v1`

Response thành công:

``` json
{
  "success": true,
  "message": "Thành công",
  "data": {}
}
```

------------------------------------------------------------------------

# AUTH API

## POST /auth/login

Đăng nhập hệ thống.

Database: - NGUOIDUNG

## POST /auth/register

Đăng ký tài khoản bệnh nhân.

Database: - NGUOIDUNG - BENHNHAN

## GET /auth/me

Lấy thông tin người dùng hiện tại.

------------------------------------------------------------------------

# PATIENT API

## GET /patient/profile

Xem hồ sơ cá nhân.

Database: - BENHNHAN - NGUOIDUNG

## PUT /patient/profile

Cập nhật hồ sơ bệnh nhân.

## GET /patient/specialties

Danh sách chuyên khoa.

Database: - CHUYENKHOA

## GET /patient/doctors

Danh sách bác sĩ theo chuyên khoa.

Database: - BACSI - CHUYENKHOA

## GET /patient/available-slots

Xem lịch trống.

Database: - LICHTRUCBACSI - LICHHENKHAM

## POST /patient/appointments

Đặt lịch khám.

Database: - LICHHENKHAM

## PUT /patient/appointments/{id}/cancel

Hủy lịch khám.

## GET /patient/medical-records

Xem lịch sử khám.

Database: - BENHAN

## GET /patient/prescriptions/{id}

Xem đơn thuốc.

Database: - DONTHUOC - CHITIETDONTHUOC - THUOC

## GET /patient/invoices

Xem hóa đơn.

Database: - HOADON - CHITIETHOADON

------------------------------------------------------------------------

# DOCTOR API

## GET /doctor/schedules

Xem lịch làm việc.

Database: - LICHTRUCBACSI

## POST /doctor/schedules

Tạo lịch làm việc.

## GET /doctor/appointments/today

Xem lịch hẹn hôm nay.

Database: - LICHHENKHAM - TIEPDONKHAM

## POST /doctor/examinations

Hoàn tất khám bệnh.

Transaction tạo: - BENHAN - DONTHUOC - CHITIETDONTHUOC - HOADON

Cập nhật: - THUOC.SOLUONGTON - LICHHENKHAM.TRANGTHAI

------------------------------------------------------------------------

# RECEPTION API

## GET /reception/patients/search

Tìm bệnh nhân.

Database: - BENHNHAN

## POST /reception/check-in

Tiếp nhận bệnh nhân.

Database: - TIEPDONKHAM

## GET /reception/queue

Xem hàng đợi khám.

Database: - TIEPDONKHAM

## PUT /reception/queue/{id}/status

Cập nhật trạng thái hàng đợi.

------------------------------------------------------------------------

# BILLING API

## GET /billing/unpaid

Danh sách hóa đơn chưa thanh toán.

Database: - HOADON

## GET /billing/invoices/{id}

Chi tiết hóa đơn.

Database: - HOADON - CHITIETHOADON

## PUT /billing/invoices/{id}/payment

Thanh toán hóa đơn.

Cập nhật: - PHUONGTHUCTHANHTOAN - TIENKHACHDUA - TIENTHOILAI -
TRANGTHAITHANHTOAN

------------------------------------------------------------------------

# ADMIN API

## GET /admin/users

Quản lý người dùng.

Database: - NGUOIDUNG

## GET /admin/specialties

Quản lý chuyên khoa.

Database: - CHUYENKHOA

## GET /admin/medicines

Quản lý thuốc.

Database: - THUOC

## GET /admin/services

Quản lý dịch vụ.

Database: - DICHVU

## GET /admin/dashboard/revenue

Thống kê doanh thu.

Database: - HOADON

------------------------------------------------------------------------

# Controller Spring Boot

    controller
    |
    ├── AuthController
    ├── PatientController
    ├── DoctorController
    ├── ReceptionController
    ├── BillingController
    └── AdminController
