import { getLocalDateString } from "../../../utils/date.js";

export const SCHEDULE_API = "/api/doctor-schedules";
export const DOCTOR_API = "/api/doctors";
export const ROOM_API = "/api/rooms";

export const SCHEDULE_STATUS_OPTIONS = [
  { value: "MoDangKy", label: "MoDangKy" },
  { value: "AVAILABLE", label: "AVAILABLE" },
  { value: "DaDay", label: "DaDay" },
  { value: "Huy", label: "Huy" },
];

export const getInitialScheduleForm = () => ({
  doctorId: "",
  roomId: "",
  examinationDate: getLocalDateString(),
  startTime: "07:30",
  endTime: "11:30",
  maxPatients: 30,
  status: "MoDangKy",
});
