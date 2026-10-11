import { useState, useEffect } from "react";
import {ChevronRight, ChevronLeft} from "@boxicons/react";

function Paginate({data}){
	const [currentPage, setCurrentPage] = useState(data.pageable.pageSize);
	return (
		<>
		<div className="flex flex-row gap-4 w-fit !p-8 !mx-auto">
			{data.empty && (
				<div className="font-bold text-center !p-4">
					Không tìm thấy dữ liệu
				</div>
			)}

			{data.last &&
				<div className="!p-4 border w-fit rounded hover:bg-blue-500 hover:text-center text-blue-600">
					<ChevronLeft />
				</div>
			}
			<div className="border rounded w-fit flex flex-row gap-4 items-center !px-4">
				<input
					type="number"
					min={1}
					max={data.totalPages}
					value={currentPage}
					onChange={(e)=>setCurrentPage(e.target.value)}
					className=" w-[4rem] text-center !py-2"
				/>
				/ {data.totalPages}
			</div>
			{data.first &&
				<div className="!p-4 border w-fit rounded hover:bg-blue-500 hover:text-center text-blue-600">
					<ChevronRight />
				</div>
			}
		</div>
		</>
		);
}
export default Paginate;