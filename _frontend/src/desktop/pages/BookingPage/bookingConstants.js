/**
 * HẰNG SỐ & API DÙNG CHO TRANG ĐẶT LỊCH KHÁM BỆNH (PATIENT BOOKING PAGE)
 */

export const SPECIALTY_API = "/api/specialties";
export const DOCTOR_API = "/api/doctors";
export const SCHEDULE_API = "/api/doctor-schedules";
export const APPOINTMENT_API = "/api/appointments";

export const createInitialBookingData = (today, patientProfile = null) => ({
  specialtyId: "",
  doctorId: "",
  examinationDate: today,
  selectedSchedule: null,
  patientId: patientProfile?.patientId || "BN001",
  patientName: patientProfile?.fullName || "",
  phoneNumber: patientProfile?.phone || "",
  reason: "",
});
