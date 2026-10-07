import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { getCollectionData } from "../../../utils/apiResponse.js";
import { getLocalDateString } from "../../../utils/date.js";
import "../../styles/desktop-schedule.css";
import "../../styles/examination.css";

const API_BASE = "http://localhost:8080";
const RECEPTION_API = `${API_BASE}/api/receptions`;
const PATIENT_API = `${API_BASE}/api/patients`;
const DOCTOR_API = `${API_BASE}/api/doctors`;
const MEDICAL_RECORD_API = `${API_BASE}/api/medical-records`;
const PRESCRIPTION_API = `${API_BASE}/api/prescriptions`;
const SERVICE_API = `${API_BASE}/api/service-assignments`;
const MEDICINE_API = `${API_BASE}/api/medicines`;
const SERVICE_CATALOG_API = `${API_BASE}/api/services`;

/* Danh mục mẫu khi backend chưa có API thuốc/dịch vụ (theo seed quanlyphongkham.sql) */
const FALLBACK_MEDICINES = [
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

const FALLBACK_SERVICES = [
  { id: "DV_ECG", name: "Điện tâm đồ (ECG 12 chuyển đạo)", price: 100000 },
  { id: "DV_ECHO", name: "Siêu âm tim màu Doppler", price: 350000 },
  { id: "DV_NSDD", name: "Nội soi dạ dày gây mê", price: 900000 },
  {
    id: "DV_XNBL",
    name: "Xét nghiệm vi khuẩn HP qua hơi thở",
    price: 450000,
  },
];

const STATUS_META = {
  ChoKham: { label: "Chờ khám", cls: "status-chokham" },
  DangKham: { label: "Đang khám", cls: "status-dangkham" },
  DaKham: { label: "Đã khám", cls: "status-dakham" },
  BoQua: { label: "Bỏ qua", cls: "status-boqua" },
};

const EMPTY_EXAM = {
  symptoms: "",
  generalExam: "",
  localExam: "",
  diagnosis: "",
  prognosis: "",
  notes: "",
};

const EMPTY_VITALS = {
  pulse: "",
  temperature: "",
  bloodPressure: "",
  weight: "",
  height: "",
};

const formatVnd = (value) =>
  `${new Intl.NumberFormat("vi-VN").format(Number(value) || 0)} ₫`;

const calcAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const diff = Date.now() - birth.getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age >= 0 ? age : null;
};

const extractError = (err, fallback) =>
  err?.response?.data?.message ||
  err?.response?.data?.error ||
  (typeof err?.response?.data === "string" ? err.response.data : null) ||
  err?.message ||
  fallback;

const isMissingApi = (err) =>
  [404, 405, 501].includes(err?.response?.status);

function DoctorExaminationPage() {
  const today = getLocalDateString();

  /* ---------- Danh mục / bác sĩ ---------- */
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [examDate, setExamDate] = useState(today);
  const [medicines, setMedicines] = useState(FALLBACK_MEDICINES);
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [medicineSource, setMedicineSource] = useState("sample");
  const [serviceSource, setServiceSource] = useState("sample");

  /* ---------- Hàng đợi ---------- */
  const [queue, setQueue] = useState([]);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  /* ---------- Bệnh nhân ---------- */
  const [patient, setPatient] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [history, setHistory] = useState([]);

  /* ---------- Hồ sơ khám ---------- */
  const [exam, setExam] = useState(EMPTY_EXAM);
  const [vitals, setVitals] = useState(EMPTY_VITALS);
  const [medicalRecordId, setMedicalRecordId] = useState("");

  /* ---------- Đơn thuốc / chỉ định ---------- */
  const [medLines, setMedLines] = useState([
    { medicineId: "", quantity: 1, dosage: "", unitPrice: 0 },
  ]);
  const [svcLines, setSvcLines] = useState([
    { serviceId: "", quantity: 1, unitPrice: 0 },
  ]);

  /* ---------- Giao diện ---------- */
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showPrint, setShowPrint] = useState(false);

  const notify = (type, text) => setNotice({ type, text, at: Date.now() });

  /* ================= HÀNH ĐỘNG DỮ LIỆU ================= */

  const loadQueue = (silent = false) => {
    if (!doctorId) return;
    /* setState được đẩy vào microtask để không chạy đồng bộ trong useEffect */
    queueMicrotask(() => {
      setLoadingQueue(true);
      axios
        .get(`${RECEPTION_API}/queue/doctor/${doctorId}`, {
          params: { date: examDate },
        })
        .then((res) => {
          const list = Array.isArray(res.data) ? res.data : [];
          setQueue(list);
          if (!silent && list.length === 0) {
            notify(
              "info",
              "Không có lượt khám nào của bác sĩ trong ngày này.",
            );
          }
          setSelected((prev) => {
            if (!prev) return prev;
            const fresh = list.find((item) => item.id === prev.id);
            return fresh ? { ...prev, ...fresh } : prev;
          });
        })
        .catch((err) => {
          if (!silent) {
            notify(
              "error",
              `Không tải được hàng đợi: ${extractError(err, "kiểm tra backend")}`,
            );
          }
        })
        .finally(() => setLoadingQueue(false));
    });
  };

  const loadPatientHistory = (patientId, currentReceptionId) => {
    axios
      .get(RECEPTION_API)
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : [];
        const list = all
          .filter(
            (item) =>
              item.patientId === patientId && item.id !== currentReceptionId,
          )
          .sort((a, b) =>
            String(b.receptionDate || "").localeCompare(
              String(a.receptionDate || ""),
            ),
          )
          .slice(0, 4);
        setHistory(list);
      })
      .catch(() => setHistory([]));
  };

  const draftKey = (receptionId) => `clinic-exam-draft-${receptionId}`;

  const saveDraft = (silent = false) => {
    if (!selected) return;
    try {
      localStorage.setItem(
        draftKey(selected.id),
        JSON.stringify({
          exam,
          vitals,
          medLines,
          svcLines,
          medicalRecordId,
          savedAt: new Date().toISOString(),
        }),
      );
      if (!silent) {
        notify("success", `Đã lưu nháp hồ sơ khám của lượt ${selected.id}.`);
      }
    } catch {
      if (!silent) notify("error", "Không thể lưu nháp (bộ nhớ trình duyệt đầy).");
    }
  };

  const selectReception = (item) => {
    setSelected(item);
    setPatient(null);
    setHistory([]);
    setExam(EMPTY_EXAM);
    setVitals(EMPTY_VITALS);
    setMedicalRecordId("");
    setMedLines([{ medicineId: "", quantity: 1, dosage: "", unitPrice: 0 }]);
    setSvcLines([{ serviceId: "", quantity: 1, unitPrice: 0 }]);

    setPatientLoading(true);
    axios
      .get(`${PATIENT_API}/${item.patientId}`)
      .then((res) => setPatient(res.data))
      .catch((err) =>
        notify(
          "warn",
          `Không tải được hồ sơ bệnh nhân ${item.patientId}: ${extractError(err, "lỗi kết nối")}`,
        ),
      )
      .finally(() => setPatientLoading(false));

    loadPatientHistory(item.patientId, item.id);

    /* Khôi phục bản nháp (nếu có) */
    try {
      const raw = localStorage.getItem(draftKey(item.id));
      if (raw) {
        const draft = JSON.parse(raw);
        setExam({ ...EMPTY_EXAM, ...(draft.exam || {}) });
        setVitals({ ...EMPTY_VITALS, ...(draft.vitals || {}) });
        if (Array.isArray(draft.medLines) && draft.medLines.length) {
          setMedLines(draft.medLines);
        }
        if (Array.isArray(draft.svcLines) && draft.svcLines.length) {
          setSvcLines(draft.svcLines);
        }
        setMedicalRecordId(draft.medicalRecordId || "");
        notify(
          "info",
          `Đã khôi phục bản nháp lưu lúc ${new Date(draft.savedAt).toLocaleString("vi-VN")}.`,
        );
      }
    } catch {
      /* bỏ qua bản nháp hỏng */
    }
  };

  const changeStatus = (item, status) => {
    /* BR-038: không hoàn thành lượt chưa được khám */
    if (status === "DaKham" && item.queueStatus !== "DangKham") {
      notify(
        "error",
        "Chỉ lượt ĐANG KHÁM mới được hoàn tất. Hãy gọi khám trước.",
      );
      return;
    }
    axios
      .patch(`${RECEPTION_API}/${item.id}/status`, { status })
      .then(() => {
        notify(
          "success",
          `Cập nhật lượt ${item.id} → ${STATUS_META[status]?.label || status}.`,
        );
        loadQueue(true);
      })
      .catch((err) =>
        notify(
          "error",
          `Cập nhật trạng thái thất bại: ${extractError(err, "lỗi kết nối")}`,
        ),
      );
  };

  const callNextPatient = () => {
    const next = queue
      .filter((item) => item.queueStatus === "ChoKham")
      .sort((a, b) => (a.queueNumber || 0) - (b.queueNumber || 0))[0];
    if (!next) {
      notify("info", "Không còn lượt CHỜ KHÁM nào trong hàng đợi.");
      return;
    }
    changeStatus(next, "DangKham");
    selectReception(next);
  };

  const saveVitals = () => {
    if (!selected) return;
    setBusy(true);
    const payload = {
      ...selected,
      pulse: vitals.pulse ? Number(vitals.pulse) : null,
      temperature: vitals.temperature ? Number(vitals.temperature) : null,
      bloodPressure: vitals.bloodPressure || null,
      weight: vitals.weight ? Number(vitals.weight) : null,
      height: vitals.height ? Number(vitals.height) : null,
      patientName: undefined,
      patientPhone: undefined,
      patientGender: undefined,
      patientDob: undefined,
      patientAddress: undefined,
    };
    axios
      .put(`${RECEPTION_API}/${selected.id}`, payload)
      .then((res) => {
        setSelected((prev) => ({ ...prev, ...res.data }));
        notify("success", "Đã lưu chỉ số sinh hiệu của bệnh nhân.");
      })
      .catch((err) =>
        notify(
          "error",
          `Lưu sinh hiệu thất bại: ${extractError(err, "lỗi kết nối")}`,
        ),
      )
      .finally(() => setBusy(false));
  };

  /* Lưu hồ sơ khám (BENHAN) — backend chưa có API → giữ dữ liệu ở UI */
  const saveMedicalRecord = async () => {
    if (!selected) return { ok: false, hard: false };
    const payload = {
      receptionId: selected.id,
      patientId: selected.patientId,
      doctorId: selected.doctorId || doctorId,
      symptoms: exam.symptoms,
      generalExam: exam.generalExam,
      localExam: exam.localExam,
      diagnosis: exam.diagnosis,
      prognosis: exam.prognosis,
      notes: exam.notes,
      examinationDate: examDate,
      recordId: medicalRecordId || undefined,
    };
    try {
      const res = await axios.post(MEDICAL_RECORD_API, payload);
      const createdId =
        res.data?.id || res.data?.medicalRecordId || res.data?.maBenhAn || "";
      if (createdId) setMedicalRecordId(createdId);
      return { ok: true, hard: false, id: createdId };
    } catch (err) {
      if (isMissingApi(err)) {
        return { ok: false, hard: false, missingApi: true };
      }
      return { ok: false, hard: true, error: extractError(err, "lỗi kết nối") };
    }
  };

  /* Kê đơn thuốc — cần mã bệnh án hợp lệ (FK DONTHUOC → BENHAN) */
  const savePrescription = async (recordId) => {
    const lines = medLines.filter((line) => line.medicineId);
    if (lines.length === 0) return { ok: true, skipped: true };
    if (!recordId) {
      /* Backend chưa tạo được bệnh án → giữ đơn ở nháp, không chặn khám */
      return {
        ok: false,
        hard: false,
        missingRecord: true,
        error:
          "Chưa có mã bệnh án để gắn đơn thuốc — đơn được giữ nháp trên giao diện.",
      };
    }

    for (const line of lines) {
      const qty = Number(line.quantity);
      const med = medicines.find((m) => m.id === line.medicineId);
      /* BR-044 / BR-045 */
      if (!qty || qty <= 0) {
        return {
          ok: false,
          hard: true,
          error: `Số lượng thuốc ${med?.name || line.medicineId} phải lớn hơn 0.`,
        };
      }
      if (med && med.stock != null && qty > Number(med.stock)) {
        return {
          ok: false,
          hard: true,
          error: `Thuốc ${med.name} chỉ còn ${med.stock} đơn vị (BR-045 không cho kê vượt tồn kho).`,
        };
      }
    }

    try {
      await axios.post(PRESCRIPTION_API, {
        medicalRecordId: recordId,
        advice: exam.notes || exam.prognosis || "",
        details: lines.map((line, index) => ({
          id: `CTDT_${selected.id}_${index + 1}`,
          medicineId: line.medicineId,
          quantity: Number(line.quantity),
          unitPrice: Number(line.unitPrice) || 0,
          dosage: line.dosage || "",
          totalPrice:
            (Number(line.quantity) || 0) * (Number(line.unitPrice) || 0),
        })),
      });
      return { ok: true, hard: false };
    } catch (err) {
      if (isMissingApi(err)) return { ok: false, hard: false, missingApi: true };
      return { ok: false, hard: true, error: extractError(err, "lỗi kết nối") };
    }
  };

  const saveServiceAssignments = async (recordId) => {
    const lines = svcLines.filter((line) => line.serviceId);
    if (lines.length === 0) return { ok: true, skipped: true };
    if (!recordId) {
      return {
        ok: false,
        hard: false,
        missingRecord: true,
        error: "Chưa có mã bệnh án — chỉ định được giữ nháp trên giao diện.",
      };
    }
    const failures = [];
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      try {
        await axios.post(SERVICE_API, {
          id: `CD_${selected.id}_${i + 1}`,
          medicalRecordId: recordId,
          serviceId: line.serviceId,
          quantity: Number(line.quantity) || 1,
          unitPrice: Number(line.unitPrice) || 0,
          status: "DaChiDinh",
        });
      } catch (err) {
        if (isMissingApi(err)) {
          return { ok: false, hard: false, missingApi: true };
        }
        failures.push(extractError(err, "lỗi kết nối"));
      }
    }
    if (failures.length > 0) {
      return { ok: false, hard: true, error: failures.join("; ") };
    }
    return { ok: true, hard: false };
  };

  const validateExam = () => {
    if (!selected) return "Hãy chọn một lượt khám trong hàng đợi.";
    if (selected.queueStatus === "BoQua")
      return "Lượt này đang bị bỏ qua. Hãy đưa về hàng đợi trước.";
    if (!exam.symptoms.trim()) return "BR-042: phải nhập Triệu chứng.";
    if (!exam.diagnosis.trim()) return "BR-042: phải nhập Chẩn đoán.";
    if (!exam.notes.trim()) return "BR-042: phải nhập Ghi chú điều trị.";
    /* BR-046: một thuốc không xuất hiện nhiều lần trong cùng đơn */
    const ids = medLines
      .filter((line) => line.medicineId)
      .map((line) => line.medicineId);
    if (new Set(ids).size !== ids.length) {
      return "BR-046: mỗi thuốc chỉ được xuất hiện một lần trong cùng đơn.";
    }
    return null;
  };

  const completeExamination = async () => {
    const invalid = validateExam();
    if (invalid) {
      notify("error", invalid);
      return;
    }
    if (selected.queueStatus === "ChoKham") {
      notify(
        "error",
        "BR-039: phải gọi khám (chuyển sang ĐANG KHÁM) trước khi hoàn tất.",
      );
      return;
    }

    setBusy(true);
    const warnings = [];

    /* 1. Hồ sơ khám — dùng id trả về trực tiếp (state chưa cập nhật kịp) */
    let recordId = medicalRecordId;
    if (!recordId) {
      const recordResult = await saveMedicalRecord();
      if (recordResult.hard) {
        notify("error", `Lưu hồ sơ khám thất bại: ${recordResult.error}`);
        setBusy(false);
        return;
      }
      if (recordResult.missingApi) {
        warnings.push(
          "Backend chưa có API hồ sơ khám (BENHAN) — hồ sơ được giữ nháp trên giao diện.",
        );
      }
      recordId = recordResult.id || "";
    }

    /* 2. Đơn thuốc */
    const rxResult = await savePrescription(recordId);
    if (rxResult.hard) {
      notify("error", `Kê đơn thất bại: ${rxResult.error}`);
      setBusy(false);
      return;
    }
    if (rxResult.missingApi || rxResult.missingRecord) {
      warnings.push("Đơn thuốc chưa gửi lên server (chưa có mã bệnh án).");
    }

    /* 3. Chỉ định dịch vụ */
    const svcResult = await saveServiceAssignments(recordId);
    if (svcResult.hard) {
      notify("error", `Chỉ định dịch vụ thất bại: ${svcResult.error}`);
      setBusy(false);
      return;
    }
    if (svcResult.missingApi || svcResult.missingRecord) {
      warnings.push("Chỉ định dịch vụ chưa gửi lên server (chưa có bệnh án).");
    }

    /* 4. Chuyển trạng thái hàng đợi (BR-038: chỉ từ DANG KHAM) */
    try {
      if (selected.queueStatus === "DangKham") {
        await axios.patch(`${RECEPTION_API}/${selected.id}/status`, {
          status: "DaKham",
        });
      }
      await loadQueue(true);
    } catch (err) {
      notify(
        "error",
        `Không chuyển được trạng thái hàng đợi: ${extractError(err, "lỗi kết nối")}`,
      );
      setBusy(false);
      return;
    }

    /* Xóa bản nháp vì lượt khám đã hoàn tất */
    try {
      localStorage.removeItem(draftKey(selected.id));
    } catch {
      /* bỏ qua */
    }

    setBusy(false);
    setShowPrint(true);
    if (warnings.length > 0) {
      notify("warn", `Hoàn tất khám. ${warnings.join(" ")}`);
    } else {
      notify("success", `Hoàn tất khám cho lượt ${selected.id}.`);
    }
  };

  /* ================= DỮ LIỆU MỤC ================= */

  useEffect(() => {
    axios
      .get(DOCTOR_API, { params: { page: 0, size: 100 } })
      .then((res) => {
        const list = getCollectionData(res.data);
        setDoctors(list);
        setDoctorId((prev) => prev || (list[0] && list[0].id) || "");
      })
      .catch((err) =>
        notify(
          "error",
          `Không tải được danh sách bác sĩ: ${extractError(err, "kiểm tra backend")}`,
        ),
      );

    axios
      .get(MEDICINE_API)
      .then((res) => {
        const list = getCollectionData(res.data);
        if (Array.isArray(list) && list.length > 0) {
          setMedicines(
            list.map((m) => ({
              id: m.id || m.medicineId,
              name: m.name || m.medicineName || m.tenThuoc || m.id,
              unit: m.unit || m.donViTinh || "Lần",
              price: Number(m.price ?? m.unitPrice ?? m.dongia) || 0,
              stock: m.stock ?? m.quantity ?? m.soLuongTon ?? null,
            })),
          );
          setMedicineSource("api");
        }
      })
      .catch(() => {
        /* dùng danh mục mẫu */
      });

    axios
      .get(SERVICE_CATALOG_API)
      .then((res) => {
        const list = getCollectionData(res.data);
        if (Array.isArray(list) && list.length > 0) {
          setServices(
            list.map((s) => ({
              id: s.id || s.serviceId,
              name: s.name || s.serviceName || s.tenDichVu || s.id,
              price: Number(s.price ?? s.unitPrice ?? s.dongia) || 0,
            })),
          );
          setServiceSource("api");
        }
      })
      .catch(() => {
        /* dùng danh mục mẫu */
      });
  }, []);

  useEffect(() => {
    if (doctorId) loadQueue();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [doctorId, examDate]);

  /* Tự lưu nháp khi rời trang / đóng tab */
  useEffect(() => {
    const handler = () => {
      if (selected) saveDraft(true);
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
      handler();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [selected, exam, vitals, medLines, svcLines, medicalRecordId]);

  /* ================= DỮ LIỆU TÍNH TOÁN ================= */

  const filteredQueue = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return queue.filter((item) => {
      const matchStatus =
        statusFilter === "all" || item.queueStatus === statusFilter;
      const matchKeyword =
        !keyword ||
        String(item.id).toLowerCase().includes(keyword) ||
        String(item.patientId).toLowerCase().includes(keyword) ||
        String(item.queueNumber).includes(keyword) ||
        String(item.roomId).toLowerCase().includes(keyword);
      return matchStatus && matchKeyword;
    });
  }, [queue, statusFilter, search]);

  const statusCounts = useMemo(
    () => ({
      all: queue.length,
      ChoKham: queue.filter((i) => i.queueStatus === "ChoKham").length,
      DangKham: queue.filter((i) => i.queueStatus === "DangKham").length,
      DaKham: queue.filter((i) => i.queueStatus === "DaKham").length,
    }),
    [queue],
  );

  const prescriptionTotal = useMemo(
    () =>
      medLines
        .filter((line) => line.medicineId)
        .reduce(
          (sum, line) =>
            sum + (Number(line.quantity) || 0) * (Number(line.unitPrice) || 0),
          0,
        ),
    [medLines],
  );

  const serviceTotal = useMemo(
    () =>
      svcLines
        .filter((line) => line.serviceId)
        .reduce(
          (sum, line) =>
            sum + (Number(line.quantity) || 0) * (Number(line.unitPrice) || 0),
          0,
        ),
    [svcLines],
  );

  /* ================= XỬ LÝ DÒNG KÊ ================= */

  const updateMedLine = (index, patch) => {
    setMedLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  };

  const handleMedicineChange = (index, medicineId) => {
    const med = medicines.find((m) => m.id === medicineId);
    const duplicated = medLines.some(
      (line, i) => i !== index && line.medicineId === medicineId,
    );
    if (duplicated && medicineId) {
      notify(
        "error",
        `BR-046: thuốc ${med?.name || medicineId} đã có trong đơn. Hãy chỉnh số lượng dòng cũ.`,
      );
      return;
    }
    updateMedLine(index, {
      medicineId,
      unitPrice: med ? med.price : 0,
      dosage: med && !medLines[index].dosage ? "" : medLines[index].dosage,
    });
  };

  const updateSvcLine = (index, patch) => {
    setSvcLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  };

  const handleServiceChange = (index, serviceId) => {
    const svc = services.find((s) => s.id === serviceId);
    updateSvcLine(index, {
      serviceId,
      unitPrice: svc ? svc.price : 0,
    });
  };

  /* ================= HIỂN THỊ ================= */

  const doctorName = (() => {
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc) return "";
    return (
      doc.user?.fullName || doc.fullName || doc.name || `Bác sĩ ${doc.id}`
    );
  })();

  const age = patient ? calcAge(patient.dateOfBirth) : null;

  const examEditable =
    selected && selected.queueStatus !== "DaKham" && selected.queueStatus !== "BoQua";

  return (
    <div className="exam-container">
      {/* ===== HEADER ===== */}
      <div className="exam-header">
        <div>
          <h1>PHÒNG KHÁM ĐA KHOA</h1>
          <p>Trang khám bệnh của bác sĩ — hàng đợi, hồ sơ, kê đơn & chỉ định</p>
        </div>
        <div className="exam-header-tools">
          <div className="tool-field">
            <label htmlFor="exam-doctor">Bác sĩ trực</label>
            <select
              id="exam-doctor"
              value={doctorId}
              onChange={(e) => {
                setDoctorId(e.target.value);
                setSelected(null);
                setPatient(null);
              }}
            >
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.id} -{" "}
                  {doc.user?.fullName || doc.fullName || doc.name || "Bác sĩ"}
                </option>
              ))}
            </select>
          </div>
          <div className="tool-field">
            <label htmlFor="exam-date">Ngày khám</label>
            <input
              id="exam-date"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>
          <button
            className="exam-btn-call"
            style={{ padding: "9px 14px", fontSize: "13px" }}
            onClick={callNextPatient}
            disabled={!doctorId}
          >
            🔔 Gọi BN tiếp theo
          </button>
          <button
            className="exam-btn-outline"
            onClick={() => loadQueue()}
            disabled={!doctorId || loadingQueue}
          >
            {loadingQueue ? "Đang tải..." : "🔄 Làm mới"}
          </button>
        </div>
      </div>

      {/* ===== THÔNG BÁO ===== */}
      {notice && (
        <div className={`exam-notice exam-notice-${notice.type}`}>
          <span>{notice.text}</span>
          <button type="button" onClick={() => setNotice(null)}>
            ✕
          </button>
        </div>
      )}

      {/* ===== NỘI DUNG 3 CỘT ===== */}
      <div className="exam-content">
        {/* ---------- CỘT 1: HÀNG ĐỢI ---------- */}
        <section className="exam-panel">
          <h2 className="exam-panel-title">
            🕒 Hàng đợi khám
            <span className="title-count">{filteredQueue.length} lượt</span>
          </h2>

          <div className="exam-queue-tools">
            <input
              type="text"
              placeholder="Tìm mã lượt, bệnh nhân, STT, phòng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="exam-status-tabs">
              {[
                ["all", "Tất cả"],
                ["ChoKham", "Chờ"],
                ["DangKham", "Đang K"],
                ["DaKham", "Đã K"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`exam-status-tab ${statusFilter === key ? "active" : ""}`}
                  onClick={() => setStatusFilter(key)}
                >
                  {label} ({statusCounts[key]})
                </button>
              ))}
            </div>
          </div>

          <div className="exam-queue-list">
            {loadingQueue && queue.length === 0 ? (
              <div className="exam-queue-empty">Đang tải hàng đợi...</div>
            ) : filteredQueue.length === 0 ? (
              <div className="exam-queue-empty">
                Không có lượt khám phù hợp.
                <br />
                Chọn bác sĩ và ngày khác để xem hàng đợi.
              </div>
            ) : (
              filteredQueue.map((item) => {
                const meta = STATUS_META[item.queueStatus] || {
                  label: item.queueStatus,
                  cls: "status-chokham",
                };
                return (
                  <div
                    key={item.id}
                    className={`exam-queue-item ${selected?.id === item.id ? "selected" : ""}`}
                    onClick={() => selectReception(item)}
                  >
                    <div className="exam-queue-item-top">
                      <span className="exam-queue-item-id">
                        STT {item.queueNumber} · {item.id}
                      </span>
                      <span className={`status-badge ${meta.cls}`}>
                        {meta.label}
                      </span>
                    </div>
                    <div className="exam-queue-item-meta">
                      <span>{item.patientId}</span>
                      <span>{item.roomId}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        marginTop: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.queueStatus === "ChoKham" && (
                        <button
                          type="button"
                          className="exam-btn-call"
                          onClick={(e) => {
                            e.stopPropagation();
                            changeStatus(item, "DangKham");
                          }}
                        >
                          Gọi khám
                        </button>
                      )}
                      {item.queueStatus === "BoQua" && (
                        <button
                          type="button"
                          className="exam-btn-call"
                          onClick={(e) => {
                            e.stopPropagation();
                            changeStatus(item, "ChoKham");
                          }}
                        >
                          Đưa về chờ
                        </button>
                      )}
                      {item.queueStatus === "DangKham" && (
                        <button
                          type="button"
                          className="exam-btn-done"
                          onClick={(e) => {
                            e.stopPropagation();
                            changeStatus(item, "DaKham");
                          }}
                        >
                          Hoàn tất
                        </button>
                      )}
                      {item.queueStatus === "DangKham" && (
                        <button
                          type="button"
                          className="exam-line-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            changeStatus(item, "BoQua");
                          }}
                        >
                          Bỏ qua
                        </button>
                      )}
                      {item.queueStatus === "DaKham" && (
                        <span
                          style={{
                            fontSize: "11.5px",
                            color: "#15803d",
                            fontWeight: 700,
                          }}
                        >
                          ✓ Đã hoàn tất
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ---------- CỘT 2: HỒ SƠ + KHÁM LÂM SÀNG ---------- */}
        <section className="exam-panel">
          <h2 className="exam-panel-title">
            🩺 Hồ sơ & khám lâm sàng
            {selected && (
              <span className="title-count">{selected.id}</span>
            )}
          </h2>

          {!selected ? (
            <div className="exam-placeholder">
              <span className="icon">🩻</span>
              <h3>Chưa chọn bệnh nhân</h3>
              <p>
                Chọn một lượt khám trong hàng đợi bên trái (hoặc bấm &quot;Gọi
                BN tiếp theo&quot;) để bắt đầu thăm khám.
              </p>
            </div>
          ) : (
            <div className="exam-main-scroll">
              {/* Thông tin bệnh nhân */}
              <div className="exam-patient-card">
                <div className="exam-patient-head">
                  <div>
                    <p className="exam-patient-name">
                      {patientLoading
                        ? "Đang tải..."
                        : patient?.fullName || `Bệnh nhân ${selected.patientId}`}
                    </p>
                    <p className="exam-patient-sub">
                      {selected.patientId}
                      {patient?.gender ? ` · ${patient.gender}` : ""}
                      {age !== null ? ` · ${age} tuổi` : ""}
                      {patient?.dateOfBirth
                        ? ` · sinh ${patient.dateOfBirth}`
                        : ""}
                    </p>
                  </div>
                  <div className="exam-patient-tags">
                    <span className="exam-tag">Phòng {selected.roomId}</span>
                    <span className="exam-tag exam-tag-amber">
                      STT {selected.queueNumber}
                    </span>
                    {(STATUS_META[selected.queueStatus]?.label ||
                      selected.queueStatus) && (
                      <span className="exam-tag exam-tag-green">
                        {STATUS_META[selected.queueStatus]?.label ||
                          selected.queueStatus}
                      </span>
                    )}
                  </div>
                </div>

                <div className="exam-patient-grid">
                  <div>
                    <b>SĐT:</b> {patient?.phoneNumber || "—"}
                  </div>
                  <div>
                    <b>Địa chỉ:</b> {patient?.address || "—"}
                  </div>
                  <div>
                    <b>Nhóm máu:</b> {patient?.bloodGroup || "—"}
                  </div>
                  <div>
                    <b>BHYT:</b> {patient?.healthInsuranceNumber || "Không"}
                  </div>
                </div>

                <div style={{ marginTop: "10px", fontSize: "12.5px" }}>
                  <b style={{ color: "#0d47a1" }}>Triệu chứng tiếp nhận:</b>{" "}
                  <span style={{ color: "#475569" }}>
                    {selected.initialSymptoms || "Không ghi nhận"}
                  </span>
                </div>

                {patient?.medicalHistory && (
                  <div style={{ marginTop: "8px", fontSize: "12.5px" }}>
                    <b style={{ color: "#0d47a1" }}>Tiền sử bệnh:</b>{" "}
                    <span style={{ color: "#475569" }}>
                      {patient.medicalHistory}
                    </span>
                  </div>
                )}

                {history.length > 0 && (
                  <div className="exam-history-box">
                    <div className="exam-history-title">
                      📁 Lần khám trước ({history.length})
                    </div>
                    {history.map((h) => (
                      <div className="exam-history-row" key={h.id}>
                        <span>
                          {h.receptionDate} · {h.roomId} ·{" "}
                          {h.initialSymptoms || "—"}
                        </span>
                        <span className={`status-badge ${STATUS_META[h.queueStatus]?.cls || "status-chokham"}`}>
                          {STATUS_META[h.queueStatus]?.label || h.queueStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sinh hiệu */}
              <div className="exam-sub-title">
                🩺 Chỉ số sinh hiệu
                <button
                  type="button"
                  className="exam-btn-call"
                  onClick={saveVitals}
                  disabled={busy || !examEditable}
                >
                  Lưu sinh hiệu
                </button>
              </div>
              <div className="exam-vitals">
                <div className="exam-vital">
                  <label htmlFor="v-pulse">Mạch (lần/phút)</label>
                  <input
                    id="v-pulse"
                    type="number"
                    placeholder="80"
                    value={vitals.pulse}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setVitals({ ...vitals, pulse: e.target.value })
                    }
                  />
                </div>
                <div className="exam-vital">
                  <label htmlFor="v-temp">Nhiệt độ (°C)</label>
                  <input
                    id="v-temp"
                    type="number"
                    step="0.1"
                    placeholder="37.0"
                    value={vitals.temperature}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setVitals({ ...vitals, temperature: e.target.value })
                    }
                  />
                </div>
                <div className="exam-vital">
                  <label htmlFor="v-bp">Huyết áp (mmHg)</label>
                  <input
                    id="v-bp"
                    type="text"
                    placeholder="120/80"
                    value={vitals.bloodPressure}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setVitals({ ...vitals, bloodPressure: e.target.value })
                    }
                  />
                </div>
                <div className="exam-vital">
                  <label htmlFor="v-weight">Cân nặng (kg)</label>
                  <input
                    id="v-weight"
                    type="number"
                    step="0.1"
                    placeholder="65"
                    value={vitals.weight}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setVitals({ ...vitals, weight: e.target.value })
                    }
                  />
                </div>
                <div className="exam-vital">
                  <label htmlFor="v-height">Chiều cao (cm)</label>
                  <input
                    id="v-height"
                    type="number"
                    step="0.1"
                    placeholder="170"
                    value={vitals.height}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setVitals({ ...vitals, height: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Mã bệnh án */}
              <div className="exam-form-section">
                <label htmlFor="mr-id">
                  Mã bệnh án (BENHAN) — tự tạo khi lưu hồ sơ, hoặc nhập nếu đã có
                </label>
                <input
                  id="mr-id"
                  className="form-control"
                  type="text"
                  placeholder="Ví dụ: BA001"
                  value={medicalRecordId}
                  disabled={!examEditable}
                  onChange={(e) => setMedicalRecordId(e.target.value)}
                />
              </div>

              {/* Khám lâm sàng */}
              <div className="exam-form-grid">
                <div className="exam-form-section">
                  <label htmlFor="ex-symptoms">
                    Triệu chứng <span className="exam-required">*</span>
                  </label>
                  <textarea
                    id="ex-symptoms"
                    placeholder="Chief complaint, diễn biến, thời gian..."
                    value={exam.symptoms}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setExam({ ...exam, symptoms: e.target.value })
                    }
                  />
                </div>
                <div className="exam-form-section">
                  <label htmlFor="ex-general">Khám toàn trạng</label>
                  <textarea
                    id="ex-general"
                    placeholder="Tỉnh táo, da niêm mạc, tim phổi..."
                    value={exam.generalExam}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setExam({ ...exam, generalExam: e.target.value })
                    }
                  />
                </div>
                <div className="exam-form-section">
                  <label htmlFor="ex-local">Khám tại chỗ</label>
                  <textarea
                    id="ex-local"
                    placeholder="Phần tử thuộc chuyên khoa..."
                    value={exam.localExam}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setExam({ ...exam, localExam: e.target.value })
                    }
                  />
                </div>
                <div className="exam-form-section">
                  <label htmlFor="ex-diagnosis">
                    Chẩn đoán <span className="exam-required">*</span>
                  </label>
                  <textarea
                    id="ex-diagnosis"
                    placeholder="Chẩn đoán chính / phân biệt..."
                    value={exam.diagnosis}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setExam({ ...exam, diagnosis: e.target.value })
                    }
                  />
                </div>
                <div className="exam-form-section">
                  <label htmlFor="ex-prognosis">Tiên lượng</label>
                  <textarea
                    id="ex-prognosis"
                    placeholder="Dự tiến triển, tái khám..."
                    value={exam.prognosis}
                    disabled={!examEditable}
                    onChange={(e) =>
                      setExam({ ...exam, prognosis: e.target.value })
                    }
                  />
                </div>
                <div className="exam-form-section">
                  <label htmlFor="ex-notes">
                    Ghi chú điều trị <span className="exam-required">*</span>
                  </label>
                  <textarea
                    id="ex-notes"
                    placeholder="Hướng điều trị, dặn dò, theo dõi..."
                    value={exam.notes}
                    disabled={!examEditable}
                    onChange={(e) => setExam({ ...exam, notes: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ---------- CỘT 3: ĐƠN THUỐC & CHỈ ĐỊNH ---------- */}
        <section className="exam-panel exam-panel-right">
          <h2 className="exam-panel-title">💊 Kê đơn & chỉ định</h2>

          {!selected ? (
            <div className="exam-placeholder">
              <span className="icon">💊</span>
              <h3>Chưa có bệnh nhân</h3>
              <p>
                Chọn lượt khám để kê đơn thuốc và chỉ định dịch vụ cho bệnh
                nhân.
              </p>
            </div>
          ) : (
            <>
              <div className="exam-right-scroll">
                {/* Đơn thuốc */}
                <div className="exam-sub-title">
                  Đơn thuốc
                  <span
                    className={`exam-source-badge ${medicineSource === "api" ? "live" : ""}`}
                  >
                    {medicineSource === "api"
                      ? "Từ API"
                      : "Danh mục mẫu (thiếu API thuốc)"}
                  </span>
                </div>

                <table className="exam-lines">
                  <thead>
                    <tr>
                      <th style={{ width: "38%" }}>Thuốc</th>
                      <th style={{ width: "15%" }}>SL</th>
                      <th style={{ width: "27%" }}>Liều dùng</th>
                      <th style={{ width: "14%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {medLines.map((line, index) => {
                      const med = medicines.find(
                        (m) => m.id === line.medicineId,
                      );
                      return (
                        <tr key={`med-${index}`}>
                          <td>
                            <select
                              value={line.medicineId}
                              disabled={!examEditable}
                              onChange={(e) =>
                                handleMedicineChange(index, e.target.value)
                              }
                            >
                              <option value="">-- Chọn thuốc --</option>
                              {medicines.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.name} ({formatVnd(m.price)})
                                </option>
                              ))}
                            </select>
                            {med && (
                              <div
                                style={{
                                  fontSize: "10.5px",
                                  color: "#94a3b8",
                                  marginTop: "3px",
                                }}
                              >
                                Tồn kho: {med.stock ?? "?"} {med.unit} ·{" "}
                                {formatVnd(line.unitPrice)}/
                                {med.unit.toLowerCase()}
                              </div>
                            )}
                          </td>
                          <td>
                            <input
                              className="cell-qty"
                              type="number"
                              min="1"
                              value={line.quantity}
                              disabled={!examEditable}
                              onChange={(e) =>
                                updateMedLine(index, {
                                  quantity: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              placeholder="1 viên x 2 lần/ngày"
                              value={line.dosage}
                              disabled={!examEditable}
                              onChange={(e) =>
                                updateMedLine(index, { dosage: e.target.value })
                              }
                            />
                            <div className="cell-total" style={{ marginTop: 3 }}>
                              {formatVnd(
                                (Number(line.quantity) || 0) *
                                  (Number(line.unitPrice) || 0),
                              )}
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              type="button"
                              className="exam-line-remove"
                              disabled={!examEditable}
                              onClick={() =>
                                setMedLines((prev) =>
                                  prev.filter((_, i) => i !== index),
                                )
                              }
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <button
                  type="button"
                  className="exam-add-line"
                  disabled={!examEditable}
                  onClick={() =>
                    setMedLines((prev) => [
                      ...prev,
                      { medicineId: "", quantity: 1, dosage: "", unitPrice: 0 },
                    ])
                  }
                >
                  + Thêm dòng thuốc
                </button>

                {/* Chỉ định dịch vụ */}
                <div className="exam-sub-title">
                  Chỉ định dịch vụ
                  <span
                    className={`exam-source-badge ${serviceSource === "api" ? "live" : ""}`}
                  >
                    {serviceSource === "api"
                      ? "Từ API"
                      : "Danh mục mẫu (thiếu API dịch vụ)"}
                  </span>
                </div>

                <table className="exam-lines">
                  <thead>
                    <tr>
                      <th style={{ width: "58%" }}>Dịch vụ</th>
                      <th style={{ width: "20%" }}>SL</th>
                      <th style={{ width: "22%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {svcLines.map((line, index) => (
                      <tr key={`svc-${index}`}>
                        <td>
                          <select
                            value={line.serviceId}
                            disabled={!examEditable}
                            onChange={(e) =>
                              handleServiceChange(index, e.target.value)
                            }
                          >
                            <option value="">-- Chọn dịch vụ --</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name} ({formatVnd(s.price)})
                              </option>
                            ))}
                          </select>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#475569",
                              marginTop: "3px",
                            }}
                          >
                            Đơn giá: {formatVnd(line.unitPrice)} · Thành tiền:{" "}
                            <b style={{ color: "#0d47a1" }}>
                              {formatVnd(
                                (Number(line.quantity) || 0) *
                                  (Number(line.unitPrice) || 0),
                              )}
                            </b>
                          </div>
                        </td>
                        <td>
                          <input
                            className="cell-qty"
                            type="number"
                            min="1"
                            value={line.quantity}
                            disabled={!examEditable}
                            onChange={(e) =>
                              updateSvcLine(index, { quantity: e.target.value })
                            }
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            type="button"
                            className="exam-line-remove"
                            disabled={!examEditable}
                            onClick={() =>
                              setSvcLines((prev) =>
                                prev.filter((_, i) => i !== index),
                              )
                            }
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  type="button"
                  className="exam-add-line"
                  disabled={!examEditable}
                  onClick={() =>
                    setSvcLines((prev) => [
                      ...prev,
                      { serviceId: "", quantity: 1, unitPrice: 0 },
                    ])
                  }
                >
                  + Thêm chỉ định
                </button>

                {/* Tổng cộng */}
                <div className="exam-totals">
                  <div className="row">
                    <span>Tiền thuốc</span>
                    <b>{formatVnd(prescriptionTotal)}</b>
                  </div>
                  <div className="row">
                    <span>Tiền dịch vụ</span>
                    <b>{formatVnd(serviceTotal)}</b>
                  </div>
                  <div className="row grand">
                    <span>Tổng tạm tính</span>
                    <span>{formatVnd(prescriptionTotal + serviceTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Hành động */}
              <div className="exam-actions">
                <div className="exam-actions-row">
                  <button
                    type="button"
                    className="exam-btn-outline"
                    onClick={() => saveDraft()}
                    disabled={!examEditable}
                  >
                    💾 Lưu nháp
                  </button>
                  <button
                    type="button"
                    className="exam-btn-outline"
                    onClick={() => setShowPrint(true)}
                  >
                    🖨️ In phiếu
                  </button>
                </div>
                <button
                  type="button"
                  className="exam-btn-primary"
                  onClick={() => {
                    if (!exam.symptoms.trim() || !exam.diagnosis.trim()) {
                      notify(
                        "error",
                        "BR-042: cần nhập ít nhất Triệu chứng, Chẩn đoán và Ghi chú điều trị.",
                      );
                      return;
                    }
                    saveMedicalRecord().then((result) => {
                      if (result.hard) {
                        notify("error", `Lưu hồ sơ khám thất bại: ${result.error}`);
                      } else if (result.missingApi) {
                        saveDraft(true);
                        notify(
                          "warn",
                          "Backend chưa có API hồ sơ khám (BENHAN) — hồ sơ được giữ nháp ở giao diện. Bạn vẫn có thể kê đơn nếu đã nhập Mã bệnh án.",
                        );
                      } else {
                        notify(
                          "success",
                          `Đã lưu hồ sơ khám${result.id ? ` (${result.id})` : ""}.`,
                        );
                      }
                    });
                  }}
                  disabled={!examEditable || busy}
                >
                  📋 Lưu hồ sơ khám
                </button>
                <button
                  type="button"
                  className="exam-btn-success"
                  onClick={completeExamination}
                  disabled={!examEditable || busy}
                >
                  {busy
                    ? "Đang xử lý..."
                    : "✅ Hoàn tất khám & in phiếu"}
                </button>
                {selected?.queueStatus === "ChoKham" && (
                  <p className="exam-hint">
                    Lượt này chưa được gọi khám — bấm &quot;Gọi khám&quot; trước
                    khi hoàn tất (BR-039).
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      </div>

      {/* ===== MODAL IN PHIẾU ===== */}
      {showPrint && selected && (
        <div
          className="modal-overlay"
          onClick={() => setShowPrint(false)}
          role="presentation"
        >
          <div
            className="exam-print-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Phiếu khám bệnh"
          >
            <div className="exam-print-head">
              <h2>PHIẾU KHÁM BỆNH</h2>
              <p>
                Phòng Khám Đa Khoa · Ngày {examDate} · Bác sĩ:{" "}
                {doctorName || selected.doctorId}
              </p>
            </div>

            <div className="exam-print-info">
              <span>
                <b>Mã lượt khám:</b> {selected.id}
              </span>
              <span>
                <b>STT:</b> {selected.queueNumber}
              </span>
              <span>
                <b>Bệnh nhân:</b>{" "}
                {patient?.fullName || `Bệnh nhân ${selected.patientId}`} (
                {selected.patientId})
              </span>
              <span>
                <b>Phòng:</b> {selected.roomId}
              </span>
              <span>
                <b>Giới tính:</b> {patient?.gender || "—"}
              </span>
              <span>
                <b>Tuổi:</b> {age !== null ? age : "—"}
              </span>
              <span>
                <b>SĐT:</b> {patient?.phoneNumber || "—"}
              </span>
              <span>
                <b>Mã bệnh án:</b> {medicalRecordId || "—"}
              </span>
            </div>

            <div className="exam-print-section">
              <h4>Chỉ số sinh hiệu</h4>
              <p>
                Mạch: {vitals.pulse || "—"} lần/phút · Nhiệt độ:{" "}
                {vitals.temperature || "—"} °C · Huyết áp:{" "}
                {vitals.bloodPressure || "—"} mmHg · Cân nặng:{" "}
                {vitals.weight || "—"} kg · Chiều cao: {vitals.height || "—"} cm
              </p>
            </div>

            <div className="exam-print-section">
              <h4>Triệu chứng</h4>
              <p>{exam.symptoms || "—"}</p>
            </div>

            <div className="exam-print-section">
              <h4>Khám lâm sàng</h4>
              <p>
                {[
                  exam.generalExam && `Toàn trạng: ${exam.generalExam}`,
                  exam.localExam && `Tại chỗ: ${exam.localExam}`,
                ]
                  .filter(Boolean)
                  .join("\n") || "—"}
              </p>
            </div>

            <div className="exam-print-section">
              <h4>Chẩn đoán</h4>
              <p>{exam.diagnosis || "—"}</p>
            </div>

            <div className="exam-print-section">
              <h4>Đơn thuốc</h4>
              {medLines.filter((l) => l.medicineId).length > 0 ? (
                <table className="exam-print-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Thuốc</th>
                      <th>SL</th>
                      <th>Liều dùng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medLines
                      .filter((l) => l.medicineId)
                      .map((line, index) => (
                        <tr key={`print-med-${index}`}>
                          <td>{index + 1}</td>
                          <td>
                            {medicines.find((m) => m.id === line.medicineId)
                              ?.name || line.medicineId}
                          </td>
                          <td>{line.quantity}</td>
                          <td>{line.dosage || "—"}</td>
                          <td>
                            {formatVnd(
                              (Number(line.quantity) || 0) *
                                (Number(line.unitPrice) || 0),
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>Không kê đơn thuốc.</p>
              )}
            </div>

            <div className="exam-print-section">
              <h4>Chỉ định dịch vụ</h4>
              {svcLines.filter((l) => l.serviceId).length > 0 ? (
                <table className="exam-print-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Dịch vụ</th>
                      <th>SL</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {svcLines
                      .filter((l) => l.serviceId)
                      .map((line, index) => (
                        <tr key={`print-svc-${index}`}>
                          <td>{index + 1}</td>
                          <td>
                            {services.find((s) => s.id === line.serviceId)
                              ?.name || line.serviceId}
                          </td>
                          <td>{line.quantity}</td>
                          <td>
                            {formatVnd(
                              (Number(line.quantity) || 0) *
                                (Number(line.unitPrice) || 0),
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>Không chỉ định dịch vụ.</p>
              )}
            </div>

            <div className="exam-print-section">
              <h4>Tiên lượng & ghi chú điều trị</h4>
              <p>
                {[exam.prognosis, exam.notes].filter(Boolean).join("\n") ||
                  "—"}
              </p>
            </div>

            <div className="exam-print-sign">
              <div>
                <b>Bệnh nhân</b>
                <br />
                <i>(ký, ghi rõ họ tên)</i>
              </div>
              <div>
                <b>Bác sĩ khám bệnh</b>
                <br />
                <i>{doctorName || "…"}</i>
              </div>
            </div>

            <div className="exam-print-actions">
              <button
                type="button"
                className="exam-btn-outline"
                onClick={() => setShowPrint(false)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="exam-btn-primary"
                onClick={() => window.print()}
              >
                🖨️ In phiếu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorExaminationPage;
