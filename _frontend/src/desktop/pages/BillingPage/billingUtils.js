/**
 * HÀM TIỆN ÍCH DÙNG CHO TRANG THU NGÂN & HÓA ĐƠN
 */

export const formatVnd = (value) =>
  `${new Intl.NumberFormat("vi-VN").format(Number(value) || 0)} ₫`;

/** Chuyển tiếng Việt có dấu thành không dấu chữ in hoa cho chuỗi QR / VietQR / MoMo */
export function removeVietnameseTones(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase()
    .trim();
}

/** Chuyển số tiền thành chữ tiếng Việt đơn giản cho biên lai thu tiền */
export function numberToVietnameseWords(num) {
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
