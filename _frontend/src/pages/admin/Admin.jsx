import StatPanel from "./components/StatPanel";
import RevenuePanel from "./components/RevenuePanel";
import OperationsPanel from "./components/OperationsPanel";
import RecentPanel from "./components/RecentPanel";
import PecialtyPanel from "./components/PecialtyPanel";

function Admin() {
	return (
		<>
		<div className="flex gap-4 flex-col">
			<div>
				<p className="text-[#8a96a8] text-[0.7rem] font-bold">TRUNG TÂM ĐIỀU HÀNH</p>
				<p className="text-[1.6rem] font-bold text-black">Tổng quan phòng khám</p>
				<p className="text-[#8490a0] text-[0.9rem]">Theo dõi hoạt động và các chỉ số vận hành trong ngày.</p>
			</div>

			<StatPanel />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				<RevenuePanel className="lg:col-span-2"/>
				<OperationsPanel/>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				<RecentPanel className="lg:col-span-2"/>
				<PecialtyPanel/>
			</div>
		</div>
		</>
		);
}

export default Admin;