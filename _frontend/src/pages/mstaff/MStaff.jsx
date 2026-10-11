import { useState, useEffect } from "react";
import Table from "./components/Table.jsx";
import {getAll} from "../../services/staff/staffService.js";
import Paginate from "../../layouts/components/Paginate.jsx";

function MStaff() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchStaffs() {
		try{
			const data = await getAll();
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
		fetchStaffs();
	},[]);
	console.log(data);
	if (loading) {
        return <p>Đang tải...</p>;
    }

	return (
		<>
			<Table staffs={data.content} fetchStaffs={fetchStaffs}/>
			<Paginate data={data} />
		</>
    );
}
export default MStaff;