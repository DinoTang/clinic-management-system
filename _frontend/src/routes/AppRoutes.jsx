import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
import Decentralization from "../pages/decentralization/Decentralization.jsx";
import MStaff from "../pages/mstaff/MStaff.jsx";
import Home from "../pages/home/Home.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

const PatientMobileApp = lazy(() =>
    import("../mobile/PatientMobileApp.jsx")
);

const DesktopApp = lazy(() =>
    import("../desktop/DesktopApp.jsx")
);

function AppRoutes() {
    return (
        <Routes>
            
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
            </Route>

            <Route element={<AdminLayout />}>
                <Route path="/decentralization" element={<Decentralization />} />
                <Route path="/m-staffs" element={<MStaff />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/desktop/*" element={<DesktopApp />} />
            <Route path="/*" element={<PatientMobileApp />} />
        </Routes>
    );
}

export default AppRoutes;