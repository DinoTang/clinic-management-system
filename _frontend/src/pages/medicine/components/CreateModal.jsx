import { X } from "@boxicons/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createAsync } from "../../../services/medicine/medicineService.js";

function CreateModal({ onClose, fetchMedicines }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState({
    name: "",
    activeIngredient: "",
    unit: "",
    price: "",
    stock: "",
    usage: "",
  });

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

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...request,
        price: request.price !== "" ? Number(request.price) : null,
        stock: request.stock !== "" ? Number(request.stock) : 0,
      };

      await createAsync(payload);
      await fetchMedicines();

      Swal.fire({
        icon: "success",
        title: "Thêm thuốc thành công",
        timer: 2000,
        showConfirmButton: true,
      });

      onClose();
    } catch (err) {
      setError(err);
      Swal.fire({
        icon: "error",
        title: "Thêm thuốc thất bại",
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
        aria-labelledby="create-medicine-modal-title"
        aria-modal="true"
        role="dialog"
        className="!my-auto max-h-[calc(100vh-2rem)] w-full max-w-[42rem] overflow-y-auto rounded-[0.75rem] bg-white !p-[1.5rem] shadow-xl"
      >
        {/* Header */}
        <div className="!mb-[1.5rem] flex items-start justify-between gap-[1rem]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.03rem] text-[#8a96a8]">
              THÊM MỚI
            </p>

            <h2
              id="create-medicine-modal-title"
              className="!mt-[0.25rem] text-[1.25rem] font-bold text-[#344054]"
            >
              Thêm thuốc
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

        {/* Form */}
        <form onSubmit={handleCreate}>
          <div className="grid grid-cols-1 gap-x-[1rem] gap-y-[1.125rem] sm:grid-cols-2">
            {/* Tên thuốc */}
            <label className={`${error?.name && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
              <span className="text-[0.8125rem] font-semibold text-[#475467]">
                Tên thuốc <i className="not-italic text-red-500">*</i>
              </span>
              <input
                type="text"
                value={request.name}
                onChange={(e) => setRequest((prev) => ({ ...prev, name: e.target.value }))}
                className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054] outline-none focus:border-[#2878d0]"
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
                className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054] outline-none focus:border-[#2878d0]"
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
                className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054] outline-none focus:border-[#2878d0]"
              />
              {error?.unit && <p className="text-sm italic">* {error.unit}</p>}
            </label>

            {/* Đơn giá */}
            <label className={`${error?.price && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
              <span className="text-[0.8125rem] font-semibold text-[#475467]">
                Đơn giá (₫) <i className="not-italic text-red-500">*</i>
              </span>
              <input
                min="0"
                type="number"
                value={request.price}
                onChange={(e) => setRequest((prev) => ({ ...prev, price: e.target.value }))}
                className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054] outline-none focus:border-[#2878d0]"
              />
              {error?.price && <p className="text-sm italic">* {error.price}</p>}
            </label>

            {/* Tồn kho */}
            <label className={`${error?.stock && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem]`}>
              <span className="text-[0.8125rem] font-semibold text-[#475467]">
                Tồn kho <i className="not-italic text-red-500">*</i>
              </span>
              <input
                min="0"
                type="number"
                value={request.stock}
                onChange={(e) => setRequest((prev) => ({ ...prev, stock: e.target.value }))}
                className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054] outline-none focus:border-[#2878d0]"
              />
              {error?.stock && <p className="text-sm italic">* {error.stock}</p>}
            </label>

            {/* Hướng dẫn dùng (bổ sung theo Entity Medicine, chiếm trọn 2 cột) */}
            <label className={`${error?.usage && "text-red-400"} flex min-w-0 flex-col gap-[0.5rem] sm:col-span-2`}>
              <span className="text-[0.8125rem] font-semibold text-[#475467]">
                Hướng dẫn dùng
              </span>
              <input
                type="text"
                value={request.usage ?? ""}
                onChange={(e) => setRequest((prev) => ({ ...prev, usage: e.target.value }))}
                className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054] outline-none focus:border-[#2878d0]"
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
              type="submit"
              disabled={loading}
              className="inline-flex h-[2.75rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-blue-500 !px-[1.125rem] text-[0.8125rem] font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Thêm vào danh sách"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateModal;
