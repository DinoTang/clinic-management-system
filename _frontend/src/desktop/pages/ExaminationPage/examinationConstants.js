/**
 * HẰNG SỐ & DANH MỤC DÙNG CHO TRANG KHÁM BỆNH CỦA BÁC SĨ
 */

/* Danh mục mẫu khi backend chưa có API thuốc/dịch vụ (theo seed quanlyphongkham.sql) */
export const FALLBACK_MEDICINES = [
  { id: "TH001", name: "Amlor 5mg", unit: "Viên", price: 10500, stock: 1500 },
  { id: "TH002", name: "Lipitor 20mg", unit: "Viên", price: 22000, stock: 800 },
  { id: "TH003", name: "Nexium 40mg", unit: "Viên", price: 24000, stock: 1200 },
  { id: "TH004", name: "Kremil-S", unit: "Viên", price: 2500, stock: 2000 },
  {
    id: "TH005",
    name: "Amoxicillin 500mg",
    unit: "Viên",
    price: 4000,
    stock: 3000,
  },
];

export const FALLBACK_SERVICES = [
  { id: "DV_ECG", name: "Điện tâm đồ (ECG 12 chuyển đạo)", price: 100000 },
  { id: "DV_ECHO", name: "Siêu âm tim màu Doppler", price: 350000 },
  { id: "DV_NSDD", name: "Nội soi dạ dày gây mê", price: 900000 },
  {
    id: "DV_XNBL",
    name: "Xét nghiệm vi khuẩn HP qua hơi thở",
    price: 450000,
  },
];

// Danh mục mẫu kết quả định sẵn cho từng loại dịch vụ chỉ định
export const SERVICE_RESULT_TEMPLATES = {
  DV_ECG: [
    "Bình thường - Nhịp xoang đều, tần số trong giới hạn sinh lý",
    "Nhịp xoang nhanh (tần số > 100 lần/phút)",
    "Nhịp xoang chậm (tần số < 60 lần/phút)",
    "Ngoại tâm thu thất rải rác",
    "Thiếu máu cơ tim cục bộ (sóng T âm / ST chênh nhẹ)",
    "Dày thất trái theo tiêu chuẩn điện thế",
  ],
  DV_ECHO: [
    "Bình thường - Chức năng tâm thu thất trái bảo tồn (EF > 60%), không rối loạn vận động vùng",
    "Hở van hai lá nhẹ (1/4), buồng thất trái không dãn",
    "Hở van động mạch chủ nhẹ (1/4), không hẹp van",
    "Dày đồng tâm thành thất trái nhẹ, giảm thư giãn thất trái độ 1",
    "Suy giảm chức năng tâm thu thất trái mức độ nhẹ (EF 48%)",
  ],
  DV_NSDD: [
    "Bình thường - Niêm mạc thực quản, dạ dày và tá tràng trơn láng",
    "Viêm sung huyết hang vị dạ dày mức độ nhẹ",
    "Viêm trợt niêm mạc hang vị dạ dày",
    "Trào ngược dạ dày thực quản (GERD độ A)",
    "Loét bờ cong nhỏ dạ dày (kích thước ~5mm, đáy sạch)",
    "Viêm loét hành tá tràng sung huyết",
  ],
  DV_XNBL: [
    "Âm tính (-) - Không nhiễm vi khuẩn Helicobacter pylori",
    "Dương tính (+) - Nhiễm vi khuẩn Helicobacter pylori",
    "Dương tính mạnh (+++) - Nhiễm Helicobacter pylori nồng độ cao",
  ],
};

export function getResultTemplatesForService(serviceId, serviceName = "") {
  if (serviceId && SERVICE_RESULT_TEMPLATES[serviceId]) {
    return SERVICE_RESULT_TEMPLATES[serviceId];
  }
  const sName = (serviceName || "").toLowerCase();
  if (
    sName.includes("x-quang") ||
    sName.includes("xquang") ||
    sName.includes("chụp")
  ) {
    return [
      "Bình thường - Tim phổi chưa thấy tổn thương bệnh lý trên phim",
      "Viêm phế quản - Rốn phổi hai bên đậm, tăng tuần hoàn rốn phổi",
      "Đám mờ thùy dưới phổi (hình ảnh theo dõi viêm phổi)",
      "Bóng tim to nhẹ, các phế trường sáng",
      "Không thấy tổn thương gãy xương hoặc trật khớp",
    ];
  }
  if (
    sName.includes("máu") ||
    sName.includes("huyết học") ||
    sName.includes("cbc")
  ) {
    return [
      "Các chỉ số tế bào máu trong giới hạn bình thường",
      "Bạch cầu tăng nhẹ (theo dõi phản ứng viêm / nhiễm khuẩn)",
      "Thiếu máu nhược sắc mức độ nhẹ (Hb giảm nhẹ)",
      "Tiểu cầu trong giới hạn bình thường",
    ];
  }
  if (
    sName.includes("đường") ||
    sName.includes("glucose") ||
    sName.includes("hba1c")
  ) {
    return [
      "Đường huyết lúc đói bình thường (4.4 - 6.1 mmol/L)",
      "Tăng đường huyết lúc đói (> 7.0 mmol/L)",
      "Hạ đường huyết nhẹ (< 3.9 mmol/L)",
      "HbA1c đạt mục tiêu kiểm soát (< 6.5%)",
    ];
  }
  if (sName.includes("nước tiểu")) {
    return [
      "Tổng phân tích nước tiểu 10 thông số trong giới hạn bình thường",
      "Có hồng cầu và bạch cầu niệu (theo dõi nhiễm khuẩn tiết niệu)",
      "Protein niệu dương tính (+)",
    ];
  }
  if (sName.includes("siêu âm")) {
    return [
      "Chưa phát hiện hình ảnh bất thường trên siêu âm",
      "Gan nhiễm mỡ độ 1, nhu mô gan đều",
      "Sỏi thận kích thước nhỏ (< 4mm), đài bể thận không ứ nước",
      "Dày thành túi mật nhẹ",
    ];
  }
  return [
    "Bình thường - Không phát hiện dấu hiệu bất thường",
    "Kết quả trong giới hạn sinh lý bình thường",
    "Có dấu hiệu viêm nhẹ, đề nghị theo dõi lâm sàng",
    "Bất thường - Đề nghị làm thêm chẩn đoán chuyên sâu",
  ];
}

export const STATUS_META = {
  ChoKham: { label: "Chờ khám", cls: "status-chokham" },
  DangKham: { label: "Đang khám", cls: "status-dangkham" },
  DaKham: { label: "Đã khám", cls: "status-dakham" },
  BoQua: { label: "Bỏ qua", cls: "status-boqua" },
  QuaHan: { label: "Quá hạn", cls: "status-quahan" },
};

export const EMPTY_EXAM = {
  symptoms: "",
  generalExam: "",
  localExam: "",
  diagnosis: "",
  prognosis: "",
  notes: "",
};

export const EMPTY_VITALS = {
  pulse: "",
  temperature: "",
  bloodPressure: "",
  weight: "",
  height: "",
};
