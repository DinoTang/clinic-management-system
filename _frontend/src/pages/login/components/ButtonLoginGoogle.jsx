import IconGG from "../../../assets/Icon_gg.png";

function ButtonLoginGoogle({classname}){
	const handleGoogleLogin = async() => {
		window.location.href = "http://localhost:8080/oauth2/authorization/google";
	}
	return (
		<>
			<button
				onClick={handleGoogleLogin}
				type="button"
				className="flex flex-row items-center gap-2 !p-3 border rounded-[1rem] font-bold justify-center cursor-pointer">
				<img src={IconGG} className="w-[2rem] h-[2rem]"/>
				Đăng nhập với Google
			</button>
		</>
		);
}

export default ButtonLoginGoogle;