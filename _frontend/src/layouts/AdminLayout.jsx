import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

function AdminLayout() {
	return (
		<>
			<Header/>
			<div className="flex flex-row">
				<Navbar className="w-fit text-nowrap border-r-1 border-b-1"/>
				<main className="w-full">
	                <Outlet />
	            </main>
	        </div>
		</>
		);
}

export default AdminLayout;