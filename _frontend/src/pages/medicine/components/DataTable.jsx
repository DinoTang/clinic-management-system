import { Edit, Hashtag } from "@boxicons/react";
import { useState } from "react";
import EditModal from "./EditModal";
import LockedModal from "./LockedModal";

function DataTable({ medicines, fetchMedicines }) {
  const [showEditModal, setShowEditModal] = useState(null);
  const [showLockedModal, setShowLockedModal] = useState(null);

  const formatPrice = (price) => {
    if (price === null || price === undefined) return "0 ₫";
    return `${Number(price).toLocaleString("vi-VN")} ₫`;
  };

  const formatStock = (stock) => {
    if (stock === null || stock === undefined) return "0";
    return Number(stock).toLocaleString("vi-VN");
  };

  return (
    <>
      <div className="min-w-0 overflow-x-auto rounded-[0.5rem]">
        <table className="w-full border-collapse text-left text-[0.75rem] text-[#475467]">
          <thead className="bg-[#fbfcfd]">
            <tr>
              {[
                { key: "id", label: <Hashtag className="h-[1rem] w-[1rem]" /> },
                { key: "name", label: "Thuốc" },
                { key: "activeIngredient", label: "Hoạt chất" },
                { key: "unit", label: "Đơn vị" },
                { key: "price", label: "Đơn giá" },
                { key: "stock", label: "Tồn kho" },
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
            {medicines &&
              medicines.map((medicine, i) => {
                const isLowStock = (medicine.stock ?? 0) <= 20;
                const isActive = !medicine.deleted;

                return (
                  <tr
                    key={medicine.id}
                    className="border-b border-[#f0f1f4] transition-colors last:border-b-0 hover:bg-[#fbfdff]"
                  >
                    {/* STT & Mã thuốc */}
                    <td className="!px-[0.875rem] !py-[0.75rem]">
                      <div className="flex items-center gap-[0.625rem] whitespace-nowrap">
                        <span className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full bg-[#edf5fd] text-[0.6875rem] font-bold text-[#2878d0]">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-[#344054]">
                          {medicine.id}
                        </span>
                      </div>
                    </td>

                    {/* Tên thuốc */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem] font-medium text-[#344054]">
                      {medicine.name}
                    </td>

                    {/* Hoạt chất */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                      {medicine.activeIngredient || "—"}
                    </td>

                    {/* Đơn vị */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                      {medicine.unit || "—"}
                    </td>

                    {/* Đơn giá */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem] font-medium text-[#344054]">
                      {formatPrice(medicine.price)}
                    </td>

                    {/* Tồn kho + Cảnh báo sắp hết */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                      <div className="flex items-center gap-[0.375rem]">
                        <span
                          className={
                            isLowStock
                              ? "font-semibold text-[#d04444]"
                              : "text-[#475467]"
                          }
                        >
                          {formatStock(medicine.stock)}
                        </span>
                        {isLowStock && (
                          <span className="rounded-[0.25rem] bg-[#fef3f2] !px-[0.375rem] !py-[0.125rem] text-[0.625rem] font-bold text-[#d04444]">
                            Sắp hết
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Trạng thái */}
                    <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                      <span
                        className={`inline-flex items-center gap-[0.375rem] rounded-full !px-[0.625rem] !py-[0.3125rem] text-[0.6875rem] font-medium ${
                          isActive
                            ? "bg-[#eaf7f1] text-[#16805d]"
                            : "bg-[#f2f4f7] text-[#667085]"
                        }`}
                      >
                        <span
                          className={`h-[0.375rem] w-[0.375rem] rounded-full ${
                            isActive ? "bg-[#25a575]" : "bg-[#98a2b3]"
                          }`}
                        />
                        {isActive ? "Đang hoạt động" : "Ngừng sử dụng"}
                      </span>
                    </td>

                    {/* Thao tác */}
                    <td className="!px-[0.875rem] !py-[0.75rem]">
                      <div className="flex items-center justify-start gap-[0.625rem] whitespace-nowrap">
                        <button
                          type="button"
                          title="Chỉnh sửa"
                          onClick={() => setShowEditModal(medicine)}
                          className="flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center rounded-[0.375rem] text-[#667085] transition-colors hover:bg-[#edf5fd] hover:text-[#2878d0]"
                        >
                          <Edit className="h-[1.0625rem] w-[1.0625rem]" />
                        </button>

                        <button
                          type="button"
                          title={isActive ? "Ngừng sử dụng" : "Kích hoạt lại"}
                          onClick={() => setShowLockedModal(medicine)}
                          className={`cursor-pointer text-[0.75rem] font-semibold transition-colors ${
                            isActive
                              ? "text-[#d04444] hover:text-[#a52c2c]"
                              : "text-[#16805d] hover:text-[#116747]"
                          }`}
                        >
                          {isActive ? "Ngừng" : "Kích hoạt"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa thông tin thuốc */}
      {showEditModal && (
        <EditModal
          medicine={showEditModal}
          onClose={() => setShowEditModal(null)}
          fetchMedicines={fetchMedicines}
        />
      )}

      {/* Modal xác nhận Ngừng / Kích hoạt thuốc */}
      {showLockedModal && (
        <LockedModal
          medicine={showLockedModal}
          onClose={() => setShowLockedModal(null)}
          fetchMedicines={fetchMedicines}
        />
      )}
    </>
  );
}

export default DataTable;
