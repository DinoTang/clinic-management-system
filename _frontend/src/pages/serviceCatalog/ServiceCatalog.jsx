import { useState, useEffect, useCallback } from "react";
import DataWelcome from "./components/DataWelcome";
import DataToolbar from "./components/DataToolbar";
import DataTable from "./components/DataTable";
import { getAllPaginate } from "../../services/serviceCatalog/serviceCatalogService.js";
import { getAll as getAllSpecialties } from "../../services/specialty/specialtyService.js"; // Đổi lại đường dẫn import cho khớp dự án
import Paginate from "../../layouts/components/Paginate.jsx";

function ServiceCatalog({ className = "" }) {
  const [data, setData] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [serviceStatus, setServiceStatus] = useState("all");
  const [specialtyId, setSpecialtyId] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecialties() {
      try {
        const result = await getAllSpecialties();
        setSpecialties(result || []);
      } catch (error) {
        console.error("Lỗi tải danh sách chuyên khoa:", error);
      }
    }
    fetchSpecialties();
  }, []);

  const fetchServicesPaginate = useCallback(
    async (
      currentPage = page,
      currentSize = size,
      currentStatus = serviceStatus,
      currentSpecialtyId = specialtyId,
      currentSearch = search
    ) => {
      setLoading(true);

      try {
        const result = await getAllPaginate(
          currentPage,
          currentSize,
          currentStatus,
          currentSpecialtyId,
          currentSearch
        );
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [page, size, serviceStatus, specialtyId, search]
  );

  useEffect(() => {
    fetchServicesPaginate(page, size, serviceStatus, specialtyId, search);
  }, [page, size, serviceStatus, specialtyId, search, fetchServicesPaginate]);

  const handleStatusChange = (newStatus) => {
    setServiceStatus(newStatus);
    setPage(0);
  };

  const handleSpecialtyChange = (newSpecialtyId) => {
    setSpecialtyId(newSpecialtyId);
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
      <DataWelcome
        fetchServices={fetchServicesPaginate}
        specialties={specialties}
      />

      <div className="min-w-0 rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem] shadow-xl">
        <DataToolbar
          serviceStatus={serviceStatus}
          setServiceStatus={handleStatusChange}
          specialtyId={specialtyId}
          setSpecialtyId={handleSpecialtyChange}
          specialties={specialties}
          search={search}
          setSearch={handleSearchChange}
          totalElements={data?.totalElements}
        />

        <div className="!mt-[1rem]">
          <DataTable
            services={data?.content}
            specialties={specialties}
            fetchServices={fetchServicesPaginate}
          />
        </div>

        <Paginate data={data} setPage={setPage} page={page} />
      </div>
    </div>
  );
}

export default ServiceCatalog;
