# QUY TẮC NGHIỆP VỤ HỆ THỐNG

**Phiên bản:** 1.0

## 1. Tài khoản và phân quyền

### BR-001 — Mỗi tài khoản có một vai trò chính

Một tài khoản phải thuộc một trong các vai trò:

- `ADMIN`
- `DOCTOR`
- `STAFF`
- `PATIENT`

### BR-002 — Tài khoản bị khóa không được đăng nhập

Khi tài khoản ở trạng thái `LOCKED`, hệ thống phải từ chối đăng nhập.

### BR-003 — Khóa tài khoản không xóa dữ liệu

Khi khóa tài khoản, dữ liệu lịch sử liên quan đến tài khoản phải được giữ lại.

Ví dụ:

- Lịch hẹn cũ.
- Hồ sơ khám.
- Đơn thuốc.
- Hóa đơn.
- Thanh toán.

### BR-004 — Không lưu mật khẩu dạng rõ

Mật khẩu phải được lưu dưới dạng đã băm.

---

# 2. Bệnh nhân

### BR-005 — Số điện thoại định danh bệnh nhân

Số điện thoại của bệnh nhân phải được kiểm tra theo quy tắc định danh của hệ thống.

### BR-006 — Không tạo bệnh nhân trùng

Khi Staff tạo bệnh nhân Walk-in, hệ thống phải tìm kiếm bệnh nhân hiện có trước khi tạo mới.

### BR-007 — Hồ sơ bệnh nhân không bị xóa khi có lịch sử

Không được xóa vật lý bệnh nhân nếu bệnh nhân đã có:

- Lịch hẹn.
- Lượt khám.
- Hồ sơ khám.
- Đơn thuốc.
- Hóa đơn.

Có thể sử dụng trạng thái ngừng hoạt động thay cho xóa vật lý.

---

# 3. Chuyên khoa

### BR-008 — Tên chuyên khoa không được trùng

Hai chuyên khoa đang hoạt động không được có cùng tên.

### BR-009 — Chuyên khoa không được sử dụng không thể đặt lịch mới

Nếu chuyên khoa bị ngừng hoạt động, bệnh nhân không được sử dụng chuyên khoa đó để tạo lịch hẹn mới.

Lịch sử cũ vẫn được giữ lại.

---

# 4. Bác sĩ

### BR-010 — Bác sĩ phải thuộc ít nhất một chuyên khoa đang hoạt động

Một bác sĩ chỉ được nhận lịch khám thuộc chuyên khoa mà bác sĩ được phân công.

### BR-011 — Bác sĩ không hoạt động không nhận lịch mới

Bác sĩ bị khóa hoặc ngừng hoạt động không được nhận lịch hẹn mới.

### BR-012 — Bác sĩ không được có lịch làm việc trùng

Một bác sĩ không được tạo hai lịch làm việc bị chồng lấn trong cùng khoảng thời gian.

---

# 5. Lịch làm việc

### BR-013 — Lịch làm việc phải có thời gian hợp lệ

Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.

### BR-014 — Không đặt lịch ngoài thời gian làm việc

Lịch hẹn chỉ được tạo trong khung thời gian mà bác sĩ đã đăng ký.

### BR-015 — Không được đặt trùng khung giờ

Một khung giờ đã có lịch hẹn hợp lệ thì không được tạo thêm lịch hẹn vượt quá số lượng bệnh nhân cho phép.

### BR-016 — Không đặt lịch với lịch làm việc đã hủy

Lịch làm việc bị hủy hoặc ngừng hoạt động không được sử dụng để tạo lịch hẹn mới.

---

# 6. Lịch hẹn

### BR-017 — Lịch hẹn phải xác định bệnh nhân

Mỗi lịch hẹn phải liên kết với một bệnh nhân.

### BR-018 — Lịch hẹn phải xác định bác sĩ

Mỗi lịch hẹn phải liên kết với một bác sĩ.

### BR-019 — Lịch hẹn phải thuộc một chuyên khoa

Chuyên khoa của lịch hẹn phải phù hợp với chuyên khoa mà bác sĩ phụ trách.

### BR-020 — Lịch hẹn phải có lý do khám

Khi bệnh nhân đặt lịch, phải ghi nhận lý do khám.

### BR-021 — Bệnh nhân không được đặt hai lịch trùng thời gian

Một bệnh nhân không được có hai lịch hẹn đang hoạt động cùng thời điểm.

### BR-022 — Lịch hẹn phải được kiểm tra ở Backend

Không được chỉ kiểm tra lịch trống ở ứng dụng di động.

Backend phải kiểm tra lại:

- Bác sĩ.
- Lịch làm việc.
- Khung giờ.
- Lịch hẹn trùng.
- Trạng thái tài khoản.

### BR-023 — Bác sĩ chỉ được xử lý lịch của mình

Doctor chỉ được xác nhận hoặc từ chối lịch hẹn thuộc về mình.

### BR-024 — Lịch đã hoàn tất không được hủy

Lịch hẹn ở trạng thái `COMPLETED` không được chuyển sang `CANCELLED`.

---

# 7. Walk-in

### BR-025 — Walk-in không cần lịch hẹn trước

Bệnh nhân Walk-in có thể được Staff tạo lượt khám trực tiếp.

### BR-026 — Walk-in dùng chung luồng khám

Lượt khám Walk-in phải sử dụng cùng các thành phần:

- QueueTicket.
- MedicalRecord.
- Prescription.
- Invoice.
- Payment.

với bệnh nhân đặt lịch.

### BR-027 — Phân biệt nguồn lượt khám

Lượt khám phải lưu nguồn:

- `ONLINE`
- `WALK_IN`

Điều này giúp thống kê số bệnh nhân đặt lịch và bệnh nhân đến trực tiếp.

---

# 8. Check-in

### BR-028 — Chỉ được Check-in lịch hợp lệ

Lịch hẹn chỉ được Check-in khi đang ở trạng thái `CONFIRMED`.

### BR-029 — Check-in chỉ thực hiện một lần

Một lịch hẹn không được tạo nhiều lượt Check-in hợp lệ.

### BR-030 — Check-in tạo lượt hàng đợi

Sau khi Check-in thành công, hệ thống phải tạo `QueueTicket`.

---

# 9. Sinh hiệu

### BR-031 — Sinh hiệu thuộc về lượt khám

Các thông tin:

- Huyết áp.
- Nhịp tim.
- Nhiệt độ.
- Chiều cao.
- Cân nặng.
- SpO2.

phải được liên kết với lượt khám tương ứng.

### BR-032 — Không ghi đè lịch sử cũ

Dữ liệu sinh hiệu của những lần khám trước không được cập nhật khi Staff nhập sinh hiệu cho lần khám mới.

---

# 10. Hàng đợi

### BR-033 — Mỗi lượt khám chỉ có một vé hàng đợi đang hoạt động

Không được tạo nhiều QueueTicket đang hoạt động cho cùng một lượt khám.

### BR-034 — Số thứ tự tăng theo ngày

Số thứ tự được tự động tăng theo ngày khám.

### BR-035 — Số thứ tự không bị thay đổi khi chuyển phòng

Nếu bệnh nhân được chuyển sang phòng khác, số thứ tự hiện tại vẫn được giữ lại.

### BR-036 — Chỉ lượt đang chờ mới được gọi

QueueTicket ở trạng thái `WAITING` mới có thể chuyển sang `IN_PROGRESS`.

### BR-037 — Lượt bị bỏ qua có thể gọi lại

QueueTicket ở trạng thái `SKIPPED` có thể được chuyển lại `WAITING`.

### BR-038 — Không hoàn thành lượt chưa được khám

QueueTicket không được chuyển trực tiếp từ `WAITING` sang `COMPLETED`.

---

# 11. Khám bệnh

### BR-039 — Chỉ bệnh nhân đã Check-in mới được khám

Bác sĩ chỉ được bắt đầu khám khi lượt khám đã được Check-in và được gọi vào phòng.

### BR-040 — Bác sĩ chỉ khám bệnh nhân được phân công

Doctor không được tự ý mở và xử lý lượt khám của bác sĩ khác nếu không có quyền phù hợp.

### BR-041 — Hồ sơ khám phải gắn với lượt khám

Mỗi lần khám phải tạo một `MedicalRecord` tương ứng.

### BR-042 — Hồ sơ khám phải có thông tin lâm sàng cơ bản

Hồ sơ khám phải lưu ít nhất:

- Triệu chứng.
- Chẩn đoán.
- Ghi chú điều trị.

---

# 12. Đơn thuốc

### BR-043 — Thuốc phải còn tồn kho

Chỉ thuốc có trạng thái đang sử dụng và số lượng tồn kho lớn hơn 0 mới được kê.

### BR-044 — Số lượng thuốc phải hợp lệ

Số lượng kê phải lớn hơn 0.

### BR-045 — Không được kê vượt quá tồn kho

Nếu số lượng kê lớn hơn số lượng tồn kho, hệ thống phải từ chối thao tác.

### BR-046 — Một thuốc không xuất hiện nhiều lần trong cùng đơn

Một `Prescription` không được có nhiều `PrescriptionDetail` cho cùng một `Medicine`.

Nếu cần thay đổi số lượng, cập nhật dòng thuốc hiện tại.

### BR-047 — Không cho tồn kho âm

Sau khi hoàn tất đơn thuốc:

```text
stockAfter = stockBefore - quantity
```

phải đảm bảo:

```text
stockAfter >= 0
```

---

# 13. Transaction khi hoàn tất khám

### BR-048 — Hoàn tất khám phải là một transaction

Các thao tác sau phải thuộc cùng một transaction:

```text
MedicalRecord
      ↓
Prescription
      ↓
PrescriptionDetail
      ↓
Trừ Medicine stock
      ↓
Invoice
      ↓
Appointment COMPLETED
```

### BR-049 — Có lỗi phải Rollback

Nếu bất kỳ thao tác nào thất bại, toàn bộ transaction phải Rollback.

Ví dụ:

```text
Tạo MedicalRecord       ✓
Tạo Prescription        ✓
Trừ thuốc               ✗
```

Kết quả:

```text
MedicalRecord           Rollback
Prescription            Rollback
Trừ thuốc               Rollback
Invoice                 Không tạo
Appointment             Không COMPLETED
```

### BR-050 — Chỉ hoàn tất khám khi transaction thành công

Appointment chỉ được chuyển thành `COMPLETED` sau khi toàn bộ nghiệp vụ hoàn tất thành công.

---

# 14. Hóa đơn

### BR-051 — Hóa đơn được tạo sau khi hoàn tất khám

Khi Doctor hoàn tất khám thành công, hệ thống tự động tạo hóa đơn.

### BR-052 — Hóa đơn ban đầu chưa thanh toán

Hóa đơn mới tạo có trạng thái:

```text
UNPAID
```

### BR-053 — Tổng tiền do Backend tính

Mobile không được tự quyết định tổng tiền hóa đơn.

Backend tính:

```text
Tổng tiền =
Phí khám
+
Tổng tiền thuốc
```

### BR-054 — Giá thuốc phải được lưu tại thời điểm bán

Hóa đơn phải lưu giá thuốc tại thời điểm lập hóa đơn.

Việc thay đổi giá thuốc trong tương lai không được làm thay đổi các hóa đơn cũ.

### BR-055 — Hóa đơn đã thanh toán không được chỉnh sửa

Hóa đơn ở trạng thái `PAID` không được thay đổi tổng tiền.

---

# 15. Thanh toán

### BR-056 — Chỉ hóa đơn chưa thanh toán mới được thanh toán

Không được thanh toán hóa đơn:

- `PAID`
- `CANCELLED`

### BR-057 — Số tiền thanh toán phải khớp

Trong phiên bản 1.0, hệ thống không hỗ trợ thanh toán từng phần.

Số tiền thanh toán phải bằng số tiền còn phải trả.

### BR-058 — Phương thức thanh toán hợp lệ

Chỉ chấp nhận:

```text
CASH
BANK_TRANSFER
CARD
```

### BR-059 — Thanh toán thành công cập nhật hóa đơn

Khi thanh toán thành công:

```text
Payment → SUCCESS
Invoice → PAID
```

Hai thao tác phải đảm bảo tính nhất quán dữ liệu.

### BR-060 — Thanh toán chỉ là mô phỏng

Phiên bản 1.0 không kết nối ngân hàng hoặc cổng thanh toán thực tế.

---

# 16. Thuốc và tồn kho

### BR-061 — Không xóa vật lý thuốc đã từng được sử dụng

Nếu thuốc đã xuất hiện trong đơn thuốc hoặc hóa đơn, không được xóa vật lý khỏi database.

Có thể chuyển sang trạng thái `INACTIVE`.

### BR-062 — Thuốc không hoạt động không được kê mới

Thuốc `INACTIVE` không được xuất hiện trong danh sách thuốc có thể kê.

### BR-063 — Thay đổi giá không ảnh hưởng dữ liệu cũ

Giá thuốc mới chỉ áp dụng cho các giao dịch mới.

---

# 17. AI

### BR-064 — AI chỉ hỗ trợ

AI không được xem là nguồn quyết định y khoa chính thức.

### BR-065 — Không cho AI tự kê đơn

AI không được tạo Prescription.

### BR-066 — Không cho AI tự tạo MedicalRecord

AI không được tự động ghi chẩn đoán vào hồ sơ khám chính thức.

### BR-067 — AI không ảnh hưởng chức năng chính

Nếu API AI lỗi hoặc không phản hồi, các chức năng:

- Đặt lịch.
- Check-in.
- Khám.
- Kê đơn.
- Hóa đơn.
- Thanh toán.

vẫn phải hoạt động bình thường.

### BR-068 — Không gửi dữ liệu bệnh án không cần thiết cho AI

Phiên bản 1.0 chỉ nên gửi dữ liệu tối thiểu cần thiết cho chức năng AI.

Không gửi toàn bộ hồ sơ bệnh án nếu chức năng không yêu cầu.

---

# 18. Bảo toàn dữ liệu lịch sử

### BR-069 — Không xóa dữ liệu giao dịch lịch sử

Các dữ liệu sau phải được bảo toàn:

- Lịch hẹn.
- Lượt khám.
- Hồ sơ khám.
- Đơn thuốc.
- Hóa đơn.
- Thanh toán.

### BR-070 — Dữ liệu lịch sử phải tham chiếu được

Ngay cả khi:

- Bác sĩ nghỉ làm.
- Thuốc ngừng sử dụng.
- Chuyên khoa ngừng hoạt động.
- Tài khoản bị khóa.

dữ liệu lịch sử vẫn phải xem được.

---

# 19. Phân quyền API

### BR-071 — Backend phải kiểm tra quyền

Không được chỉ ẩn nút chức năng trên mobile.

Ví dụ:

Patient không thể gọi API quản lý thuốc chỉ bằng cách tự tạo request.

### BR-072 — Người dùng chỉ được truy cập dữ liệu thuộc quyền

Patient chỉ được xem:

- Hồ sơ của chính mình.
- Lịch hẹn của chính mình.
- Lịch sử khám của chính mình.
- Hóa đơn của chính mình.

### BR-073 — Không trả Entity trực tiếp cho Mobile

Backend nên sử dụng DTO để kiểm soát dữ liệu trả về API.

---

# 20. Tính nhất quán dữ liệu

### BR-074 — Backend là nơi kiểm tra nghiệp vụ chính

Các điều kiện quan trọng phải được kiểm tra tại Backend.

Mobile chỉ hỗ trợ kiểm tra giao diện để cải thiện trải nghiệm.

### BR-075 — Không tin dữ liệu tổng tiền từ Mobile

Mobile chỉ gửi thông tin chi tiết.

Backend tự tính:

- Tiền thuốc.
- Phí khám.
- Tổng hóa đơn.

### BR-076 — Không tin số lượng tồn kho từ Mobile

Backend phải đọc tồn kho hiện tại từ database trước khi trừ thuốc.

### BR-077 — Các thao tác quan trọng phải có transaction phù hợp

Đặc biệt:

- Hoàn tất khám.
- Trừ thuốc.
- Tạo hóa đơn.
- Thanh toán.