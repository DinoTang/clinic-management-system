import React from "react";
import { StaffLoginIcon } from "./StaffLoginIcon.jsx";

export function StaffCredentialsForm({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  onTogglePassword,
  onForgotPassword,
  message,
  isSubmitting,
  onSubmit,
}) {
  return (
    <form className="staff-login-form" onSubmit={onSubmit}>
      <label className="staff-input-label" htmlFor="staff-username">
        Tên đăng nhập
      </label>
      <div className="staff-input-wrap">
        <span className="staff-input-icon">
          <StaffLoginIcon name="user" />
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
          onClick={onForgotPassword}
          type="button"
        >
          Quên mật khẩu?
        </button>
      </div>
      <div className="staff-input-wrap">
        <span className="staff-input-icon">
          <StaffLoginIcon name="lock" />
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
          onClick={onTogglePassword}
          type="button"
        >
          <StaffLoginIcon name={showPassword ? "eyeOff" : "eye"} size={20} />
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
        {!isSubmitting && <StaffLoginIcon name="arrow" size={20} />}
      </button>
    </form>
  );
}
