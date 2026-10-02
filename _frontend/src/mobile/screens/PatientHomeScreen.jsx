import Avatar from "../components/Avatar";

const quickLinks = [
  { id: "prescription", label: "Đơn thuốc", icon: "pill", tone: "purple" },
  { id: "invoices", label: "Hóa đơn", icon: "invoice", tone: "orange" },
  { id: "profile", label: "Thông tin cá nhân", icon: "shield", tone: "teal" },
];

function PatientHomeScreen({ onNavigate, Icon, doctorGender = "MALE" }) {
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

        <button
          className="upcoming-card"
          onClick={() => onNavigate("appointments")}
          type="button"
        >
          <span className="date-tile">
            <span>Thứ 4</span>
            <strong>14</strong>
            <span>Th10 2026</span>
          </span>
          <span className="appointment-info">
            <span className="doctor-line">
              <span className="doctor-avatar">
                <Avatar gender={doctorGender} type="doctor" />
              </span>
              <span className="doctor-copy">
                <strong>BS. Trần Minh Tuấn</strong>
                <span>Nội khoa</span>
              </span>
              <span className="appointment-status status-active">
                Đã xác nhận
              </span>
            </span>
            <span className="appointment-detail">
              <Icon name="clock" size={19} />
              <span>09:30 - 10:00</span>
            </span>
            <span className="appointment-detail">
              <Icon name="pin" size={19} />
              <span>Phòng khám 1</span>
            </span>
          </span>
          <span className="card-chevron">
            <Icon name="chevron" size={21} />
          </span>
        </button>
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
