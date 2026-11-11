/**
 * HẰNG SỐ & CẤU HÌNH DÙNG CHO TRANG QUẢN LÝ HÓA ĐƠN & VIỆN PHÍ (BILLING PAGE)
 */

export const INVOICE_API = "/api/invoices";
export const BILLING_UNPAID_API = "/api/billing/unpaid";
export const MEDICAL_RECORD_API = "/api/medical-records";
export const RECEPTION_API = "/api/receptions";
export const PATIENT_API = "/api/patients";

export const CLINIC_CONFIG = {
  // 1. Thông tin phòng khám & hiển thị trên hóa đơn/biên lai
  clinicName: "PHÒNG KHÁM ĐA KHOA MEDIGO",
  clinicAddress: "123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh",
  hotline: "1900 6868",

  // 2. Cấu hình Ví MoMo nhận tiền viện phí
  momoPhone: "0772663776", // Số điện thoại nhận tiền MoMo
  momoOwnerName: "VÕ ĐẠT HẢI", // Tên chủ tài khoản MoMo

  // 3. Cấu hình Chuyển khoản VietQR / Ngân hàng
  bankCode: "VBA", // Mã ngân hàng: MB, VCB, BIDV, TCB, VPB...
  bankName: "Agribank (Ngân hàng Nông nghiệp & PTNT)",
  bankAccount: "9704051047237667",
  bankOwnerName: "VOGIAHUY",
};
