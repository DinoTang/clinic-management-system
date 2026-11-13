import axios from "axios";
import Swal from "sweetalert2";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getCollectionData } from "../../../utils/apiResponse.js";
import { getLocalDateString } from "../../../utils/date.js";
import { getSymptomsBySpecialty } from "../../constants/medicalConstants.js";
import {
  CHECKIN_API,
  createInitialFormData,
  DOCTOR_API,
  PATIENT_API,
  RECEPTION_API,
  ROOM_API,
  SCHEDULE_API,
  SPECIALTY_API,
} from "./receptionConstants.js";

export function useReception() {
  const today = getLocalDateString();
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

  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("");

  const [rooms, setRooms] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [queueList, setQueueList] = useState([]);
  const [todaySchedules, setTodaySchedules] = useState([]);

  const [lookupAppointmentId, setLookupAppointmentId] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [filterRoomId, setFilterRoomId] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const [scanNotice, setScanNotice] = useState(null);

  const [formData, setFormData] = useState(() =>
    createInitialFormData(today, loggedInStaffId),
  );

  const [createdSlip, setCreatedSlip] = useState(null);

  useEffect(() => {
    if (loggedInStaffId) {
      setFormData((prev) => ({ ...prev, employeeId: loggedInStaffId }));
    }
  }, [loggedInStaffId]);

  // 1. Tải danh sách hàng đợi trong ngày
  const fetchTodayQueue = useCallback(() => {
    axios
      .get(`${RECEPTION_API}/by-date?date=${today}`)
      .then((res) => setQueueList(res.data))
      .catch(console.error);
  }, [today]);

  // 2. Lấy mã BN tự tăng mới nhất cho khách trực tiếp
  const fetchNextPatientId = () => {
    axios
      .get(`${PATIENT_API}/next-id`)
      .then((res) => {
        if (res.data?.nextId) {
          setFormData((prev) => ({ ...prev, patientId: res.data.nextId }));
        }
      })
      .catch(() => {
        setFormData((prev) => ({ ...prev, patientId: "Tự động tạo mới" }));
      });
  };

  // 3. Khởi tạo danh mục ban đầu
  useEffect(() => {
    axios
      .get(SPECIALTY_API)
      .then((res) => setSpecialties(getCollectionData(res.data)))
      .catch(() => {
        console.warn(
          "Chưa có API chuyên khoa riêng, thử lấy từ /api/departments...",
        );
        axios
          .get("/api/departments")
          .then((res) => setSpecialties(getCollectionData(res.data)))
          .catch(console.error);
      });

    axios
      .get(ROOM_API)
      .then((res) => setRooms(getCollectionData(res.data)))
      .catch(console.error);
    axios
      .get(DOCTOR_API)
      .then((res) => setDoctors(getCollectionData(res.data)))
      .catch(console.error);
    fetchTodayQueue();
  }, [fetchTodayQueue]);

  // Tải danh sách lịch trực theo ngày tiếp nhận
  useEffect(() => {
    const d = formData.receptionDate || today;
    axios
      .get(`${SCHEDULE_API}/date?date=${d}`)
      .then((res) => {
        const list = getCollectionData(res.data) || [];
        setTodaySchedules(list);
      })
      .catch((err) => console.error("Lỗi tải lịch trực bác sĩ:", err));
  }, [formData.receptionDate, today]);

  // Kiểm tra bác sĩ có lịch trực hợp lệ trong ngày hay không
  const isDoctorOnDuty = useCallback(
    (docId) => {
      if (!docId) return false;
      return todaySchedules.some(
        (s) =>
          String(s.doctor?.id || s.doctorId) === String(docId) &&
          !s.deleted &&
          s.status !== "DaHuy" &&
          s.status !== "CANCELLED",
      );
    },
    [todaySchedules],
  );

  // 4. Xử lý khi chọn Chuyên Khoa -> reset bác sĩ & phòng để lọc lại
  const handleSpecialtyChange = (specId) => {
    setSelectedSpecialtyId(specId);
    setFormData((prev) => ({
      ...prev,
      doctorId: "",
      roomId: "",
    }));
  };

  // 5. Xử lý khi chọn Bác Sĩ -> tự gán phòng khám theo lịch trực hoặc chuyên khoa
  const handleDoctorChange = (selectedDoctorId) => {
    const doc = doctors.find((d) => String(d.id) === String(selectedDoctorId));
    let matchedRoomId = "";

    if (doc) {
      // Ưu tiên phòng trực từ lịch phân công thực tế
      const dutySchedule = todaySchedules.find(
        (s) =>
          String(s.doctor?.id || s.doctorId) === String(selectedDoctorId) &&
          !s.deleted,
      );
      if (dutySchedule && dutySchedule.roomId) {
        matchedRoomId = dutySchedule.roomId;
      } else {
        const docDepartmentId =
          doc.departmentId || doc.specialtyId || doc.specialty?.id;
        if (docDepartmentId) {
          const foundRoom = rooms.find((r) => {
            const roomDept =
              r.departmentId ||
              r.specialtyId ||
              r.machuyenkhoa ||
              r.specialty?.id;
            return roomDept && String(roomDept) === String(docDepartmentId);
          });
          if (foundRoom) matchedRoomId = foundRoom.id;
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      doctorId: selectedDoctorId,
      roomId: matchedRoomId || prev.roomId,
    }));
  };

  // Triệu chứng thường gặp theo chuyên khoa đang chọn
  const suggestedSymptoms = useMemo(() => {
    return getSymptomsBySpecialty(selectedSpecialtyId);
  }, [selectedSpecialtyId]);

  const handleToggleSymptom = (symp) => {
    const current = (formData.initialSymptoms || "").trim();
    if (!current) {
      setFormData((prev) => ({ ...prev, initialSymptoms: symp }));
      return;
    }
    const items = current
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const exists = items.some(
      (item) => item.toLowerCase() === symp.toLowerCase(),
    );
    let updated;
    if (exists) {
      updated = items.filter(
        (item) => item.toLowerCase() !== symp.toLowerCase(),
      );
    } else {
      updated = [...items, symp];
    }
    setFormData((prev) => ({ ...prev, initialSymptoms: updated.join(", ") }));
  };

  // 6. Quét QR / tra cứu lịch hẹn tại quầy (mọi lần quét đều ghi vết vào bảng lichsucheckin)
  const applyCheckInResult = (result) => {
    if (!result) return;

    if (!result.ok) {
      setScanNotice({ tone: "error", text: result.message });
      Swal.fire({
        icon: "error",
        title: "Không thể tiếp đón",
        text: result.message,
        confirmButtonColor: "#2563eb",
      });
      setLookupAppointmentId("");
      setFormData((prev) => ({
        ...prev,
        appointmentId: "",
        receptionType:
          prev.receptionType === "HenTruoc" ? "TrucTiep" : prev.receptionType,
        initialSymptoms: "",
      }));
      return;
    }

    const doc = doctors.find((d) => String(d.id) === String(result.doctorId));
    const docSpecId = doc
      ? doc.specialtyId || doc.departmentId || doc.specialty?.id
      : "";
    if (docSpecId) setSelectedSpecialtyId(docSpecId);

    setLookupAppointmentId(result.appointmentId || "");
    setFormData((prev) => ({
      ...prev,
      patientId: result.patientId || prev.patientId,
      patientName: result.patientName || prev.patientName,
      patientPhone: result.patientPhone || prev.patientPhone,
      doctorId: result.doctorId || "",
      roomId: result.roomId || prev.roomId,
      appointmentId: result.appointmentId || "",
      receptionType: "HenTruoc",
      initialSymptoms: result.reason || "Khám theo lịch hẹn",
    }));

    const when = [result.appointmentDate, result.appointmentTime]
      .filter(Boolean)
      .join(" ");
    setScanNotice({
      tone: result.alreadyCheckedIn ? "warning" : "success",
      text: `${result.message} · ${result.appointmentId} · ${
        result.patientName || result.patientId || ""
      } ${when}`.trim(),
    });
  };

  const handleCheckInScan = (rawCode, method = "QR") => {
    const code = String(rawCode ?? "").trim();
    if (!code) {
      setScanNotice({
        tone: "error",
        text: "Vui lòng nhập mã lịch hẹn hoặc quét mã QR.",
      });
      return;
    }

    setLookupLoading(true);
    axios
      .post(`${CHECKIN_API}/scan`, {
        code,
        employeeId: loggedInStaffId || formData.employeeId || "",
        method,
      })
      .then((res) => applyCheckInResult(res.data))
      .catch((err) => {
        console.error(err);
        const errMsg =
          err.response?.data?.message ||
          "Lỗi tra cứu: không tìm thấy mã lịch hẹn " + code;
        setScanNotice({
          tone: "error",
          text: errMsg,
        });
        Swal.fire({
          icon: "error",
          title: "Không thể tiếp đón",
          text: errMsg,
          confirmButtonColor: "#2563eb",
        });
        setLookupAppointmentId("");
        setFormData((prev) => ({
          ...prev,
          appointmentId: "",
          receptionType:
            prev.receptionType === "HenTruoc" ? "TrucTiep" : prev.receptionType,
          initialSymptoms: "",
        }));
      })
      .finally(() => setLookupLoading(false));
  };

  const handleLookupAppointment = () => {
    handleCheckInScan(lookupAppointmentId, "MANUAL");
  };

  // 7. Xử lý chuyển đổi loại tiếp đón
  const handleTypeChange = (selectedType) => {
    if (selectedType === "TrucTiep") {
      fetchNextPatientId();
      setFormData((prev) => ({
        ...prev,
        receptionType: selectedType,
        appointmentId: "",
        initialSymptoms: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        patientId: "",
        receptionType: selectedType,
        appointmentId: "",
        initialSymptoms: "",
      }));
    }
  };

  // 8. Hàm Làm mới / Reset lại toàn bộ form nhập liệu
  const handleResetForm = () => {
    setLookupAppointmentId("");
    setSelectedSpecialtyId("");
    setScanNotice(null);
    setFormData(createInitialFormData(today, loggedInStaffId));
  };

  // 9. Submit tiếp nhận
  const handleSubmitReception = (e) => {
    e.preventDefault();

    const activeStaffId = loggedInStaffId || formData.employeeId;
    if (!activeStaffId) {
      return alert(
        "Không xác định được mã nhân viên đang đăng nhập! Vui lòng đăng nhập lại tài khoản nhân viên tiếp đón.",
      );
    }
    if (!formData.receptionType) return alert("Vui lòng chọn Loại tiếp đón!");
    if (!formData.patientId) return alert("Chưa có mã bệnh nhân!");
    if (formData.receptionType === "TrucTiep" && !formData.patientName.trim()) {
      return alert("Vui lòng nhập Họ tên bệnh nhân mới!");
    }
    if (!formData.roomId) return alert("Vui lòng chọn Phòng khám!");
    if (!formData.doctorId) return alert("Vui lòng chọn Bác sĩ khám!");

    // Chặn nếu bác sĩ không có lịch trực trong ngày tiếp nhận
    if (!isDoctorOnDuty(formData.doctorId)) {
      const doc = doctors.find((d) => String(d.id) === String(formData.doctorId));
      const docName =
        doc?.user?.fullName || doc?.fullName || doc?.name || formData.doctorId;
      Swal.fire({
        icon: "error",
        title: "Bác sĩ không có lịch trực!",
        html: `Bác sĩ <b>${docName}</b> không có lịch trực vào ngày <b>${formData.receptionDate || today}</b>.<br/><br/><span style="color: #dc2626; font-size: 13.5px; font-weight: 600;">Hệ thống đã chặn không cho lưu tiếp đón! Vui lòng chọn bác sĩ đang có lịch trực.</span>`,
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    const payload = {
      ...formData,
      employeeId: activeStaffId,
      appointmentId:
        formData.receptionType === "HenTruoc" ? formData.appointmentId : null,
      pulse: formData.pulse ? parseInt(formData.pulse, 10) : null,
      temperature: formData.temperature
        ? parseFloat(formData.temperature)
        : null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      height: formData.height ? parseFloat(formData.height) : null,
    };

    axios
      .post(RECEPTION_API, payload)
      .then((res) => {
        setCreatedSlip(res.data);
        fetchTodayQueue();
        alert(
          `Tiếp nhận thành công bệnh nhân: ${formData.patientName || formData.patientId}! STT: ${res.data.queueNumber}`,
        );
        handleResetForm();
      })
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          err.message ||
          "Lỗi khi tạo lượt tiếp đón!";
        Swal.fire({
          icon: "error",
          title: "Không thể tiếp đón",
          text: msg,
          confirmButtonColor: "#dc2626",
        });
      });
  };

  return {
    today,
    loggedInStaffId,
    loggedInStaffName,
    specialties,
    selectedSpecialtyId,
    rooms,
    doctors,
    queueList,
    todaySchedules,
    lookupAppointmentId,
    setLookupAppointmentId,
    lookupLoading,
    filterRoomId,
    setFilterRoomId,
    scanOpen,
    setScanOpen,
    scanNotice,
    setScanNotice,
    formData,
    setFormData,
    createdSlip,
    setCreatedSlip,
    isDoctorOnDuty,
    handleSpecialtyChange,
    handleDoctorChange,
    suggestedSymptoms,
    handleToggleSymptom,
    handleCheckInScan,
    handleLookupAppointment,
    handleTypeChange,
    handleResetForm,
    handleSubmitReception,
  };
}
