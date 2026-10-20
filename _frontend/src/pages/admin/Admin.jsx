import { 
  CalendarAlt, 
} from '@boxicons/react';
import Card from "./components/Card";
import ChartPanel from "./components/ChartPanel";
import ListPanel from "./components/ListPanel";
import TablePanel from "./components/TablePanel";
import LoadingPanel from "./components/LoadingPanel";

function Admin() {
	return (
		<>
		<div className="flex gap-4 flex-col">
			<div>
				<p className="text-[#8a96a8] text-[0.7rem] font-bold">TRUNG TÂM ĐIỀU HÀNH</p>
				<p className="text-[1.6rem] font-bold text-black">Tổng quan phòng khám</p>
				<p className="text-[#8490a0] text-[0.9rem]">Theo dõi hoạt động và các chỉ số vận hành trong ngày.</p>
			</div>
			<Card />
			<ChartPanel/>
			<ListPanel/>
			<TablePanel/>
			<LoadingPanel/>
		</div>
		</>
		);
}

export default Admin;