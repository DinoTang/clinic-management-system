import { NavLink } from "react-router-dom";
import Clock from "./Clock.jsx";

function Navbar({className}) {
    return (
        <nav className={className}>
        	<Clock className="!p-2 italic text-gray-500"/>
            <NavLink to="/" className="flex flex-row gap-4  !p-3 cursor-pointer hover:bg-blue-500 hover:text-white font-bold  rounded">
            	Trang chủ
	        </NavLink>
            <NavLink
            	to="/m-staffs"
            	className={({isActive})=>`
            		flex flex-row gap-4  !p-3 cursor-pointer hover:bg-blue-500 hover:text-white font-bold  rounded
            		${isActive && "bg-blue-500 text-white"}
            		`}>
            	Quản lý nhân viên
	        </NavLink>
            <NavLink
            	to="/"
            	className={({isActive})=>`
            		flex flex-row gap-4  !p-3 cursor-pointer hover:bg-blue-500 hover:text-white font-bold  rounded
            		${isActive && "bg-blue-500 text-white"}
            		`}>
            	Quản lý bác sĩ
	        </NavLink>
            <NavLink
            	to="/"
            	className={({isActive})=>`
            		flex flex-row gap-4  !p-3 cursor-pointer hover:bg-blue-500 hover:text-white font-bold  rounded
            		${isActive && "bg-blue-500 text-white"}
            		`}>
            	Xếp lịch trực
	        </NavLink>
            <NavLink
            	to="/"
            	className={({isActive})=>`
            		flex flex-row gap-4  !p-3 cursor-pointer hover:bg-blue-500 hover:text-white font-bold  rounded
            		${isActive && "bg-blue-500 text-white"}
            		`}>
            	Quản lý bệnh nhân
	        </NavLink>

            <NavLink
            	to="/decentralization"
            	className={({isActive})=>`
            		flex flex-row gap-4  !p-3 cursor-pointer hover:bg-blue-500 hover:text-white font-bold  rounded
            		${isActive && "bg-blue-500 text-white"}
            		`}>
            	Phân quyền
	        </NavLink>

        </nav>
    );
}

export default Navbar;