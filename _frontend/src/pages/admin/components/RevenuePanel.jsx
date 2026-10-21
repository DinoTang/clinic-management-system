import RevenueChart from "./RevenueChart";
function RevenuePanel({className}){
	return (
	<>
	<section className={` ${className} shadow-xl rounded-xl border border-gray-200 bg-white !p-6`}>
		<div className="flex items-start justify-between gap-3">
			<div>
				<h2 className="text-lg font-semibold">
	            Doanh thu phòng khám
	          </h2>
				<p className="text-sm text-gray-500"> Tổng doanh thu hóa đơn đã thanh toán </p>
			</div>
			<select aria-label="Chọn kỳ báo cáo" className="rounded-lg border border-gray-200 !p-2 text-sm">
				<option>Tháng này</option>
				<option>Quý này</option>
				<option>Năm nay</option>
			</select>
		</div>

		<div className="!mt-5 flex flex-wrap items-baseline gap-3"> <strong className="text-2xl font-bold">
	          13.442.000 ₫
	        </strong> <span className="text-sm text-gray-500">
	          <b className="text-green-600">↗ 8,4%</b>{" "}
	          so với kỳ trước
	        </span>
	    </div>

		<RevenueChart />

		<div className="flex justify-between items-center gap-[0.5rem] !mt-[0.6rem] text-[#8490a0] text-[0.6rem]">
			<div className="flex flex-row items-center gap-2 justify-center">
				<i className="w-[0.5rem] h-[0.5rem] rounded-[0.1rem] bg-[#4c94dc]"></i> Doanh thu
			</div>
			<span>Đơn vị: đồng</span>
		</div>
	</section>
	</>
	);
}
export default RevenuePanel;