import axios from "axios";

/**
 * API phía bệnh nhân (mobile). Dùng chung axios instance để nhận
 * Authorization header mà PatientMobileApp đã set từ session.
 */
const BASE = "/api/patient";

export async function getProfile(patientId) {
  const { data } = await axios.get(`${BASE}/${patientId}/profile`);
  return data;
}

export async function updateProfile(patientId, payload) {
  const { data } = await axios.put(`${BASE}/${patientId}/profile`, payload);
  return data;
}

export async function getAppointments(patientId) {
  const { data } = await axios.get(`${BASE}/${patientId}/appointments`);
  return data;
}

export async function cancelAppointment(appointmentId, patientId) {
  const { data } = await axios.put(
    `${BASE}/appointments/${appointmentId}/cancel`,
    { patientId },
  );
  return data;
}

export async function getMedicalRecords(patientId) {
  const { data } = await axios.get(`${BASE}/${patientId}/medical-records`);
  return data;
}

export function errorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}
