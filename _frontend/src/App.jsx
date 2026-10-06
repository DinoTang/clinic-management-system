import { lazy, Suspense, useEffect } from "react";

const PatientMobileApp = lazy(() => import("./mobile/PatientMobileApp.jsx"));
const DesktopApp = lazy(() => import("./desktop/DesktopApp.jsx"));

function App() {
  const query = new URLSearchParams(window.location.search);
  const isDesktop = query.get("app") === "desktop" ||
    window.location.pathname.startsWith("/desktop") ||
    query.get("desktop") === "1";

  useEffect(() => {
    document.documentElement.classList.toggle("desktop-mode", isDesktop);
    document.body.classList.toggle("desktop-mode", isDesktop);

    return () => {
      document.documentElement.classList.remove("desktop-mode");
      document.body.classList.remove("desktop-mode");
    };
  }, [isDesktop]);

  const CurrentApp = isDesktop ? DesktopApp : PatientMobileApp;

  return (
    <Suspense fallback={<div aria-live="polite">Đang tải giao diện...</div>}>
      <CurrentApp />
    </Suspense>
  );
}

export default App;
