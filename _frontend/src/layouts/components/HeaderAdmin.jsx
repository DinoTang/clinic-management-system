import {
	Bell,
	ChevronRight, 
} from "@boxicons/react";
import Clock from "./Clock";

function HeaderAdmin({className}) {

	return (
		<>
		<header className={`${className} sticky z-4 top-0 flex h-[4rem] items-center justify-between !px-[1.8rem] border-b border-gray-200`}>
			<div className="flex flex-row items-center gap-[0.5rem] text-[#98a2b3] text-[0.75rem]">
				<span>
					Phòng khám
				</span>
				<ChevronRight/>
				<b className="font-bold text-black">Tổng quan</b>
			</div>
			<div className="gap-[1.3rem] flex flex-row items-center">
				<Clock className="italic text-[0.8rem]"/>
				<button className="relative grid w-[2rem] h-[2rem] place-items-center border-0 rounded-[0.5rem] text-[#667085] bg-transparent cursor-pointer hover:bg-[#f2f5f8]" type="button">
					<Bell />
					<i className="absolute top-[0.4rem] right-[0.4rem] w-[0.4rem] h-[0.4rem] border border-white bg-[#e75b5b] rounded-full"></i>
				</button>
				<span className="border border-gray-300 h-[1.7rem]"></span>
				<button className="flex flex-row gap-2 items-center" type="button">
					<span className="grid w-[2rem] h-[2rem] items-center border border-[#d7e6f5] rounded-full text-[#216bb3] bg-[#eaf3fc] text-[0.7rem] font-bold">QA</span>
					<span className="flex flex-col text-[0.8rem] text-left">
						<b>Quản trị viên</b>
						<small>Quản trị hệ thống</small>
					</span>
					<ChevronRight/>
				</button>
			</div>
		</header>
		</>
		);
}
export default HeaderAdmin;