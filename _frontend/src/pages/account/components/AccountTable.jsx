import { Edit, Hashtag, Shield } from "@boxicons/react";
import EditModal from "./EditModal";
import LockedModal from "./LockedModal";
import EditRoleModal from "./EditRoleModal";
import { useState } from "react";
import {USER_STATUS, USER_ROLE} from "../../../enums/index.js";

function AccountTable({ accounts, fetchAccounts }) {
	const [showEditModal, setShowEditModal] = useState(null);
  const [showLockedModal, setShowLockedModal] = useState(null);
	const [showEditRoleModal, setShowEditRoleModal] = useState(null);
  return (
  	<>
    <div className="min-w-0 overflow-x-auto rounded-[0.5rem]">
      <table className="w-full border-collapse text-left text-[0.75rem] text-[#475467]">
        <thead className="bg-[#fbfcfd]">
          <tr>
            {[
              <Hashtag />,
              "Tên đăng nhập",
              "Vai trò",
              "Email",
              "Số điện thoại",
              "Trạng thái",
              "Thao tác",
            ].map((heading) => (
              <th
                key={heading}
                className={`h-[2.75rem] border-b border-[#eaecf0] !px-[0.875rem] !py-[0.75rem] text-[0.6875rem] font-semibold whitespace-nowrap text-[#8490a0]`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {accounts.map((account, i) => (
            <tr
              key={account.username}
              className="border-b border-[#f0f1f4] transition-colors last:border-b-0 hover:bg-[#fbfdff]"
            >
              {/* Account */}
              <td className="!px-[0.875rem] !py-[0.75rem]">
                <div className="flex items-center gap-[0.625rem] whitespace-nowrap">
                  <span className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full bg-[#edf5fd] text-[0.6875rem] font-bold text-[#2878d0]">
                    {i+1}
                  </span>
                  <span className="font-semibold text-[#344054]">
                    {account.id}
                  </span>
                </div>
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {account.username}
              </td>

              {/* Role */}
              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                <span className={`
                	${account.role == USER_ROLE.DEV && "is-violet" }
                	${account.role == USER_ROLE.ADMIN && "is-amber" }
                	${account.role == USER_ROLE.DOCTOR && "is-blue" }
                	${account.role == USER_ROLE.PATIENT && "is-gray" }
                	${account.role == USER_ROLE.STAFF && "is-green" }
                	inline-flex rounded-[0.375rem] !px-[0.5rem] !py-[0.25rem] text-[0.6875rem] font-medium`}>
                  {account.role}
                </span>
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {account.email}
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {account.phone}
              </td>

              {/* Status */}
              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                <span
                  className={`inline-flex items-center gap-[0.375rem] rounded-full !px-[0.625rem] !py-[0.3125rem] text-[0.6875rem] font-medium ${
                    account.status == USER_STATUS.ACTIVE
                      ? "bg-[#eaf7f1] text-[#16805d]"
                      : "bg-[#f2f4f7] text-[#667085]"
                  }`}
                >
                  <span
                    className={`h-[0.375rem] w-[0.375rem] rounded-full ${
                      account.status == USER_STATUS.ACTIVE ? "bg-[#25a575]" : "bg-[#98a2b3]"
                    }`}
                  />
                  {account.status}
                </span>
              </td>

              {/* Actions */}
              <td className="px-[0.875rem] !py-[0.75rem]">
                <div className="flex items-center justify-start gap-[0.625rem] whitespace-nowrap">
                  <button
                    type="button"
                    title="Chỉnh sửa"
                    onClick={() => setShowEditModal(account)}
                    className="flex cursor-pointer h-[2rem] w-[2rem] items-center justify-center rounded-[0.375rem] text-[#667085] transition-colors hover:bg-[#edf5fd] hover:text-[#2878d0]"
                  >
                    <Edit className="h-[1.0625rem] w-[1.0625rem]" />
                  </button>

                  <button
                    type="button"
                    title="Vai trò"
                    onClick={() => setShowEditRoleModal(account)}
                    className="flex cursor-pointer h-[2rem] w-[2rem] items-center justify-center rounded-[0.375rem] text-[#667085] transition-colors hover:bg-[#edf5fd] hover:text-[#2878d0]"
                  >
                    <Shield className="h-[1.0625rem] w-[1.0625rem]"/>
                  </button>


                  {account.role!="Nhà phát triển" &&  (
	                  <button
	                    type="button"
	                    title={account.status == USER_STATUS.ACTIVE ? "Khóa tài khoản" : "Mở tài khoản"}
	                    onClick={() => setShowLockedModal(account)}
	                    className={`text-[0.75rem] cursor-pointer font-semibold transition-colors ${
	                      account.status == USER_STATUS.ACTIVE
	                        ? "text-[#d04444] hover:text-[#a52c2c]"
	                        : "text-[#16805d] hover:text-[#116747]"
	                    }`}
	                  >
	                    {account.status == USER_STATUS.ACTIVE ? "Khóa" : "Kích hoạt"}
	                  </button>
                  	)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showEditModal && (
    	<EditModal
    		account={showEditModal}
    		onClose={()=>setShowEditModal(null)}
        	fetchAccounts={fetchAccounts}
    	/>
    )}
    {showLockedModal && (
    	<LockedModal
    		account={showLockedModal}
    		onClose={()=>setShowLockedModal(null)}
        	fetchAccounts={fetchAccounts}
    	/>
    )}
    {showEditRoleModal && (
      <EditRoleModal
        account={showEditRoleModal}
        onClose={()=>setShowEditRoleModal(null)}
          fetchAccounts={fetchAccounts}
      />
    )}
    </>
  );
}

export default AccountTable;