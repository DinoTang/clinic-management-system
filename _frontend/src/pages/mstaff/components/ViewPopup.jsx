import { useEffect } from "react";
import { RadioCircleMarked, Briefcase, CalendarAlt, Trash, User, Key, X, ContactBook, Envelope, Phone } from "@boxicons/react";

function ViewPopup({staff, onClose, children}) {
	useEffect(()=>{
		function handleKeyDown(e){
			if(e.key==="Escape"){
				onClose();
			}
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
	}, [onClose]);

	return (
		<>
		<div className="absolute top-0 left-0 z-10 w-full bg-black/50 h-screen">
		<div className="bg-white rounded-[1.2rem] flex flex-col gap-4  overflow-y-scroll !mx-auto !p-8 w-9/10 md:w-1/2 h-full">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col gap-2 ">
					<p className="text-s font-bold text-blue-500">CHI TIẾT</p>
					<p className="text-3xl font-bold text-blue-800">Thông tin nhân viên</p>
				</div>
				<p 
					onClick={onClose}
					className="cursor-pointer hover:text-red-500 !p-2">
					<X />
				</p>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Mã người dùng
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Key />
						<p className="w-full">
							{staff.user.id}
                        </p>
					</div>
				</div>

				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Tên đăng nhập
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<User />
						<p className="w-full">
							{staff.user.username}
                        </p>
					</div>
				</div>

				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Họ và tên
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<ContactBook />
						<p className="w-full">
							{staff.user.fullName}
                        </p>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Email
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Envelope />
						<p className="w-full">
							{staff.user.email}
                        </p>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Số điện thoại
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Phone />
						<p className="w-full">
							{staff.user.phone}
                        </p>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Vai trò
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Briefcase />
						<p className="w-full">
							{staff.user.role}
                        </p>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Trạng thái hoạt động
					</p>
					<div className={`flex flex-row border rounded gap-2 !p-2 ${staff.user.status && "text-red-500"}`}>
						<RadioCircleMarked />
						<p className="w-full">
							{staff.user.status}
                        </p>
					</div>
				</div>
				{staff.user.deleted && (
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Trạng thái xóa
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2 text-red-500">
						<Trash />
						<p className="w-full">
							Đã xóa
                        </p>
					</div>
				</div>
				)}
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Mã nhân viên
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Key />
						<p className="w-full">
							{staff.id}
                        </p>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Vị trí
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Briefcase />
						<p className="w-full">
							{staff.position}
                        </p>
					</div>
				</div>
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<p>
						Ngày vào làm
					</p>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<CalendarAlt />
						<p className="w-full">
							{staff.startAt}
                        </p>
					</div>
				</div>
				{
					staff.deleted && (
						<div className="flex flex-col gap-2 text-red-500 text-center font-bold">
							<div className="flex flex-row border rounded gap-2 !p-2">
								<p className="w-full">
									Nhân viên đã bị xóa
		                        </p>
							</div>
						</div>
						)
				}

				{children}
			</div>
		</div>
		</div>
		</>
		);
}
export default ViewPopup;