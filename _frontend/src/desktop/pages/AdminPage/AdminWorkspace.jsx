import React from "react";
import "./admin-workspace.css";
import { useAdminWorkspace } from "./useAdminWorkspace.js";
import { AdminSidebar } from "./components/AdminSidebar.jsx";
import { AdminTopbar } from "./components/AdminTopbar.jsx";
import { AdminOverviewView } from "./components/AdminOverviewView.jsx";
import { AdminModuleView } from "./components/AdminModuleView.jsx";
import { AdminReportsView } from "./components/AdminReportsView.jsx";
import { AdminModal } from "./components/AdminModal.jsx";

function AdminWorkspace({ onLogout }) {
  const {
    activeModule,
    data,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    period,
    setPeriod,
    modal,
    setModal,
    toast,
    mobileMenuOpen,
    setMobileMenuOpen,
    allAppointments,
    revenue,
    todayAppointments,
    activeDoctors,
    lowStock,
    currentModule,
    moduleRows,
    filteredRows,
    activeNavItem,
    showToast,
    navigate,
    startCreate,
    startEdit,
    saveModal,
    toggleStatus,
    startExport,
  } = useAdminWorkspace();

  const unpaidInvoicesCount = data.invoices.filter(
    (item) => item.status === "UNPAID",
  ).length;

  return (
    <div className="admin-shell">
      <AdminSidebar
        activeModule={activeModule}
        mobileMenuOpen={mobileMenuOpen}
        lowStockCount={lowStock.length}
        onNavigate={navigate}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onLogout={onLogout}
        onShowHelp={() => showToast("Trung tâm trợ giúp đang ở chế độ demo.")}
      />

      {mobileMenuOpen && (
        <button
          className="admin-mobile-scrim"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Đóng menu"
          type="button"
        />
      )}

      <main className="admin-main">
        <AdminTopbar
          activeNavItem={activeNavItem}
          lowStockCount={lowStock.length}
          onOpenMobile={() => setMobileMenuOpen(true)}
          onNotificationClick={() =>
            showToast(`${lowStock.length} thuốc cần kiểm tra tồn kho.`)
          }
          onProfileClick={() =>
            showToast("Đang sử dụng tài khoản quản trị demo.")
          }
        />

        <div className="admin-content">
          {activeModule === "overview" && (
            <AdminOverviewView
              revenue={revenue}
              todayAppointments={todayAppointments}
              activeDoctors={activeDoctors}
              totalDoctors={data.doctors.length}
              lowStockCount={lowStock.length}
              period={period}
              setPeriod={setPeriod}
              allAppointments={allAppointments}
              unpaidInvoicesCount={unpaidInvoicesCount}
              onNavigate={navigate}
              onDotsClick={() => {}}
            />
          )}

          {activeModule === "reports" && (
            <AdminReportsView
              data={data}
              allAppointments={allAppointments}
              revenue={revenue}
              period={period}
              setPeriod={setPeriod}
              onExport={startExport}
            />
          )}

          {activeModule !== "overview" && activeModule !== "reports" && (
            <AdminModuleView
              config={currentModule}
              moduleRows={moduleRows}
              filteredRows={filteredRows}
              query={query}
              setQuery={setQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onStartCreate={startCreate}
              onStartEdit={startEdit}
              onToggleStatus={toggleStatus}
            />
          )}

          <footer className="admin-footer">
            <span>© 2026 MedCare Clinic Management</span>
            <span>Dữ liệu minh họa · Chưa kết nối backend</span>
          </footer>
        </div>
      </main>

      <AdminModal modal={modal} setModal={setModal} onSave={saveModal} />

      {toast && (
        <div className="admin-toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

export default AdminWorkspace;
