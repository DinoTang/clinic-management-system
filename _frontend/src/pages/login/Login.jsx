import Form from "./components/Form.jsx";
import Background from "./components/Background.jsx";
import IconApp from "../../assets/IconApp.png";

function Login() {

	return(
		<>
		<div className="lg:hidden flex flex-col items-start gap-4 !p-4 bg-brand">
			<div className="flex flex-row gap-2 items-center h-fit">
				<img src={IconApp} alt="App icon" className="w-[3rem] h-[3rem] bg-white !p-2 border rounded-[0.9rem] border-white shadow-xl/20"/>
				<p className="font-bold text-blue-900">Hệ thống quản lý phòng khám</p>
			</div>
			<div className="flex flex-col gap-4 text-white">
				<p className="text-[2rem] font-bold whitespace-normal">Chăm sóc tốt hơn, cùng nhau.</p>
			</div>

		</div>
		<div className="flex items-center bg-b-brand lg:bg-t-brand lg:h-screen justify-center">
			<div className="flex flex-row rounded-[1rem] bg-white w-full lg:w-9/10 items-start justify-between shadow-xl/30 rounded-[2rem] overflow-hidden">
				<div className="w-1/2 h-[38rem] hidden lg:block">
					<Background/>
				</div>

				<div className="rounded-[2rem] w-full lg:w-1/2 block">
					<Form/>
				</div>

			</div>
		</div>
		</>
		);
}

export default Login;