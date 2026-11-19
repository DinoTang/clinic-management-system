import { useEffect, useState } from "react";
import { X } from "@boxicons/react";
import Swal from "sweetalert2";
import { softDeleteById, restoreById } from "../../../services/serviceCatalog/serviceCatalogService";
import { SERVICE_CATALOG_STATUS } from "../../../enums/index.js";

function LockedModal({ service, onClose, fetchServices }) {
  const [loading, setLoading] = useState(false);

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

  async function handleUpdateStatus(shouldDeactivate) {
    setLoading(true);
    try {
      if (shouldDeactivate) {
        await softDeleteById(service.id);
      } else {
        await restoreById(service.id);
      }

      await fetchServices();

      Swal.fire({
        icon: "success",
        title: "Cập nhật trạng thái thành công",
        timer: 2000,
        showConfirmButton: true,
      });

      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Cập nhật thất bại",
        text: err.message || "Có lỗi xảy ra khi cập nhật trạng thái dịch vụ",
        timer: 2000,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  }

  const formattedPrice =
    service.price !== null && service.price !== undefined
      ? `${Number(service.price).toLocaleString("vi-VN")} ₫`
      : "Chưa cập nhật";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 !p-[1rem]">
      <section
        aria-labelledby="lock-service-modal-title"
        aria-modal="true"
        role="dialog"
        className="!my-auto max-h-[calc(100vh-2rem)] w-full max-w-[42rem] overflow-y-auto rounded-[0.75rem] bg-white !p-[1.5rem] shadow-xl"
      >
        {/* Header */}
        <div className="!mb-[1.5rem] flex items-start justify-between gap-[1rem]">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.03rem] text-[#8a96a8]">
              CẬP NHẬT TRẠNG THÁI
            </p>

            <h2
              id="lock-service-modal-title"
              className="!mt-[0.25rem] text-[1.25rem] font-bold text-[#344054]"
            >
              Quản lý trạng thái dịch vụ
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

        {/* Thông tin chi tiết dịch vụ */}
        <div className="grid grid-cols-1 gap-x-[1rem] gap-y-[1.125rem] sm:grid-cols-2">
          <label className="flex min-w-0 flex-col gap-[0.5rem]">
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Mã dịch vụ
            </span>
            <p className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]">
              {service.id ?? "Chưa cập nhật"}
            </p>
          </label>

          <label className="flex min-w-0 flex-col gap-[0.5rem]">
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Tên dịch vụ
            </span>
            <p className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]">
              {service.name ?? "Chưa cập nhật"}
            </p>
          </label>

          <label className="flex min-w-0 flex-col gap-[0.5rem]">
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Mã chuyên khoa
            </span>
            <p className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]">
              {service.specialtyId || "Chưa cập nhật"}
            </p>
          </label>

          <label className="flex min-w-0 flex-col gap-[0.5rem]">
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Đơn giá &amp; Đơn vị tính
            </span>
            <p className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]">
              {formattedPrice} {service.unit ? `/ ${service.unit}` : ""}
            </p>
          </label>

          <label className="flex min-w-0 flex-col gap-[0.5rem] sm:col-span-2">
            <span className="text-[0.8125rem] font-semibold text-[#475467]">
              Trạng thái hiện tại
            </span>
            <p className="flex w-full items-center rounded-[0.5rem] border border-[#d0d5dd] bg-white !p-[0.8rem] text-sm text-[#344054]">
              {service.status || "Chưa cập nhật"}
            </p>
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

          {service.status === SERVICE_CATALOG_STATUS.ACTIVE ? (
            <button
              type="button"
              disabled={loading}
              onClick={() => handleUpdateStatus(true)}
              className="inline-flex h-[2.75rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-red-400 !px-[1.125rem] text-[0.8125rem] font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Ngừng hoạt động dịch vụ"}
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={() => handleUpdateStatus(false)}
              className="inline-flex h-[2.75rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-green-400 !px-[1.125rem] text-[0.8125rem] font-semibold text-white transition-colors hover:bg-green-500 disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Kích hoạt lại dịch vụ"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default LockedModal;
