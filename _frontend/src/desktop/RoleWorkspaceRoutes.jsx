import axios from "axios";
import {
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ROLE_CONFIG } from "./roles.js";
import AdminWorkspace from "./pages/AdminPage/AdminWorkspace.jsx";
import PatientBookingPage from "./pages/BookingPage/PatientBookingPage.jsx";
import DoctorExaminationPage from "./pages/ExaminationPage/DoctorExaminationPage.jsx";
import ReceptionPage from "./pages/ReceptionPage/ReceptionPage.jsx";
import DesktopSchedulePage from "./pages/SchedulePage/DesktopSchedulePage.jsx";
import "./styles/desktop-index.css";

function RoleWorkspaceLayout({ basePath, role }) {
  const navigate = useNavigate();
  const roleConfig = ROLE_CONFIG[role];
  const logout = () => {
    sessionStorage.removeItem("clinic-staff-session");
    delete axios.defaults.headers.common.Authorization;
    navigate("/", { replace: true });
  };

  return (
    <div className="desktop-app-root">
      <nav className="desktop-workspace-nav" aria-label="Khu vực làm việc">
        <div className="desktop-workspace-links">
          {roleConfig.pages.map((page) => (
            <NavLink
              className={({ isActive }) =>
                `desktop-workspace-button${isActive ? " is-active" : ""}`
              }
              end
              key={page.id}
              to={`${basePath}/${page.id}`}
            >
              {page.label}
            </NavLink>
          ))}
        </div>
        <div className="desktop-workspace-account">
          <span className="desktop-role-label">{roleConfig.label}</span>
          <button
            className="desktop-workspace-button desktop-logout-button"
            onClick={logout}
            type="button"
          >
            Đăng xuất
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

function AdminRoleRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        index
        element={
          <AdminWorkspace
            onLogout={() => {
              sessionStorage.removeItem("clinic-staff-session");
              delete axios.defaults.headers.common.Authorization;
              navigate("/", { replace: true });
            }}
          />
        }
      />
      <Route path="*" element={<Navigate replace to="/admin" />} />
    </Routes>
  );
}

function DoctorRoleRoutes() {
  return (
    <Routes>
      <Route element={<RoleWorkspaceLayout basePath="/doctor" role="DOCTOR" />}>
        <Route index element={<Navigate replace to="schedule" />} />
        <Route path="schedule" element={<DesktopSchedulePage />} />
        <Route path="examination" element={<DoctorExaminationPage />} />
        <Route path="*" element={<Navigate replace to="/doctor/schedule" />} />
      </Route>
    </Routes>
  );
}

function StaffRoleRoutes() {
  return (
    <Routes>
      <Route element={<RoleWorkspaceLayout basePath="/staff" role="STAFF" />}>
        <Route index element={<Navigate replace to="reception" />} />
        <Route path="reception" element={<ReceptionPage />} />
        <Route path="booking" element={<PatientBookingPage />} />
        <Route path="*" element={<Navigate replace to="/staff/reception" />} />
      </Route>
    </Routes>
  );
}

export { AdminRoleRoutes, DoctorRoleRoutes, StaffRoleRoutes };
