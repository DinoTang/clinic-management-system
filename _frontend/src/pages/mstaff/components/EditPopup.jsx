import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Briefcase } from "@boxicons/react";
import Swal from "sweetalert2";
import { updatePosition } from "../../../services/staff/staffService.js";

function EditPopup({staff, onClose, fetchStaffs}) {

    const [position, setPosition] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

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

    async function handleUpdate(event) {
        event.preventDefault();

        setError(null);
        setLoading(true);

        try {
            const data = await updatePosition(staff.id, position);
            setPosition(position);
            await fetchStaffs();
			Swal.fire({
			    icon: "success",
			    title: "Cập nhật thành công",
			    timer: 2000,
	        showConfirmButton: true,
		    });

		    navigate("/m-staffs");

        } catch (error) {
        	setError(error);
			Swal.fire({
			    icon: "error",
			    title: "Cập nhật thất bại",
			    timer: 2000,
	        showConfirmButton: true,
		    });
        } finally {
            setLoading(false);
        }
    }

	return (
		<>
		<div className="absolute top-0 left-0 z-10 w-full bg-black/50 h-screen">
		<form
			onSubmit={handleUpdate}
			className="bg-white rounded-[1.2rem] flex flex-col gap-4  overflow-y-scroll !mx-auto !p-8 w-9/10 md:w-1/2 h-full">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col gap-2 ">
					<p className="text-s font-bold text-blue-500">CHỈNH SỬA</p>
					<p className="text-3xl font-bold text-blue-800">Thông tin nhân viên</p>
				</div>
				<p 
					onClick={onClose}
					className="cursor-pointer hover:text-red-500 !p-2">
					<X />
				</p>
			</div>
			<div className="flex flex-col gap-4">
				<div className={`flex flex-col gap-2 text-blue-900 font-bold ${error?.username && "text-red-500"}`}>
					<label htmlFor="position">
						Vị trí
					</label>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Briefcase />
						<select
							id="position"
							name="position"
							required
							onChange={(e)=>setPosition(e.target.value)}
                            className="w-full appearance-none border-0 focus:outline-none focus:ring-0">
                            <option value="">---Chọn vị trí---</option>
                            <option value={0}>Lễ tân tiếp đón</option>
                            <option value={1}>Thu ngân viện phí</option>
                        </select>
					</div>
				</div>

			</div>
			<div className="flex gap-4 flex-col">
				<button type="submit" className="flex flex-row gap-2 !p-3 border rounded font-bold bg-blue-500 text-white justify-center cursor-pointer">
					{loading ? "Đang cập nhật..." : "Cập nhật"}
					<Check />
				</button>
			</div>
		</form>
		</div>
		</>
		);
}
export default EditPopup;