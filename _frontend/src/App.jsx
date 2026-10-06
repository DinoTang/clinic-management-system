import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div aria-live="polite">Đang tải giao diện...</div>}>
                <AppRoutes />
            </Suspense>
        </BrowserRouter>
    );
}

export default App;