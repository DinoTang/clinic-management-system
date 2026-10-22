import { useEffect } from "react";
import { loginGoogle} from "../../services/auth/authService.js";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate} from "react-router-dom";
import {USER_STATUS, USER_ROLE} from "../../enums/index.js";

function GoogleCallback({className}){
	const { login: loginContext} = useAuth();
	const navigate = useNavigate();

	const handleGoogleLogin = async() => {
		try {
			const data= await loginGoogle();
			loginContext(data.token, data.user);
			Swal.fire({
				icon: "success",
				title: "Đăng nhập thành công",
				text: "Chào mừng bạn quay trở lại!",
				timer: 2000,
				showConfirmButton: true,
			});

			if(data.user.status==USER_STATUS.LOCKED){
				Swal.fire({
					icon: "error",
					title: "Đăng nhập từ chối",
					text: `Tài khoản ${data.user.username} đã bị khóa`,
					timer: 5000,
					showConfirmButton: true,
				});
				navigate("/");
				return;
			}
			if (data.user.role == USER_ROLE.DEV) navigate("/admin");			
			else if (data.user.role ==USER_ROLE.ADMIN) navigate("/admin");
			else if (data.user.role ==USER_ROLE.STAFF) navigate("/staff");
			else if (data.user.role ==USER_ROLE.DOCTOR) navigate("/doctor");
			else if (data.user.role ==USER_ROLE.PATIENT) navigate("/patient");

		} catch (error) {
			if(error.status==500){
				Swal.fire({
					icon: "error",
					title: "Đăng nhập thất bại",
					text: error.message,
					timer: 2000,
					showConfirmButton: true,
				});
			}
		}
	};
	useEffect(()=>{
		handleGoogleLogin();
	}, []);

	return <p>Đang hoàn tất đăng nhập Google...</p>;
}

export default GoogleCallback;