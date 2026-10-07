import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Login from "../pages/login/Login.jsx";

const PatientMobileApp = lazy(() =>
    import("../mobile/PatientMobileApp.jsx")
);

const DesktopApp = lazy(() =>
    import("../desktop/DesktopApp.jsx")
);

function AppRoutes() {
    return (
        <Routes>
            <Route path="/desktop/*" element={<DesktopApp />} />
            <Route path="/*" element={<PatientMobileApp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;