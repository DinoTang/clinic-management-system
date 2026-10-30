import { useState, useEffect, useCallback } from "react";
import {getAll} from "../../services/patient/patientService.js";
import Paginate from "../../layouts/components/Paginate.jsx";
import PatientWelcome from "./components/PatientWelcome";
import PatientToolbar from "./components/PatientToolbar";
import PatientTable from "./components/PatientTable";

function Patient({ className = "" }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');


  const fetchPatients = useCallback(
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
    fetchPatients(page, size, status, search);
  },[page,size, status, search]);

  if (loading) {
        return <p>Đang tải...</p>;
    }

  return (
    <>
    <div className={`flex flex-col gap-[1.25rem] ${className}`}>
      <PatientWelcome/>
      <div className="min-w-0  shadow-xl rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem]">
        <PatientToolbar
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}

        />
        <div className="!mt-[1rem]">
          <PatientTable 
            patients={data.content}
            fetchPatients={fetchPatients}
           />
          <Paginate data={data} setPage={setPage} page={page} />
        </div>
        
      </div>
    </div>

    </>
  );
}

export default Patient;