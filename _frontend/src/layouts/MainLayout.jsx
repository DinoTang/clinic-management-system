import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<>
			<Header/>
				<main>
	                <Outlet />
	            </main>
			<Footer/>
		</>
		);
}

export default MainLayout;