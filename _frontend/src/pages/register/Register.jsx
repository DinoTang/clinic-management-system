import Form from "./components/Form.jsx";
import Background from "../login/components/Background.jsx";

function Register() {

	return(
		<>
		<div className="flex flex-row rounded w-9/10 items-start justify-between shadow-xl/30 rounded-[20px] overflow-hidden !mx-auto ">
			<div className="w-1/2 h-[50rem] hidden md:block">
				<Background/>
			</div>
			<div className="w-full md:w-1/2 block">
				<Form/>
			</div>
		</div>
		</>
		);
}

export default Register;