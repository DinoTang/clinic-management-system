import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
	User,
	Lock,
	Eye,
	ArrowRightStroke,
	UserPlus,
	CheckShield,
} from "@boxicons/react";
import Swal from "sweetalert2";
import { login as loginApi } from "../../../services/auth/authService.js";
import ButtonLoginGoogle from "./ButtonLoginGoogle";

function Form() {
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
	const { login: loginContext} = useAuth();
	const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        setError(null);
        setLoading(true);

        try {
            const data = await loginApi(username, password);
			loginContext(data.token, data.user);
			Swal.fire({
			    icon: "success",
			    title: "Đăng nhập thành công",
			    text: "Chào mừng bạn quay trở lại!",
			    timer: 2000,
	        showConfirmButton: true,
		    });

			if(data.user.status=="Đã khóa"){
				Swal.fire({
				    icon: "error",
				    title: "Đăng nhập từ chối",
				    text: `Tài khoản ${data.user.username} đã bị khóa`,
				    timer: 5000,
		        showConfirmButton: true,
			    });
			    return;
			}
			
			if (data.user.role =="Nhà phát triển") navigate("/");			
			else if (data.user.role =="Quản trị viên") navigate("/admin");
			else if (data.user.role =="Nhân viên") navigate("/staff");
			else if (data.user.role =="Bác sĩ") navigate("/doctor");

        } catch (error) {
        	setError(error);
        	if(error.status==500){
				Swal.fire({
				    icon: "error",
				    title: "Đăng nhập thất bại",
				    text: error.message,
				    timer: 2000,
		        showConfirmButton: true,
			    });
        	}
        } finally {
            setLoading(false);
        }
    }

    function togglePassword() {
	    setShowPassword(!showPassword);
	}

	return (
		<>
		<form
			onSubmit={handleLogin}
			className="flex flex-col gap-4 !p-[2rem] lg:!p-[4rem] w-full">
			<div className="flex flex-col gap-2 ">
				<p className="text-s font-bold text-blue-500">XIN CHÀO</p>
				<p className="text-3xl font-bold text-blue-800">Đăng nhập hệ thống</p>
				<p className="text-s text-gray-500">Sử dụng tài khoản nội bộ để tiếp tục làm việc</p>
			</div>
			<div className="flex flex-col gap-4">
				<div className={`flex flex-col gap-2 text-blue-900 font-bold ${error?.username && "text-red-500"}`}>					<label htmlFor="username">
						Tên đăng nhập
					</label>
					<div className="flex flex-row border border-gray-400 rounded-[1rem] gap-2 !p-4">
						<User />
						<input
							id="username"
							name="username"
							type="text"
							value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Nhập tên đăng nhập"
                            className="w-full appearance-none border-0 focus:outline-none focus:ring-0"/>
					</div>
					{error?.username && 
						(<p className="text-sm text-red-400">{error.username}</p>)
					}
				</div>

				<div className={`${error?.password && "text-red-500"} flex flex-col gap-2 text-blue-900 font-bold`}>
					<label htmlFor="password">
						Mật khẩu
					</label>
					<div className="flex flex-row border border-gray-400 rounded-[1rem] gap-2 !p-4">
						<Lock />
						<input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
							placeholder="Nhập mật khẩu"
							className="w-full appearance-none border-0 focus:outline-none focus:ring-0"/>
						<Eye onClick={togglePassword} className="cursor-pointer"/>
					</div>
					{error?.password && 
						(<p className="text-sm text-red-400">{error.password}</p>)
					}
				</div>
				<p className="text-blue-500 text-s font-bold text-right ">Quên mật khẩu?</p>

			</div>

			<div className="flex gap-4 flex-col">
				<button type="submit" className="flex flex-row gap-2 !p-3 border rounded-[1rem] font-bold bg-blue-500 text-white justify-center">
					{loading ? "Đang đăng nhập..." : "Đăng nhập"}
					<ArrowRightStroke />
				</button>
			</div>

			<div className="text-center">--- Hoặc ---</div>

			<div className="flex gap-4 flex-col">
				<ButtonLoginGoogle/>
			</div>

			<div className="lg:hidden flex flex-row gap-4 !p-[3rem] text-black items-center justify-center text-sm">
			    <CheckShield className="w-[1rem] h-[1rem] text-blue-500"/>
				<p className="text-s">Hệ thống dành cho đội ngũ y tế</p>
			</div>
		</form>
		</>
		);
}
export default Form;