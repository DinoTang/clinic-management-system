import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  BILLING_UNPAID_API,
  CLINIC_CONFIG,
  INVOICE_API,
  MEDICAL_RECORD_API,
  PATIENT_API,
  RECEPTION_API,
} from "./billingConstants.js";
import { formatVnd, removeVietnameseTones } from "./billingUtils.js";

export function useBilling() {
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
  const [momoQrMode, setMomoQrMode] = useState("app"); // "app" | "vietqr"

  // Cấu hình thông tin nhận tiền viện phí (MoMo / VietQR) - lưu tạm vào localStorage để dễ đổi số
  const [clinicConfig, setClinicConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("clinic_payment_config");
      if (saved) {
        return { ...CLINIC_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Failed to parse saved clinic config:", e);
    }
    return CLINIC_CONFIG;
  });

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

  // Modal chỉnh sửa thông tin thanh toán MoMo & VietQR (lưu tạm localStorage)
  const handleEditPaymentConfig = async () => {
    const result = await Swal.fire({
      title: "Cấu hình Ví MoMo & Chuyển khoản",
      html: `
        <div style="text-align: left; font-size: 13px; display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
          <div style="background: #fdf2f8; border: 1px solid #fbcfe8; padding: 10px; border-radius: 8px; color: #831843; font-size: 12px; line-height: 1.45;">
            <b>Lưu ý MoMo:</b> Khi quét mà app MoMo báo <i>"Bạn đang chuyển đến ví chưa xác thực"</i> là do số điện thoại này chưa hoàn thành định danh CCCD (eKYC) trên MoMo. Bạn hãy nhập <b>Số MoMo đã xác thực CCCD</b> tại đây để quét chuyển tiền ngay.
          </div>
          <div>
            <label style="font-weight: 600; display: block; margin-bottom: 3px; color: #a50064;">Số điện thoại MoMo nhận tiền:</label>
            <input id="swal-momo-phone" class="swal2-input" style="width: 100%; margin: 0; box-sizing: border-box; font-size: 14px; height: 38px;" placeholder="Ví dụ: 0912345678" value="${clinicConfig.momoPhone || ""}" />
          </div>
          <div>
            <label style="font-weight: 600; display: block; margin-bottom: 3px; color: #a50064;">Tên chủ Ví MoMo:</label>
            <input id="swal-momo-owner" class="swal2-input" style="width: 100%; margin: 0; box-sizing: border-box; font-size: 14px; height: 38px;" placeholder="Ví dụ: VO GIA HUY" value="${clinicConfig.momoOwnerName || ""}" />
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 4px 0;" />
          <div>
            <label style="font-weight: 600; display: block; margin-bottom: 3px; color: #1e3a8a;">Số tài khoản Ngân hàng (VietQR):</label>
            <input id="swal-bank-acc" class="swal2-input" style="width: 100%; margin: 0; box-sizing: border-box; font-size: 14px; height: 38px;" placeholder="Ví dụ: 9704..." value="${clinicConfig.bankAccount || ""}" />
          </div>
          <div>
            <label style="font-weight: 600; display: block; margin-bottom: 3px; color: #1e3a8a;">Tên chủ tài khoản Ngân hàng:</label>
            <input id="swal-bank-owner" class="swal2-input" style="width: 100%; margin: 0; box-sizing: border-box; font-size: 14px; height: 38px;" placeholder="Ví dụ: VO GIA HUY" value="${clinicConfig.bankOwnerName || ""}" />
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Lưu cấu hình",
      denyButtonText: "Đặt lại mặc định",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#a50064",
      denyButtonColor: "#64748b",
      preConfirm: () => {
        const momoPhone = (
          document.getElementById("swal-momo-phone")?.value || ""
        ).trim();
        const momoOwner = (
          document.getElementById("swal-momo-owner")?.value || ""
        ).trim();
        const bankAccount = (
          document.getElementById("swal-bank-acc")?.value || ""
        ).trim();
        const bankOwner = (
          document.getElementById("swal-bank-owner")?.value || ""
        ).trim();
        if (!momoPhone) {
          Swal.showValidationMessage("Vui lòng nhập số điện thoại MoMo!");
          return false;
        }
        return {
          momoPhone,
          momoOwnerName: momoOwner || "CHU VI MOMO",
          bankAccount: bankAccount || clinicConfig.bankAccount,
          bankOwnerName: bankOwner || clinicConfig.bankOwnerName,
        };
      },
    });

    if (result.isDenied) {
      setClinicConfig(CLINIC_CONFIG);
      try {
        localStorage.removeItem("clinic_payment_config");
      } catch (err) {
        console.error(err);
      }
      Swal.fire({
        icon: "info",
        title: "Đã khôi phục mặc định!",
        timer: 1400,
        showConfirmButton: false,
      });
      return;
    }

    if (result.isConfirmed && result.value) {
      const formValues = result.value;
      const updated = {
        ...clinicConfig,
        ...formValues,
      };
      setClinicConfig(updated);
      try {
        localStorage.setItem("clinic_payment_config", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save clinic config:", err);
      }
      Swal.fire({
        icon: "success",
        title: "Đã cập nhật thông tin nhận tiền!",
        text: `Mã QR MoMo & VietQR đã được làm mới tức thì.`,
        timer: 1600,
        showConfirmButton: false,
      });
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

  // Chuỗi QR Code cho VNPay, MoMo và VietQR
  const vnpayQrPayload = useMemo(() => {
    if (!selectedInvoice) return "";
    return `vnpay://pay?merchant=MEDIGO_CLINIC&invoice=${selectedInvoice.id}&amount=${selectedInvoice.total}&desc=Thanh+toan+vien+phi+${selectedInvoice.id}`;
  }, [selectedInvoice]);

  const cleanMomoPhone = useMemo(
    () =>
      String(clinicConfig.momoPhone || "")
        .replace(/\s+/g, "")
        .trim(),
    [clinicConfig.momoPhone],
  );
  const cleanMomoOwner = useMemo(
    () => removeVietnameseTones(clinicConfig.momoOwnerName || "VO GIA HUY"),
    [clinicConfig.momoOwnerName],
  );

  // Chuỗi QR chuẩn nội bộ Ví MoMo (P2P Wallet-to-Wallet)
  const momoNativeQrPayload = useMemo(() => {
    if (!selectedInvoice) return "";
    const amount = Math.round(Number(selectedInvoice.total) || 0);
    const note = `MOMO ${selectedInvoice.id}`;
    return `2|99|${cleanMomoPhone}|${cleanMomoOwner}||0|0|${amount}|${note}|transfer_myqr`;
  }, [selectedInvoice, cleanMomoPhone, cleanMomoOwner]);

  // Chuỗi QR VietQR Napas 24/7 (quét từ App Ngân hàng vào MoMo)
  const momoVietQrPayload = useMemo(() => {
    if (!selectedInvoice) return "";
    const amount = Math.round(Number(selectedInvoice.total) || 0);
    return `https://img.vietqr.io/image/971025-${cleanMomoPhone}-compact2.png?amount=${amount}&addInfo=MOMO%20${selectedInvoice.id}&accountName=${encodeURIComponent(cleanMomoOwner)}`;
  }, [selectedInvoice, cleanMomoPhone, cleanMomoOwner]);

  const vietQrPayload = useMemo(() => {
    if (!selectedInvoice) return "";
    const cleanBankOwner = removeVietnameseTones(
      clinicConfig.bankOwnerName || "VOGIAHUY",
    );
    return `https://img.vietqr.io/image/${clinicConfig.bankCode}-${clinicConfig.bankAccount}-compact2.png?amount=${selectedInvoice.total}&addInfo=MEDIGO%20${selectedInvoice.id}&accountName=${encodeURIComponent(cleanBankOwner)}`;
  }, [
    selectedInvoice,
    clinicConfig.bankCode,
    clinicConfig.bankAccount,
    clinicConfig.bankOwnerName,
  ]);

  return {
    loggedInStaffId,
    loggedInStaffName,
    currentStaffId,
    // Danh sách & Bộ lọc
    invoices,
    filterTab,
    setFilterTab,
    searchTerm,
    setSearchTerm,
    loadingList,
    filteredInvoices,
    unpaidCount,
    fetchInvoices,
    // Hóa đơn đang chọn & Chi tiết
    selectedInvoice,
    setSelectedInvoice,
    loadingDetails,
    patientMeta,
    handleSelectInvoice,
    // Lập HĐ nhanh
    quickRecordId,
    setQuickRecordId,
    quickLoading,
    handleQuickCreate,
    // Thanh toán & Tiền mặt
    paymentMethod,
    setPaymentMethod,
    amountGiven,
    setAmountGiven,
    isSubmitting,
    totalAmount,
    numGiven,
    changeAmount,
    isCashInsufficient,
    handlePayment,
    // Cấu hình thanh toán
    clinicConfig,
    momoQrMode,
    setMomoQrMode,
    handleEditPaymentConfig,
    // QR Payloads
    vnpayQrPayload,
    momoNativeQrPayload,
    momoVietQrPayload,
    vietQrPayload,
    cleanMomoOwner,
    // Modal in biên lai
    receiptInvoice,
    setReceiptInvoice,
  };
}
