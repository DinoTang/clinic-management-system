import { Search, Filter } from "@boxicons/react";

function DataToolbar({
  searchValue,
  onSearchChange,
  status,
  onStatusChange,
  count = 6,
}) {
  return (
    <div className="flex flex-wrap items-center gap-[0.75rem]">
      <label className="flex min-w-[14rem] flex-1 items-center gap-[0.625rem] rounded-[0.5rem] border border-[#e4e7ec] bg-white !px-[0.875rem] !py-[0.625rem] text-[#8490a0] transition-colors focus-within:border-[#2878d0]">
        <Search className="h-[1.125rem] w-[1.125rem] shrink-0" />

        <input
          type="text"
          placeholder="Tìm theo tên, mã hoặc thông tin..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-[#344054] outline-none placeholder:text-[#98a2b3]"
        />
      </label>

      <label className="flex items-center gap-[0.5rem] rounded-[0.5rem] border border-[#e4e7ec] bg-white !px-[0.75rem] !py-[0.625rem] text-[#8490a0] focus-within:border-[#2878d0]">
        <Filter className="h-[1.0625rem] w-[1.0625rem] shrink-0" />

        <select
          aria-label="Lọc trạng thái"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="min-w-0 cursor-pointer bg-transparent text-[0.8125rem] text-[#475467] outline-none"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="ACTIVE">Đang hoạt động</option>
          <option value="LOCKED">Đã khóa</option>
        </select>
      </label>

    </div>
  );
}

export default DataToolbar;