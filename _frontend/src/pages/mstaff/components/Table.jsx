import {Eye, Edit, Trash, RotateCcw} from "@boxicons/react";
import { useState } from "react";
import ViewPopup from "./ViewPopup.jsx";
import EditPopup from "./EditPopup.jsx";
import DeletePopup from "./DeletePopup.jsx";

function Table({staffs, fetchStaffs}) {
	const [showViewPopup, setShowViewPopup] = useState(null);
	const [showEditPopup, setShowEditPopup] = useState(null);
	const [showDeletePopup, setShowDeletePopup] = useState(null);
	return (
		<>
        <table className="w-full text-center">
            <thead>
            	<tr>
					<th className="!p-2 border font-bold bg-blue-700 text-white">#</th>
					<th className="!p-2 border font-bold bg-blue-700 text-white">Tên</th>
					<th className="!p-2 border font-bold bg-blue-700 text-white">Vị trí</th>
					<th className="!p-2 border font-bold bg-blue-700 text-white">Email</th>
					<th className="!p-2 border font-bold bg-blue-700 text-white">Số ĐT</th>
					<th className="!p-2 border font-bold bg-blue-700 text-white">Trạng thái</th>
					<th className="!p-2 border font-bold bg-blue-700 text-white">Hành động</th>
				</tr>
            </thead>
            <tbody>
            {staffs.map((staff, i)=>(
            	<tr key={staff.id} className="hover:bg-blue-200 hover:text-black">
            		<td className="!p-3 border">{i+1}</td>
            		<td className="!p-3 border">{staff.user.fullName}</td>
            		<td className="!p-3 border">{staff.position}</td>
            		<td className="!p-3 border">{staff.user.email}</td>
            		<td className="!p-3 border">{staff.user.phone}</td>
            		<td className={`!p-3 border border-black ${staff.user.status ? "text-red-500" : "text-green-500"} `}>{staff.user.status}</td>
            		<td className="border">
            			<div className="flex flex-row gap-4 justify-center">
            				<p
            					onClick={()=>setShowViewPopup(staff)}
            					className="tooltip-container">
		            			<span className="tooltip">Chi tiết</span>
		            			<Eye />
            				</p>
            				<p 
            					onClick={()=>setShowEditPopup(staff)}
            					className="tooltip-container text-orange-400">
		            			<span className="tooltip">Chỉnh sửa</span>
		            			<Edit />
            				</p>
            				{
            					staff.deleted 
		            				?(<p 
		            					onClick={()=>setShowDeletePopup(staff)}
		            					className="tooltip-container text-green-500">
				            			<span className="tooltip">Khôi phục</span>
				            			<RotateCcw />
		            				</p>)
            						:(<p 
		            					onClick={()=>setShowDeletePopup(staff)}
		            					className="tooltip-container text-red-500">
				            			<span className="tooltip">Xóa</span>
				            			<Trash />
		            				</p>)
            				}

            			</div>
            		</td>
		        </tr>
        	))}
	        </tbody>
        </table>
        {showViewPopup && 
        	<ViewPopup
        		staff={showViewPopup}
        		onClose={()=>setShowViewPopup(null)}
        />}

        {showEditPopup && 
	        <EditPopup
	        	staff={showEditPopup}
	        	onClose={()=>setShowEditPopup(null)}
	        	fetchStaffs={fetchStaffs}
        />}

        {showDeletePopup && 
	        <DeletePopup
	        	staff={showDeletePopup}
	        	onClose={()=>setShowDeletePopup(null)}
	        	fetchStaffs={fetchStaffs}
        />}

        </>
		);
}

export default Table;