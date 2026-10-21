import Sidebar from "./components/Sidebar.jsx";
import HeaderAdmin from "./components/HeaderAdmin.jsx";
import { Outlet } from "react-router-dom";

function AdminLayout() {
	return (
		<>
			<div className="flex flex-row w-full">
				<Sidebar className="w-fit shrink-0"/>
				<div className="flex bg-white min-w-0 flex-col flex-1">
					<HeaderAdmin className="bg-white"/>
					<main className="!p-[1.4rem] flex-1 w-full">
		                <Outlet />
		            </main>
				</div>
	        </div>
		</>
		);
}

export default AdminLayout;