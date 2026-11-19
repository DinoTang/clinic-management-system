import { Edit, Hashtag } from "@boxicons/react";
import { useState } from "react";
import { SERVICE_CATALOG_STATUS } from "../../../enums/index.js";
import EditModal from "./EditModal";
import LockedModal from "./LockedModal";

function DataTable({ services, specialties = [], fetchServices }) {
  const [showEditModal, setShowEditModal] = useState(null);
  const [showLockedModal, setShowLockedModal] = useState(null);

  const formatPrice = (price) => {
    if (price === null || price === undefined) return "0 ₫";
    return `${Number(price).toLocaleString("vi-VN")} ₫`;
  };

  const getSpecialtyName = (specialtyId) => {
    if (!specialtyId) return "—";
    const found = specialties.find((item) => item.id === specialtyId);
    return found ? found.name : specialtyId;
  };

  return (
    <>
      <div className="min-w-0 overflow-x-auto rounded-[0.5rem]">
        <table className="w-full border-collapse text-left text-[0.75rem] text-[#475467]">
          <thead className="bg-[#fbfcfd]">
            <tr>
              {[
                { key: "id", label: <Hashtag className="h-[1rem] w-[1rem]" /> },
                { key: "name", label: "Dịch vụ" },
                { key: "specialtyId", label: "Chuyên khoa" },
                { key: "unit", label: "Đơn vị" },
                { key: "price", label: "Đơn giá" },
                { key: "description", label: "Mô tả" },
                { key: "status", label: "Trạng thái" },
                { key: "actions", label: "Thao tác" },
              ].map((heading) => (
                <th
                  key={heading.key}
                  className="h-[2.75rem] border-b border-[#eaecf0] !px-[0.875rem] !py-[0.75rem] text-[0.6875rem] font-semibold whitespace-nowrap text-[#8490a0]"
                >
                  {heading.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {services &&
              services.map((service, i) => {

                return (
                  <tr
                    key={service.id}
                    className="border-b border-[#f0f1f4] transition-colors last:border-b-0 hover:bg-[#fbfdff]"
                  >
                    {/* STT & Mã dịch vụ */}
                    <td className="!px-[0.875rem] !py-[0.75rem]">
                      <div className="flex items-center gap-[0.625rem] whitespace-nowrap">
                        <span className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full bg-[#edf5fd] text-[0.6875rem] font-bold text-[#2878d0]">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-[#344054]">
                          {service.id}
                        </span>
                      </div>
                    </td>

                    {/* Tên dịch vụ */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem] font-medium text-[#344054]">
                      {service.name}
                    </td>

                    {/* Chuyên khoa */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                      <span className="rounded-[0.25rem] bg-[#f2f4f7] !px-[0.5rem] !py-[0.125rem] text-[0.6875rem] font-semibold text-[#475467]">
                        {getSpecialtyName(service.specialtyId)}
                      </span>
                    </td>

                    {/* Đơn vị tính */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                      {service.unit || "—"}
                    </td>

                    {/* Đơn giá */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem] font-medium text-[#344054]">
                      {formatPrice(service.price)}
                    </td>

                    {/* Mô tả */}
                    <td
                      title={service.description || ""}
                      className="max-w-[16rem] truncate !px-[0.875rem] !py-[0.75rem] text-[#667085]"
                    >
                      {service.description || "—"}
                    </td>

                    {/* Trạng thái */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                      <span
                        className={`inline-flex items-center gap-[0.375rem] rounded-full !px-[0.625rem] !py-[0.3125rem] text-[0.6875rem] font-medium ${
                          service.status==SERVICE_CATALOG_STATUS.ACTIVE
                            ? "bg-[#eaf7f1] text-[#16805d]"
                            : "bg-[#f2f4f7] text-[#667085]"
                        }`}
                      >
                        <span
                          className={`h-[0.375rem] w-[0.375rem] rounded-full ${
                          service.status==SERVICE_CATALOG_STATUS.ACTIVE
                            ? "bg-[#25a575]" : "bg-[#98a2b3]"
                          }`}
                        />
                        {service.status}
                      </span>
                    </td>

                    {/* Thao tác */}
                    <td className="!px-[0.875rem] !py-[0.75rem]">
                      <div className="flex items-center justify-start gap-[0.625rem] whitespace-nowrap">
                        <button
                          type="button"
                          title="Chỉnh sửa"
                          onClick={() => setShowEditModal(service)}
                          className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-[0.375rem] text-[#667085] transition-colors hover:bg-[#edf5fd] hover:text-[#2878d0]"
                        >
                          <Edit className="h-[1.0625rem] w-[1.0625rem]" />
                        </button>

                        <button
                          type="button"
                          title={
                            service.status==SERVICE_CATALOG_STATUS.ACTIVE
                             ? "Ngừng hoạt động" : "Kích hoạt lại"}
                          onClick={() => setShowLockedModal(service)}
                          className={`cursor-pointer text-[0.75rem] font-semibold transition-colors ${
                            service.status==SERVICE_CATALOG_STATUS.ACTIVE
                              ? "text-[#d04444] hover:text-[#a52c2c]"
                              : "text-[#16805d] hover:text-[#116747]"
                          }`}
                        >
                          {
                          service.status==SERVICE_CATALOG_STATUS.ACTIVE
                             ? "Ngừng" : "Kích hoạt"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa thông tin dịch vụ */}
      {showEditModal && (
        <EditModal
          service={showEditModal}
          specialties={specialties}
          onClose={() => setShowEditModal(null)}
          fetchServices={fetchServices}
        />
      )}

      {/* Modal xác nhận Ngừng / Kích hoạt dịch vụ */}
      {showLockedModal && (
        <LockedModal
          service={showLockedModal}
          onClose={() => setShowLockedModal(null)}
          fetchServices={fetchServices}
        />
      )}
    </>
  );
}

export default DataTable;
