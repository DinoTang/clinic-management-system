import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { getCollectionData } from "../../../utils/apiResponse.js";
import {
  SCHEDULE_API,
  DOCTOR_API,
  ROOM_API,
  getInitialScheduleForm,
} from "./scheduleConstants.js";

export function useDoctorSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // State cho form Thêm mới bên trái
  const [formData, setFormData] = useState(getInitialScheduleForm);
  const [errors, setErrors] = useState({});

  // State quản lý Modal Sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(getInitialScheduleForm);
  const [editErrors, setEditErrors] = useState({});
  const [editAvailableRooms, setEditAvailableRooms] = useState([]);
  const [editLoadingRooms, setEditLoadingRooms] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState(null);

  const fetchSchedules = () => {
    axios
      .get(SCHEDULE_API)
      .then((res) => {
        setSchedules(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSchedules();

    axios
      .get(DOCTOR_API)
      .then((res) => setDoctors(getCollectionData(res.data)))
      .catch((err) => console.error("Lỗi nạp bác sĩ:", err));
  }, []);

  // Nút Làm mới: xóa trắng form thêm và tải lại danh sách
  const handleFullRefresh = () => {
    setLoading(true);
    fetchSchedules();
    setFormData(getInitialScheduleForm());
    setAvailableRooms([]);
    setErrors({});
  };

  // Helper lọc phòng theo bác sĩ
  const fetchRoomsForDoctor = async (doctorId) => {
    if (!doctorId) return [];
    const doc = doctors.find((d) => d.id === doctorId);
    const specialtyId =
      doc?.departmentId || doc?.specialtyId || doc?.specialty?.id;
    if (specialtyId) {
      try {
        const res = await axios.get(ROOM_API);
        return getCollectionData(res.data).filter((room) => {
          const roomSpecialtyId =
            room.departmentId ||
            room.specialtyId ||
            room.machuyenkhoa ||
            room.specialty?.id;
          return String(roomSpecialtyId) === String(specialtyId);
        });
      } catch (err) {
        console.error("Lỗi tải phòng:", err);
        return [];
      }
    }
    return [];
  };

  // Xử lý đổi bác sĩ trên Form Thêm Mới
  const handleDoctorChange = async (e) => {
    const selectedDoctorId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      doctorId: selectedDoctorId,
      roomId: "",
    }));
    if (errors.doctorId) setErrors((prev) => ({ ...prev, doctorId: "" }));

    setLoadingRooms(true);
    const rooms = await fetchRoomsForDoctor(selectedDoctorId);
    setAvailableRooms(rooms);
    setLoadingRooms(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation chung
  const validate = (data) => {
    const errs = {};
    if (!data.doctorId) errs.doctorId = "Vui lòng chọn bác sĩ";
    if (!data.roomId) errs.roomId = "Vui lòng chọn phòng khám";
    if (!data.examinationDate) errs.examinationDate = "Vui lòng chọn ngày khám";
    if (!data.startTime) errs.startTime = "Vui lòng chọn giờ bắt đầu";
    if (!data.endTime) errs.endTime = "Vui lòng chọn giờ kết thúc";
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
      errs.endTime = "Giờ kết thúc phải sau giờ bắt đầu";
    }
    const patients = Number(data.maxPatients);
    if (!data.maxPatients || isNaN(patients) || patients <= 0) {
      errs.maxPatients = "Số BN tối đa phải lớn hơn 0";
    }
    return errs;
  };

  const formatTimePayload = (t) => (t && t.length === 5 ? `${t}:00` : t);

  // Thêm lịch trực mới
  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const valErrors = validate(formData);
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    }

    const payload = {
      doctor: { id: formData.doctorId },
      roomId: formData.roomId,
      examinationDate: formData.examinationDate,
      startTime: formatTimePayload(formData.startTime),
      endTime: formatTimePayload(formData.endTime),
      maxPatients: Number(formData.maxPatients),
      status: formData.status,
      deleted: false,
    };

    axios
      .post(SCHEDULE_API, payload)
      .then(() => {
        alert("Thêm lịch trực thành công!");
        setFormData(getInitialScheduleForm());
        setAvailableRooms([]);
        setErrors({});
        fetchSchedules();
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Lỗi thêm lịch trực!");
      });
  };

  // Mở Modal Sửa khi click nút Sửa ở từng dòng
  const handleOpenEditModal = async (item) => {
    setEditingScheduleId(item.id);
    const docId = item.doctor?.id || "";

    setEditLoadingRooms(true);
    const rooms = await fetchRoomsForDoctor(docId);
    setEditAvailableRooms(rooms);
    setEditLoadingRooms(false);

    const cleanTime = (t) => (t && t.length >= 5 ? t.substring(0, 5) : t || "");

    setEditFormData({
      doctorId: docId,
      roomId: item.roomId || "",
      examinationDate: item.examinationDate || getInitialScheduleForm().examinationDate,
      startTime: cleanTime(item.startTime),
      endTime: cleanTime(item.endTime),
      maxPatients: item.maxPatients || 30,
      status: item.status || "MoDangKy",
    });
    setEditErrors({});
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Đổi bác sĩ trong Modal Sửa
  const handleEditDoctorChange = async (e) => {
    const selectedDoctorId = e.target.value;
    setEditFormData((prev) => ({
      ...prev,
      doctorId: selectedDoctorId,
      roomId: "",
    }));
    if (editErrors.doctorId)
      setEditErrors((prev) => ({ ...prev, doctorId: "" }));

    setEditLoadingRooms(true);
    const rooms = await fetchRoomsForDoctor(selectedDoctorId);
    setEditAvailableRooms(rooms);
    setEditLoadingRooms(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
    if (editErrors[name]) setEditErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Lưu cập nhật từ Modal
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const valErrors = validate(editFormData);
    if (Object.keys(valErrors).length > 0) {
      setEditErrors(valErrors);
      return;
    }

    const payload = {
      id: editingScheduleId,
      doctor: { id: editFormData.doctorId },
      roomId: editFormData.roomId,
      examinationDate: editFormData.examinationDate,
      startTime: formatTimePayload(editFormData.startTime),
      endTime: formatTimePayload(editFormData.endTime),
      maxPatients: Number(editFormData.maxPatients),
      status: editFormData.status,
      deleted: false,
    };

    axios
      .put(`${SCHEDULE_API}/${editingScheduleId}`, payload)
      .then(() => {
        alert(`Cập nhật lịch ${editingScheduleId} thành công!`);
        setIsEditModalOpen(false);
        fetchSchedules();
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Lỗi cập nhật lịch trực!");
      });
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm(`Xác nhận xóa lịch trực ${id}?`)) {
      axios
        .delete(`${SCHEDULE_API}/${id}`)
        .then(() => {
          alert("Xóa thành công!");
          fetchSchedules();
        })
        .catch(() => alert("Lỗi xóa lịch trực!"));
    }
  };

  const filteredSchedules = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return schedules.filter((item) => {
      const scheduleId = item.id ? String(item.id).toLowerCase() : "";
      const roomId = item.roomId ? item.roomId.toLowerCase() : "";
      const doctorId =
        item.doctor && item.doctor.id ? item.doctor.id.toLowerCase() : "";
      return (
        scheduleId.includes(query) ||
        roomId.includes(query) ||
        doctorId.includes(query)
      );
    });
  }, [schedules, searchTerm]);

  return {
    doctors,
    availableRooms,
    loading,
    loadingRooms,
    searchTerm,
    setSearchTerm,
    formData,
    errors,
    handleDoctorChange,
    handleChange,
    handleCreateSchedule,
    handleFullRefresh,
    filteredSchedules,
    handleOpenEditModal,
    handleDeleteSchedule,
    isEditModalOpen,
    handleCloseEditModal,
    editingScheduleId,
    editFormData,
    editErrors,
    editAvailableRooms,
    editLoadingRooms,
    handleEditDoctorChange,
    handleEditChange,
    handleSaveEdit,
  };
}
