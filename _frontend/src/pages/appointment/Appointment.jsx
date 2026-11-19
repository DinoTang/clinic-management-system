import { useState, useEffect, useCallback } from "react";
import DataWelcome from "./components/DataWelcome";
import DataToolbar from "./components/DataToolbar";
import DataTable from "./components/DataTable";
import {getAll} from "../../services/appointment/appointmentService.js";
import Paginate from "../../layouts/components/Paginate.jsx";

function Appointment({ className = "" }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(
    async (
      currentPage = page,
      currentSize = size,
      currentStatus = status,
      currentSearch= search
      ) => {
    setLoading(true);

    try {
      const result = await getAll(
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
  }, [page, size, status, search]);

  useEffect(()=>{
    fetchAppointments(page, size, status, search);
  },[page,size, status, search]);

  if (loading) {
        return <p>Đang tải...</p>;
    }
  return (
    <div className={`flex flex-col gap-[1.25rem] ${className}`}>
      <DataWelcome
        fetchAppointments={fetchAppointments}
      />

      <div className="min-w-0  shadow-xl rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem]">
        <DataToolbar
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}
        />
        <div className="!mt-[1rem]">
          <DataTable 
            appointments={data.content} fetchAppointments={fetchAppointments} />
        </div>
        <Paginate data={data} setPage={setPage} page={page} />

      </div>
    </div>

  );
}

export default Appointment;