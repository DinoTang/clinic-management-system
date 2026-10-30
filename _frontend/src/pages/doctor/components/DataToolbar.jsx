import { useState, useEffect } from "react";
import { Search, Filter } from "@boxicons/react";
import { USER_STATUS } from "../../../enums/index.js";
import { getAll as getAllSpecialties } from "../../../services/specialty/specialtyService.js";

function DataToolbar({ specialty, setSpecialty, status, setStatus, search, setSearch }) {
  const [query, setQuery] = useState(search);
  const [specialties, setSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchSpecialties = async () => {
    setIsLoading(true);
    try {
      const data = await getAllSpecialties();
      setSpecialties(data);
    } catch (error) {
      console.error("Không lấy được chuyên khoa", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-[0.75rem]">
      {/* Ô tìm kiếm */}
      <label className="flex min-w-[14rem] flex-1 items-center gap-[0.625rem] rounded-[0.5rem] border border-[#e4e7ec] bg-white !px-[0.875rem] !py-[0.625rem] text-[#8490a0] transition-colors focus-within:border-[#2878d0]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên, mã hoặc thông tin..."
          className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-[#344054] outline-none placeholder:text-[#98a2b3]"
        />
        <button onClick={() => setSearch(query)}>
          <Search className="h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer" />
        </button>
      </label>

      {/* Lọc trạng thái */}
      <label className="flex items-center gap-[0.5rem] rounded-[0.5rem] border border-[#e4e7ec] bg-white !px-[0.75rem] !py-[0.625rem] text-[#8490a0] focus-within:border-[#2878d0]">
        <Filter className="h-[1.0625rem] w-[1.0625rem] shrink-0" />
        <select
          aria-label="Lọc trạng thái"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="min-w-0 cursor-pointer bg-transparent text-[0.8125rem] text-[#475467] outline-none"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="ACTIVE">{USER_STATUS.ACTIVE}</option>
          <option value="LOCKED">{USER_STATUS.LOCKED}</option>
        </select>
      </label>

      {/* Lọc chuyên khoa */}
      <label className={`flex items-center gap-[0.5rem] rounded-[0.5rem] border border-[#e4e7ec] bg-white !px-[0.75rem] !py-[0.625rem] text-[#8490a0] focus-within:border-[#2878d0] ${isLoading ? "opacity-60 pointer-events-none" : ""}`}>
        <Filter className="h-[1.0625rem] w-[1.0625rem] shrink-0" />
        <select
          aria-label="Lọc chuyên khoa"
          value={specialty}
          disabled={isLoading}
          onChange={(e) => setSpecialty(e.target.value)}
          className="min-w-0 cursor-pointer bg-transparent text-[0.8125rem] text-[#475467] outline-none"
        >
          {isLoading ? (
            <option>Đang tải chuyên khoa...</option>
          ) : (
            <>
              <option value="ALL">Tất cả chuyên khoa</option>
              {specialties &&
                specialties.map((sp) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name}
                  </option>
                ))}
            </>
          )}
        </select>
      </label>
    </div>
  );
}

export default DataToolbar;
