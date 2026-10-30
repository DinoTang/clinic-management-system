import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import LoginPage from "../pages/login/Login.jsx";
import AdminPage from "../pages/admin/Admin.jsx";
import AccountPage from "../pages/account/Account";
import PatientPage from "../pages/patient/Patient";
import DoctorPage from "../pages/doctor/Doctor";
import GoogleCallback from "../pages/callback/GoogleCallback";
import AdminLayout from "../layouts/AdminLayout.jsx";
import {
    AdminRoleRoutes,
    DoctorRoleRoutes,
    StaffRoleRoutes,
} from "../desktop/RoleWorkspaceRoutes.jsx";

const PatientMobileApp = lazy(() =>
    import("../mobile/PatientMobileApp.jsx")
);

const DesktopApp = lazy(() =>
    import("../desktop/DesktopApp.jsx")
);

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/oauth/callback" element={<GoogleCallback />} />

            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/admin/accounts" element={<AccountPage/>} />
                <Route path="/admin/patients" element={<PatientPage/>} />
                <Route path="/admin/doctors" element={<DoctorPage/>} />
            </Route>

            <Route path="/a" element={<AdminRoleRoutes />} />            
            <Route path="/doctor" element={<DoctorRoleRoutes />} />
            <Route path="/staff" element={<StaffRoleRoutes />} />

            <Route path="/mobile/*" element={<PatientMobileApp />} />
            <Route path="/desktop/*" element={<DesktopApp />} />
            <Route path="/*" element={<PatientMobileApp />} />
        </Routes>
    );
}

export default AppRoutes;