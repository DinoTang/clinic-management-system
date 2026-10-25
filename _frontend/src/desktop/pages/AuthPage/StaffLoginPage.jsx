import axios from "axios";
import { useState } from "react";
import appIcon from "../../../assets/IconApp.png";
import { normalizeRole } from "../../roles.js";
import "./staff-login.css";

function Icon({ name, size = 22 }) {
  const paths = {
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a15.8 15.8 0 0 1-3.1 3.8M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7a9.9 9.9 0 0 0 3-.5" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    doctor: (
      <>
        <path d="M12 3v5m-4-5h8" />
        <circle cx="12" cy="14" r="7" />
        <path d="M9 14h6m-3-3v6" />
      </>
    ),
    staff: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20v-1.5a6.5 6.5 0 0 1 13 0V20z" />
        <path d="M16 5a3.5 3.5 0 0 1 0 6.8M18 14a6.3 6.3 0 0 1 3.5 5.7" />
      </>
    ),
    admin: (
      <>
        <path d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function StaffLoginPage({ onLoginSuccess, demoLogin = false }) {
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
      const { data } = await axios.post(
        "/api/auth/login",
        { username, password },
      );
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

  return (
    <main className="staff-login-page">
      <div className="staff-login-shell">
        <section className="staff-login-brand" aria-label="Giới thiệu hệ thống">
          <div className="staff-brand-heading">
            <span className="staff-brand-icon">
              <img src={appIcon} alt="" />
            </span>
            <span className="staff-brand-name">Hệ thống quản lý phòng khám</span>
          </div>

          <div className="staff-brand-copy">
            <span className="staff-brand-eyebrow">CỔNG THÔNG TIN NỘI BỘ</span>
            <h1>Chăm sóc tốt hơn, cùng nhau.</h1>
            <p>
              Không gian làm việc dành riêng cho đội ngũ y tế, kết nối tận tâm
              trong từng bước chăm sóc sức khỏe.
            </p>
          </div>

          <div className="staff-brand-footnote">
            <span className="staff-brand-shield">
              <Icon name="shield" size={19} />
            </span>
            <span>Truy cập dành cho đội ngũ y tế</span>
          </div>
        </section>

        <section className="staff-login-form-panel">
          <div className="staff-login-form-content">
            <div className="staff-mobile-brand">
              <span className="staff-brand-icon">
                <img src={appIcon} alt="" />
              </span>
              <span>Hệ thống quản lý phòng khám</span>
            </div>

            <div className="staff-login-heading">
              <span className="staff-login-kicker">XIN CHÀO</span>
              <h2>
                {demoLogin && !showDatabaseLogin
                  ? "Chọn khu vực làm việc"
                  : "Đăng nhập hệ thống"}
              </h2>
              <p>
                {demoLogin && !showDatabaseLogin
                  ? "Chọn vai trò để vào giao diện tương ứng."
                  : "Sử dụng tài khoản nội bộ để tiếp tục làm việc."}
              </p>
            </div>

            {demoLogin && !showDatabaseLogin ? (
              <div className="staff-demo-roles">
                <button
                  className="staff-demo-role"
                  onClick={() =>
                    onLoginSuccess({ mode: "demo", role: "DOCTOR", doctorId: "BS001" })
                  }
                  type="button"
                >
                  <span className="staff-demo-role-icon">
                    <Icon name="doctor" size={25} />
                  </span>
                  <span className="staff-demo-role-copy">
                    <strong>Bác sĩ</strong>
                    <span>Khám bệnh và kê đơn</span>
                  </span>
                  <Icon name="arrow" size={20} />
                </button>
                <button
                  className="staff-demo-role"
                  onClick={() =>
                    onLoginSuccess({ mode: "demo", role: "STAFF", staffId: "NV001" })
                  }
                  type="button"
                >
                  <span className="staff-demo-role-icon">
                    <Icon name="staff" size={25} />
                  </span>
                  <span className="staff-demo-role-copy">
                    <strong>Nhân viên</strong>
                    <span>Tiếp đón và thu viện phí</span>
                  </span>
                  <Icon name="arrow" size={20} />
                </button>
                <button
                  className="staff-demo-role"
                  onClick={() =>
                    onLoginSuccess({ mode: "demo", role: "ADMIN" })
                  }
                  type="button"
                >
                  <span className="staff-demo-role-icon">
                    <Icon name="admin" size={25} />
                  </span>
                  <span className="staff-demo-role-copy">
                    <strong>Quản trị viên</strong>
                    <span>Quản lý và theo dõi toàn hệ thống</span>
                  </span>
                  <Icon name="arrow" size={20} />
                </button>
              </div>
            ) : (
              <form className="staff-login-form" onSubmit={handleSubmit}>
                <label className="staff-input-label" htmlFor="staff-username">
                  Tên đăng nhập
                </label>
                <div className="staff-input-wrap">
                  <span className="staff-input-icon">
                    <Icon name="user" />
                  </span>
                  <input
                    autoComplete="username"
                    id="staff-username"
                    maxLength={20}
                    minLength={5}
                    name="username"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    required
                    value={username}
                  />
                </div>

                <div className="staff-password-label-row">
                  <label className="staff-input-label" htmlFor="staff-password">
                    Mật khẩu
                  </label>
                  <button
                    className="staff-forgot-button"
                    onClick={() =>
                      setMessage(
                        "Vui lòng liên hệ quản trị viên để được hỗ trợ đặt lại mật khẩu.",
                      )
                    }
                    type="button"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="staff-input-wrap">
                  <span className="staff-input-icon">
                    <Icon name="lock" />
                  </span>
                  <input
                    autoComplete="current-password"
                    id="staff-password"
                    maxLength={20}
                    minLength={8}
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    aria-pressed={showPassword}
                    className="staff-password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    <Icon name={showPassword ? "eyeOff" : "eye"} size={20} />
                  </button>
                </div>

                {message && (
                  <p className="staff-login-message" role="alert">
                    {message}
                  </p>
                )}

                <button
                  className="staff-login-submit"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <span>{isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}</span>
                  {!isSubmitting && <Icon name="arrow" size={20} />}
                </button>
              </form>
            )}

            {demoLogin && (
              <button
                className="staff-login-mode-toggle"
                onClick={() => {
                  setMessage("");
                  setShowDatabaseLogin((show) => !show);
                }}
                type="button"
              >
                {showDatabaseLogin
                  ? "Quay lại đăng nhập tạm"
                  : "Đăng nhập bằng tài khoản thật"}
              </button>
            )}

            <p className="staff-login-note">
              <Icon name="shield" size={17} />
              <span>Hệ thống dành cho đội ngũ y tế</span>
            </p>
            {demoLogin && !showDatabaseLogin && (
              <p className="staff-demo-notice">
                Đăng nhập tạm chỉ mở giao diện theo vai trò. Các màn bác sĩ và
                nhân viên vẫn gọi backend; workspace Admin dùng dữ liệu mẫu và
                chưa lưu vào database.
              </p>
            )}
            {!demoLogin && (
              <p className="staff-account-note">
                Tài khoản được cấp bởi quản trị viên. Không hỗ trợ đăng ký công
                khai.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default StaffLoginPage;
