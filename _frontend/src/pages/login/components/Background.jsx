import IconApp from "../../../assets/IconApp.png";
import BgApp from "../../../assets/bglogin.jpg";

function Background() {
	return (
		<>
		<div className="relative min-h-screen h-full">
			<div className="flex flex-col relative !p-16 justify-between gap-32 z-10 bg-transparent">
				<div className="flex flex-row gap-2 items-center h-fit">
					<img src={IconApp} alt="App icon" className="w-9 h-9"/>
					<p className="font-bold text-blue-900">Hệ thống quản lý phòng khám</p>
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-s">Cổng thông tin nội bộ</p>
					<p className="text-3xl font-bold">Chăm sóc tốt hơn</p>
					<p className="text-s">Không gian làm việc dành riêng cho đội ngũ y tế, kết nối tận tâm tron từng bước chăm sóc sức khỏe</p>

				</div>
			</div>
			<img src={BgApp} alt="Background" className="absolute inset-0 w-full object-fit h-full"/>
		</div>
		</>
		);
}
export default Background;