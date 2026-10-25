import { useState, useEffect } from "react";
import Table from "./components/Table.jsx";
import {getAll} from "../../services/staff/staffService.js";
import Paginate from "../../layouts/components/Paginate.jsx";

function MStaff() {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(1);
	const [loading, setLoading] = useState(true);

	async function fetchStaffs(page, size) {
		try{
			const data = await getAll(page, size);
			setData(data);
		}
		catch (error){
			console.error(error);
		}
		finally{
			setLoading(false);
		}
	}
	useEffect(()=>{
		fetchStaffs(page, size);
	},[page]);

	if (loading) {
        return <p>Đang tải...</p>;
    }

	return (
		<>
			<Table staffs={data.content} fetchStaffs={fetchStaffs}/>
			<Paginate data={data} setPage={setPage} page={page} />
		</>
    );
}
export default MStaff;