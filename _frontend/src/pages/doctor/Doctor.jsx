import { useState, useEffect, useCallback } from "react";
import DoctorWelcome from "./components/DoctorWelcome";
import DataToolbar from "./components/DataToolbar";
import DoctorTable from "./components/DoctorTable";
import {getAll} from "../../services/doctor/doctorService.js";
import Paginate from "../../layouts/components/Paginate.jsx";

function Doctor({ className = "" }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [specialty, setSpecialty] = useState('all');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);


  const fetchDoctors = useCallback(
    async (
      currentPage = page,
      currentSize = size,
      currentSpecialty = specialty,
      currentStatus = status,
      currentSearch= search
      ) => {
    setLoading(true);

    try {
      const result = await getAll(
        currentPage,
        currentSize,
        currentSpecialty,
        currentStatus,
        currentSearch
        );
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, size, specialty, status, search]);

  useEffect(()=>{
    fetchDoctors(page, size, specialty, status, search);
  },[page,size, specialty, status, search]);

  if (loading) {
        return <p>Đang tải...</p>;
    }
    
  return (
    <div className={`flex flex-col gap-[1.25rem] ${className}`}>
      <DoctorWelcome fetchDoctors={fetchDoctors}/>

      <div className="min-w-0  shadow-xl rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem]">
        <DataToolbar
          specialty={specialty}
          setSpecialty={setSpecialty}
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}
        />
        <div className="!mt-[1rem]">
          <DoctorTable doctors={data.content} fetchDoctors={fetchDoctors} />
        </div>
        <Paginate data={data} setPage={setPage} page={page} />

      </div>
    </div>

  );
}

export default Doctor;