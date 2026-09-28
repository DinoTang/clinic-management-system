# LUỒNG TRẠNG THÁI HỆ THỐNG

**Phiên bản:** 1.0

Tài liệu này quy định các trạng thái và hướng chuyển trạng thái hợp lệ của các đối tượng chính trong hệ thống.

---

# 1. Trạng thái tài khoản

```text
ACTIVE
  │
  ▼
LOCKED
  │
  ▼
ACTIVE
```

## `ACTIVE`

Tài khoản được phép đăng nhập và sử dụng chức năng theo quyền.

## `LOCKED`

Tài khoản bị khóa và không được đăng nhập.

### Chuyển trạng thái

```text
ACTIVE  → LOCKED
LOCKED  → ACTIVE
```

Admin là người có quyền thay đổi trạng thái tài khoản.

---

# 2. Trạng thái lịch hẹn — Appointment

```text
                 ┌─────────────┐
                 │   PENDING   │
                 └──────┬──────┘
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
       ┌───────────┐        ┌───────────┐
       │ CONFIRMED │        │ REJECTED  │
       └─────┬─────┘        └───────────┘
             │
             ▼
       ┌─────────────┐
       │ CHECKED_IN  │
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │ IN_PROGRESS │
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │  COMPLETED  │
       └─────────────┘
```

Ngoài ra:

```text
PENDING    → CANCELLED
CONFIRMED  → CANCELLED
CONFIRMED  → NO_SHOW
```

## `PENDING`

Bệnh nhân vừa tạo lịch và đang chờ bác sĩ xử lý.

Có thể chuyển:

```text
PENDING → CONFIRMED
PENDING → REJECTED
PENDING → CANCELLED
```

## `CONFIRMED`

Bác sĩ đã xác nhận lịch hẹn.

Bệnh nhân có thể đến phòng khám để Check-in.

Có thể chuyển:

```text
CONFIRMED → CHECKED_IN
CONFIRMED → CANCELLED
CONFIRMED → NO_SHOW
```

## `CHECKED_IN`

Bệnh nhân đã đến phòng khám.

Sau khi Check-in, hệ thống tạo QueueTicket.

Có thể chuyển:

```text
CHECKED_IN → IN_PROGRESS
```

## `IN_PROGRESS`

Bệnh nhân đang được bác sĩ khám.

Có thể chuyển:

```text
IN_PROGRESS → COMPLETED
```

## `COMPLETED`

Lần khám đã hoàn tất.

Sau trạng thái này không được chuyển ngược về trạng thái đang khám.

## `REJECTED`

Bác sĩ từ chối lịch hẹn.

Đây là trạng thái kết thúc.

## `CANCELLED`

Lịch hẹn bị hủy.

Đây là trạng thái kết thúc.

## `NO_SHOW`

Bệnh nhân không đến khám theo lịch.

Đây là trạng thái kết thúc.

---

# 3. Nguồn lịch/lượt khám

Hệ thống phân biệt nguồn:

```text
ONLINE
WALK_IN
```

## `ONLINE`

Lượt khám được tạo thông qua chức năng đặt lịch của Patient.

Luồng:

```text
Patient
  ↓
Appointment PENDING
  ↓
CONFIRMED
  ↓
CHECKED_IN
```

## `WALK_IN`

Lượt khám được Staff tạo trực tiếp khi bệnh nhân đến phòng khám.

Luồng:

```text
Staff
  ↓
Tạo lượt WALK_IN
  ↓
CHECKED_IN
  ↓
QueueTicket WAITING
```

Walk-in không cần đi qua `PENDING` và `CONFIRMED`.

---

# 4. Trạng thái hàng đợi — QueueTicket

```text
                 ┌─────────┐
                 │ WAITING │
                 └────┬────┘
                      │
             ┌────────┴────────┐
             ▼                 ▼
      ┌─────────────┐    ┌─────────┐
      │ IN_PROGRESS │    │ SKIPPED │
      └──────┬──────┘    └────┬────┘
             │                │
             ▼                │
       ┌───────────┐           │
       │ COMPLETED │           │
       └───────────┘           │
                               │
                               ▼
                           WAITING
```

## `WAITING`

Bệnh nhân đã Check-in và đang chờ gọi.

## `IN_PROGRESS`

Bệnh nhân đang được khám.

## `SKIPPED`

Bệnh nhân được gọi nhưng chưa vào khám.

Staff có thể gọi lại:

```text
SKIPPED → WAITING
```

## `COMPLETED`

Lượt khám đã kết thúc.

### Chuyển trạng thái hợp lệ

```text
WAITING      → IN_PROGRESS
WAITING      → SKIPPED

SKIPPED      → WAITING

IN_PROGRESS  → COMPLETED
```

Không cho phép:

```text
WAITING → COMPLETED
SKIPPED → COMPLETED
COMPLETED → WAITING
```

---

# 5. Quan hệ giữa Appointment và QueueTicket

Hai đối tượng này không nên dùng chung một trạng thái.

Ví dụ:

```text
Appointment
    CHECKED_IN

QueueTicket
    WAITING
```

Điều này có nghĩa:

> Bệnh nhân đã đến phòng khám nhưng vẫn đang chờ trong hàng đợi.

Khi được gọi:

```text
Appointment
    CHECKED_IN → IN_PROGRESS

QueueTicket
    WAITING → IN_PROGRESS
```

Khi khám xong:

```text
Appointment
    IN_PROGRESS → COMPLETED

QueueTicket
    IN_PROGRESS → COMPLETED
```

Khi bị bỏ qua:

```text
Appointment
    vẫn CHECKED_IN

QueueTicket
    WAITING → SKIPPED
```

Đây là lý do không nên gộp trạng thái Queue vào Appointment.

---

# 6. Trạng thái hóa đơn — Invoice

```text
        ┌────────┐
        │ UNPAID │
        └───┬────┘
            │
       ┌────┴─────┐
       ▼          ▼
   ┌──────┐   ┌───────────┐
   │ PAID │   │ CANCELLED │
   └──────┘   └───────────┘
```

## `UNPAID`

Hóa đơn đã được tạo nhưng chưa thanh toán.

## `PAID`

Hóa đơn đã được thanh toán thành công.

## `CANCELLED`

Hóa đơn bị hủy bởi nghiệp vụ hợp lệ.

### Chuyển trạng thái

```text
UNPAID → PAID
UNPAID → CANCELLED
```

Không cho phép:

```text
PAID → UNPAID
CANCELLED → PAID
```

---

# 7. Trạng thái thanh toán — Payment

```text
             ┌─────────┐
             │ PENDING │
             └────┬────┘
                  │
           ┌──────┴──────┐
           ▼             ▼
      ┌─────────┐   ┌────────┐
      │ SUCCESS │   │ FAILED │
      └─────────┘   └────────┘
```

## `PENDING`

Giao dịch đang chờ xác nhận.

## `SUCCESS`

Thanh toán thành công.

Khi Payment chuyển sang:

```text
SUCCESS
```

thì Invoice tương ứng phải chuyển:

```text
UNPAID → PAID
```

## `FAILED`

Thanh toán thất bại.

Có thể thực hiện lại một giao dịch thanh toán mới nếu hóa đơn vẫn ở `UNPAID`.

---

# 8. Trạng thái thuốc — Medicine

```text
ACTIVE
  │
  ▼
INACTIVE
```

Có thể kích hoạt lại:

```text
INACTIVE → ACTIVE
```

## `ACTIVE`

Thuốc được phép kê và sử dụng trong các giao dịch mới nếu tồn kho hợp lệ.

## `INACTIVE`

Thuốc không được sử dụng cho đơn thuốc mới.

Dữ liệu lịch sử của thuốc vẫn được giữ lại.

---

# 9. Trạng thái chuyên khoa — Specialty

```text
ACTIVE
  │
  ▼
INACTIVE
```

Có thể kích hoạt lại:

```text
INACTIVE → ACTIVE
```

Chuyên khoa `INACTIVE` không xuất hiện trong danh sách để bệnh nhân đặt lịch mới.

---

# 10. Trạng thái lịch làm việc — DoctorSchedule

Để tránh thiết kế quá phức tạp ở phiên bản đầu, lịch làm việc có thể sử dụng:

```text
AVAILABLE
CANCELLED
```

## `AVAILABLE`

Lịch làm việc đang có hiệu lực và có thể được sử dụng để đặt lịch.

## `CANCELLED`

Lịch làm việc đã bị hủy.

Không được tạo lịch hẹn mới trên một DoctorSchedule đã `CANCELLED`.

---

# 11. Hồ sơ khám — MedicalRecord

Trong phiên bản 1.0, không cần tạo quá nhiều trạng thái cho MedicalRecord.

Hồ sơ khám được tạo khi bác sĩ hoàn tất quá trình khám.

Luồng:

```text
Doctor khám
    ↓
Nhập thông tin
    ↓
Hoàn tất khám
    ↓
MedicalRecord được lưu
```

Việc tạo MedicalRecord nằm trong transaction hoàn tất khám.

---

# 12. Đơn thuốc — Prescription

Trong phiên bản 1.0, Prescription được tạo cùng lúc với quá trình hoàn tất khám.

Luồng:

```text
Doctor kê thuốc
      ↓
Prescription
      ↓
PrescriptionDetail
      ↓
Kiểm tra tồn kho
      ↓
Trừ kho
```

Nếu trừ kho thất bại:

```text
Rollback Prescription
Rollback PrescriptionDetail
Rollback MedicalRecord
Không tạo Invoice
Không chuyển Appointment → COMPLETED
```

---

# 13. Luồng hoàn tất khám tổng thể

Đây là luồng transaction quan trọng nhất của Backend:

```text
                 Doctor
                   │
                   ▼
            Hoàn tất khám
                   │
                   ▼
            ┌──────────────┐
            │ MedicalRecord│
            └──────┬───────┘
                   │
                   ▼
             Prescription
                   │
                   ▼
          Kiểm tra tồn kho
                   │
          ┌────────┴────────┐
          │                 │
       Đủ thuốc          Không đủ
          │                 │
          ▼                 ▼
       Trừ kho           ROLLBACK
          │
          ▼
        Invoice
          │
          ▼
Appointment COMPLETED
```

Toàn bộ các thao tác thành công:

```text
COMMIT
```

Nếu một bước thất bại:

```text
ROLLBACK
```

---

# 14. Luồng thanh toán tổng thể

```text
Invoice UNPAID
      ↓
Staff chọn phương thức
      ↓
Tạo Payment
      ↓
Xác nhận thanh toán
      ↓
Payment SUCCESS
      ↓
Invoice PAID
```

Nếu thanh toán thất bại:

```text
Payment FAILED
      ↓
Invoice vẫn UNPAID
```

---

# 15. Luồng khám hoàn chỉnh

## Đặt lịch Online

```text
Patient
   ↓
PENDING
   ↓
Doctor xác nhận
   ↓
CONFIRMED
   ↓
Patient đến phòng khám
   ↓
CHECKED_IN
   ↓
QueueTicket WAITING
   ↓
Doctor gọi
   ↓
IN_PROGRESS
   ↓
Khám
   ↓
MedicalRecord
   ↓
Prescription
   ↓
Trừ kho
   ↓
Invoice UNPAID
   ↓
COMPLETED
   ↓
Payment
   ↓
Invoice PAID
```

## Walk-in

```text
Patient đến trực tiếp
        ↓
Staff tạo lượt WALK_IN
        ↓
CHECKED_IN
        ↓
QueueTicket WAITING
        ↓
IN_PROGRESS
        ↓
Khám
        ↓
MedicalRecord
        ↓
Prescription
        ↓
Trừ kho
        ↓
Invoice UNPAID
        ↓
COMPLETED
        ↓
Payment
        ↓
Invoice PAID
```