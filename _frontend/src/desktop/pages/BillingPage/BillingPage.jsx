import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import Swal from "sweetalert2";
import "../../styles/billing.css";
import "../../styles/desktop-schedule.css";

const INVOICE_API = "/api/invoices";
const BILLING_UNPAID_API = "/api/billing/unpaid";
const MEDICAL_RECORD_API = "/api/medical-records";
const RECEPTION_API = "/api/receptions";
const PATIENT_API = "/api/patients";

// ========================================================
// CẤU HÌNH THÔNG TIN PHÒNG KHÁM & TÀI KHOẢN NHẬN TIỀN
// 👉 Bạn có thể chỉnh sửa Tên, SĐT MoMo, Ngân hàng tại đây:
// ========================================================
const CLINIC_CONFIG = {
  // 1. Thông tin phòng khám & hiển thị trên hóa đơn/biên lai
  clinicName: "PHÒNG KHÁM ĐA KHOA MEDIGO",
  clinicAddress: "123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh",
  hotline: "1900 6868",

  // 2. Cấu hình Ví MoMo nhận tiền viện phí
  momoPhone: "0339494928", // Số điện thoại nhận tiền MoMo
  momoOwnerName: "TRẦN QUỐC TẤN", // Tên chủ tài khoản MoMo

  // 3. Cấu hình Chuyển khoản VietQR / Ngân hàng
  bankCode: "VBA", // Mã ngân hàng: MB, VCB, BIDV, TCB, VPB...
  bankName: "Agribank (Ngân hàng Nông nghiệp & PTNT)",
  bankAccount: "9704051047237667",
  bankOwnerName: "VOGIAHUY",
};

const formatVnd = (value) =>
  `${new Intl.NumberFormat("vi-VN").format(Number(value) || 0)} ₫`;

/** Chuyển số tiền thành chữ tiếng Việt đơn giản cho biên lai thu tiền */
function numberToVietnameseWords(num) {
  const n = Math.round(Number(num) || 0);
  if (n === 0) return "Không đồng";

  const units = ["", "nghìn", "triệu", "tỷ"];
  const digits = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  function readGroup(g) {
    const h = Math.floor(g / 100);
    const t = Math.floor((g % 100) / 10);
    const o = g % 10;
    let res = "";
    if (h > 0) res += `${digits[h]} trăm `;
    if (t > 1) {
      res += `${digits[t]} mươi `;
      if (o === 1) res += "mốt ";
      else if (o === 5) res += "lăm ";
      else if (o > 0) res += `${digits[o]} `;
    } else if (t === 1) {
      res += "mười ";
      if (o === 5) res += "lăm ";
      else if (o > 0) res += `${digits[o]} `;
    } else if (o > 0) {
      if (h > 0) res += "lẻ ";
      res += `${digits[o]} `;
    }
    return res.trim();
  }

  let temp = n;
  let groupIndex = 0;
  const parts = [];

  while (temp > 0) {
    const g = temp % 1000;
    if (g > 0) {
      const gStr = readGroup(g);
      parts.unshift(`${gStr} ${units[groupIndex]}`.trim());
    }
    temp = Math.floor(temp / 1000);
    groupIndex++;
  }

  const result = parts.join(" ").trim();
  return result.charAt(0).toUpperCase() + result.slice(1) + " đồng chẵn";
}

function BillingPage() {
  // Lấy mã nhân viên thu ngân từ phiên đăng nhập
  const auth = useAuth();
  const staffSession = useMemo(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("clinic-staff-session") || "null",
      );
    } catch {
      return null;
    }
  }, []);

  const loggedInStaffId =
    auth?.user?.staffId ||
    staffSession?.staffId ||
    staffSession?.user?.staffId ||
    "";
  const loggedInStaffName =
    auth?.user?.fullName ||
    staffSession?.user?.fullName ||
    staffSession?.name ||
    "";

  const currentStaffId = loggedInStaffId || "";

  // State danh sách và bộ lọc
  const [invoices, setInvoices] = useState([]);
  const [filterTab, setFilterTab] = useState("unpaid"); // unpaid | paid | all
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingList, setLoadingList] = useState(false);

  // State hóa đơn đang chọn
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [patientMeta, setPatientMeta] = useState(null);

  // State thanh toán
  const [paymentMethod, setPaymentMethod] = useState("CASH"); // CASH | VNPAY | MOMO | BANK_TRANSFER | CARD
  const [amountGiven, setAmountGiven] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State lập hóa đơn nhanh
  const [quickRecordId, setQuickRecordId] = useState("");
  const [quickLoading, setQuickLoading] = useState(false);

  // State modal in biên lai
  const [receiptInvoice, setReceiptInvoice] = useState(null);

  const selectedInvoiceId = selectedInvoice?.id;

  // 1. Tải danh sách hóa đơn theo tab
  const fetchInvoices = useCallback(async () => {
    queueMicrotask(() => setLoadingList(true));
    try {
      let endpoint = INVOICE_API;
      if (filterTab === "unpaid") {
        endpoint = BILLING_UNPAID_API;
      } else if (filterTab === "paid") {
        endpoint = `${INVOICE_API}?status=DaThanhToan`;
      }
      const res = await axios.get(endpoint);
      const list = Array.isArray(res.data) ? res.data : [];
      setInvoices(list);

      // Nếu đang chọn một hóa đơn, cập nhật lại trạng thái mới nhất
      if (selectedInvoiceId) {
        const fresh = list.find((i) => i.id === selectedInvoiceId);
        if (fresh) {
          setSelectedInvoice((prev) => (prev ? { ...prev, ...fresh } : prev));
        }
      }
    } catch (err) {
      console.error("Lỗi tải danh sách hóa đơn:", err);
    } finally {
      setLoadingList(false);
    }
  }, [filterTab, selectedInvoiceId]);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) fetchInvoices();
    });
    return () => {
      active = false;
    };
  }, [fetchInvoices]);

  // 2. Chọn một hóa đơn và tải đầy đủ chi tiết (details)
  const handleSelectInvoice = async (invoice) => {
    setLoadingDetails(true);
    setPatientMeta(null);
    try {
      const res = await axios.get(`${INVOICE_API}/${invoice.id}`);
      const fullInvoice = res.data;
      setSelectedInvoice(fullInvoice);
      setAmountGiven(String(fullInvoice.total || ""));

      // Tải bổ sung thông tin Bệnh án & Bệnh nhân để hiển thị
      if (fullInvoice.medicalRecordId) {
        axios
          .get(`${MEDICAL_RECORD_API}/${fullInvoice.medicalRecordId}`)
          .then(async (recRes) => {
            const medRecord = recRes.data;
            if (medRecord?.receptionId) {
              const repRes = await axios.get(
                `${RECEPTION_API}/${medRecord.receptionId}`,
              );
              const reception = repRes.data;
              let patientData = null;
              if (reception?.patientId) {
                try {
                  const patRes = await axios.get(
                    `${PATIENT_API}/${reception.patientId}`,
                  );
                  patientData = patRes.data;
                } catch {
                  // ignore
                }
              }
              setPatientMeta({
                patientName:
                  reception.patientName ||
                  patientData?.fullName ||
                  reception.patientId,
                patientPhone:
                  reception.patientPhone || patientData?.phoneNumber || "—",
                gender: reception.patientGender || patientData?.gender || "—",
                doctorId: reception.doctorId,
                roomId: reception.roomId,
                diagnosis: medRecord.diagnosis,
              });
            }
          })
          .catch(() => setPatientMeta(null));
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text:
          "Không thể nạp chi tiết hóa đơn: " +
          (err.response?.data?.message || err.message),
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  // 3. Lập hóa đơn nhanh cho bệnh án vừa khám
  const handleQuickCreate = async (e) => {
    e.preventDefault();
    if (!currentStaffId) {
      Swal.fire({
        icon: "warning",
        title: "Chưa đăng nhập nhân viên",
        text: "Không xác định được mã nhân viên đang đăng nhập! Vui lòng đăng nhập lại tài khoản nhân viên thu ngân.",
      });
      return;
    }
    if (!quickRecordId.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Chưa nhập mã",
        text: "Vui lòng nhập mã bệnh án (ví dụ: BA001).",
      });
      return;
    }
    setQuickLoading(true);
    try {
      const res = await axios.post(INVOICE_API, {
        medicalRecordId: quickRecordId.trim().toUpperCase(),
        staffId: currentStaffId,
      });
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: `Đã lập hóa đơn ${res.data.id} cho bệnh án ${quickRecordId}.`,
        timer: 1800,
        showConfirmButton: false,
      });
      setQuickRecordId("");
      await fetchInvoices();
      handleSelectInvoice(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Lập hóa đơn thất bại",
        text:
          err.response?.data?.message ||
          err.message ||
          "Vui lòng kiểm tra lại mã bệnh án.",
      });
    } finally {
      setQuickLoading(false);
    }
  };

  // 4. Tính toán tiền thối lại cho Tiền mặt
  const totalAmount = Number(selectedInvoice?.total) || 0;
  const numGiven = Number(amountGiven) || 0;
  const changeAmount = numGiven >= totalAmount ? numGiven - totalAmount : 0;
  const isCashInsufficient = paymentMethod === "CASH" && numGiven < totalAmount;

  // 5. Xử lý thanh toán
  const handlePayment = async () => {
    if (!selectedInvoice) return;
    if (!currentStaffId) {
      Swal.fire({
        icon: "warning",
        title: "Chưa đăng nhập nhân viên",
        text: "Không xác định được mã nhân viên đang đăng nhập! Vui lòng đăng nhập lại tài khoản nhân viên thu ngân.",
      });
      return;
    }
    if (selectedInvoice.paymentStatus === "DaThanhToan") {
      Swal.fire({
        icon: "info",
        title: "Đã thanh toán",
        text: "Hóa đơn này đã được thanh toán trước đó.",
      });
      return;
    }

    if (paymentMethod === "CASH" && isCashInsufficient) {
      Swal.fire({
        icon: "warning",
        title: "Số tiền chưa đủ",
        text: "Số tiền khách đưa phải lớn hơn hoặc bằng tổng tiền hóa đơn.",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Xác nhận thanh toán",
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><b>Mã hóa đơn:</b> ${selectedInvoice.id}</p>
          <p><b>Tổng tiền:</b> <span style="color: #0f766e; font-size: 16px; font-weight: 700;">${formatVnd(totalAmount)}</span></p>
          <p><b>Phương thức:</b> ${
            paymentMethod === "VNPAY"
              ? "VNPAY-QR"
              : paymentMethod === "MOMO"
                ? "Ví MoMo"
                : paymentMethod === "BANK_TRANSFER"
                  ? "Chuyển khoản (VietQR)"
                  : paymentMethod === "CARD"
                    ? "Quẹt thẻ POS"
                    : "Tiền mặt"
          }</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý thu tiền",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#10b981",
    });

    if (!confirmResult.isConfirmed) return;

    setIsSubmitting(true);
    try {
      const payload = {
        method: paymentMethod,
        amountGiven: paymentMethod === "CASH" ? numGiven : totalAmount,
        staffId: currentStaffId,
      };

      let res;
      try {
        res = await axios.put(
          `${INVOICE_API}/${selectedInvoice.id}/payment`,
          payload,
        );
      } catch (err) {
        if (
          (paymentMethod === "VNPAY" || paymentMethod === "MOMO") &&
          err.response?.status === 400 &&
          String(err.response?.data?.message || "").includes("BR-058")
        ) {
          // Tự động tương thích với backend cũ nếu chưa khởi động lại
          res = await axios.put(
            `${INVOICE_API}/${selectedInvoice.id}/payment`,
            { ...payload, method: "ChuyenKhoan" },
          );
        } else {
          throw err;
        }
      }
      const updatedInvoice = res.data;

      Swal.fire({
        icon: "success",
        title: "Thanh toán thành công!",
        text: `Hóa đơn ${updatedInvoice.id} đã hoàn tất thanh toán.`,
        timer: 1600,
        showConfirmButton: false,
      });

      // Cập nhật lại hóa đơn hiện tại
      setSelectedInvoice((prev) => ({
        ...prev,
        ...updatedInvoice,
      }));

      // Nạp lại danh sách
      await fetchInvoices();

      // Mở modal in biên lai ngay sau khi thanh toán thành công
      setReceiptInvoice({
        ...selectedInvoice,
        ...updatedInvoice,
        patientMeta,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Lỗi thanh toán",
        text:
          err.response?.data?.message ||
          err.message ||
          "Không thể xử lý thanh toán.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Lọc hóa đơn theo tìm kiếm
  const filteredInvoices = useMemo(() => {
    return invoices.filter((item) => {
      const q = searchTerm.trim().toLowerCase();
      if (!q) return true;
      return (
        String(item.id || "")
          .toLowerCase()
          .includes(q) ||
        String(item.medicalRecordId || "")
          .toLowerCase()
          .includes(q) ||
        String(item.staffId || "")
          .toLowerCase()
          .includes(q)
      );
    });
  }, [invoices, searchTerm]);

  // Đếm số lượng hóa đơn chưa thanh toán
  const unpaidCount = useMemo(() => {
    return invoices.filter((i) => i.paymentStatus !== "DaThanhToan").length;
  }, [invoices]);

  // Chuỗi QR Code cho VNPay và MoMo
  const vnpayQrPayload = useMemo(() => {
    if (!selectedInvoice) return "";
    return `vnpay://pay?merchant=MEDIGO_CLINIC&invoice=${selectedInvoice.id}&amount=${selectedInvoice.total}&desc=Thanh+toan+vien+phi+${selectedInvoice.id}`;
  }, [selectedInvoice]);

  const momoQrPayload = useMemo(() => {
    if (!selectedInvoice) return "";
    const amount = Math.round(Number(selectedInvoice.total) || 0);
    const phone = String(CLINIC_CONFIG.momoPhone || "").trim();
    const owner = encodeURIComponent(
      String(CLINIC_CONFIG.momoOwnerName || "").trim(),
    );
    return `https://img.vietqr.io/image/971025-${phone}-compact2.png?amount=${amount}&addInfo=MOMO%20${selectedInvoice.id}&accountName=${owner}`;
  }, [selectedInvoice]);

  const vietQrPayload = useMemo(() => {
    if (!selectedInvoice) return "";
    return `https://img.vietqr.io/image/${CLINIC_CONFIG.bankCode}-${CLINIC_CONFIG.bankAccount}-compact2.png?amount=${selectedInvoice.total}&addInfo=MEDIGO%20${selectedInvoice.id}&accountName=${encodeURIComponent(CLINIC_CONFIG.bankOwnerName)}`;
  }, [selectedInvoice]);

  return (
    <div className="billing-container">
      {/* ================= CỘT TRÁI: DANH SÁCH HÓA ĐƠN ================= */}
      <div className="billing-left">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <h2 className="panel-title" style={{ margin: 0, border: "none" }}>
            <span>💳</span> Quản Lý Hóa Đơn & Viện Phí
          </h2>
          {currentStaffId ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 10px",
                backgroundColor: "#eff6ff",
                color: "#1d4ed8",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                border: "1px solid #bfdbfe",
              }}
              title="Nhân viên thu ngân đang đăng nhập"
            >
              👤 Thu ngân: {loggedInStaffName ? `${loggedInStaffName} (${currentStaffId})` : currentStaffId}
            </span>
          ) : (
            <span
              style={{
                padding: "4px 10px",
                backgroundColor: "#fef2f2",
                color: "#b91c1c",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
                border: "1px solid #fecaca",
              }}
            >
              ⚠️ Chưa đăng nhập nhân viên
            </span>
          )}
        </div>

        {/* Lập hóa đơn nhanh theo mã bệnh án */}
        <form onSubmit={handleQuickCreate} className="quick-invoice-box">
          <label htmlFor="quick-med-id">Lập hóa đơn:</label>
          <div className="input-wrap">
            <input
              id="quick-med-id"
              type="text"
              className="billing-search-input"
              placeholder="Nhập mã bệnh án (BA001...)"
              value={quickRecordId}
              onChange={(e) => setQuickRecordId(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                whiteSpace: "nowrap",
              }}
              disabled={quickLoading}
            >
              {quickLoading ? "Đang tạo..." : "Tạo HĐ"}
            </button>
          </div>
        </form>

        {/* Tabs lọc trạng thái */}
        <div className="billing-filter-tabs">
          <button
            type="button"
            className={`billing-tab-btn ${filterTab === "unpaid" ? "active" : ""}`}
            onClick={() => setFilterTab("unpaid")}
          >
            Chờ thanh toán{" "}
            {filterTab === "unpaid" && unpaidCount > 0 && (
              <span className="badge-count">{unpaidCount}</span>
            )}
          </button>
          <button
            type="button"
            className={`billing-tab-btn ${filterTab === "paid" ? "active" : ""}`}
            onClick={() => setFilterTab("paid")}
          >
            Đã thanh toán
          </button>
          <button
            type="button"
            className={`billing-tab-btn ${filterTab === "all" ? "active" : ""}`}
            onClick={() => setFilterTab("all")}
          >
            Tất cả ({invoices.length})
          </button>
        </div>

        {/* Ô tìm kiếm */}
        <div className="billing-search-box">
          <input
            type="text"
            className="billing-search-input"
            placeholder="🔍 Tìm theo mã HĐ, mã bệnh án..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={fetchInvoices}
            title="Làm mới danh sách"
          >
            🔄
          </button>
        </div>

        {/* Danh sách thẻ hóa đơn */}
        <div className="invoice-list">
          {loadingList ? (
            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                margin: "20px 0",
              }}
            >
              Đang tải danh sách hóa đơn...
            </p>
          ) : filteredInvoices.length === 0 ? (
            <div className="empty-placeholder">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5L19 7.5V19a2 2 0 0 1-2 2z" />
              </svg>
              <span>Không có hóa đơn nào phù hợp</span>
            </div>
          ) : (
            filteredInvoices.map((inv) => {
              const isSelected = selectedInvoice?.id === inv.id;
              const isPaid = inv.paymentStatus === "DaThanhToan";
              return (
                <div
                  key={inv.id}
                  className={`invoice-card ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleSelectInvoice(inv)}
                >
                  <div className="invoice-card-header">
                    <span className="invoice-id">{inv.id}</span>
                    <span
                      className={`status-badge ${isPaid ? "paid" : "unpaid"}`}
                    >
                      {isPaid ? "ĐÃ THANH TOÁN" : "CHỜ THANH TOÁN"}
                    </span>
                  </div>

                  <div className="invoice-card-body">
                    <div>
                      <b>Bệnh án:</b> {inv.medicalRecordId}
                    </div>
                    <div className="invoice-time">
                      NV lập: {inv.staffId} •{" "}
                      {inv.createdAt
                        ? new Date(inv.createdAt).toLocaleDateString("vi-VN")
                        : "Hôm nay"}
                    </div>
                  </div>

                  <div className="invoice-card-footer">
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      Tổng viện phí:
                    </span>
                    <span className="invoice-total">
                      {formatVnd(inv.total)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ================= CỘT PHẢI: BÀN THU NGÂN & THANH TOÁN ================= */}
      <div className="billing-right">
        {!selectedInvoice ? (
          <div className="empty-placeholder" style={{ marginTop: "100px" }}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <h3 style={{ margin: "0", color: "#475569" }}>
              Bàn Thu Ngân Sẵn Sàng
            </h3>
            <p style={{ margin: "0", fontSize: "13px" }}>
              Vui lòng chọn một hóa đơn từ danh sách bên trái để tiến hành kiểm
              tra chi tiết và thu tiền viện phí.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h2
                className="panel-title"
                style={{ border: "none", margin: 0, padding: 0 }}
              >
                <span>🧾</span> Chi Tiết Viện Phí & Thu Ngân
              </h2>
              {selectedInvoice.paymentStatus === "DaThanhToan" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setReceiptInvoice({
                      ...selectedInvoice,
                      patientMeta,
                    })
                  }
                  style={{ fontSize: "13px", padding: "6px 14px" }}
                >
                  🖨️ In Biên Lai
                </button>
              )}
            </div>

            {/* Banner thông tin bệnh nhân & hồ sơ */}
            <div className="checkout-patient-banner">
              <div className="checkout-patient-info">
                <h3>
                  {patientMeta?.patientName ||
                    "Bệnh nhân " + (selectedInvoice.medicalRecordId || "")}
                </h3>
                <div className="checkout-patient-meta">
                  <span>SĐT: {patientMeta?.patientPhone || "—"}</span>
                  <span>Giới tính: {patientMeta?.gender || "—"}</span>
                  <span>Phòng: {patientMeta?.roomId || "PK01"}</span>
                  <span>Bác sĩ: {patientMeta?.doctorId || "BS001"}</span>
                </div>
                {patientMeta?.diagnosis && (
                  <div
                    style={{ fontSize: "12px", marginTop: "4px", opacity: 0.9 }}
                  >
                    <b>Chẩn đoán:</b> {patientMeta.diagnosis}
                  </div>
                )}
              </div>
              <div className="checkout-invoice-tag">
                Hóa đơn: <b>{selectedInvoice.id}</b>
                Bệnh án: {selectedInvoice.medicalRecordId}
              </div>
            </div>

            {/* Bảng chi tiết các khoản mục thu */}
            {loadingDetails ? (
              <p style={{ textAlign: "center", color: "#64748b" }}>
                Đang nạp chi tiết các mục thu...
              </p>
            ) : (
              <table className="breakdown-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Khoản Mục</th>
                    <th>Phân Loại</th>
                    <th style={{ textAlign: "center" }}>Số Lượng</th>
                    <th style={{ textAlign: "right" }}>Đơn Giá</th>
                    <th style={{ textAlign: "right" }}>Thành Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.details &&
                  selectedInvoice.details.length > 0 ? (
                    selectedInvoice.details.map((row, idx) => (
                      <tr key={row.id || idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <b>{row.itemName}</b>
                          {row.note && (
                            <div style={{ fontSize: "11px", color: "#64748b" }}>
                              {row.note}
                            </div>
                          )}
                        </td>
                        <td>
                          <span
                            className={`item-type-tag ${
                              row.itemType === "PhiKham"
                                ? "phikham"
                                : row.itemType === "DichVu"
                                  ? "dichvu"
                                  : "thuoc"
                            }`}
                          >
                            {row.itemType === "PhiKham"
                              ? "Công khám"
                              : row.itemType === "DichVu"
                                ? "Cận lâm sàng"
                                : "Thuốc"}
                          </span>
                        </td>
                        <td style={{ textAlign: "center" }}>{row.quantity}</td>
                        <td style={{ textAlign: "right" }}>
                          {formatVnd(row.unitPrice)}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontWeight: "600",
                            color: "#0f766e",
                          }}
                        >
                          {formatVnd(row.totalPrice)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ textAlign: "center", color: "#94a3b8" }}
                      >
                        Chưa có mục thu chi tiết (được tính gộp theo bệnh án).
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {/* Thanh tổng cộng */}
            <div className="grand-total-bar">
              <div className="label">TỔNG TIỀN PHẢI THANH TOÁN:</div>
              <div className="amount">{formatVnd(selectedInvoice.total)}</div>
            </div>

            {/* KHU VỰC THỰC HIỆN THANH TOÁN (Nếu chưa thanh toán) */}
            {selectedInvoice.paymentStatus !== "DaThanhToan" ? (
              <>
                <div className="payment-methods-title">
                  <span>Phương Thức Thanh Toán:</span>
                </div>

                <div className="payment-methods-grid">
                  {/* TIỀN MẶT */}
                  <div
                    className={`payment-method-card ${
                      paymentMethod === "CASH" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("CASH")}
                  >
                    <div
                      className="icon-wrap"
                      style={{ background: "#dcfce7", color: "#15803d" }}
                    >
                      💵
                    </div>
                    <span className="method-name">Tiền Mặt</span>
                  </div>

                  {/* VNPAY */}
                  <div
                    className={`payment-method-card vnpay ${
                      paymentMethod === "VNPAY" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("VNPAY")}
                  >
                    <div
                      className="icon-wrap"
                      style={{ background: "#e0f2fe", color: "#005baa" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect width="24" height="24" rx="4" fill="#005baa" />
                        <path
                          d="M4 8l4 8 4-8"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 8h4a3 3 0 0 1 0 6h-4v2"
                          stroke="#e11b22"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="method-name" style={{ color: "#005baa" }}>
                      VNPAY-QR
                    </span>
                  </div>

                  {/* VÍ MOMO */}
                  <div
                    className={`payment-method-card momo ${
                      paymentMethod === "MOMO" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("MOMO")}
                  >
                    <div
                      className="icon-wrap"
                      style={{ background: "#fce7f3", color: "#a50064" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect width="24" height="24" rx="4" fill="#a50064" />
                        <circle
                          cx="12"
                          cy="12"
                          r="6"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                        <path d="M9 12h6" stroke="#fff" strokeWidth="2" />
                      </svg>
                    </div>
                    <span className="method-name" style={{ color: "#a50064" }}>
                      Ví MoMo
                    </span>
                  </div>

                  {/* CHUYỂN KHOẢN (VIETQR) */}
                  <div
                    className={`payment-method-card ${
                      paymentMethod === "BANK_TRANSFER" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("BANK_TRANSFER")}
                  >
                    <div
                      className="icon-wrap"
                      style={{ background: "#fef3c7", color: "#b45309" }}
                    >
                      🏦
                    </div>
                    <span className="method-name">VietQR / Bank</span>
                  </div>
                </div>

                {/* NỘI DUNG CHI TIẾT TỪNG PHƯƠNG THỨC */}
                <div className="payment-detail-box">
                  {/* 1. Tiền mặt */}
                  {paymentMethod === "CASH" && (
                    <div className="cash-calculator">
                      <div className="cash-row">
                        <label htmlFor="cash-given">Khách đưa:</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <input
                            id="cash-given"
                            type="number"
                            className="cash-input"
                            value={amountGiven}
                            onChange={(e) => setAmountGiven(e.target.value)}
                            min={totalAmount}
                          />
                          <span style={{ fontWeight: "700" }}>₫</span>
                        </div>
                      </div>

                      <div className="quick-amount-chips">
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            alignSelf: "center",
                          }}
                        >
                          Gợi ý nhanh:
                        </span>
                        <button
                          type="button"
                          className="chip-btn"
                          onClick={() => setAmountGiven(String(totalAmount))}
                        >
                          Đúng số tiền ({formatVnd(totalAmount)})
                        </button>
                        <button
                          type="button"
                          className="chip-btn"
                          onClick={() =>
                            setAmountGiven(String(totalAmount + 50000))
                          }
                        >
                          +50.000 ₫
                        </button>
                        <button
                          type="button"
                          className="chip-btn"
                          onClick={() =>
                            setAmountGiven(String(totalAmount + 100000))
                          }
                        >
                          +100.000 ₫
                        </button>
                        <button
                          type="button"
                          className="chip-btn"
                          onClick={() =>
                            setAmountGiven(String(totalAmount + 200000))
                          }
                        >
                          +200.000 ₫
                        </button>
                        <button
                          type="button"
                          className="chip-btn"
                          onClick={() =>
                            setAmountGiven(String(totalAmount + 500000))
                          }
                        >
                          +500.000 ₫
                        </button>
                      </div>

                      <div
                        className="cash-row"
                        style={{
                          borderTop: "1px dashed #e2e8f0",
                          paddingTop: "8px",
                        }}
                      >
                        <label>Tiền thừa trả khách:</label>
                        <span
                          className={`change-amount-badge ${
                            isCashInsufficient ? "insufficient" : ""
                          }`}
                        >
                          {isCashInsufficient
                            ? "Khách đưa chưa đủ tiền!"
                            : formatVnd(changeAmount)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 2. VNPay-QR */}
                  {paymentMethod === "VNPAY" && (
                    <div className="vnpay-payment-card">
                      <div className="vnpay-qr-wrap">
                        <QRCodeCanvas
                          value={vnpayQrPayload}
                          size={140}
                          level="H"
                          includeMargin
                        />
                        <span className="vnpay-qr-label">VNPAY-QR DYNAMIC</span>
                      </div>

                      <div className="vnpay-info">
                        <div className="vnpay-header-logo">
                          VN<span>PAY</span> <span>QR</span>
                        </div>
                        <div>
                          <b>Điểm chấp nhận thanh toán:</b> PHÒNG KHÁM MEDIGO
                        </div>
                        <div>
                          <b>Mã hóa đơn:</b> {selectedInvoice.id}
                        </div>
                        <div>
                          <b>Số tiền:</b>{" "}
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: "800",
                              color: "#e11b22",
                            }}
                          >
                            {formatVnd(totalAmount)}
                          </span>
                        </div>
                        <div>
                          <b>Nội dung chuyển khoản:</b>{" "}
                          <span
                            style={{
                              background: "#ffffff",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              border: "1px solid #cbd5e1",
                            }}
                          >
                            VNPAY {selectedInvoice.id}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#0369a1",
                            marginTop: "4px",
                          }}
                        >
                          ℹ️ Hướng dẫn: Bệnh nhân mở ứng dụng Ngân hàng (VCB,
                          BIDV, Agribank, VietinBank...) hoặc Ví VNPAY, chọn
                          "Quét QR" để thanh toán.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Ví MoMo */}
                  {paymentMethod === "MOMO" && (
                    <div className="momo-payment-card">
                      <div className="momo-qr-wrap" style={{ padding: "6px" }}>
                        <img
                          src={momoQrPayload}
                          alt="Ví MoMo VietQR"
                          style={{
                            width: "160px",
                            height: "auto",
                            borderRadius: "6px",
                            display: "block",
                          }}
                        />
                        <span
                          className="momo-qr-label"
                          style={{ marginTop: "4px" }}
                        >
                          VÍ MOMO • NAPAS 24/7
                        </span>
                      </div>

                      <div className="momo-info">
                        <div className="momo-header-logo">
                          ví <span>MoMo</span>
                        </div>
                        <div>
                          <b>Tài khoản thụ hưởng:</b>{" "}
                          {CLINIC_CONFIG.momoOwnerName}
                        </div>
                        <div>
                          <b>Số điện thoại MoMo:</b> {CLINIC_CONFIG.momoPhone}
                        </div>
                        <div>
                          <b>Số tiền:</b>{" "}
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: "800",
                              color: "#a50064",
                            }}
                          >
                            {formatVnd(totalAmount)}
                          </span>
                        </div>
                        <div>
                          <b>Lời nhắn chuyển tiền:</b>{" "}
                          <span
                            style={{
                              background: "#ffffff",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              border: "1px solid #fbcfe8",
                            }}
                          >
                            MOMO {selectedInvoice.id}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#831843",
                            marginTop: "4px",
                          }}
                        >
                          ℹ️ Hướng dẫn: Bệnh nhân mở ứng dụng Ví MoMo hoặc App
                          Ngân hàng bất kỳ, chọn "Quét QR" để chuyển viện phí
                          trực tiếp.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. Chuyển khoản VietQR */}
                  {paymentMethod === "BANK_TRANSFER" && (
                    <div
                      className="vnpay-payment-card"
                      style={{ background: "#f8fafc", borderColor: "#cbd5e1" }}
                    >
                      <div className="vnpay-qr-wrap" style={{ padding: "6px" }}>
                        <img
                          src={vietQrPayload}
                          alt="VietQR Napas 24/7"
                          style={{
                            width: "160px",
                            height: "auto",
                            borderRadius: "6px",
                            display: "block",
                          }}
                        />
                        <span
                          className="vnpay-qr-label"
                          style={{ color: "#1e3a8a", marginTop: "4px" }}
                        >
                          NAPAS 24/7 • VIETQR
                        </span>
                      </div>
                      <div className="vnpay-info" style={{ color: "#1e293b" }}>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#1e3a8a",
                          }}
                        >
                          🏦 Chuyển khoản Ngân Hàng (Napas 24/7)
                        </div>
                        <div>
                          <b>Ngân hàng:</b> {CLINIC_CONFIG.bankName}
                        </div>
                        <div>
                          <b>Số tài khoản:</b> {CLINIC_CONFIG.bankAccount}
                        </div>
                        <div>
                          <b>Chủ tài khoản:</b> {CLINIC_CONFIG.bankOwnerName}
                        </div>
                        <div>
                          <b>Số tiền:</b>{" "}
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: "800",
                              color: "#0f766e",
                            }}
                          >
                            {formatVnd(totalAmount)}
                          </span>
                        </div>
                        <div>
                          <b>Nội dung:</b> MEDIGO {selectedInvoice.id}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* NÚT HOÀN TẤT THANH TOÁN */}
                <button
                  type="button"
                  className="btn-pay-submit"
                  onClick={handlePayment}
                  disabled={
                    isSubmitting ||
                    (paymentMethod === "CASH" && isCashInsufficient)
                  }
                >
                  {isSubmitting ? (
                    "Đang xử lý giao dịch..."
                  ) : (
                    <>
                      <span>✅</span> Xác Nhận Đã Thu {formatVnd(totalAmount)} (
                      {paymentMethod === "VNPAY"
                        ? "VNPAY"
                        : paymentMethod === "MOMO"
                          ? "MoMo"
                          : paymentMethod === "BANK_TRANSFER"
                            ? "VietQR"
                            : "Tiền mặt"}
                      )
                    </>
                  )}
                </button>
              </>
            ) : (
              /* ĐÃ THANH TOÁN XONG */
              <div
                style={{
                  background: "#d1fae5",
                  border: "1px solid #6ee7b7",
                  borderRadius: "10px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#065f46" }}>
                    ✅ HÓA ĐƠN NÀY ĐÃ ĐƯỢC THANH TOÁN
                  </h4>
                  <div style={{ fontSize: "13px", color: "#047857" }}>
                    Phương thức:{" "}
                    <b>{selectedInvoice.paymentMethod || "Tiền mặt"}</b> • Thời
                    gian:{" "}
                    {selectedInvoice.paidAt
                      ? new Date(selectedInvoice.paidAt).toLocaleString("vi-VN")
                      : "Vừa xong"}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setReceiptInvoice({
                      ...selectedInvoice,
                      patientMeta,
                    })
                  }
                  style={{ background: "#059669", borderColor: "#059669" }}
                >
                  🖨️ In Lại Biên Lai
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= MODAL IN BIÊN LAI / HÓA ĐƠN THU TIỀN ================= */}
      {receiptInvoice && (
        <div className="receipt-modal-overlay">
          <div className="receipt-modal-card">
            <div className="receipt-header">
              <div className="receipt-clinic-name">
                {CLINIC_CONFIG.clinicName}
              </div>
              <div className="receipt-clinic-sub">
                Địa chỉ: {CLINIC_CONFIG.clinicAddress} • Hotline:{" "}
                {CLINIC_CONFIG.hotline}
              </div>
              <div className="receipt-title">HÓA ĐƠN THU TIỀN VIỆN PHÍ</div>
              <div className="receipt-code">
                Mã HĐ: <b>{receiptInvoice.id}</b> • Bệnh án:{" "}
                <b>{receiptInvoice.medicalRecordId}</b>
              </div>
            </div>

            <div className="receipt-body">
              <div className="receipt-meta-grid">
                <div>
                  Họ tên bệnh nhân:{" "}
                  <b>
                    {receiptInvoice.patientMeta?.patientName || "Nguyễn Văn A"}
                  </b>
                </div>
                <div>
                  SĐT: <b>{receiptInvoice.patientMeta?.patientPhone || "—"}</b>
                </div>
                <div>
                  Bác sĩ khám:{" "}
                  <b>{receiptInvoice.patientMeta?.doctorId || "BS001"}</b>
                </div>
                <div>
                  Phòng khám:{" "}
                  <b>{receiptInvoice.patientMeta?.roomId || "PK01"}</b>
                </div>
                <div>
                  Thời gian lập:{" "}
                  <b>
                    {receiptInvoice.createdAt
                      ? new Date(receiptInvoice.createdAt).toLocaleString(
                          "vi-VN",
                        )
                      : new Date().toLocaleString("vi-VN")}
                  </b>
                </div>
                <div>
                  Thu ngân: <b>{loggedInStaffName ? `${loggedInStaffName} (${currentStaffId})` : (currentStaffId || "N/A")}</b>
                </div>
              </div>

              {/* Bảng mục thu trên biên lai */}
              <table className="receipt-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Nội Dung Thu</th>
                    <th style={{ textAlign: "center" }}>Số Lượng</th>
                    <th style={{ textAlign: "right" }}>Đơn Giá</th>
                    <th style={{ textAlign: "right" }}>Thành Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptInvoice.details &&
                  receiptInvoice.details.length > 0 ? (
                    receiptInvoice.details.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{item.itemName}</td>
                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
                        <td style={{ textAlign: "right" }}>
                          {formatVnd(item.unitPrice)}
                        </td>
                        <td style={{ textAlign: "right", fontWeight: "600" }}>
                          {formatVnd(item.totalPrice)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>1</td>
                      <td>Tổng viện phí (Công khám, xét nghiệm & thuốc)</td>
                      <td style={{ textAlign: "center" }}>1</td>
                      <td style={{ textAlign: "right" }}>
                        {formatVnd(receiptInvoice.total)}
                      </td>
                      <td style={{ textAlign: "right", fontWeight: "600" }}>
                        {formatVnd(receiptInvoice.total)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="receipt-total-section">
                <div className="receipt-total-row grand">
                  <span>TỔNG CỘNG TIỀN PHẢI THU:</span>
                  <span>{formatVnd(receiptInvoice.total)}</span>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "#475569",
                  }}
                >
                  (Bằng chữ: {numberToVietnameseWords(receiptInvoice.total)})
                </div>
                <div className="receipt-total-row" style={{ marginTop: "4px" }}>
                  <span>Phương thức thanh toán:</span>
                  <b>
                    {receiptInvoice.paymentMethod === "VNPAY"
                      ? "VNPAY-QR"
                      : receiptInvoice.paymentMethod === "MOMO"
                        ? "Ví MoMo"
                        : receiptInvoice.paymentMethod === "ChuyenKhoan" ||
                            receiptInvoice.paymentMethod === "BANK_TRANSFER"
                          ? "Chuyển khoản (VietQR)"
                          : "Tiền mặt"}
                  </b>
                </div>
              </div>

              <div className="receipt-stamp-box">
                <div style={{ fontSize: "11px", color: "#64748b" }}>
                  * Lưu ý: Quý khách vui lòng giữ lại hóa đơn để tái khám và đối
                  chiếu.
                </div>
                <div className="receipt-paid-seal">
                  <span>✔ ĐÃ THANH TOÁN</span>
                  <span style={{ fontSize: "10px", fontWeight: "normal" }}>
                    MEDIGO CLINIC
                  </span>
                </div>
              </div>
            </div>

            <div className="receipt-footer-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setReceiptInvoice(null)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  window.print();
                }}
              >
                🖨️ In Hóa Đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingPage;
