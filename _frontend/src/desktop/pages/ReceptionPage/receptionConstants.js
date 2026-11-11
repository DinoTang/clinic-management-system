/**
 * HẰNG SỐ & ĐỊA CHỈ API DÙNG CHO TRANG TIẾP ĐÓN BỆNH NHÂN (RECEPTION PAGE)
 */

export const RECEPTION_API = "http://localhost:8080/api/receptions";
export const CHECKIN_API = "http://localhost:8080/api/checkin";
export const ROOM_API = "http://localhost:8080/api/rooms";
export const DOCTOR_API = "http://localhost:8080/api/doctors";
export const PATIENT_API = "http://localhost:8080/api/patients";
export const SPECIALTY_API = "http://localhost:8080/api/specialties";
export const SCHEDULE_API = "http://localhost:8080/api/doctor-schedules";

export const FALLBACK_SPECIALTIES = [
  { id: "CK_NOI", name: "Chuyên Khoa Nội Tổng Quát" },
  { id: "CK_NHI", name: "Chuyên Khoa Nhi" },
  { id: "CK_TIM", name: "Chuyên Khoa Tim Mạch" },
  { id: "CK_RHM", name: "Chuyên Khoa Răng Hàm Mặt" },
  { id: "CK_MAT", name: "Chuyên Khoa Mắt" },
];

export const createInitialFormData = (today, loggedInStaffId = "") => ({
  patientId: "",
  employeeId: loggedInStaffId || "",
  roomId: "",
  doctorId: "",
  appointmentId: "",
  receptionDate: today,
  receptionType: "",
  initialSymptoms: "",
  patientName: "",
  patientPhone: "",
  patientGender: "Nam",
  patientDob: "",
  patientAddress: "",
  pulse: "",
  temperature: "",
  bloodPressure: "",
  weight: "",
  height: "",
});
