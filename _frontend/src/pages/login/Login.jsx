import Form from "./components/Form.jsx";
import Background from "./components/Background.jsx";

function Login() {

	return(
		<>
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-row rounded-[1rem] w-9/10  items-start justify-between shadow-xl/30  border border-gray-200 rounded-[20px] overflow-hidden">
				<div className="w-1/2 h-[37rem] hidden md:block">
					<Background/>
				</div>
				<div className="w-full md:w-1/2 block">
					<Form/>
				</div>
			</div>
		</div>
		</>
		);
}

export default Login;