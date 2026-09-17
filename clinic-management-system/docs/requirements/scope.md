# PHẠM VI HỆ THỐNG QUẢN LÝ PHÒNG KHÁM

**Phiên bản:** 1.0

## 1. Tổng quan

Hệ thống Quản lý Phòng khám là một ứng dụng di động hỗ trợ quản lý các hoạt động chính của phòng khám.

Hệ thống gồm ứng dụng di động dành cho các nhóm người dùng và Backend xây dựng bằng J2EE, giao tiếp thông qua REST API.

### Các vai trò chính

- **Admin:** Quản trị hệ thống và dữ liệu nền.
- **Doctor:** Bác sĩ thực hiện khám bệnh và kê đơn.
- **Staff:** Nhân viên tiếp nhận, quản lý hàng đợi và thanh toán.
- **Patient:** Bệnh nhân đặt lịch, theo dõi quá trình khám và xem hồ sơ.

---

# 2. Chức năng theo vai trò

## 2.1. Admin

### Quản lý tài khoản

Admin có thể:

- Xem danh sách tài khoản.
- Thêm tài khoản.
- Cập nhật thông tin tài khoản.
- Khóa tài khoản.
- Mở khóa tài khoản.
- Phân quyền tài khoản theo vai trò:
  - Doctor
  - Staff
  - Patient

Việc khóa tài khoản không được xóa dữ liệu lịch sử liên quan đến tài khoản.

### Quản lý chuyên khoa

Admin có thể:

- Thêm chuyên khoa.
- Cập nhật chuyên khoa.
- Ngừng sử dụng chuyên khoa.
- Xem danh sách chuyên khoa.

Ví dụ:

- Nội khoa
- Ngoại khoa
- Nhi khoa
- Tai Mũi Họng
- Da liễu

### Quản lý thuốc

Admin có thể quản lý:

- Tên thuốc.
- Đơn vị tính.
- Đơn giá.
- Số lượng tồn kho.
- Trạng thái sử dụng.

Hệ thống phải đảm bảo số lượng tồn kho không được âm.

### Theo dõi hoạt động phòng khám

Admin có thể:

- Xem lịch làm việc của bác sĩ.
- Xem danh sách lịch hẹn.
- Theo dõi tình trạng khám.
- Xem lịch sử hóa đơn.

### Thống kê

Hệ thống cung cấp các thống kê cơ bản:

- Doanh thu theo tháng.
- Doanh thu theo quý.
- Tổng số lượt khám.
- Số lượt khám theo bác sĩ.
- Danh sách bác sĩ theo số lượt bệnh nhân đã tiếp nhận.

---

# 2.2. Doctor — Bác sĩ

### Quản lý lịch làm việc

Bác sĩ có thể:

- Đăng ký lịch làm việc.
- Cập nhật lịch làm việc.
- Xem lịch làm việc của bản thân.

Lịch làm việc được sử dụng để xác định các khung giờ bệnh nhân có thể đặt lịch.

### Quản lý lịch hẹn

Bác sĩ có thể:

- Xem danh sách bệnh nhân đã đặt lịch.
- Xem lịch hẹn theo ngày.
- Xem thông tin bệnh nhân.
- Xác nhận lịch hẹn.
- Từ chối lịch hẹn.

### Khám bệnh

Khi bệnh nhân đã đến phòng khám và được đưa vào lượt khám, bác sĩ có thể:

- Xem thông tin cá nhân bệnh nhân.
- Xem lịch sử khám trước đó.
- Xem lý do khám.
- Ghi nhận triệu chứng.
- Chọn chẩn đoán từ danh mục bệnh.
- Ghi nhận chẩn đoán bổ sung bằng nội dung tự do nếu cần.
- Ghi chú quá trình điều trị.

### Kê đơn điện tử

Bác sĩ có thể:

- Chọn thuốc.
- Nhập số lượng.
- Nhập liều dùng.
- Nhập số ngày sử dụng.
- Nhập hướng dẫn sử dụng.

Chỉ được kê các thuốc đang được phép sử dụng và còn tồn kho.

### Hoàn tất khám

Khi bác sĩ hoàn tất việc khám:

1. Lưu hồ sơ khám.
2. Tạo đơn thuốc nếu có.
3. Trừ thuốc trong kho.
4. Tạo hóa đơn.
5. Cập nhật trạng thái lượt khám thành hoàn tất.

Các thao tác trên phải được thực hiện trong cùng một giao dịch cơ sở dữ liệu.

---

# 2.3. Staff — Nhân viên

## Tiếp nhận bệnh nhân

### Bệnh nhân có lịch hẹn

Staff có thể:

- Tìm lịch hẹn bằng mã lịch hẹn.
- Xác nhận bệnh nhân đã đến.
- Tạo lượt xếp hàng.
- Đưa bệnh nhân vào hàng đợi.

### Bệnh nhân Walk-in

Bệnh nhân không có lịch hẹn có thể đến trực tiếp.

Staff có thể:

- Tìm bệnh nhân bằng số điện thoại.
- Tìm bằng CCCD.
- Tìm bằng BHYT nếu hệ thống có lưu thông tin này.
- Tạo hồ sơ bệnh nhân nhanh nếu chưa tồn tại.
- Ghi nhận lý do khám.
- Ghi nhận triệu chứng ban đầu.
- Tạo lượt khám Walk-in.
- Đưa bệnh nhân vào hàng đợi.

Lượt khám Walk-in và lượt khám đặt lịch được xử lý theo cùng một luồng phía sau.

## Đo sinh hiệu

Staff có thể ghi nhận:

- Huyết áp.
- Nhịp tim.
- Nhiệt độ.
- Chiều cao.
- Cân nặng.
- SpO2.

Thông tin này được lưu cho lượt khám tương ứng.

## Phân phòng và xếp hàng

Staff có thể:

- Chọn phòng khám.
- Gán bác sĩ.
- Tạo số thứ tự.
- In phiếu khám.
- Theo dõi hàng đợi.
- Chuyển phòng nếu cần.
- Bỏ qua lượt khám.
- Gọi lại lượt đã bỏ qua.

## Theo dõi hàng đợi

Hệ thống hiển thị các trạng thái:

- Đang chờ.
- Đang khám.
- Đã bỏ qua.
- Đã hoàn thành.

## Thanh toán

Sau khi bác sĩ hoàn tất khám, Staff có thể:

- Xem hóa đơn.
- Xem tiền khám.
- Xem tiền thuốc.
- Xem tổng tiền.
- Xác nhận thanh toán.

Các phương thức thanh toán trong phạm vi đồ án:

- Tiền mặt.
- Chuyển khoản/QR mô phỏng.
- Thẻ mô phỏng.

Không tích hợp hệ thống thanh toán ngân hàng thực tế trong phiên bản này.

## Báo cáo ca làm việc

Staff có thể xem:

- Tổng số bệnh nhân.
- Số bệnh nhân đặt lịch online.
- Số bệnh nhân Walk-in.
- Tổng tiền mặt.
- Tổng tiền chuyển khoản.
- Tổng tiền theo phương thức thanh toán.

Hệ thống hỗ trợ xuất/in báo cáo bàn giao ca.

---

# 2.4. Patient — Bệnh nhân

## Tài khoản

Bệnh nhân có thể:

- Đăng ký tài khoản.
- Đăng nhập.
- Cập nhật thông tin cá nhân.

Thông tin có thể bao gồm:

- Họ tên.
- Năm sinh.
- Địa chỉ.
- Số điện thoại.
- Tiền sử bệnh.

## Đặt lịch khám

Bệnh nhân thực hiện:

```text
Chọn chuyên khoa
      ↓
Chọn bác sĩ
      ↓
Chọn ngày
      ↓
Chọn khung giờ còn trống
      ↓
Nhập lý do khám
      ↓
Nhập triệu chứng ban đầu
      ↓
Xác nhận đặt lịch
```

Hệ thống phải kiểm tra lịch làm việc và tình trạng khung giờ trước khi tạo lịch hẹn.

## Theo dõi lịch hẹn

Bệnh nhân có thể:

- Xem lịch hẹn.
- Xem trạng thái lịch hẹn.
- Hủy lịch nếu còn đủ điều kiện.
- Xem mã lịch hẹn.

## Xem lịch sử khám

Bệnh nhân có thể xem:

- Lịch sử khám.
- Triệu chứng.
- Chẩn đoán.
- Ghi chú của bác sĩ.
- Đơn thuốc.
- Hướng dẫn sử dụng thuốc.
- Hóa đơn.
- Trạng thái thanh toán.

## Trợ lý AI

AI hỗ trợ:

- Giải đáp câu hỏi về quy trình phòng khám.
- Hướng dẫn sử dụng các chức năng của ứng dụng.
- Gợi ý chuyên khoa dựa trên triệu chứng thông thường.

AI không có quyền:

- Đưa ra chẩn đoán chính thức.
- Kê đơn thuốc.
- Quyết định phương pháp điều trị.

AI chỉ là chức năng hỗ trợ và không được làm ảnh hưởng đến các chức năng chính của hệ thống nếu API AI gặp lỗi.

---

# 3. Luồng nghiệp vụ chính

## 3.1. Bệnh nhân đặt lịch

```text
Patient
  ↓
Chọn chuyên khoa
  ↓
Chọn bác sĩ
  ↓
Chọn lịch làm việc
  ↓
Chọn khung giờ
  ↓
Nhập lý do + triệu chứng
  ↓
Tạo Appointment
  ↓
Doctor xác nhận
```

## 3.2. Bệnh nhân đến khám

```text
Appointment CONFIRMED
        ↓
Staff Check-in
        ↓
Ghi nhận sinh hiệu
        ↓
Tạo QueueTicket
        ↓
Chờ gọi
        ↓
Doctor khám
```

## 3.3. Bệnh nhân Walk-in

```text
Patient đến trực tiếp
        ↓
Staff tìm/tạo Patient
        ↓
Tạo lượt khám Walk-in
        ↓
Ghi nhận lý do + triệu chứng
        ↓
Tạo QueueTicket
        ↓
Ghi nhận sinh hiệu
        ↓
Doctor khám
```

## 3.4. Hoàn tất khám

```text
Doctor hoàn tất khám
        ↓
MedicalRecord
        ↓
Prescription
        ↓
Trừ Medicine tồn kho
        ↓
Invoice
        ↓
Appointment COMPLETED
        ↓
Staff thanh toán
```

Các bước lưu hồ sơ khám, kê đơn, trừ kho và tạo hóa đơn phải nằm trong cùng một transaction.

---

# 4. Ngoài phạm vi phiên bản đồ án

Các chức năng sau không thuộc phạm vi phiên bản 1.0:

- Chẩn đoán bệnh bằng AI.
- AI tự động kê đơn.
- Tư vấn điều trị tự động.
- Video call với bác sĩ.
- Chat realtime với bác sĩ.
- Gửi SMS thực tế.
- Gửi email tự động.
- Tích hợp cổng thanh toán ngân hàng thật.
- Tích hợp hệ thống bệnh viện bên ngoài.
- Đồng bộ hồ sơ bệnh án với hệ thống y tế bên ngoài.
- Quản lý kho dược nâng cao.
- Hệ thống bảo hiểm y tế thực tế.
- Hệ thống thông báo realtime phức tạp.

---

# 5. Ưu tiên triển khai

## Bắt buộc

- Đăng ký/đăng nhập.
- Phân quyền.
- Quản lý bệnh nhân.
- Quản lý bác sĩ.
- Quản lý nhân viên.
- Quản lý chuyên khoa.
- Quản lý thuốc.
- Lịch làm việc.
- Đặt lịch.
- Xác nhận lịch.
- Check-in.
- Hàng đợi.
- Khám bệnh.
- Hồ sơ khám.
- Kê đơn.
- Trừ tồn kho.
- Hóa đơn.
- Thanh toán.
- Lịch sử khám.

## Nên có

- Dashboard.
- Báo cáo ca làm việc.
- QR mô phỏng.
- In/xuất hóa đơn.
- Trợ lý AI.

## Có thể phát triển sau

- Thanh toán thật.
- Thông báo realtime.
- SMS/email.
- Video tư vấn.
- Chat realtime.
- Tích hợp hệ thống y tế bên ngoài.