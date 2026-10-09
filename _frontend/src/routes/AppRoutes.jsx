import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
import Home from "../pages/home/Home.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

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

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/desktop/*" element={<DesktopApp />} />
            <Route path="/*" element={<PatientMobileApp />} />
        </Routes>
    );
}

export default AppRoutes;