import { 
  CalendarAlt,
  User,
  Receipt,
  Pill

} from '@boxicons/react';

function ListPanel(){
	return (
		<>
		<section className="border border-gray-200 rounded-[0.7rem] shadow-xl !p-4">
			<div className="flex items-start justify-between gap-3">
				<div>
					<h2 className="font-bold">Tình hình vận hành</h2>
				</div>
			</div>
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-row w-full items-center gap-3">
					<span className="is-blue">
						<CalendarAlt/>
					</span>
					<span className="flex flex-col flex-1 text-[0.8rem]">
						<b>Lịch hẹn chờ xác nhận</b>
						<small>Đang cần bác sĩ xử lý</small>
					</span>
					<strong>06</strong>
				</div>
				<div className="flex flex-row w-full items-center gap-3">
					<span className="is-green">
						<User/>
					</span>
					<span className="flex flex-col flex-1 text-[0.8rem]">
						<b>Bệnh nhân đang chờ</b>
						<small>Trong hàng đợi khám</small>
					</span>
					<strong>08</strong>
				</div>
				<div className="flex flex-row w-full items-center gap-3">
					<span className="is-violet">
						<Receipt />
					</span>
					<span className="flex flex-col flex-1 text-[0.8rem]">
						<b>Hóa đơn chưa thanh toán</b>
						<small>Cần được thu ngân xử lý</small>
					</span>
					<strong>02</strong>
				</div>
				<div className="flex flex-row w-full items-center gap-3">
					<span className="is-amber">
						<Pill/>
					</span>
					<span className="flex flex-col flex-1 text-[0.8rem]">
						<b>Thuốc sắp hết hàng</b>
						<small>Tồn kho dưới 30 đơn vị</small>
					</span>
					<strong>01</strong>
				</div>
			</div>
		</section>
		</>
		);
}

export default ListPanel;