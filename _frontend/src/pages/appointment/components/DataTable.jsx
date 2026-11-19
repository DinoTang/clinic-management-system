import { Hashtag } from "@boxicons/react";
import { APPOINTMENT_STATUS } from "../../../enums/index.js";

const STATUS_STYLES = {
  BOOKED: {
    wrapper: "bg-[#eff8ff] text-[#175cd3]",
    dot: "bg-[#2e90fa]",
  },
  ARRIVED: {
    wrapper: "bg-[#fffaeb] text-[#b54708]",
    dot: "bg-[#f79009]",
  },
  EXAMINED: {
    wrapper: "bg-[#f4f3ff] text-[#5925dc]",
    dot: "bg-[#7a5af8]",
  },
  COMPLETED: {
    wrapper: "bg-[#eaf7f1] text-[#16805d]",
    dot: "bg-[#25a575]",
  },
  CANCELLED: {
    wrapper: "bg-[#fef3f2] text-[#b42318]",
    dot: "bg-[#f04438]",
  },
};

const getStatusBadgeStyle = (status) => {
  const key = APPOINTMENT_STATUS[status]
    ? status
    : Object.keys(APPOINTMENT_STATUS).find((k) => APPOINTMENT_STATUS[k] === status);

  const style = STATUS_STYLES[key] || {
    wrapper: "bg-[#f2f4f7] text-[#667085]",
    dot: "bg-[#98a2b3]",
  };

  return {
    ...style,
    label: APPOINTMENT_STATUS[key] || status,
  };
};

function DataTable({ appointments, fetchAppointments }) {
  return (
    <div className="min-w-0 overflow-x-auto rounded-[0.5rem]">
      <table className="w-full border-collapse text-left text-[0.75rem] text-[#475467]">
        <thead className="bg-[#fbfcfd]">
          <tr>
            {[
              <Hashtag key="hash" />,
              "Bệnh nhân",
              "Bác sĩ",
              "Lịch trực",
              "Ngày khám",
              "Giờ",
              "Lý do khám",
              "Trạng thái",
            ].map((heading, index) => (
              <th
                key={index}
                className="h-[2.75rem] border-b border-[#eaecf0] !px-[0.875rem] !py-[0.75rem] text-[0.6875rem] font-semibold whitespace-nowrap text-[#8490a0]"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {appointments &&
            appointments.map((appointment, i) => {
              const statusStyle = getStatusBadgeStyle(appointment.status);

              return (
                <tr
                  key={appointment.id}
                  className="border-b border-[#f0f1f4] transition-colors last:border-b-0 hover:bg-[#fbfdff]"
                >
                  {/* Mã lịch hẹn */}
                  <td className="!px-[0.875rem] !py-[0.75rem]">
                    <div className="flex items-center gap-[0.625rem] whitespace-nowrap">
                      <span className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full bg-[#edf5fd] text-[0.6875rem] font-bold text-[#2878d0]">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-[#344054]">
                        {appointment.id}
                      </span>
                    </div>
                  </td>

                  {/* Bệnh nhân */}
                  <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                    {appointment.patientId}
                  </td>

                  {/* Bác sĩ */}
                  <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                    {appointment.doctorId}
                  </td>

                  {/* Lịch trực */}
                  <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                    {appointment.scheduleId}
                  </td>

                  {/* Ngày khám */}
                  <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                    {appointment.appointmentDate}
                  </td>

                  {/* Giờ khám (cắt bỏ phần giây :00 nếu có để hiển thị HH:mm) */}
                  <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                    {appointment.appointmentTime?.slice(0, 5)}
                  </td>

                  {/* Lý do khám */}
                  <td className="max-w-[14rem] truncate !px-[0.875rem] !py-[0.75rem]" title={appointment.reason}>
                    {appointment.reason || "—"}
                  </td>

                  {/* Trạng thái */}
                  <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                    <span
                      className={`inline-flex items-center gap-[0.375rem] rounded-full !px-[0.625rem] !py-[0.3125rem] text-[0.6875rem] font-medium ${statusStyle.wrapper}`}
                    >
                      <span
                        className={`h-[0.375rem] w-[0.375rem] rounded-full ${statusStyle.dot}`}
                      />
                      {statusStyle.label}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
