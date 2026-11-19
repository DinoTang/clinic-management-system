import { useState, useEffect, useCallback } from "react";
import DataWelcome from "./components/DataWelcome";
import DataToolbar from "./components/DataToolbar";
import DataTable from "./components/DataTable";
import { getAllPaginate } from "../../services/medicine/medicineService.js";
import Paginate from "../../layouts/components/Paginate.jsx";

function Medicine({ className = "" }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMedicinesPaginate = useCallback(
    async (
      currentPage = page,
      currentSize = size,
      currentStatus = status,
      currentSearch = search
    ) => {
      setLoading(true);

      try {
        const result = await getAllPaginate(
          currentPage,
          currentSize,
          currentStatus,
          currentSearch
        );
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [page, size, status, search]
  );

  useEffect(() => {
    fetchMedicinesPaginate(page, size, status, search);
  }, [page, size, status, search, fetchMedicinesPaginate]);

  // Đặt lại về trang đầu tiên (page = 0) khi người dùng thay đổi bộ lọc hoặc từ khóa tìm kiếm
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(0);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(0);
  };

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className={`flex flex-col gap-[1.25rem] ${className}`}>
      <DataWelcome fetchMedicines={fetchMedicinesPaginate} />

      <div className="min-w-0 rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem] shadow-xl">
        <DataToolbar
          status={status}
          setStatus={handleStatusChange}
          search={search}
          setSearch={handleSearchChange}
          totalElements={data?.totalElements}
        />

        <div className="!mt-[1rem]">
          <DataTable
            medicines={data?.content}
            fetchMedicines={fetchMedicinesPaginate}
          />
        </div>

        <Paginate data={data} setPage={setPage} page={page} />
      </div>
    </div>
  );
}

export default Medicine;
