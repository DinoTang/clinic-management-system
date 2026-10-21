import Sidebar from "./components/Sidebar.jsx";
import HeaderAdmin from "./components/HeaderAdmin.jsx";
import { Outlet } from "react-router-dom";

function AdminLayout() {
	return (
		<>
			<div className="flex flex-row">
				<Sidebar/>
				<div className="flex bg-white flex-col w-full">
					<HeaderAdmin className="bg-white"/>
					<main className="!p-[1.4rem]">
		                <Outlet />
		            </main>
				</div>
	        </div>
		</>
		);
}

export default AdminLayout;