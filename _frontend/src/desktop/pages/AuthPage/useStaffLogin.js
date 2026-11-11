import axios from "axios";
import { useState } from "react";
import { normalizeRole } from "../../roles.js";

export function useStaffLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDatabaseLogin, setShowDatabaseLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const role = normalizeRole(data?.user?.role);

      if (!data?.token || !role) {
        setMessage(
          "Tài khoản này không có quyền truy cập hệ thống nhân viên y tế.",
        );
        return;
      }

      onLoginSuccess({
        mode: "database",
        token: data.token,
        role,
        user: { ...data.user, doctorId: data.doctorId, staffId: data.staffId },
        doctorId: data.doctorId,
        staffId: data.staffId,
      });
    } catch (error) {
      const serverMessage =
        error.response?.data?.message || error.response?.data?.error;
      setMessage(
        typeof serverMessage === "string"
          ? serverMessage
          : "Không thể đăng nhập. Vui lòng kiểm tra thông tin hoặc thử lại sau.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setMessage("Vui lòng liên hệ quản trị viên để được hỗ trợ đặt lại mật khẩu.");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((visible) => !visible);
  };

  const toggleDatabaseLogin = () => {
    setMessage("");
    setShowDatabaseLogin((show) => !show);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    showDatabaseLogin,
    toggleDatabaseLogin,
    message,
    isSubmitting,
    handleSubmit,
    handleForgotPassword,
  };
}
