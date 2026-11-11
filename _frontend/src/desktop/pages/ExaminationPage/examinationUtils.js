/**
 * HÀM TIỆN ÍCH DÙNG CHO TRANG KHÁM BỆNH CỦA BÁC SĨ
 */

export const formatVnd = (value) =>
  `${new Intl.NumberFormat("vi-VN").format(Number(value) || 0)} ₫`;

export const calcAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const diff = Date.now() - birth.getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age >= 0 ? age : null;
};

export const extractError = (err, fallback) =>
  err?.response?.data?.message ||
  err?.response?.data?.error ||
  (typeof err?.response?.data === "string" ? err.response.data : null) ||
  err?.message ||
  fallback;

export const isMissingApi = (err) =>
  [404, 405, 501].includes(err?.response?.status);

/**
 * Sắp xếp hàng đợi: DangKham -> ChoKham (chưa hoãn theo STT, hoãn theo thời điểm) -> BoQua -> DaKham
 */
export const sortQueueItems = (a, b) => {
  const statusPriority = { DangKham: 1, ChoKham: 2, BoQua: 3, DaKham: 4 };
  const pA = statusPriority[a.queueStatus] || 5;
  const pB = statusPriority[b.queueStatus] || 5;
  if (pA !== pB) return pA - pB;

  if (a.queueStatus === "ChoKham" && b.queueStatus === "ChoKham") {
    const aDef = Boolean(a.deferredAt);
    const bDef = Boolean(b.deferredAt);
    if (!aDef && bDef) return -1;
    if (aDef && !bDef) return 1;
    if (aDef && bDef) {
      const tA = new Date(a.deferredAt).getTime() || 0;
      const tB = new Date(b.deferredAt).getTime() || 0;
      if (tA !== tB) return tA - tB;
    }
  }

  const numA = Number(a.queueNumber) || 0;
  const numB = Number(b.queueNumber) || 0;
  return numA - numB;
};
