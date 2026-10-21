function TableFooter({ total = 6, currentPage = 1, totalPages = 1, onPageChange }) {
  return (
    <div className="flex items-center justify-between gap-[1rem] border-t border-[#eaecf0] !pt-[1rem] text-[0.75rem] text-[#8490a0] max-sm:flex-col max-sm:items-start">
      <span>
        Đang hiển thị{" "}
        <b className="font-semibold text-[#344054]">{total}</b> trên{" "}
        <b className="font-semibold text-[#344054]">{total}</b> bản ghi
      </span>

      <div className="flex items-center gap-[0.375rem]">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="rounded-[0.375rem] border border-[#e4e7ec] !px-[0.75rem] !py-[0.4375rem] transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Trước
        </button>

        <button
          type="button"
          aria-current="page"
          className="flex h-[2rem] min-w-[2rem] items-center justify-center rounded-[0.375rem] border border-[#2878d0] bg-[#2878d0] !px-[0.5rem] font-semibold text-white"
        >
          {currentPage}
        </button>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="rounded-[0.375rem] border border-[#e4e7ec] !px-[0.75rem] !py-[0.4375rem] transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}

export default TableFooter;