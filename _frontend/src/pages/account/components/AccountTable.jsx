import { Edit } from "@boxicons/react";
import EditModal from "./EditModal";
import { useState } from "react";

const accounts = [
  {
    initials: "QT",
    name: "Nguyễn Quản Trị",
    username: "admin",
    role: "Quản trị",
    email: "admin@clinic.vn",
    phone: "0901000001",
    lastActive: "Hôm nay, 08:42",
    status: "Đang hoạt động",
    active: true,
  },
  {
    initials: "VN",
    name: "Trần Văn Nam",
    username: "dr_nam",
    role: "Bác sĩ",
    email: "nam.tv@clinic.vn",
    phone: "0902000002",
    lastActive: "Hôm nay, 08:16",
    status: "Đang hoạt động",
    active: true,
  },
  {
    initials: "TL",
    name: "Lê Thị Lan",
    username: "dr_lan",
    role: "Bác sĩ",
    email: "lan.lt@clinic.vn",
    phone: "0903000003",
    lastActive: "Hôm qua, 16:30",
    status: "Đang hoạt động",
    active: true,
  },
  {
    initials: "TM",
    name: "Hoàng Tuyết Mai",
    username: "nv_mai",
    role: "Nhân viên",
    email: "mai.ht@clinic.vn",
    phone: "0905000005",
    lastActive: "Hôm nay, 07:55",
    status: "Đang hoạt động",
    active: true,
  },
  {
    initials: "VA",
    name: "Nguyễn Văn An",
    username: "bn_an",
    role: "Bệnh nhân",
    email: "an.nguyen@gmail.com",
    phone: "0912345678",
    lastActive: "10/10/2026",
    status: "Đang hoạt động",
    active: true,
  },
  {
    initials: "MĐ",
    name: "Phạm Minh Đức",
    username: "dr_duc",
    role: "Bác sĩ",
    email: "duc.pm@clinic.vn",
    phone: "0904000004",
    lastActive: "03/10/2026",
    status: "Đã khóa",
    active: false,
  },
];

function AccountTable({ onEdit, onToggleStatus }) {
	const [showEditModal, setShowEditModal] = useState(null);
  return (
  	<>
    <div className="w-full overflow-x-auto rounded-[0.5rem]">
      <table className="w-full min-w-[75rem] border-collapse text-left text-[0.75rem] text-[#475467]">
        <thead className="bg-[#fbfcfd]">
          <tr>
            {[
              "Tài khoản",
              "Tên đăng nhập",
              "Vai trò",
              "Email",
              "Số điện thoại",
              "Hoạt động gần nhất",
              "Trạng thái",
              "Thao tác",
            ].map((heading) => (
              <th
                key={heading}
                className={`h-[2.75rem] border-b border-[#eaecf0] !px-[0.875rem] !py-[0.75rem] text-[0.6875rem] font-semibold whitespace-nowrap text-[#8490a0] ${
                  heading === "Thao tác" ? "text-center" : ""
                }`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <tr
              key={account.username}
              className="border-b border-[#f0f1f4] transition-colors last:border-b-0 hover:bg-[#fbfdff]"
            >
              {/* Account */}
              <td className="!px-[0.875rem] !py-[0.75rem]">
                <div className="flex items-center gap-[0.625rem] whitespace-nowrap">
                  <span className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full bg-[#edf5fd] text-[0.6875rem] font-bold text-[#2878d0]">
                    {account.initials}
                  </span>
                  <span className="font-semibold text-[#344054]">
                    {account.name}
                  </span>
                </div>
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {account.username}
              </td>

              {/* Role */}
              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                <span className="inline-flex rounded-[0.375rem] bg-[#f2f4f7] !px-[0.5rem] !py-[0.25rem] text-[0.6875rem] font-medium text-[#475467]">
                  {account.role}
                </span>
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {account.email}
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {account.phone}
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem] text-[#8490a0]">
                {account.lastActive}
              </td>

              {/* Status */}
              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                <span
                  className={`inline-flex items-center gap-[0.375rem] rounded-full !px-[0.625rem] !py-[0.3125rem] text-[0.6875rem] font-medium ${
                    account.active
                      ? "bg-[#eaf7f1] text-[#16805d]"
                      : "bg-[#f2f4f7] text-[#667085]"
                  }`}
                >
                  <span
                    className={`h-[0.375rem] w-[0.375rem] rounded-full ${
                      account.active ? "bg-[#25a575]" : "bg-[#98a2b3]"
                    }`}
                  />
                  {account.status}
                </span>
              </td>

              {/* Actions */}
              <td className="px-[0.875rem] !py-[0.75rem]">
                <div className="flex items-center justify-center gap-[0.625rem] whitespace-nowrap">
                  <button
                    type="button"
                    title="Chỉnh sửa"
                    aria-label={`Chỉnh sửa ${account.name}`}
                    onClick={() => setShowEditModal(account)}
                    className="flex h-[2rem] w-[2rem] items-center justify-center rounded-[0.375rem] text-[#667085] transition-colors hover:bg-[#edf5fd] hover:text-[#2878d0]"
                  >
                    <Edit className="h-[1.0625rem] w-[1.0625rem]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleStatus?.(account)}
                    className={`text-[0.75rem] font-semibold transition-colors ${
                      account.active
                        ? "text-[#d04444] hover:text-[#a52c2c]"
                        : "text-[#16805d] hover:text-[#116747]"
                    }`}
                  >
                    {account.active ? "Ngừng" : "Kích hoạt"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showEditModal && (
    	<EditModal account={showEditModal} onClose={()=>setShowEditModal()}/>
    )}
    </>
  );
}

export default AccountTable;