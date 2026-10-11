import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { User, Lock, Eye, ArrowRightStroke, ContactBook, Phone, Envelope, UserPlus } from "@boxicons/react";
import Swal from "sweetalert2";
import { register as registerApi } from "../../../services/auth/authService.js";

function Form() {
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
	const { login: loginContext} = useAuth();
	const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();

        setError(null);
        setLoading(true);

        try {
            const data = await registerApi({
            	username: username,
            	password: password,
            	phone: phone,
            	email: email,
            	fullName: fullName
            });
			loginContext(data.token, data.user);
			Swal.fire({
			    icon: "success",
			    title: "Đăng ký thành công",
			    timer: 2000,
	        showConfirmButton: true,
		    });

		    navigate("/");
			// if (data.user.role === 0) navigate("/patient");
			// else if (data.user.role === 1) navigate("/staff");
			// else if (data.user.role === 2) navigate("/doctor");
			// else if (data.user.role === 3) navigate("/admin");

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
			onSubmit={handleRegister}
			className="flex flex-col gap-4 !p-8 w-full">
			<div className="flex flex-col gap-2 ">
				<p className="text-s font-bold text-blue-500">XIN CHÀO</p>
				<p className="text-3xl font-bold text-blue-800">Đăng ký tài khoản hệ thống</p>
				<p className="text-s text-gray-500">Đăng nhập tài khoản nội bộ để tiếp tục làm việc</p>
			</div>
			<div className="flex flex-col gap-4">
				<div className={`flex flex-col gap-2 text-blue-900 font-bold ${error?.username && "text-red-500"}`}>
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
					{error?.username && 
						(<p className="text-sm text-red-400">{error.username}</p>)
					}
				</div>

				<div className={`${error?.password && "text-red-500"} flex flex-col gap-2 text-blue-900 font-bold`}>
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
					{error?.password && 
						(<p className="text-sm text-red-400">{error.password}</p>)
					}

				</div>

				<div className={`${error?.email && "text-red-500"} flex flex-col gap-2 text-blue-900 font-bold`}>
					<label htmlFor="email">
						Địa chỉ email
					</label>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Envelope />
						<input
							id="email"
							name="email"
							type="text"
							value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Nhập email"
                            className="w-full appearance-none border-0 focus:outline-none focus:ring-0"/>
					</div>
					{error?.email && 
						(<p className="text-sm text-red-400">{error.email}</p>)
					}
				</div>

				<div className={`${error?.phone && "text-red-500"} flex flex-col gap-2 text-blue-900 font-bold`}>
					<label htmlFor="phone">
						Số điện thoại
					</label>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<Phone />
						<input
							id="phone"
							name="phone"
							type="text"
							value={phone}
                            onChange={(event) =>
                                setPhone(event.target.value)
                            }
                            placeholder="Nhập số điện thoại"
                            className="w-full appearance-none border-0 focus:outline-none focus:ring-0"/>
					</div>
					{error?.phone && 
						(<p className="text-sm text-red-400">{error.phone}</p>)
					}
				</div>

				<div className={`${error?.fullName && "text-red-500"} flex flex-col gap-2 text-blue-900 font-bold`}>
					<label htmlFor="fullName">
						Họ và tên
					</label>
					<div className="flex flex-row border rounded gap-2 !p-2">
						<ContactBook />
						<input
							id="fullName"
							name="fullName"
							type="text"
							value={fullName}
                            onChange={(event) =>
                                setFullName(event.target.value)
                            }
                            placeholder="Nhập đầy đủ họ tên"
                            className="w-full appearance-none border-0 focus:outline-none focus:ring-0"/>
					</div>
					{error?.fullName && 
						(<p className="text-sm text-red-400">{error.fullName}</p>)
					}
				</div>

			</div>

			<div className="flex gap-4 flex-col">
				<button type="submit" className="flex flex-row gap-2 !p-3 border rounded font-bold bg-blue-500 text-white justify-center cursor-pointer">
					{loading ? "Đang đăng ký..." : "Đăng ký"}
					<UserPlus />
				</button>
				<p className="text-center">------hoặc------</p>
				<Link to="/login" className="flex flex-row gap-2 !p-3 border rounded font-bold bg-green-500 text-white justify-center cursor-pointer">
					<ArrowRightStroke />
					Đăng nhập
				</Link>

			</div>
		</form>
		</>
		);
}
export default Form;