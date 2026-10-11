import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";

function MenuPopup({user, onClose}) {

	useEffect(()=>{
		function handleKeyDown(e){
			if(e.key=="Escape")
				onClose();
		}
		window.addEventListener("keydown", handleKeyDown);
		return ()=>{
			window.removeEventListener("keydown",  handleKeyDown);
		}
	},[onClose]);

	return (
		<>

		<Navbar className="lg:hidden absolute top-0 z-2 left-0 !p-3 flex gap-2 flex-col w-fit whitespace-nowrap min-h-screen h-fit bg-white rounded-[0.3rem] shadow-2xl border-1 border-gray-300 overflow-y-auto overflow-x-hidden slide-left-to-right"/>
		</>
		);
}
export default MenuPopup;