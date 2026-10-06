import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, ArrowRightStroke, DoorOpenAlt } from "@boxicons/react";
import Swal from "sweetalert2";
import { login } from "../../../services/auth/authService.js";

function Form() {
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await login(username, password);
			Swal.fire({
			    icon: "success",
			    title: "Đăng nhập thành công",
			    text: "Chào mừng bạn quay trở lại!",
			    timer: 2000,
	        showConfirmButton: true,
		    });
            localStorage.setItem("token", data.token);

            console.log(data);
			// if (data.user.role === 0) navigate("/patient");
			// else if (data.user.role === 1) navigate("/staff");
			// else if (data.user.role === 2) navigate("/doctor");
			// else if (data.user.role === 3) navigate("/admin");

        } catch (error) {
        	Swal.fire({
		        icon: "error",
		        title: "Đăng nhập thất bại",
		        text: error.message,
		    });
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
			className="flex flex-col gap-4 !p-8 w-full">
			<div className="flex flex-col gap-2 ">
				<p className="text-s font-bold text-blue-500">XIN CHÀO</p>
				<p className="text-3xl font-bold text-blue-800">Đăng nhập hệ thống</p>
				<p className="text-s text-gray-500">Sử dụng tài khoản nội bộ để tiếp tục làm việc</p>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<label htmlFor="username">
						Tên đăng nhập
					</label>
					<div className="flex flex-row border rounded gap-2 !p-2">
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
				</div>

				<div className="flex flex-col gap-2 text-blue-900 font-bold">
					<label htmlFor="password">
						Mật khẩu
					</label>
					<div className="flex flex-row border rounded gap-2 !p-2">
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
				</div>
				<p className="text-blue-500 text-s font-bold text-right ">Quên mật khẩu?</p>
			</div>

			<div className="flex gap-4 flex-col">
				<button type="submit" className="flex flex-row gap-2 !p-3 border rounded font-bold bg-blue-500 text-white justify-center">
					{loading ? "Đang đăng nhập..." : "Đăng nhập"}
					<ArrowRightStroke />
				</button>
				<button type="button" className="flex flex-row gap-2 !p-3 border rounded font-bold bg-green-500 text-white justify-center">
					Đăng ký
					<DoorOpenAlt />
				</button>

			</div>
		</form>
		</>
		);
}
export default Form;