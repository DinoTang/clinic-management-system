import { useState } from "react";
import { Search, Filter } from "@boxicons/react";
import { SERVICE_CATALOG_STATUS } from "../../../enums/index.js";

function DataToolbar({
  serviceStatus,
  setServiceStatus,
  specialtyId,
  setSpecialtyId,
  specialties = [],
  search,
  setSearch,
  totalElements,
}) {
  const [query, setQuery] = useState(search || "");

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSearch(query);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-[0.75rem]">
      {/* Ô tìm kiếm */}
      <label className="flex min-w-[14rem] flex-1 items-center gap-[0.625rem] rounded-[0.5rem] border border-[#e4e7ec] bg-white !px-[0.875rem] !py-[0.625rem] text-[#8490a0] transition-colors focus-within:border-[#2878d0]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm theo tên, mã dịch vụ hoặc mô tả..."
          className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-[#344054] outline-none placeholder:text-[#98a2b3]"
        />
        <button
          type="button"
          aria-label="Tìm kiếm"
          onClick={() => setSearch(query)}
        >
          <Search className="h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer" />
        </button>
      </label>

      {/* Lọc chuyên khoa */}
      <label className="flex items-center gap-[0.5rem] rounded-[0.5rem] border border-[#e4e7ec] bg-white !px-[0.75rem] !py-[0.625rem] text-[#8490a0] focus-within:border-[#2878d0]">
        <Filter className="h-[1.0625rem] w-[1.0625rem] shrink-0" />
        <select
          aria-label="Lọc chuyên khoa"
          value={specialtyId}
          onChange={(e) => setSpecialtyId(e.target.value)}
          className="min-w-0 cursor-pointer bg-transparent text-[0.8125rem] text-[#475467] outline-none"
        >
          <option value="all">Tất cả chuyên khoa</option>
          {specialties.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      {/* Lọc trạng thái */}
      <label className="flex items-center gap-[0.5rem] rounded-[0.5rem] border border-[#e4e7ec] bg-white !px-[0.75rem] !py-[0.625rem] text-[#8490a0] focus-within:border-[#2878d0]">
        <Filter className="h-[1.0625rem] w-[1.0625rem] shrink-0" />
        <select
          aria-label="Lọc trạng thái"
          value={serviceStatus}
          onChange={(e) => setServiceStatus(e.target.value)}
          className="min-w-0 cursor-pointer bg-transparent text-[0.8125rem] text-[#475467] outline-none"
        >
          <option value="all">Tất cả trạng thái</option>
          {Object.entries(SERVICE_CATALOG_STATUS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {/* Hiển thị số lượng bản ghi (nếu có truyền totalElements) */}
      {totalElements !== undefined && totalElements !== null && (
        <span className="text-[0.8125rem] font-medium text-[#667085] max-sm:ml-auto">
          {totalElements} bản ghi
        </span>
      )}
    </div>
  );
}

export default DataToolbar;
