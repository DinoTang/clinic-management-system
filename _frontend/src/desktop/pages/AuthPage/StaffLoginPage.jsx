import React from "react";
import appIcon from "../../../assets/IconApp.png";
import "./staff-login.css";
import { useStaffLogin } from "./useStaffLogin.js";
import { StaffLoginIcon } from "./components/StaffLoginIcon.jsx";
import { StaffLoginBrandSection } from "./components/StaffLoginBrandSection.jsx";
import { StaffDemoRolesSection } from "./components/StaffDemoRolesSection.jsx";
import { StaffCredentialsForm } from "./components/StaffCredentialsForm.jsx";

function StaffLoginPage({ onLoginSuccess, demoLogin = false }) {
  const {
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
  } = useStaffLogin({ onLoginSuccess });

  const isDemoRoleMode = demoLogin && !showDatabaseLogin;

  return (
    <main className="staff-login-page">
      <div className="staff-login-shell">
        <StaffLoginBrandSection />

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
                {isDemoRoleMode
                  ? "Chọn khu vực làm việc"
                  : "Đăng nhập hệ thống"}
              </h2>
              <p>
                {isDemoRoleMode
                  ? "Chọn vai trò để vào giao diện tương ứng."
                  : "Sử dụng tài khoản nội bộ để tiếp tục làm việc."}
              </p>
            </div>

            {isDemoRoleMode ? (
              <StaffDemoRolesSection onSelectRole={onLoginSuccess} />
            ) : (
              <StaffCredentialsForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                onTogglePassword={togglePasswordVisibility}
                onForgotPassword={handleForgotPassword}
                message={message}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />
            )}

            {demoLogin && (
              <button
                className="staff-login-mode-toggle"
                onClick={toggleDatabaseLogin}
                type="button"
              >
                {showDatabaseLogin
                  ? "Quay lại đăng nhập tạm"
                  : "Đăng nhập bằng tài khoản thật"}
              </button>
            )}

            <p className="staff-login-note">
              <StaffLoginIcon name="shield" size={17} />
              <span>Hệ thống dành cho đội ngũ y tế</span>
            </p>

            {isDemoRoleMode && (
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
