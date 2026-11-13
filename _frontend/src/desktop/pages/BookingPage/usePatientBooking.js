import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { downloadTicketPdf } from "../../../utils/appointmentTicketPdf.js";
import { getCollectionData } from "../../../utils/apiResponse.js";
import { getLocalDateString } from "../../../utils/date.js";
import { getSymptomsBySpecialty } from "../../constants/medicalConstants.js";
import {
  APPOINTMENT_API,
  createInitialBookingData,
  DOCTOR_API,
  SCHEDULE_API,
  SPECIALTY_API,
} from "./bookingConstants.js";

export function usePatientBooking(patientProfile = null) {
  const [step, setStep] = useState(1);
  const today = getLocalDateString();

  // Danh mục dữ liệu
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);

  // Dữ liệu đặt lịch bệnh nhân lựa chọn
  const [bookingData, setBookingData] = useState(() =>
    createInitialBookingData(today, patientProfile),
  );

  const [bookingSuccessResult, setBookingSuccessResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const ticketRef = useRef(null);

  // Tải danh mục khoa & bác sĩ ban đầu
  useEffect(() => {
    axios
      .get(SPECIALTY_API)
      .then((res) => setSpecialties(getCollectionData(res.data)))
      .catch((err) => console.error("Lỗi tải chuyên khoa:", err));

    axios
      .get(DOCTOR_API)
      .then((res) => setDoctors(getCollectionData(res.data)))
      .catch((err) => console.error("Lỗi tải bác sĩ:", err));
  }, []);

  // Lọc bác sĩ theo chuyên khoa
  const handleSpecialtyChange = (e) => {
    const specId = e.target.value;
    setBookingData((prev) => ({
      ...prev,
      specialtyId: specId,
      doctorId: "",
      selectedSchedule: null,
    }));

    if (specId) {
      const filtered = doctors.filter(
        (d) =>
          d.departmentId === specId ||
          d.specialtyId === specId ||
          d.specialty?.id === specId,
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  };

  // Triệu chứng thường gặp theo chuyên khoa đang chọn
  const suggestedSymptoms = useMemo(() => {
    return getSymptomsBySpecialty(bookingData.specialtyId);
  }, [bookingData.specialtyId]);

  const handleToggleSymptom = (symp) => {
    const current = (bookingData.reason || "").trim();
    if (!current) {
      setBookingData((prev) => ({ ...prev, reason: symp }));
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
    setBookingData((prev) => ({ ...prev, reason: updated.join(", ") }));
  };

  // Tìm kiếm ca trực khả dụng của bác sĩ trong ngày chọn
  const fetchAvailableSchedules = (doctorId, date) => {
    if (!doctorId || !date) return;
    setLoading(true);
    axios
      .get(`${SCHEDULE_API}/doctor/${doctorId}/date?date=${date}`)
      .then((res) => {
        // Chỉ lấy những ca còn nhận và đang mở đăng ký
        const valid = res.data.filter(
          (s) => s.status === "MoDangKy" || s.status === "AVAILABLE",
        );
        setAvailableSchedules(valid);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi nạp lịch trực:", err);
        setAvailableSchedules([]);
        setLoading(false);
      });
  };

  const handleDoctorChange = (e) => {
    const docId = e.target.value;
    setBookingData((prev) => ({
      ...prev,
      doctorId: docId,
      selectedSchedule: null,
    }));
    fetchAvailableSchedules(docId, bookingData.examinationDate);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setBookingData((prev) => ({
      ...prev,
      examinationDate: newDate,
      selectedSchedule: null,
    }));
    fetchAvailableSchedules(bookingData.doctorId, newDate);
  };

  // Xác nhận đặt lịch và gọi API lưu vào CSDL
  const handleConfirmBooking = () => {
    if (!bookingData.patientName.trim())
      return alert("Vui lòng nhập họ và tên!");
    if (!bookingData.phoneNumber.trim())
      return alert("Vui lòng nhập số điện thoại!");

    const { selectedSchedule, patientId, doctorId, examinationDate, reason } =
      bookingData;

    // Giờ hẹn mặc định lấy theo giờ bắt đầu ca trực
    const appointmentPayload = {
      patientId: patientId || "BN001",
      doctorId: doctorId,
      scheduleId: selectedSchedule.id,
      appointmentDate: examinationDate,
      appointmentTime: selectedSchedule.startTime,
      reason: reason || "Khám bệnh theo yêu cầu",
      status: "DaDat",
    };

    setLoading(true);
    axios
      .post(APPOINTMENT_API, appointmentPayload)
      .then((res) => {
        setBookingSuccessResult(res.data);
        setStep(4); // Sang bước hoàn tất
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Lỗi khi đặt lịch khám!");
        setLoading(false);
      });
  };

  // Tải phiếu hẹn vừa đặt lịch thành file PDF để lưu lại hoặc in.
  const handleDownloadPdf = async () => {
    if (!bookingSuccessResult?.id) return;

    setExportingPdf(true);
    try {
      await downloadTicketPdf(
        ticketRef.current,
        `PhieuHen_${bookingSuccessResult.id}.pdf`,
      );
    } catch (err) {
      console.error("Lỗi tạo file PDF phiếu hẹn:", err);
      alert("Không tạo được file PDF phiếu hẹn: " + (err?.message || err));
    } finally {
      setExportingPdf(false);
    }
  };

  const handleResetBooking = () => {
    setStep(1);
    setBookingData(createInitialBookingData(today, patientProfile));
    setBookingSuccessResult(null);
  };

  return {
    today,
    step,
    setStep,
    specialties,
    doctors,
    filteredDoctors,
    availableSchedules,
    bookingData,
    setBookingData,
    bookingSuccessResult,
    loading,
    exportingPdf,
    ticketRef,
    suggestedSymptoms,
    handleSpecialtyChange,
    handleDoctorChange,
    handleDateChange,
    handleToggleSymptom,
    fetchAvailableSchedules,
    handleConfirmBooking,
    handleDownloadPdf,
    handleResetBooking,
  };
}
