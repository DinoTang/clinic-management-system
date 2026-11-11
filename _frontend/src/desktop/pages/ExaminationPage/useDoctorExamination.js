import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getCollectionData } from "../../../utils/apiResponse.js";
import { getLocalDateString } from "../../../utils/date.js";
import {
  ICD10_CATALOG,
  ICD10_MEDICINE_PRESETS,
} from "../../constants/medicalConstants.js";
import {
  EMPTY_EXAM,
  EMPTY_VITALS,
  FALLBACK_MEDICINES,
  FALLBACK_SERVICES,
  STATUS_META,
} from "./examinationConstants.js";
import {
  calcAge,
  extractError,
  isMissingApi,
  sortQueueItems,
} from "./examinationUtils.js";

const API_BASE = "";
const RECEPTION_API = `${API_BASE}/api/receptions`;
const PATIENT_API = `${API_BASE}/api/patients`;
const DOCTOR_API = `${API_BASE}/api/doctors`;
const MEDICAL_RECORD_API = `${API_BASE}/api/medical-records`;
const PRESCRIPTION_API = `${API_BASE}/api/prescriptions`;
const SERVICE_API = `${API_BASE}/api/service-assignments`;
const MEDICINE_API = `${API_BASE}/api/medicines`;
const SERVICE_CATALOG_API = `${API_BASE}/api/services`;

export function useDoctorExamination() {
  const today = getLocalDateString();
  const auth = useAuth();
  const user = auth?.user;
  const staffSession = useMemo(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("clinic-staff-session") || "null",
      );
    } catch {
      return null;
    }
  }, []);

  const sessionDoctorId =
    user?.doctorId ||
    staffSession?.doctorId ||
    staffSession?.user?.doctorId ||
    "";

  const isDoctorUser =
    user?.role === "DOCTOR" ||
    staffSession?.role === "DOCTOR" ||
    Boolean(sessionDoctorId);

  /* ---------- Danh mục / bác sĩ ---------- */
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(sessionDoctorId);
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

  /* ---------- ICD-10 & Chẩn đoán ---------- */
  const [primaryIcd, setPrimaryIcd] = useState("");
  const [secondaryIcds, setSecondaryIcds] = useState([]);
  const [clinicalDiagnosisNote, setClinicalDiagnosisNote] = useState("");
  const [isManualDiagnosis, setIsManualDiagnosis] = useState(false);
  const [showAllSpecialtyIcd, setShowAllSpecialtyIcd] = useState(false);

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

  /* ---------- Modal trả kết quả dịch vụ ---------- */
  const [resultModalIndex, setResultModalIndex] = useState(null);
  const [selectedTemplateResult, setSelectedTemplateResult] = useState("");
  const [customResultText, setCustomResultText] = useState("");

  const notify = (type, text) => setNotice({ type, text, at: Date.now() });

  /* ================= HÀNH ĐỘNG DỮ LIỆU ================= */

  const loadQueue = async (silent = false) => {
    if (!doctorId) return [];
    setLoadingQueue(true);
    try {
      const res = await axios.get(`${RECEPTION_API}/queue/doctor/${doctorId}`, {
        params: { date: examDate },
      });
      const list = Array.isArray(res.data) ? res.data : [];
      setQueue(list);
      setSelected((prev) => {
        if (!prev) return prev;
        const fresh = list.find((item) => item.id === prev.id);
        return fresh ? { ...prev, ...fresh } : prev;
      });

      if (!silent) {
        if (list.length === 0) {
          notify(
            "info",
            "Đã làm mới: Không có lượt khám nào của bác sĩ trong ngày này.",
          );
        } else {
          const choKham = list.filter((i) => i.queueStatus === "ChoKham").length;
          const dangKham = list.filter((i) => i.queueStatus === "DangKham").length;
          notify(
            "success",
            `Đã làm mới danh sách hàng đợi (${list.length} lượt: ${choKham} chờ, ${dangKham} đang khám).`,
          );
        }
      }
      return list;
    } catch (err) {
      if (!silent) {
        notify(
          "error",
          `Không tải được hàng đợi: ${extractError(err, "kiểm tra backend")}`,
        );
      }
      return [];
    } finally {
      setLoadingQueue(false);
    }
  };

  /** Làm mới toàn diện: Bác sĩ, Hàng đợi, Thông tin bệnh nhân đang chọn, Danh mục thuốc & dịch vụ */
  const handleRefresh = async () => {
    if (!doctorId) {
      notify("warn", "Vui lòng chọn bác sĩ trước khi làm mới.");
      return;
    }
    setLoadingQueue(true);
    try {
      // 1. Tải lại danh sách bác sĩ
      try {
        const docRes = await axios.get(DOCTOR_API, { params: { page: 0, size: 100 } });
        const docList = getCollectionData(docRes.data);
        if (Array.isArray(docList) && docList.length > 0) {
          setDoctors(docList);
        }
      } catch {
        /* giữ danh sách cũ */
      }

      // 2. Tải lại danh mục thuốc & dịch vụ mới nhất
      try {
        const [medRes, svcRes] = await Promise.all([
          axios.get(MEDICINE_API),
          axios.get(SERVICE_CATALOG_API),
        ]);
        const mList = getCollectionData(medRes.data);
        if (Array.isArray(mList) && mList.length > 0) {
          setMedicines(
            mList.map((m) => ({
              id: m.id || m.medicineId,
              name: m.name || m.medicineName || m.tenThuoc || m.id,
              unit: m.unit || m.donViTinh || "Lần",
              price: Number(m.price ?? m.unitPrice ?? m.dongia) || 0,
              stock: m.stock ?? m.quantity ?? m.soLuongTon ?? null,
            })),
          );
          setMedicineSource("api");
        }
        const sList = getCollectionData(svcRes.data);
        if (Array.isArray(sList) && sList.length > 0) {
          setServices(
            sList.map((s) => ({
              id: s.id || s.serviceId,
              name: s.name || s.serviceName || s.tenDichVu || s.id,
              price: Number(s.price ?? s.unitPrice ?? s.dongia) || 0,
            })),
          );
          setServiceSource("api");
        }
      } catch {
        /* giữ danh mục cũ */
      }

      // 3. Tải lại hàng đợi
      const qRes = await axios.get(`${RECEPTION_API}/queue/doctor/${doctorId}`, {
        params: { date: examDate },
      });
      const list = Array.isArray(qRes.data) ? qRes.data : [];
      setQueue(list);

      // 4. Nếu đang có bệnh nhân được chọn, cập nhật thông tin mới nhất
      if (selected) {
        const fresh = list.find((item) => item.id === selected.id);
        if (fresh) {
          setSelected((prev) => ({ ...prev, ...fresh }));
        }
        try {
          const pRes = await axios.get(`${PATIENT_API}/${selected.patientId}`);
          setPatient(pRes.data);
          loadPatientHistory(selected.patientId, selected.id);
        } catch {
          /* giữ thông tin cũ */
        }
      }

      // 5. Thông báo kết quả rõ ràng
      const count = list.length;
      if (count === 0) {
        notify("info", "Đã làm mới: Không có lượt khám nào của bác sĩ trong ngày này.");
      } else {
        const choKham = list.filter((i) => i.queueStatus === "ChoKham").length;
        const dangKham = list.filter((i) => i.queueStatus === "DangKham").length;
        const daKham = list.filter((i) => i.queueStatus === "DaKham").length;
        notify(
          "success",
          `Đã làm mới dữ liệu trang khám (${count} lượt: ${choKham} chờ, ${dangKham} đang khám, ${daKham} đã khám).`,
        );
      }
    } catch (err) {
      notify(
        "error",
        `Không thể làm mới dữ liệu: ${extractError(err, "kiểm tra backend")}`,
      );
    } finally {
      setLoadingQueue(false);
    }
  };

  /** Đóng / hủy chọn hồ sơ bệnh nhân hiện tại */
  const handleCloseExamination = () => {
    setSelected(null);
    setPatient(null);
    setHistory([]);
    setExam(EMPTY_EXAM);
    setVitals(EMPTY_VITALS);
    setMedicalRecordId("");
    setMedLines([{ medicineId: "", quantity: 1, dosage: "", unitPrice: 0 }]);
    setSvcLines([{ serviceId: "", quantity: 1, unitPrice: 0 }]);
    notify("info", "Đã đóng hồ sơ khám hiện tại.");
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
          primaryIcd,
          secondaryIcds,
          clinicalDiagnosisNote,
          isManualDiagnosis,
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
    setExam({ ...EMPTY_EXAM, symptoms: item.initialSymptoms || "" });
    setVitals(EMPTY_VITALS);
    setMedicalRecordId("");
    setPrimaryIcd("");
    setSecondaryIcds([]);
    setClinicalDiagnosisNote("");
    setIsManualDiagnosis(false);
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
        if (draft.primaryIcd !== undefined) setPrimaryIcd(draft.primaryIcd);
        else if (draft.exam?.diagnosis) {
          const match = draft.exam.diagnosis.match(/^\[([A-Z0-9.]+)\]/);
          if (match && match[1]) setPrimaryIcd(match[1]);
        }
        if (draft.secondaryIcds !== undefined) setSecondaryIcds(draft.secondaryIcds);
        if (draft.clinicalDiagnosisNote !== undefined) setClinicalDiagnosisNote(draft.clinicalDiagnosisNote);
        if (draft.isManualDiagnosis !== undefined) setIsManualDiagnosis(draft.isManualDiagnosis);

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

  /** Bệnh nhân vắng mặt khi gọi: đưa về cuối hàng chờ, giữ nguyên STT */
  const deferPatient = (item) => {
    if (!item) return;
    axios
      .post(`${RECEPTION_API}/${item.id}/defer`)
      .then(() => {
        notify(
          "warn",
          `Bệnh nhân STT ${String(item.queueNumber).padStart(2, "0")} (${item.id}) vắng mặt — đã chuyển xuống cuối hàng chờ (vẫn giữ nguyên số thứ tự).`,
        );
        if (selected?.id === item.id) {
          handleCloseExamination();
        }
        loadQueue(true);
      })
      .catch((err) =>
        notify(
          "error",
          `Không thể chuyển cuối hàng: ${extractError(err, "lỗi kết nối")}`,
        ),
      );
  };

  const callNextPatient = () => {
    const choKhamList = queue.filter((item) => item.queueStatus === "ChoKham");
    const next = [...choKhamList].sort(sortQueueItems)[0];

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
          status: line.result ? "COMPLETED" : "DaChiDinh",
          result: line.result || "",
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

    /* 3b. Tự động lập hóa đơn viện phí chuyển sang quầy thu ngân */
    if (recordId) {
      try {
        await axios.post("/api/invoices", {
          medicalRecordId: recordId,
          staffId: selected.employeeId || "NV001",
        });
      } catch (err) {
        console.warn("Chưa thể tự động lập hóa đơn:", err);
      }
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

  const handleSaveMedicalRecordAction = () => {
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
  };

  const handleResetExam = () => {
    if (selected) {
      selectReception(selected);
      notify("info", "Đã làm mới lại dữ liệu phiếu khám.");
    }
  };

  /* ================= DỮ LIỆU MỤC ================= */

  useEffect(() => {
    axios
      .get(DOCTOR_API, { params: { page: 0, size: 100 } })
      .then((res) => {
        const list = getCollectionData(res.data);
        setDoctors(list);
        if (sessionDoctorId) {
          setDoctorId(sessionDoctorId);
        } else if (isDoctorUser && list.length > 0) {
          const matched = list.find(
            (d) =>
              d.user?.id === user?.id ||
              d.userId === user?.id ||
              d.user?.username === user?.username,
          );
          if (matched) {
            setDoctorId(matched.id);
          } else {
            setDoctorId((prev) => prev || (list[0] && list[0].id) || "");
          }
        } else {
          setDoctorId((prev) => prev || (list[0] && list[0].id) || "");
        }
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
    if (sessionDoctorId) {
      setDoctorId(sessionDoctorId);
    }
  }, [sessionDoctorId]);

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
    const list = queue.filter((item) => {
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
    return [...list].sort(sortQueueItems);
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

  /* ================= ICD-10 & PHÁC ĐỒ THUỐC ================= */

  const currentDoctor = useMemo(() => {
    return doctors.find((d) => String(d.id) === String(doctorId));
  }, [doctors, doctorId]);

  const doctorSpecialtyId = useMemo(() => {
    return (
      currentDoctor?.specialty?.id ||
      currentDoctor?.specialtyId ||
      currentDoctor?.departmentId ||
      currentDoctor?.machuyenkhoa ||
      ""
    );
  }, [currentDoctor]);

  const doctorSpecialtyName = useMemo(() => {
    return (
      currentDoctor?.specialty?.name ||
      currentDoctor?.specialty?.specialtyName ||
      currentDoctor?.specialtyName ||
      (doctorSpecialtyId ? `Khoa ${doctorSpecialtyId}` : "")
    );
  }, [currentDoctor, doctorSpecialtyId]);

  const availableIcdCatalog = useMemo(() => {
    if (showAllSpecialtyIcd || !doctorSpecialtyId) {
      return ICD10_CATALOG;
    }
    const specKey = String(doctorSpecialtyId).toUpperCase();
    const filtered = ICD10_CATALOG.filter((item) => {
      if (!item.specialty) return true;
      const itemSpec = String(item.specialty).toUpperCase();
      if (specKey.includes("TIM") && itemSpec.includes("TIM")) return true;
      if (
        (specKey.includes("TAI") ||
          specKey.includes("TMH") ||
          specKey.includes("HOHAP")) &&
        itemSpec.includes("TAI")
      )
        return true;
      if (specKey.includes("NHI") && itemSpec.includes("NHI")) return true;
      if (
        specKey.includes("NOI") &&
        (itemSpec.includes("NOI") || itemSpec.includes("DEFAULT"))
      )
        return true;
      return itemSpec === specKey;
    });
    return filtered.length > 0 ? filtered : ICD10_CATALOG;
  }, [showAllSpecialtyIcd, doctorSpecialtyId]);

  const buildDiagnosisString = (pCode, sCodes, note) => {
    const parts = [];
    if (pCode) {
      const pItem = ICD10_CATALOG.find((c) => c.code === pCode);
      parts.push(`[${pCode}] ${pItem ? pItem.name : ""}`.trim());
    }
    if (Array.isArray(sCodes) && sCodes.length > 0) {
      const sItems = sCodes
        .map((sc) => {
          const item = ICD10_CATALOG.find((c) => c.code === sc);
          return `[${sc}] ${item ? item.name : ""}`.trim();
        })
        .join(", ");
      parts.push(`Kèm theo: ${sItems}`);
    }
    if (note && note.trim()) {
      parts.push(`Chi tiết: ${note.trim()}`);
    }
    return parts.join(" ; ");
  };

  const handleSelectPrimaryIcd = (code) => {
    setPrimaryIcd(code);
    if (!isManualDiagnosis) {
      const newDiag = buildDiagnosisString(code, secondaryIcds, clinicalDiagnosisNote);
      setExam((prev) => ({ ...prev, diagnosis: newDiag }));
    }
  };

  const handleToggleSecondaryIcd = (code) => {
    let updated;
    if (secondaryIcds.includes(code)) {
      updated = secondaryIcds.filter((c) => c !== code);
    } else {
      updated = [...secondaryIcds, code];
    }
    setSecondaryIcds(updated);
    if (!isManualDiagnosis) {
      const newDiag = buildDiagnosisString(primaryIcd, updated, clinicalDiagnosisNote);
      setExam((prev) => ({ ...prev, diagnosis: newDiag }));
    }
  };

  const handleClinicalNoteChange = (text) => {
    setClinicalDiagnosisNote(text);
    if (!isManualDiagnosis) {
      const newDiag = buildDiagnosisString(primaryIcd, secondaryIcds, text);
      setExam((prev) => ({ ...prev, diagnosis: newDiag }));
    }
  };

  const suggestedPrescription = useMemo(() => {
    if (!primaryIcd || !ICD10_MEDICINE_PRESETS[primaryIcd]) return null;
    const preset = ICD10_MEDICINE_PRESETS[primaryIcd];
    const icdItem = ICD10_CATALOG.find((c) => c.code === primaryIcd);
    return {
      icdCode: primaryIcd,
      name: icdItem?.name || primaryIcd,
      items: preset.map((p) => {
        const med = medicines.find((m) => m.id === p.medicineId);
        return {
          medicineId: p.medicineId,
          medicineName: med?.name || p.medicineId,
          quantity: p.quantity,
          dosage: p.dosage,
          unitPrice: med?.price || med?.unitPrice || 0,
        };
      }),
    };
  }, [primaryIcd, medicines]);

  const handleApplyIcdPrescription = () => {
    if (!suggestedPrescription || !suggestedPrescription.items.length) return;
    const newItems = suggestedPrescription.items.map((it) => ({
      medicineId: it.medicineId,
      quantity: it.quantity,
      dosage: it.dosage,
      unitPrice: it.unitPrice || 0,
    }));

    const validLines = medLines.filter((l) => l.medicineId);
    if (validLines.length === 0) {
      setMedLines(newItems);
    } else {
      const existingIds = new Set(validLines.map((l) => l.medicineId));
      const toAdd = newItems.filter((it) => !existingIds.has(it.medicineId));
      if (toAdd.length === 0) {
        notify("info", "Các thuốc trong phác đồ đã có sẵn trong đơn.");
        return;
      }
      setMedLines([...validLines, ...toAdd]);
    }
    notify(
      "success",
      `Đã áp dụng phác đồ thuốc theo chuẩn ICD-10 cho [${suggestedPrescription.icdCode} - ${suggestedPrescription.name}]!`,
    );
  };

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

  const handleRemoveMedLine = (index) => {
    setMedLines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddMedLine = () => {
    setMedLines((prev) => [
      ...prev,
      { medicineId: "", quantity: 1, dosage: "", unitPrice: 0 },
    ]);
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
      result: "",
    });
  };

  const handleRemoveSvcLine = (index) => {
    setSvcLines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSvcLine = () => {
    setSvcLines((prev) => [
      ...prev,
      { serviceId: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const openResultModal = (index) => {
    const line = svcLines[index];
    if (!line || !line.serviceId) return;
    setResultModalIndex(index);
    setCustomResultText(line.result || "");
    setSelectedTemplateResult(line.result || "");
  };

  const closeResultModal = () => {
    setResultModalIndex(null);
    setCustomResultText("");
    setSelectedTemplateResult("");
  };

  const handleApplyResult = () => {
    if (resultModalIndex === null) return;
    const finalResult = customResultText.trim();
    setSvcLines((prev) =>
      prev.map((l, i) =>
        i === resultModalIndex ? { ...l, result: finalResult } : l,
      ),
    );
    closeResultModal();
  };

  const handleClearResult = () => {
    if (resultModalIndex === null) return;
    setSvcLines((prev) =>
      prev.map((l, i) =>
        i === resultModalIndex ? { ...l, result: "" } : l,
      ),
    );
    closeResultModal();
  };

  /* ================= HIỂN THỊ ================= */

  const doctorName = (() => {
    const doc = doctors.find((d) => d.id === doctorId);
    if (doc) {
      return (
        doc.user?.fullName || doc.fullName || doc.name || `Bác sĩ ${doc.id}`
      );
    }
    return (
      user?.fullName ||
      staffSession?.user?.fullName ||
      staffSession?.name ||
      (doctorId ? `Bác sĩ ${doctorId}` : "")
    );
  })();

  const age = patient ? calcAge(patient.dateOfBirth) : null;

  const examEditable =
    selected && selected.queueStatus !== "DaKham" && selected.queueStatus !== "BoQua";

  return {
    // Session & Bác sĩ
    doctorId,
    setDoctorId,
    doctors,
    isDoctorUser,
    doctorName,
    examDate,
    setExamDate,
    currentDoctor,
    doctorSpecialtyName,
    // Hàng đợi
    queue,
    loadingQueue,
    filteredQueue,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    statusCounts,
    selected,
    selectReception,
    changeStatus,
    deferPatient,
    callNextPatient,
    handleRefresh,
    handleCloseExamination,
    // Bệnh nhân & Tiền sử
    patient,
    patientLoading,
    age,
    history,
    // Sinh hiệu & Bệnh án
    vitals,
    setVitals,
    saveVitals,
    medicalRecordId,
    setMedicalRecordId,
    // Khám & Chẩn đoán ICD
    exam,
    setExam,
    primaryIcd,
    secondaryIcds,
    clinicalDiagnosisNote,
    isManualDiagnosis,
    setIsManualDiagnosis,
    showAllSpecialtyIcd,
    setShowAllSpecialtyIcd,
    availableIcdCatalog,
    handleSelectPrimaryIcd,
    handleToggleSecondaryIcd,
    handleClinicalNoteChange,
    // Đơn thuốc & Gợi ý ICD
    suggestedPrescription,
    handleApplyIcdPrescription,
    medLines,
    medicines,
    medicineSource,
    prescriptionTotal,
    handleMedicineChange,
    updateMedLine,
    handleRemoveMedLine,
    handleAddMedLine,
    // Chỉ định dịch vụ
    svcLines,
    services,
    serviceSource,
    serviceTotal,
    handleServiceChange,
    updateSvcLine,
    handleRemoveSvcLine,
    handleAddSvcLine,
    // Kết quả dịch vụ modal
    resultModalIndex,
    selectedTemplateResult,
    setSelectedTemplateResult,
    customResultText,
    setCustomResultText,
    openResultModal,
    closeResultModal,
    handleApplyResult,
    handleClearResult,
    // Trạng thái chung & Hành động
    notice,
    setNotice,
    busy,
    examEditable,
    saveDraft,
    handleResetExam,
    handleSaveMedicalRecordAction,
    completeExamination,
    showPrint,
    setShowPrint,
  };
}
