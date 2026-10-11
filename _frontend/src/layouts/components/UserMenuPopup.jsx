import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {DoorOpenAlt, ArrowRightStroke, UserPlus} from "@boxicons/react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function UserMenuPopup({user}) {

	const {logout: logoutContext} = useAuth();
	const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault();

		logoutContext();
		Swal.fire({
		    icon: "success",
		    title: "Đăng xuất thành công",
		    timer: 2000,
        showConfirmButton: true,
	    });

	    navigate("/");
    }

	return (
		<>
		<div className="absolute bottom-0 z-2 right-0 !p-3 flex gap-2 flex-col w-fit whitespace-nowrap translate-y-[100%]  bg-white rounded-[0.3rem] shadow-lg border-1 border-gray-200 max-h-[15rem] overflow-y-auto overflow-x-hidden slide-down">
			{
				user
				? (<>
					<p>Tài khoản: {user.username}</p>
					<p>Email: {user.email}</p>
					<p>Vai trò: {user.role}</p>
					<p className="!border-1 border-gray-300 m-1"></p>
					<button 
						onClick={handleLogout}
						type="button"
						className=" hover:bg-gray-200 hover:text-blue-600 !p-2 rounded-[0.25rem] flex flex-row justify-start items-center gap-2 w-full cursor-pointer">
						<DoorOpenAlt />
						<p>Đăng xuất</p>
					</button>
				</>) : (<>
					<Link to="/login" className="!p-1 hover:bg-gray-200 hover:text-blue-600 p-2 rounded-[0.25rem] flex flex-row justify-start items-center gap-2 w-full cursor-pointer">
						< ArrowRightStroke/>
						<p>Đăng nhập</p>
					</Link>
					<Link to="/register" className="!p-1 hover:bg-gray-200 hover:text-blue-600 p-2 rounded-[0.25rem] flex flex-row justify-start items-center gap-2 w-full cursor-pointer">
						<UserPlus />
						<p>Đăng ký</p>
					</Link>
				</>)
			}
		</div>
		</>
		);
}
export default UserMenuPopup;