export const USER_STATUS = Object.freeze({
  ACTIVE: 'Đang hoạt động',
  LOCKED: 'Đã khóa',
});

export const USER_ROLE = Object.freeze({
  DEV: 'Nhà phát triển',
  ADMIN: 'Quản trị viên',
  DOCTOR: 'Bác sĩ',
  STAFF: 'Nhân viên',
  PATIENT: 'Bệnh nhân',
});

export const SPECIALTY_STATUS = Object.freeze({
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Chuyên khoa ngừng hoạt động',
});

export const ROOM_STATUS = Object.freeze({
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Phòng khám ngừng hoạt động',
});

export const APPOINTMENT_STATUS = Object.freeze({
  BOOKED: 'Đã đặt',
  ARRIVED: 'Đã đến',
  EXAMINED: 'Đã khám',
  COMPLETED: 'Hoàn tất',
  CANCELLED: 'Đã hủy',
});

export const SERVICE_CATALOG_STATUS = Object.freeze({
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Dịch vụ ngừng hoạt động',
});

export const PAYMENT_METHOD = Object.freeze({
  CASH: 'Tiền mặt',
  TRANSFER: 'Chuyển khoản',
  CARD: 'Thẻ',
});

export const PAYMENT_STATUS = Object.freeze({
  UNPAID: 'Chưa thanh toán',
  PAID: 'Đã thanh toán',
  CANCELLED: 'Đã hủy',
});

export const INVOICE_ITEM_TYPE = Object.freeze({
  EXAMINATION_FEE: 'Phí khám',
  SERVICE: 'Dịch vụ',
  MEDICINE: 'Thuốc',
});
