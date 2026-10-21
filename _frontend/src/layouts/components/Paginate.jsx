import { useState, useEffect } from "react";
import {ChevronRight, ChevronLeft} from "@boxicons/react";

function Paginate({data, page, setPage}){
	const [inputPage, setInputPage] = useState(page+1);

	function moveToPage(){
		const newPage = Number(inputPage);
		if(Number.isInteger(newPage) && newPage>=1 && newPage<=data.totalPages){
			setPage(newPage - 1);	
		}
	}

	return (
		<>
		{data.empty && (
			<div className="font-bold text-center !p-4">
				Không tìm thấy dữ liệu
			</div>
		)}
		<div className="flex flex-row gap-4 w-fit !p-4 !mx-auto">
			{((!data.first && data.last) || (!data.first && !data.last)) &&(
				<div
					onClick={()=>{
						setPage(page - 1);
						setInputPage(page+ 1 -1);
					}}
					className="!p-2 border cursor-pointer w-fit rounded  text-blue-600 hover:bg-blue-500 hover:text-white">
					<ChevronLeft />
				</div>
			)}
			<div className="border rounded w-fit flex flex-row gap-4 items-center !px-4">
				<input
					type="text"
					value={inputPage}
					onChange={(e) =>setInputPage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            moveToPage();
                        }
                    }}
					className="w-[4rem] text-center !py-2"
				/>
				/ {data.totalPages}
			</div>
			{((data.first && !data.last) || (!data.first && !data.last)) &&(
				<div
					onClick={()=>{
						setPage(page + 1);
						setInputPage(page+1 + 1);
					}}
					className="!p-2 cursor-pointer border w-fit rounded  text-blue-600 hover:bg-blue-500 hover:text-white">
					<ChevronRight />
				</div>
			)}
		</div>
		</>
		);
}
export default Paginate;