import { useState, useEffect, useCallback } from "react";
import AccountWelcome from "./components/AccountWelcome";
import DataToolbar from "./components/DataToolbar";
import AccountTable from "./components/AccountTable";
import {getAll} from "../../services/user/userService.js";
import Paginate from "../../layouts/components/Paginate.jsx";

function Account({ className = "" }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = useCallback(async (currentPage = page, currentSize = size) => {
    setLoading(true);

    try {
      const result = await getAll(currentPage, currentSize);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(()=>{
    fetchAccounts(page, size);
  },[page]);

  if (loading) {
        return <p>Đang tải...</p>;
    }

  return (
    <div className={`flex flex-col gap-[1.25rem] ${className}`}>
      <AccountWelcome />

      <div className="min-w-0  shadow-xl rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem]">
        <DataToolbar />

        <div className="!mt-[1rem]">
          <AccountTable accounts={data.content} fetchAccounts={fetchAccounts} />
        </div>
          <Paginate data={data} setPage={setPage} page={page} />

      </div>
    </div>

  );
}

export default Account;