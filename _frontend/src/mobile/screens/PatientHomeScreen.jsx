import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Avatar from "../components/Avatar";
import { getAppointments } from "../services/patientApi";

const terminalStatuses = [
  "HoanTat",
  "DaHuy",
  "COMPLETED",
  "CANCELLED",
  "REJECTED",
  "NO_SHOW",
];

const upcomingStatusLabels = {
  DaDat: "Đã đặt lịch",
  DaDen: "Đã tiếp đón",
  HoanTat: "Hoàn tất khám",
  DaHuy: "Đã hủy",
};

function hhmm(value) {
  return value ? String(value).slice(0, 5) : "";
}

const quickLinks = [
  { id: "prescription", label: "Đơn thuốc", icon: "pill", tone: "purple" },
  { id: "invoices", label: "Hóa đơn", icon: "invoice", tone: "orange" },
  { id: "profile", label: "Thông tin cá nhân", icon: "shield", tone: "teal" },
];

function PatientHomeScreen({ onNavigate, Icon, doctorGender = "MALE", patientId }) {
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(!!patientId);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    getAppointments(patientId)
      .then((data) => {
        if (cancelled) return;
        const now = new Date();
        const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 10);
        const upcoming = data
          .filter(
            (appointment) =>
              !terminalStatuses.includes(appointment.status) &&
              appointment.date >= today,
          )
          .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
        setNextAppointment(upcoming[0] || null);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setNextAppointment(null);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [patientId]);

  let dateTile = null;
  if (nextAppointment) {
    const date = new Date(`${nextAppointment.date}T00:00:00`);
    const weekday = new Intl.DateTimeFormat("vi-VN", { weekday: "long" })
      .format(date)
      .replace(/^./, (char) => char.toUpperCase());
    dateTile = {
      weekday,
      day: date.getDate(),
      monthYear: `Th${date.getMonth() + 1} ${date.getFullYear()}`,
    };
  }

  return (
    <div className="dashboard-page">
      <section className="welcome-banner">
        <div className="welcome-copy">
          <h2>Chăm sóc sức khỏe là ưu tiên hàng đầu</h2>
          <p>Đặt lịch khám dễ dàng, nhận kết quả nhanh chóng</p>
        </div>
      </section>

      <section className="primary-actions" aria-label="Thao tác nhanh">
        <button
          className="primary-action appointment-action"
          onClick={() => onNavigate("appointments")}
          type="button"
        >
          <span className="action-icon">
            <Icon name="calendar" size={28} />
          </span>
          <span>Đặt lịch khám</span>
          <Icon name="chevron" size={22} />
        </button>
        <button
          className="primary-action record-action"
          onClick={() => onNavigate("records")}
          type="button"
        >
          <span className="action-icon">
            <Icon name="records" size={28} />
          </span>
          <span>Hồ sơ bệnh án</span>
          <Icon name="chevron" size={22} />
        </button>
      </section>

      <section className="upcoming-section">
        <div className="section-heading">
          <h2>Lịch hẹn sắp tới</h2>
          <button
            className="text-link"
            onClick={() => onNavigate("appointments")}
            type="button"
          >
            Xem tất cả <Icon name="chevron" size={18} />
          </button>
        </div>

        {loading ? (
          <p className="workspace-note">Đang tải lịch hẹn...</p>
        ) : nextAppointment ? (
          <div className="upcoming-card-wrapper">
            <button
              className="upcoming-card"
              onClick={() => onNavigate("appointments")}
              type="button"
            >
              <span className="date-tile">
                <span>{dateTile.weekday}</span>
                <strong>{dateTile.day}</strong>
                <span>{dateTile.monthYear}</span>
              </span>
              <span className="appointment-info">
                <span className="doctor-line">
                  <span className="doctor-avatar">
                    <Avatar gender={doctorGender} type="doctor" />
                  </span>
                  <span className="doctor-copy">
                    <strong>{nextAppointment.doctorName || "BS. Chưa cập nhật"}</strong>
                    <span>{nextAppointment.specialtyName || "Chuyên khoa khám"}</span>
                  </span>
                  <span className="appointment-status status-active">
                    {upcomingStatusLabels[nextAppointment.status] || nextAppointment.status}
                  </span>
                </span>
                <span className="appointment-detail">
                  <Icon name="clock" size={19} />
                  <span>
                    {hhmm(nextAppointment.time)}
                    {nextAppointment.endTime ? ` - ${hhmm(nextAppointment.endTime)}` : ""}
                  </span>
                </span>
                {nextAppointment.roomName && (
                  <span className="appointment-detail">
                    <Icon name="pin" size={19} />
                    <span>{nextAppointment.roomName}</span>
                  </span>
                )}
              </span>
              <span className="card-chevron">
                <Icon name="chevron" size={21} />
              </span>
            </button>
            <button
              className="qr-show-button"
              onClick={() => setShowQr(true)}
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/>
                <rect x="19" y="14" width="2" height="2"/><rect x="14" y="19" width="2" height="2"/>
                <rect x="18" y="18" width="3" height="3"/>
              </svg>
              Hiện mã QR để check-in
            </button>
          </div>
        ) : (
          <p className="workspace-note">
            Bạn chưa có lịch hẹn sắp tới. Bấm “Đặt lịch khám” để tạo lịch mới.
          </p>
        )}
      </section>

      <section className="quick-section">
        <div className="section-heading">
          <h2>Tiện ích nhanh</h2>
        </div>
        <div className="quick-links">
          {quickLinks.map((link) => (
            <button
              className="quick-link"
              key={link.id}
              onClick={() => onNavigate(link.id)}
              type="button"
            >
              <span className={`quick-link-icon ${link.tone}`}>
                <Icon name={link.icon} size={29} />
              </span>
              <span className="quick-link-label">{link.label}</span>
              <Icon name="chevron" size={18} />
            </button>
          ))}
        </div>
      </section>

      {showQr && nextAppointment && (
        <div className="qr-modal-backdrop" onClick={() => setShowQr(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qr-modal-header">
              <strong>Mã QR lịch hẹn</strong>
              <button className="qr-modal-close" onClick={() => setShowQr(false)} type="button" aria-label="Đóng">&#x2715;</button>
            </div>
            <div className="qr-modal-body">
              <QRCodeSVG
                value={nextAppointment.id}
                size={200}
                bgColor="#ffffff"
                fgColor="#123b62"
                level="M"
                style={{ display: "block", margin: "0 auto" }}
              />
              <p className="qr-appointment-id">{nextAppointment.id}</p>
              <p className="qr-hint">
                Đưa mã này cho nhân viên lễ tân quét để check-in
              </p>
            </div>
          </div>
        </div>
      )}
      <button
        className="health-reminder"
        onClick={() => onNavigate("appointments")}
        type="button"
      >
        <span className="reminder-icon">
          <Icon name="heart" size={36} />
        </span>
        <span className="reminder-copy">
          <strong>Vì một sức khỏe tốt hơn</strong>
          <span>Đừng quên tái khám theo lịch hẹn của bác sĩ.</span>
        </span>
        <Icon name="chevron" size={21} />
      </button>
    </div>
  );
}

export default PatientHomeScreen;
