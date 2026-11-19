import { useEffect, useState } from "react";
import { X } from "@boxicons/react";
import { updateProfile } from "../../../services/medicine/medicineService";
import Swal from "sweetalert2";

function EditModal({ medicine, onClose, fetchMedicines }) {
  const [request, setRequest] = useState({
    id: medicine.id,
    name: medicine.name ?? "",
    activeIngredient: medicine.activeIngredient ?? "",
    unit: medicine.unit ?? "",
    price: medicine.price ?? "",
    stock: medicine.stock ?? "",
    usage: medicine.usage ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  async function handleUpdateProfile(requestData) {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...requestData,
        price: requestData.price !== "" ? Number(requestData.price) : null,
        stock: requestData.stock !== "" ? Number(requestData.stock) : 0,
      };

      await updateProfile(payload);
      await fetchMedicines();

      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        timer: 2000,
        showConfirmButton: true,
      });

      onClose();
    } catch (err) {
      setError(err);
      Swal.fire({
        icon: "error",
        title: "Cập nhật thất bại",
        text: err.message || "Vui lòng kiểm tra lại thông tin nhập vào",
        timer: 2000,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 !p-[1rem]">
      <section
        aria-labelledby="edit-medicine-modal-title"
        aria-modal="true"
        role="dialog"
        className="!my-auto max-h-[calc(100vh-2rem)] w-full max-w-[42rem] overflow-y-auto rounded-[0.75rem] bg-white !p-[1.5rem] shadow-xl"
      >
        {/* Header */}
        <div className="!mb-[1.5rem] flex items-start justify-between gap-[1rem]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.03rem] text-[#8a96a8]">
              CẬP NHẬT
            </p>

            <h2
              id="edit-medicine-modal-title"
              className="!mt-[0.25rem] text-[1.25rem] font-bold text-[#344054]"
            >
              Chỉnh sửa thông tin thuốc ({medicine.id})
            </h2>
          </div>

          <button
            type="button"
            aria-label="Đóng"
            onClick={onClose}
            className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-[0.375rem] text-[#8490a0] transition-colors hover:bg-[#f2f4f7] hover:text-[#344054]"
          >
            <X className="h-[1.25rem] w-[1.25rem]" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-x-[1rem] gap-y-[1.125rem] sm:grid-cols-2">
          {/* Tên thuốc */}
          <label className={`${error?.name && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Tên thuốc
            </span>
            <input
              type="text"
              value={request.name}
              onChange={(e) => setRequest((prev) => ({ ...prev, name: e.target.value }))}
              className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]"
            />
            {error?.name && <p className="text-sm italic">* {error.name}</p>}
          </label>

          {/* Hoạt chất */}
          <label className={`${error?.activeIngredient && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Hoạt chất
            </span>
            <input
              type="text"
              value={request.activeIngredient ?? ""}
              onChange={(e) => setRequest((prev) => ({ ...prev, activeIngredient: e.target.value }))}
              className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]"
            />
            {error?.activeIngredient && <p className="text-sm italic">* {error.activeIngredient}</p>}
          </label>

          {/* Đơn vị tính */}
          <label className={`${error?.unit && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Đơn vị tính
            </span>
            <input
              type="text"
              value={request.unit ?? ""}
              onChange={(e) => setRequest((prev) => ({ ...prev, unit: e.target.value }))}
              className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]"
            />
            {error?.unit && <p className="text-sm italic">* {error.unit}</p>}
          </label>

          {/* Đơn giá */}
          <label className={`${error?.price && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Đơn giá (₫)
            </span>
            <input
              type="number"
              min="0"
              value={request.price}
              onChange={(e) => setRequest((prev) => ({ ...prev, price: e.target.value }))}
              className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]"
            />
            {error?.price && <p className="text-sm italic">* {error.price}</p>}
          </label>

          {/* Tồn kho */}
          <label className={`${error?.stock && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Tồn kho
            </span>
            <input
              type="number"
              min="0"
              value={request.stock}
              onChange={(e) => setRequest((prev) => ({ ...prev, stock: e.target.value }))}
              className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]"
            />
            {error?.stock && <p className="text-sm italic">* {error.stock}</p>}
          </label>

          {/* Hướng dẫn dùng */}
          <label className={`${error?.usage && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Hướng dẫn dùng
            </span>
            <input
              type="text"
              value={request.usage ?? ""}
              onChange={(e) => setRequest((prev) => ({ ...prev, usage: e.target.value }))}
              className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]"
            />
            {error?.usage && <p className="text-sm italic">* {error.usage}</p>}
          </label>
        </div>

        {/* Actions */}
        <div className="!mt-[1.5rem] flex flex-wrap justify-end gap-[0.75rem] border-t border-[#eaecf0] !pt-[1.25rem]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[2.75rem] cursor-pointer items-center justify-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !px-[1.125rem] text-[0.8125rem] font-semibold text-[#475467] transition-colors hover:bg-[#f9fafb]"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleUpdateProfile(request)}
            className="inline-flex h-[2.75rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-blue-500 !px-[1.125rem] text-[0.8125rem] font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default EditModal;
