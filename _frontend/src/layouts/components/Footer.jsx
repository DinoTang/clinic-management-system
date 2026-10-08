import { Facebook, Instagram, Envelope, Phone } from "@boxicons/react";

function Footer(){
	return (
		<>
		<div className="!p-4 md:p-[4rem] border-t-1 border-gray-300 flex flex-col md:flex-row gap-4 justify-between items-top">
			<div className="flex flex-col gap-2 md:w-1/4">
				<p className="md:text-[1.5rem] font-bold">Về chúng tôi</p>
				<p className="md:text-[1.2rem]">Chào mừng đến với Clinic phòng khám chuyên khoa kkk, 
					đây là nơi gặp gỡ các bác sĩ có trình độ chuyên môn cao, luôn luôn lắng nghe và đảm bảo sức khỏe cho các bệnh nhân. 
					Hệ thống đã hoạt động nhiều năm đảm bảo uy tín và có trách nhiệm với bệnh nhân.</p>

			</div>

			<div className="flex flex-col gap-2 md:w-1/4">
				<p className="md:text-[1.5rem] font-bold">Thông tin khác</p>
				<p className="md:text-[1.2rem]">Vị trí: 273 An Dương Vương, Phường, Chợ Quán, Hồ Chí Minh 700000</p>
				<p className="md:text-[1.2rem]">Giấy phép hoạt động: Số 1945 / HCM - GPHĐ do sở Y Tế HCM cấp ngày 25/8/2022</p>
			</div>

			<div className="flex flex-col items-start gap-2">
				<p className="md:text-[1.5rem] font-bold">Liên hệ</p>
				<p className="md:text-[1.2rem]"> <Facebook /></p>
				<p className="md:text-[1.2rem]"> <Instagram /></p>
				<p className="md:text-[1.2rem] flex flex-row gap-2 md:justify-center items-center">
					<Envelope />
					clinic@gmail.com
				</p>
				<p className="md:text-[1.2rem] flex flex-row gap-2 md:justify-center items-center">
					<Phone />
					19450902
				</p>

			</div>
		</div>
		</>
		);
} 

export default Footer;