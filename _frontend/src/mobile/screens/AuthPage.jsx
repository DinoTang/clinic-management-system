import { useState } from "react";
import appIcon from "../../assets/Icon App.png";
import "./AuthPage.css";

const initialRegistration = {
  fullName: "",
  birthDate: "",
  gender: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function AuthIcon({ name, size = 22 }) {
  const icons = {
    back: <path d="m15 18-6-6 6-6" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    gender: (
      <>
        <circle cx="9" cy="15" r="5" />
        <path d="M13 11l7-7m-5 0h5v5M9 20v4m-2-2h4" />
      </>
    ),
    phone: (
      <path d="M7 3H5a2 2 0 0 0-2 2c0 8.84 7.16 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 3a14 14 0 0 1-6-6l3-2-2-5Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </>
    ),
    personAdd: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21v-2a7 7 0 0 1 14 0v2m4-11v6m-3-3h6" />
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
      {icons[name]}
    </svg>
  );
}

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [registration, setRegistration] = useState(initialRegistration);

  const isRegistering = mode === "register";

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      isRegistering &&
      registration.password !== registration.confirmPassword
    ) {
      setMessage("Mật khẩu xác nhận chưa khớp.");
      return;
    }

    setMessage(
      isRegistering
        ? "Giao diện đăng ký đã sẵn sàng; API đăng ký chưa được kết nối."
        : "Giao diện đăng nhập đã sẵn sàng; API đăng nhập chưa được kết nối.",
    );
  };

  const updateRegistration = (field) => (event) => {
    setRegistration((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setMessage("");
  };

  const renderField = ({
    name,
    placeholder,
    type = "text",
    icon,
    autoComplete,
    trailing,
    ...inputProps
  }) => (
    <label className="auth-field" key={name}>
      <span className="auth-field-icon">
        <AuthIcon name={icon} />
      </span>
      <input
        autoComplete={autoComplete}
        name={name}
        placeholder={placeholder}
        type={type}
        {...inputProps}
      />
      {trailing}
    </label>
  );

  const passwordField = (name, placeholder, autoComplete) =>
    renderField({
      name,
      placeholder,
      icon: "lock",
      type: showPassword ? "text" : "password",
      autoComplete,
      minLength: 8,
      maxLength: 20,
      required: true,
      trailing: (
        <button
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          className="auth-password-toggle"
          onClick={() => setShowPassword((visible) => !visible)}
          type="button"
        >
          <AuthIcon name="eye" size={21} />
        </button>
      ),
    });

  return (
    <main className={`auth-page${isRegistering ? " is-registering" : ""}`}>
      <div className="auth-content">
        {isRegistering && (
          <button
            aria-label="Quay lại đăng nhập"
            className="auth-back"
            onClick={() => switchMode("login")}
            type="button"
          >
            <AuthIcon name="back" size={25} />
          </button>
        )}

        <div className="auth-brand-icon">
          <img src={appIcon} alt="Biểu tượng phòng khám" />
        </div>

        <header className="auth-heading">
          <h1>{isRegistering ? "Tạo tài khoản mới" : "Chào mừng bạn!"}</h1>
          <p>
            {isRegistering
              ? "Vui lòng điền thông tin để đăng ký tài khoản và sử dụng dịch vụ khám chữa bệnh"
              : "Đăng nhập để tiếp tục sử dụng dịch vụ khám chữa bệnh"}
          </p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering ? (
            <>
              {renderField({
                name: "fullName",
                placeholder: "Họ và tên",
                icon: "user",
                autoComplete: "name",
                value: registration.fullName,
                onChange: updateRegistration("fullName"),
                required: true,
                minLength: 5,
                maxLength: 50,
              })}
              {renderField({
                name: "birthDate",
                placeholder: "Ngày sinh",
                type: "date",
                icon: "calendar",
                autoComplete: "bday",
                value: registration.birthDate,
                onChange: updateRegistration("birthDate"),
                required: true,
              })}
              <label className="auth-field">
                <span className="auth-field-icon">
                  <AuthIcon name="gender" />
                </span>
                <select
                  autoComplete="sex"
                  name="gender"
                  value={registration.gender}
                  onChange={updateRegistration("gender")}
                  required
                >
                  <option value="" disabled>
                    Giới tính
                  </option>
                  <option value="female">Nữ</option>
                  <option value="male">Nam</option>
                  <option value="other">Khác</option>
                </select>
                <span className="auth-select-chevron" />
              </label>
              {renderField({
                name: "phone",
                placeholder: "Số điện thoại",
                type: "tel",
                icon: "phone",
                autoComplete: "tel",
                value: registration.phone,
                onChange: updateRegistration("phone"),
                required: true,
                pattern: "0[0-9]{9}",
                maxLength: 10,
              })}
              {renderField({
                name: "email",
                placeholder: "Email",
                type: "email",
                icon: "mail",
                autoComplete: "email",
                value: registration.email,
                onChange: updateRegistration("email"),
                required: true,
              })}
              {passwordField("password", "Mật khẩu", "new-password")}
              {passwordField(
                "confirmPassword",
                "Xác nhận mật khẩu",
                "new-password",
              )}
            </>
          ) : (
            <>
              {renderField({
                name: "phone",
                placeholder: "Số điện thoại",
                type: "tel",
                icon: "phone",
                autoComplete: "tel",
                required: true,
                pattern: "0[0-9]{9}",
                maxLength: 10,
              })}
              {passwordField("password", "Mật khẩu", "current-password")}
              <div className="auth-options">
                <label className="auth-remember">
                  <input
                    checked={rememberLogin}
                    onChange={(event) =>
                      setRememberLogin(event.target.checked)
                    }
                    type="checkbox"
                  />
                  <span>Lưu thông tin đăng nhập</span>
                </label>
                <button
                  className="auth-text-button"
                  onClick={() =>
                    setMessage("Vui lòng liên hệ phòng khám để đặt lại mật khẩu.")
                  }
                  type="button"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </>
          )}

          {message && (
            <p className="auth-message" aria-live="polite" role="status">
              {message}
            </p>
          )}

          <button className="auth-submit" type="submit">
            <span>{isRegistering ? "Đăng ký" : "Đăng nhập"}</span>
            <AuthIcon name="arrow" size={25} />
          </button>
        </form>

        <div className="auth-divider">
          <span />
          <span>Hoặc</span>
          <span />
        </div>

        {isRegistering ? (
          <p className="auth-switch-copy">
            Đã có tài khoản?{" "}
            <button
              className="auth-text-button"
              onClick={() => switchMode("login")}
              type="button"
            >
              Đăng nhập
            </button>
          </p>
        ) : (
          <button
            className="auth-register-button"
            onClick={() => switchMode("register")}
            type="button"
          >
            <AuthIcon name="personAdd" size={23} />
            <span>Đăng ký tài khoản</span>
          </button>
        )}
      </div>
    </main>
  );
}

export default AuthPage;
