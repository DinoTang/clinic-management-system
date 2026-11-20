import { Hashtag } from "@boxicons/react";
import { USER_STATUS } from "../../../enums/index.js";

function PatientTable({ patients }) {
  return (
    <div className="w-full overflow-x-auto rounded-[0.75rem] border border-[#eaecf0] bg-white">
      <table className="w-full min-w-[70rem] border-collapse text-left text-[0.875rem]">
        <thead className="bg-[#f9fafb]">
          <tr>
            {[
              { id: "index", label: <Hashtag /> },
              { id: "address", label: "Địa chỉ" },
              { id: "bloodGroup", label: "Nhóm máu" },
              { id: "dob", label: "Ngày sinh" },
              { id: "gender", label: "Giới tính" },
              { id: "phone", label: "Số điện thoại" },
              { id: "visits", label: "Lượt khám" },
              { id: "status", label: "Trạng thái" },
            ].map((heading) => (
              <th
                key={heading.id}
                className="whitespace-nowrap border-b border-[#eaecf0] !px-[1rem] !py-[0.875rem] font-semibold text-[#475467]"
              >
                {heading.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#eaecf0]">
          {patients.map((patient, index) => {
            const isActive = patient.user?.status === USER_STATUS.ACTIVE;
            const hasAccount = Boolean(patient.user?.status);

            return (
              <tr
                key={patient.id}
                className="transition-colors hover:bg-[#f9fafb]"
              >
                <td className="whitespace-nowrap !px-[1rem] !py-[1rem]">
                  <div className="flex items-center gap-[0.75rem]">
                    <span className="flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[0.8125rem] font-semibold text-[#2563eb]">
                      {index + 1}
                    </span>

                    <span className="font-medium text-[#101828]">
                      {patient.id}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap !px-[1rem] !py-[1rem] text-[#475467]">
                  {patient.address || "-"}
                </td>

                <td className="whitespace-nowrap !px-[1rem] !py-[1rem] text-[#475467]">
                  {patient.bloodGroup || "-"}
                </td>

                <td className="whitespace-nowrap !px-[1rem] !py-[1rem] text-[#475467]">
                  {patient.dateOfBirth || "-"}
                </td>

                <td className="whitespace-nowrap !px-[1rem] !py-[1rem] text-[#475467]">
                  {patient.gender || "-"}
                </td>

                <td className="whitespace-nowrap !px-[1rem] !py-[1rem] text-[#475467]">
                  {patient.phoneNumber ?? patient.user?.phone ?? "-"}
                </td>

                <td className="whitespace-nowrap !px-[1rem] !py-[1rem] text-[#475467]">
                  {patient.visits ?? 0}
                </td>

                <td className="whitespace-nowrap !px-[1rem] !py-[1rem]">
                  <span
                    className={`inline-flex items-center gap-[0.375rem] rounded-full !px-[0.625rem] !py-[0.25rem] text-[0.75rem] font-medium ${
                      isActive
                        ? "bg-[#eaf7f1] text-[#16805d]"
                        : "bg-[#f2f4f7] text-[#667085]"
                    }`}
                  >
                    <i
                      className={`h-[0.375rem] w-[0.375rem] rounded-full ${
                        isActive ? "bg-[#12b76a]" : "bg-[#667085]"
                      }`}
                    />
                    {isActive
                      ? "Đang hoạt động"
                      : hasAccount
                      ? "Ngừng hoạt động"
                      : "Chưa có tài khoản"}
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

export default PatientTable;
