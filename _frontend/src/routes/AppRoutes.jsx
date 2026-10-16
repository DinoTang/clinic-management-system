import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
import Decentralization from "../pages/decentralization/Decentralization.jsx";
import MStaff from "../pages/mstaff/MStaff.jsx";
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
            <Route path="/" element={<DesktopApp />} />

            <Route element={<AdminLayout />}>
                <Route path="/decentralization" element={<Decentralization />} />
                <Route path="/m-staffs" element={<MStaff />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminRoleRoutes />} />
            <Route path="/doctor/*" element={<DoctorRoleRoutes />} />
            <Route path="/staff/*" element={<StaffRoleRoutes />} />
            <Route path="/mobile/*" element={<PatientMobileApp />} />
            <Route path="/desktop/*" element={<DesktopApp />} />
            <Route path="/*" element={<PatientMobileApp />} />
        </Routes>
    );
}

export default AppRoutes;