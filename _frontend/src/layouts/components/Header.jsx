import { useEffect, useState } from "react";
import {ListSquare, Search, User, Shield} from "@boxicons/react";
import { Link } from "react-router-dom";
import IconApp from "../../assets/IconApp.png";
import Default from "../../assets/default.jpg";
import {useAuth } from "../../context/AuthContext.jsx";
import UserMenuPopup from "./UserMenuPopup.jsx";

function Header() {

	const [showUserMenuPopup, setShowUserMenuPopup] = useState(false);
	const {isAuthenticated, user} = useAuth();
	return (
		<>
		<div className="!p-1 md:!p-3 flex flex-row gap-2 h-[4rem] w-full justify-between items-center border-b-1 border-gray-300">

			<div className="flex flex-row gap-4 items-end">
				<Link to="/" className="flex flex-row gap-4 items-center justify-center">
					<img src={IconApp} className="h-[2.3rem] md:h-[4rem]" />
					<p className="hidden md:block text-red-line text-[1.5rem] text-center md:text-[3rem] italic font-bold text-blue-500 ">CLINIC</p>
				</Link>
			</div>

			<div className="flex flex-row gap-4 justify-end">
				<form className="flex flex-row gap-1">
					<input type="text" name="search" placeholder="Nhập từ khóa cần tìm" className="border rounded !p-2 "/>
					<button type="submit" className="!p-1 border rounded tooltip-container md:h-[3rem] md:w-[3rem] flex items-center justify-center cursor-pointer">
						<Search />
						<span className="tooltip">Tìm kiếm</span>
					</button>
				</form>
				<div className="md:hidden tooltip-container relative md:h-[3rem] md:w-[3rem] flex items-center justify-center cursor-pointer">
					<ListSquare className="text-lg"/>
					<span className="tooltip">Menu</span>
				</div>

				<div
					onClick={()=>setShowUserMenuPopup(!showUserMenuPopup)}
					className="tooltip-container relative md:h-[3rem] md:w-[3rem] flex items-center justify-center cursor-pointer">
					{
						isAuthenticated 
						? <img src={Default} className="w-[1.5rem]"/>
						: <User className="text-lg"/>
					}
					<span className="tooltip">Tài khoản</span>
					{showUserMenuPopup && <UserMenuPopup user={user}/>}
				</div>

				{isAuthenticated &&
				<Link to="/m-staffs" className="tooltip-container relative md:h-[3rem] md:w-[3rem] flex items-center justify-center cursor-pointer">
					<Shield className="text-lg"/>
					<span className="tooltip">Công việc</span>
				</Link>
				}

			</div>
		</div>		
		</>
		);
}
export default Header;