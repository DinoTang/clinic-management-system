import React, { useEffect, useRef } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const hasAlertedRef = useRef(false);

  const showInfoAlert = (message) => {
    if (hasAlertedRef.current) return;
    hasAlertedRef.current = true;
    Swal.fire({
      title: 'Thông báo!',
      text: message || 'Truy cập thất bại',
      icon: 'info',
      showConfirmButton: true,
    });
  };

  useEffect(() => {
    if (!token) {
      showInfoAlert('Phiên làm việc đã hết hoặc chưa đăng nhập. Vui lòng đăng nhập lại.');
      navigate('/login', { state: { from: location }, replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isTokenExpired = decoded.exp && decoded.exp * 1000 < Date.now();

      if (isTokenExpired) {
        logout();
        showInfoAlert('Phiên làm việc đã hết hạn.');
        navigate('/login', { state: { from: location }, replace: true });
        return;
      }

      if (allowedRoles && allowedRoles.length > 0) {
        const roleKey = Object.keys(decoded).find(
          (key) => key === 'role' || key.endsWith('/role')
        );
        const userRole = roleKey ? decoded[roleKey] : undefined;

        if (!userRole || !allowedRoles.includes(userRole)) {
          showInfoAlert('Bạn không có vai trò truy cập ở khu vực này.');
          navigate('/login', { replace: true });
          return;
        }
      }

      hasAlertedRef.current = false;
    } catch {
      logout();
      showInfoAlert('Token không hợp lệ. Vui lòng đăng nhập lại.');
      navigate('/login', { replace: true });
    }
  }, [token, allowedRoles, navigate, location, logout]);

  if (!token) {
    return null;
  }

  return <Outlet />;
};
