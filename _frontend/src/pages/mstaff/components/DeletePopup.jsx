import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Briefcase } from "@boxicons/react";
import Swal from "sweetalert2";
import ViewPopup from "./ViewPopup.jsx";
import { softDelete, restore } from "../../../services/staff/staffService.js";

function DeletePopup({staff, onClose, fetchStaffs}) {

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(()=>{
		function handleKeyDown(e){
			if(e.key=="Escape")
				onClose();
		}
		window.addEventListener("keydown", handleKeyDown);
		return ()=>{
			window.removeEventListener("keydown",  handleKeyDown);
		}
	},[onClose]);

	async function handleSoftDelete(){
		try{
			const data = await softDelete(staff.id);
			await fetchStaffs();
			Swal.fire({
			    icon: "success",
			    title: "Xóa thành công",
			    timer: 2000,
	        showConfirmButton: true,
		    });

			onClose();
		}
		catch(error){
	    	setError(error);
			Swal.fire({
			    icon: "error",
			    title: "Cập nhật thất bại",
			    timer: 2000,
	        showConfirmButton: true,
		    });
		}
		finally{
			setLoading(false);
		}
	}

	async function handleRestore(){
		try{
			const data = await restore(staff.id);
			await fetchStaffs();
			Swal.fire({
			    icon: "success",
			    title: "Khôi phục thành công",
			    timer: 2000,
	        showConfirmButton: true,
		    });

			onClose();
		}
		catch(error){
	    	setError(error);
			Swal.fire({
			    icon: "error",
			    title: "Cập nhật thất bại",
			    text: error.message,
			    timer: 2000,
	        showConfirmButton: true,
		    });
		}
		finally{
			setLoading(false);
		}
	}

	return (
		<>
			<ViewPopup
				staff={staff}
				onClose={onClose}
			>
				{
					staff.deleted
					 ? (
						<button
							onClick={handleRestore}
							className="bg-white text-green-500 font-bold border !p-3 rounded hover:bg-green-500 hover:text-white cursor-pointer">
							Khôi phục nhân viên
						</button>
						)
					: (
						<button
							onClick={handleSoftDelete}
							className="bg-white text-red-500 font-bold border !p-3 rounded hover:bg-red-500 hover:text-white cursor-pointer">
							Xóa nhân viên
						</button>

						)
				}
			</ViewPopup>
		</>
		);
}
export default DeletePopup;