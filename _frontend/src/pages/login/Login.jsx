import Form from "./components/Form.jsx";
import Background from "./components/Background.jsx";

function Login() {

	return(
		<>
		<div className="flex flex-row rounded w-9/10 min-h-screen items-start justify-between shadow-xl/30 !mx-auto ">
			<div className="w-1/2 block">
				<Background/>
			</div>
			<div className="w-1/2 block">
				<Form/>
			</div>
		</div>
		</>
		);
}

export default Login;