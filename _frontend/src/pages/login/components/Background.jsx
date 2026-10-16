import IconApp from "../../../assets/IconApp.png";
import { CheckShield} from "@boxicons/react";

function Background() {
	return (
		<>
		<div className="bg-brand h-full">
			<div className="flex flex-col !p-[3rem] justify-between h-full">
				<div className="flex flex-row gap-2 items-center h-fit">
					<img src={IconApp} alt="App icon" className="w-[3rem] h-[3rem] bg-white !p-2 border rounded-[0.9rem] border-white shadow-xl/20"/>
					<p className="font-bold text-blue-900">Hệ thống quản lý phòng khám</p>
				</div>
				<div className="flex flex-col gap-4 text-white">
					<p className="text-[2.8rem] font-bold whitespace-normal">Chăm sóc tốt hơn, cùng nhau.</p>
					<p className="text-s">Không gian làm việc dành riêng cho đội ngũ y tế, kết nối tận tâm trong từng bước chăm sóc sức khỏe.</p>
				</div>
				<div className="flex flex-row gap-4 text-white items-center text-sm">
					 <div className="!p-3 border bg-gray-300/25 rounded-[0.7rem]">
					    <CheckShield className="w-[1rem] h-[1rem]"/>
					</div>
					<p className="text-s">Truy cập dành cho đội ngũ y tế</p>
				</div>
			</div>
		</div>
		</>
		);
}
export default Background;