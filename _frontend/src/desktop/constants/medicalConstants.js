/**
 * HẰNG SỐ Y KHOA: TRIỆU CHỨNG THEO KHOA, DANH MỤC ICD-10 & PHÁC ĐỒ THUỐC
 * Áp dụng chuẩn y tế cho quy trình: Tiếp nhận -> Khám ICD-10 -> Kê đơn thuốc
 */

// 1. TRIỆU CHỨNG THƯỜNG GẶP THEO CHUYÊN KHOA
export const SPECIALTY_COMMON_SYMPTOMS = {
  CK_NOI: [
    "Sốt nhẹ / sốt kéo dài",
    "Đau đầu, hoa mắt, chóng mặt",
    "Mệt mỏi toàn thân, uể oải",
    "Ăn uống kém, sút cân",
    "Khó ngủ, mất ngủ kinh niên",
    "Đau mỏi cơ bắp, ê ẩm mình mẩy",
  ],
  CK_TIM: [
    "Đau tức ngực trái từng cơn",
    "Hồi hộp, tim đập nhanh, đánh trống ngực",
    "Khó thở khi gắng sức hoặc nằm ngửa",
    "Huyết áp tăng cao / dao động",
    "Phù mềm hai mu bàn chân, cẳng chân",
    "Choáng váng khi thay đổi tư thế",
  ],
  CK_TAI: [
    "Đau rát cổ họng, nuốt vướng",
    "Ho khan, ho có đờm",
    "Nghẹt mũi, chảy nước mũi trong / đặc",
    "Ù tai, giảm thính lực một bên",
    "Khàn tiếng kéo dài trên 1 tuần",
    "Ngứa tai, chảy mủ hoặc dịch tai",
  ],
  CK_NHI: [
    "Sốt cao, sốt theo cơn",
    "Ho nhiều, thở khò khè, thở rít",
    "Nôn trớ nhiều lần trong ngày",
    "Quấy khóc không dứt, lờ đờ",
    "Bỏ bú, chán ăn, biếng bú",
    "Đi ngoài phân lỏng, nhiều lần",
    "Nổi mẩn đỏ, phát ban khắp người",
  ],
  DEFAULT: [
    "Sốt nhẹ",
    "Đau đầu",
    "Mệt mỏi",
    "Chóng mặt",
    "Đau bụng",
    "Buồn nôn",
    "Khó thở nhẹ",
    "Đau mỏi người",
  ],
};

// 2. DANH MỤC MÃ BỆNH ICD-10 PHỔ BIẾN TẠI PHÒNG KHÁM ĐA KHOA
export const ICD10_CATALOG = [
  // Hô hấp / Tai Mũi Họng (J00 - J99)
  {
    code: "J02.9",
    name: "Viêm họng cấp, không xác định",
    specialty: "CK_TAI",
    chapter: "Hô hấp",
  },
  {
    code: "J00",
    name: "Viêm mũi họng cấp [Cảm thường]",
    specialty: "CK_TAI",
    chapter: "Hô hấp",
  },
  {
    code: "J01.9",
    name: "Viêm xoang cấp, không xác định",
    specialty: "CK_TAI",
    chapter: "Hô hấp",
  },
  {
    code: "J03.9",
    name: "Viêm amiđan cấp, không xác định",
    specialty: "CK_TAI",
    chapter: "Hô hấp",
  },
  {
    code: "J20.9",
    name: "Viêm phế quản cấp, không xác định",
    specialty: "CK_NOI",
    chapter: "Hô hấp",
  },
  {
    code: "J45.9",
    name: "Cơn hen phế quản thể nhẹ",
    specialty: "CK_NOI",
    chapter: "Hô hấp",
  },

  // Tim mạch & Huyết áp (I00 - I99)
  {
    code: "I10",
    name: "Bệnh tăng huyết áp vô căn (nguyên phát)",
    specialty: "CK_TIM",
    chapter: "Tim mạch",
  },
  {
    code: "I20.9",
    name: "Cơn đau thắt ngực, không xác định",
    specialty: "CK_TIM",
    chapter: "Tim mạch",
  },
  {
    code: "E78.0",
    name: "Tăng cholesterol máu thuần túy (Rối loạn lipid máu)",
    specialty: "CK_TIM",
    chapter: "Chuyển hóa",
  },
  {
    code: "I49.9",
    name: "Rối loạn nhịp tim, không xác định",
    specialty: "CK_TIM",
    chapter: "Tim mạch",
  },

  // Tiêu hóa (K00 - K93)
  {
    code: "K29.7",
    name: "Viêm dạ dày, không xác định",
    specialty: "CK_NOI",
    chapter: "Tiêu hóa",
  },
  {
    code: "K21.9",
    name: "Bệnh trào ngược dạ dày - thực quản (GERD)",
    specialty: "CK_NOI",
    chapter: "Tiêu hóa",
  },
  {
    code: "K25.9",
    name: "Loét dạ dày, không xác định cấp hay mạn",
    specialty: "CK_NOI",
    chapter: "Tiêu hóa",
  },
  {
    code: "K58.9",
    name: "Hội chứng ruột kích thích (IBS)",
    specialty: "CK_NOI",
    chapter: "Tiêu hóa",
  },

  // Nội tiết & Chuyển hóa (E00 - E90)
  {
    code: "E11.9",
    name: "Đái tháo đường típ 2 không có biến chứng",
    specialty: "CK_NOI",
    chapter: "Nội tiết",
  },
  {
    code: "M10.9",
    name: "Bệnh gút (Gout), không xác định",
    specialty: "CK_NOI",
    chapter: "Cơ xương khớp",
  },

  // Nhi khoa & Nhiễm khuẩn (A00 - B99, R50)
  {
    code: "A09",
    name: "Tiêu chảy và viêm dạ dày - ruột do nhiễm khuẩn",
    specialty: "CK_NHI",
    chapter: "Nhiễm khuẩn",
  },
  {
    code: "R50.9",
    name: "Sốt không rõ nguyên nhân",
    specialty: "CK_NHI",
    chapter: "Triệu chứng",
  },
  {
    code: "B34.9",
    name: "Nhiễm vi rút, không xác định",
    specialty: "CK_NHI",
    chapter: "Nhiễm khuẩn",
  },
];

// 3. PHÁC ĐỒ GỢI Ý THUỐC THEO MÃ BỆNH ICD-10
// Khớp với danh mục thuốc trong Database:
// TH001: Amlor 5mg (Amlodipine)
// TH002: Lipitor 20mg (Atorvastatin)
// TH003: Nexium 40mg (Esomeprazole)
// TH004: Kremil-S (Antacid dạ dày)
// TH005: Amoxicillin 500mg (Kháng sinh)
export const ICD10_MEDICINE_PRESETS = {
  // Hô hấp / Viêm họng / Viêm xoang / Viêm phế quản
  "J02.9": [
    {
      medicineId: "TH005",
      quantity: 14,
      dosage: "1 viên x 2 lần/ngày (sau ăn sáng, tối)",
    },
  ],
  "J00": [
    {
      medicineId: "TH005",
      quantity: 10,
      dosage: "1 viên x 2 lần/ngày (sau ăn)",
    },
  ],
  "J01.9": [
    {
      medicineId: "TH005",
      quantity: 20,
      dosage: "1 viên x 2 lần/ngày (uống 10 ngày)",
    },
  ],
  "J03.9": [
    {
      medicineId: "TH005",
      quantity: 14,
      dosage: "1 viên x 2 lần/ngày (uống 7 ngày)",
    },
  ],
  "J20.9": [
    {
      medicineId: "TH005",
      quantity: 14,
      dosage: "1 viên x 2 lần/ngày (uống 7 ngày)",
    },
  ],

  // Tim mạch & Mỡ máu
  "I10": [
    {
      medicineId: "TH001",
      quantity: 30,
      dosage: "1 viên/ngày (uống vào buổi sáng cố định)",
    },
  ],
  "E78.0": [
    {
      medicineId: "TH002",
      quantity: 30,
      dosage: "1 viên/ngày (uống vào buổi tối trước khi đi ngủ)",
    },
  ],
  "I20.9": [
    {
      medicineId: "TH001",
      quantity: 30,
      dosage: "1 viên/ngày (uống sáng)",
    },
    {
      medicineId: "TH002",
      quantity: 30,
      dosage: "1 viên/ngày (uống tối)",
    },
  ],

  // Tiêu hóa / Dạ dày / Trào ngược
  "K29.7": [
    {
      medicineId: "TH003",
      quantity: 14,
      dosage: "1 viên/ngày (uống trước ăn sáng 30 phút)",
    },
    {
      medicineId: "TH004",
      quantity: 20,
      dosage: "Nhai 1 viên sau ăn khi có cảm giác đau rát",
    },
  ],
  "K21.9": [
    {
      medicineId: "TH003",
      quantity: 28,
      dosage: "1 viên/ngày (uống trước ăn sáng 30 phút)",
    },
    {
      medicineId: "TH004",
      quantity: 20,
      dosage: "Nhai 1 viên khi ợ chua hoặc đau tức ngực",
    },
  ],
  "K25.9": [
    {
      medicineId: "TH003",
      quantity: 28,
      dosage: "1 viên/ngày (uống trước ăn sáng 30 phút)",
    },
    {
      medicineId: "TH005",
      quantity: 28,
      dosage: "1 viên x 2 lần/ngày (phác đồ diệt khuẩn kèm theo)",
    },
  ],
};

/**
 * Trợ giúp lấy danh sách triệu chứng thường gặp theo chuyên khoa
 */
export function getSymptomsBySpecialty(specialtyId) {
  if (!specialtyId) return SPECIALTY_COMMON_SYMPTOMS.DEFAULT;
  const key = String(specialtyId).toUpperCase();
  if (key.includes("TIM")) return SPECIALTY_COMMON_SYMPTOMS.CK_TIM;
  if (key.includes("TAI") || key.includes("TMH") || key.includes("HOHAP"))
    return SPECIALTY_COMMON_SYMPTOMS.CK_TAI;
  if (key.includes("NHI")) return SPECIALTY_COMMON_SYMPTOMS.CK_NHI;
  if (key.includes("NOI")) return SPECIALTY_COMMON_SYMPTOMS.CK_NOI;
  return SPECIALTY_COMMON_SYMPTOMS[key] || SPECIALTY_COMMON_SYMPTOMS.DEFAULT;
}
