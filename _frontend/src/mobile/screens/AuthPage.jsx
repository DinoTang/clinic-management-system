import axios from "axios";
import { useRef, useState } from "react";
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

function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [registration, setRegistration] = useState(initialRegistration);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginCredentialsInvalid, setLoginCredentialsInvalid] = useState(false);
  const [showForgotPasswordHelp, setShowForgotPasswordHelp] = useState(false);
  const phoneInputRef = useRef(null);

  const isRegistering = mode === "register";

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setLoginCredentialsInvalid(false);
    setShowForgotPasswordHelp(false);
    setShowPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (
      isRegistering &&
      registration.password !== registration.confirmPassword
    ) {
      setMessage("Mật khẩu xác nhận chưa khớp.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isRegistering) {
        await axios.post("http://localhost:8080/api/auth/patient/register", {
          fullName: registration.fullName,
          birthDate: registration.birthDate,
          gender: registration.gender,
          phone: registration.phone,
          email: registration.email,
          password: registration.password,
        });

        setLoginPhone(registration.phone);
        setMode("login");
        setMessage("Đăng ký thành công. Hãy nhập mật khẩu để đăng nhập.");
      } else {
        const { data } = await axios.post(
          "http://localhost:8080/api/auth/patient/login",
          {
            phone: loginPhone,
            password: loginPassword,
          },
        );

        const patient = {
          fullName: data.user.fullName,
          role: data.user.role,
        };
        const session = JSON.stringify({ token: data.token, patient });

        if (rememberLogin) {
          localStorage.setItem("clinic-patient-session", session);
          sessionStorage.removeItem("clinic-patient-session");
        } else {
          sessionStorage.setItem("clinic-patient-session", session);
          localStorage.removeItem("clinic-patient-session");
        }

        onLoginSuccess(patient);
      }
    } catch (error) {
      const responseData = error.response?.data;
      const responseMessage =
        responseData?.message ||
        responseData?.detail ||
        (Array.isArray(responseData?.errors)
          ? responseData.errors.map((item) => item.defaultMessage).join(" ")
          : null);

      if (
        !isRegistering &&
        error.response &&
        (error.response.status === 401 ||
          error.response.status === 403 ||
          (typeof responseMessage === "string" &&
            responseMessage.toLocaleLowerCase("vi").includes("số điện thoại hoặc mật khẩu")))
      ) {
        setLoginCredentialsInvalid(true);
        setMessage("Số điện thoại hoặc mật khẩu không chính xác.");
        requestAnimationFrame(() => phoneInputRef.current?.focus());
        return;
      }

      setMessage(
        typeof responseMessage === "string" && responseMessage
          ? responseMessage
          : isRegistering
            ? "Không thể đăng ký. Hãy kiểm tra thông tin và đảm bảo backend đang chạy."
            : "Không thể đăng nhập. Hãy kiểm tra số điện thoại, mật khẩu và backend.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
    invalid = false,
    inputRef,
    ...inputProps
  }) => (
  <label
    className={`auth-field${invalid ? " auth-field-invalid" : ""}`}
    key={name}
  >
    <span className="auth-field-icon">
      <AuthIcon name={icon} />
    </span>
    <input
      aria-invalid={invalid || undefined}
      autoComplete={autoComplete}
      name={name}
      placeholder={placeholder}
      ref={inputRef}
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
      value: isRegistering
        ? registration[name]
        : name === "password"
          ? loginPassword
          : undefined,
      onChange: isRegistering
        ? updateRegistration(name)
        : name === "password"
          ? (event) => {
              setLoginPassword(event.target.value);
              setLoginCredentialsInvalid(false);
              setMessage("");
            }
          : undefined,
      invalid: !isRegistering && loginCredentialsInvalid,
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
                inputRef: phoneInputRef,
                invalid: loginCredentialsInvalid,
                value: loginPhone,
                onChange: (event) => {
                  setLoginPhone(event.target.value);
                  setLoginCredentialsInvalid(false);
                  setMessage("");
                },
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
                  onClick={() => {
                    setShowForgotPasswordHelp((visible) => !visible);
                    setMessage("");
                  }}
                  type="button"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </>
          )}

          {message && (
            <p
              className={`auth-message${loginCredentialsInvalid ? " auth-message-error" : ""}`}
              aria-live="polite"
              role={loginCredentialsInvalid ? "alert" : "status"}
            >
              {message}
            </p>
          )}

          {showForgotPasswordHelp && !isRegistering && (
            <p className="auth-forgot-help" role="status">
              Vui lòng liên hệ phòng khám trực tuyến hay gọi về số hotline để
              đặt lại mật khẩu.
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting
                ? "Đang xử lý..."
                : isRegistering
                  ? "Đăng ký"
                  : "Đăng nhập"}
            </span>
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
        <footer className="auth-footer">
          <p>
            Hotline <strong>1900xxxx</strong>
          </p>
        </footer>
      </div>
    </main>
  );
}

export default AuthPage;
