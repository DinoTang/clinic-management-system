import http from "node:http";

const doctors = [
  { id: "BS001", user: { fullName: "BS. Nguyễn Văn An" }, specialty: { id: "CK_NOI" } },
  { id: "BS002", user: { fullName: "BS. Trần Thị Bình" }, specialty: { id: "CK_TIM" } },
];

const patients = {
  BN001: {
    id: "BN001",
    fullName: "Lê Văn Cường",
    gender: "Nam",
    dateOfBirth: "1985-03-12",
    phoneNumber: "0912345678",
    address: "12 Lê Lợi, Q.1",
    bloodGroup: "O+",
    healthInsuranceNumber: "DB851234567",
    medicalHistory: "Tăng huyết áp nguyên phát giai đoạn 2 (2024)",
  },
  BN002: {
    id: "BN002",
    fullName: "Phạm Thu Hà",
    gender: "Nữ",
    dateOfBirth: "1992-07-25",
    phoneNumber: "0987654321",
    address: "45 Trần Hưng Đạo, HN",
    bloodGroup: "A+",
    healthInsuranceNumber: null,
    medicalHistory: null,
  },
  BN003: {
    id: "BN003",
    fullName: "Hoàng Minh Đức",
    gender: "Nam",
    dateOfBirth: "2015-11-02",
    phoneNumber: "0909090909",
    address: "8 Phố Huế, HN",
    bloodGroup: "B+",
    healthInsuranceNumber: null,
    medicalHistory: "Viêm phổi tái diễn tuổi thơ",
  },
};

const receptions = [
  { id: "TD001", patientId: "BN001", doctorId: "BS001", roomId: "P101", queueNumber: 1, queueStatus: "DaKham", receptionDate: "2026-10-06", initialSymptoms: "Mệt mỏi, tức ngực trái từng cơn", pulse: 88, temperature: 37.1, bloodPressure: "150/95", weight: 72, height: 171 },
  { id: "TD002", patientId: "BN002", doctorId: "BS001", roomId: "P101", queueNumber: 2, queueStatus: "DangKham", receptionDate: "2026-10-06", initialSymptoms: "Ợ chua, đau thượng vị sau ăn", pulse: 76, temperature: 36.8, bloodPressure: "110/70", weight: 54, height: 160 },
  { id: "TD003", patientId: "BN003", doctorId: "BS001", roomId: "P101", queueNumber: 3, queueStatus: "ChoKham", receptionDate: "2026-10-06", initialSymptoms: "Ho sốt 3 ngày, khò khè", pulse: 96, temperature: 38.2, bloodPressure: "95/60", weight: 22, height: 118 },
  { id: "TD004", patientId: "BN001", doctorId: "BS002", roomId: "P201", queueNumber: 1, queueStatus: "ChoKham", receptionDate: "2026-10-06", initialSymptoms: "Tái khám huyết áp", pulse: null, temperature: null, bloodPressure: null, weight: null, height: null },
];

/* Lịch sử khám cũ để test cột "lần khám trước" */
receptions.push(
  { id: "TD900", patientId: "BN001", doctorId: "BS001", roomId: "P101", queueNumber: 9, queueStatus: "DaKham", receptionDate: "2026-09-18", initialSymptoms: "Tăng huyết áp", pulse: 84, temperature: 36.9, bloodPressure: "145/90", weight: 71, height: 171 },
);

const cors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
};

const send = (res, code, body) => {
  res.statusCode = code;
  res.end(JSON.stringify(body));
};

const server = http.createServer((req, res) => {
  cors(res);
  if (req.method === "OPTIONS") return send(res, 204, {});

  const url = new URL(req.url, "http://localhost:8080");
  const path = url.pathname;
  const method = req.method;
  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", () => {
    const body = raw ? JSON.parse(raw) : {};

    if (method === "GET" && path === "/api/doctors") {
      return send(res, 200, { content: doctors, totalElements: doctors.length });
    }
    if (method === "GET" && path.startsWith("/api/receptions/queue/doctor/")) {
      const docId = path.split("/").pop();
      return send(res, 200, receptions.filter((r) => r.doctorId === docId && r.receptionDate === (url.searchParams.get("date") || "2026-10-06") && r.id !== "TD900"));
    }
    if (method === "GET" && path === "/api/receptions") {
      return send(res, 200, receptions);
    }
    if (method === "PATCH" && /^\/api\/receptions\/[^/]+\/status$/.test(path)) {
      const id = path.split("/")[3];
      const item = receptions.find((r) => r.id === id);
      if (!item) return send(res, 404, { message: "Không tìm thấy lượt khám" });
      item.queueStatus = body.status;
      console.log("[PATCH status]", id, "→", body.status);
      return send(res, 200, item);
    }
    if (method === "PUT" && /^\/api\/receptions\/[^/]+$/.test(path)) {
      const id = path.split("/")[3];
      const item = receptions.find((r) => r.id === id);
      if (!item) return send(res, 404, { message: "Không tìm thấy lượt khám" });
      Object.assign(item, {
        pulse: body.pulse, temperature: body.temperature,
        bloodPressure: body.bloodPressure, weight: body.weight, height: body.height,
      });
      console.log("[PUT vitals]", id, JSON.stringify({ p: item.pulse, t: item.temperature, bp: item.bloodPressure }));
      return send(res, 200, item);
    }
    if (method === "GET" && /^\/api\/patients\/[^/]+$/.test(path)) {
      const id = path.split("/")[3];
      return patients[id] ? send(res, 200, patients[id]) : send(res, 404, { message: "Không tìm thấy BN" });
    }

    /* Backend hiện CHƯA có các API này → 404 để kiểm chứng nhánh fallback của UI */
    if (path === "/api/medical-records" || path === "/api/medicines" || path === "/api/services") {
      console.log("[404 missing API]", method, path);
      return send(res, 404, { message: "Không tìm thấy API (chưa triển khai)" });
    }
    if (method === "POST" && path === "/api/prescriptions") {
      if (!body.medicalRecordId) return send(res, 500, { message: "MABENHAN không tồn tại (FK)" });
      console.log("[POST prescription]", body.medicalRecordId, "lines:", body.details?.length);
      return send(res, 200, { id: "DT999", ...body });
    }
    if (method === "POST" && path === "/api/service-assignments") {
      console.log("[POST service]", body.medicalRecordId, body.serviceId);
      return send(res, 200, { id: body.id, ...body });
    }

    console.log("[unmatched]", method, path);
    return send(res, 404, { message: "Not found" });
  });
});

server.listen(8080, "localhost", () => console.log("Mock API on http://localhost:8080"));
