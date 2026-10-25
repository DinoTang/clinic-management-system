import { useEffect, useState } from "react";
import PatientBookingPage from "../../desktop/pages/BookingPage/PatientBookingPage.jsx";
import {
  cancelAppointment,
  errorMessage,
  getAppointments,
  getMedicalRecords,
  getProfile,
  updateProfile,
} from "../services/patientApi";
import "../PatientWorkspace.css";

const specialties = [
  "Nội khoa",
  "Nhi khoa",
  "Tai Mũi Họng",
  "Da liễu",
  "Tim mạch",
];

const doctorsBySpecialty = {
  "Nội khoa": ["BS. Trần Minh Tuấn", "BS. Nguyễn Thu Hà"],
  "Nhi khoa": ["BS. Lê Ngọc Mai", "BS. Phạm Hoàng Long"],
  "Tai Mũi Họng": ["BS. Võ Minh Khang"],
  "Da liễu": ["BS. Nguyễn Thảo Vy"],
  "Tim mạch": ["BS. Phan Quốc Bảo"],
};

const demoSchedules = [
  { id: "CA001", startTime: "08:00", endTime: "08:30", roomId: "PK01", maxPatients: 8 },
  { id: "CA002", startTime: "08:30", endTime: "09:00", roomId: "PK01", maxPatients: 8 },
  { id: "CA003", startTime: "09:00", endTime: "09:30", roomId: "PK02", maxPatients: 6 },
  { id: "CA004", startTime: "09:30", endTime: "10:00", roomId: "PK02", maxPatients: 6 },
  { id: "CA005", startTime: "14:00", endTime: "14:30", roomId: "PK03", maxPatients: 8 },
  { id: "CA006", startTime: "14:30", endTime: "15:00", roomId: "PK03", maxPatients: 8 },
];

const statusLabels = {
  DaDat: "Đã đặt lịch",
  DaDen: "Đã tiếp đón",
  HoanTat: "Hoàn tất khám",
  DaHuy: "Đã hủy",
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  CHECKED_IN: "Đã đến khám",
  IN_PROGRESS: "Đang khám",
  COMPLETED: "Đã hoàn tất",
  REJECTED: "Đã từ chối",
  CANCELLED: "Đã hủy",
  NO_SHOW: "Không đến",
};

const statusClasses = {
  DaDat: "pending",
  DaDen: "checked_in",
  HoanTat: "completed",
  DaHuy: "cancelled",
};

function statusClass(status) {
  return `status-${statusClasses[status] || String(status || "").toLowerCase()}`;
}

function isTerminalStatus(status) {
  return ["HoanTat", "DaHuy", "COMPLETED", "CANCELLED", "REJECTED", "NO_SHOW"].includes(
    status,
  );
}

function isCancellable(status) {
  return ["DaDat", "PENDING", "CONFIRMED"].includes(status);
}

function hhmm(value) {
  return value ? String(value).slice(0, 5) : "";
}

function formatDate(value) {
  if (!value) return "Chưa cập nhật";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function todayString() {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function PageHeading({ title, description, Icon, icon, action }) {
  return (
    <div className="workspace-heading">
      <span className="workspace-heading-icon">
        <Icon name={icon} size={25} />
      </span>
      <div className="workspace-heading-copy">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function EmptyState({ title, description, Icon }) {
  return (
    <div className="workspace-empty">
      <span>
        <Icon name="records" size={27} />
      </span>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

function AppointmentCard({ appointment, onCancel, Icon }) {
  const canCancel = isCancellable(appointment.status);

  return (
    <article className="workspace-card appointment-workspace-card">
      <div className="workspace-card-topline">
        <span className={`status-pill ${statusClass(appointment.status)}`}>
          {statusLabels[appointment.status] || appointment.status}
        </span>
        <span className="appointment-code">{appointment.id}</span>
      </div>
      <h3>{appointment.specialty}</h3>
      <p className="appointment-doctor">
        <Icon name="doctor" size={18} /> {appointment.doctor}
      </p>
      <div className="appointment-meta-grid">
        <span><Icon name="calendar" size={17} /> {formatDate(appointment.date)}</span>
        <span><Icon name="clock" size={17} /> {appointment.endTime ? `${appointment.time} – ${appointment.endTime}` : appointment.time}</span>
        {appointment.room && <span><Icon name="pin" size={17} /> {appointment.room}</span>}
      </div>
      {appointment.reason && (
        <p className="appointment-reason">
          <strong>Lý do khám:</strong> {appointment.reason}
        </p>
      )}
      {canCancel && (
        <button
          className="workspace-secondary-button cancel-appointment-button"
          onClick={() => onCancel(appointment)}
          type="button"
        >
          Hủy lịch hẹn
        </button>
      )}
    </article>
  );
}

function AppointmentPage({ appointments, onNavigate, setAppointments, Icon, showToast, patientId }) {
  const [filter, setFilter] = useState("upcoming");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [loading, setLoading] = useState(!!patientId);
  const [loadError, setLoadError] = useState("");
  const today = todayString();

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    getAppointments(patientId)
      .then((data) => {
        if (cancelled) return;
        setAppointments(
          data.map((appointment) => ({
            id: appointment.id,
            status: appointment.status,
            date: appointment.date,
            time: hhmm(appointment.time),
            endTime: hhmm(appointment.endTime),
            specialty: appointment.specialtyName || "Chuyên khoa khám",
            doctor: appointment.doctorName || "BS. Chưa cập nhật",
            room: appointment.roomName,
            reason: appointment.reason,
            doctorId: appointment.doctorId,
          })),
        );
        setLoadError("");
        setLoading(false);
      })
      .catch((error) => {
        if (cancelled) return;
        setAppointments([]);
        setLoadError(errorMessage(error, "Không thể tải danh sách lịch hẹn."));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  const filteredAppointments = appointments.filter((appointment) => {
    const isTerminal = isTerminalStatus(appointment.status);
    return filter === "upcoming"
      ? !isTerminal && appointment.date >= today
      : isTerminal || appointment.date < today;
  });

  const confirmCancel = async () => {
    const target = cancelTarget;
    setCancelTarget(null);
    try {
      await cancelAppointment(target.id, patientId);
      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === target.id
            ? { ...appointment, status: "DaHuy" }
            : appointment,
        ),
      );
      showToast("Đã hủy lịch hẹn.");
    } catch (error) {
      showToast(errorMessage(error, "Không thể hủy lịch hẹn."));
    }
  };

  return (
    <>
      <PageHeading
        title="Lịch khám"
        description="Theo dõi và quản lý các lịch hẹn của bạn."
        Icon={Icon}
        icon="calendar"
        action={
          <button
            className="workspace-icon-action"
            onClick={() => onNavigate("booking")}
            type="button"
            aria-label="Đặt lịch mới"
          >
            <Icon name="plus" size={22} />
          </button>
        }
      />
      <div className="workspace-tabs" role="tablist" aria-label="Lọc lịch khám">
        <button
          aria-selected={filter === "upcoming"}
          className={filter === "upcoming" ? "is-selected" : ""}
          onClick={() => setFilter("upcoming")}
          role="tab"
          type="button"
        >
          Sắp tới
        </button>
        <button
          aria-selected={filter === "history"}
          className={filter === "history" ? "is-selected" : ""}
          onClick={() => setFilter("history")}
          role="tab"
          type="button"
        >
          Đã qua / đã hủy
        </button>
      </div>
      {loading && <p className="workspace-note">Đang tải lịch hẹn...</p>}
      {!loading && loadError && (
        <p className="workspace-note" role="alert">{loadError}</p>
      )}
      {!loading && !loadError && filteredAppointments.length ? (
        <div className="workspace-list">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              appointment={appointment}
              Icon={Icon}
              key={appointment.id}
              onCancel={setCancelTarget}
            />
          ))}
        </div>
      ) : (
        !loading &&
        !loadError &&
        (filter === "upcoming" ? (
          <EmptyState
            Icon={Icon}
            title="Chưa có lịch hẹn sắp tới"
            description="Đặt lịch để chọn chuyên khoa, bác sĩ và giờ khám phù hợp."
          />
        ) : (
          <EmptyState
            Icon={Icon}
            title="Chưa có lịch sử khám"
            description="Các lịch đã qua hoặc đã hủy sẽ hiển thị tại đây."
          />
        ))
      )}
      {filter === "upcoming" && (
        <button className="workspace-primary-button full-width-button" onClick={() => onNavigate("booking")} type="button">
          <Icon name="plus" size={20} /> Đặt lịch khám mới
        </button>
      )}
      {cancelTarget && (
        <div className="workspace-modal-backdrop" onClick={() => setCancelTarget(null)}>
          <section
            aria-labelledby="cancel-appointment-title"
            aria-modal="true"
            className="workspace-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <h2 id="cancel-appointment-title">Hủy lịch hẹn?</h2>
            <p>Lịch {cancelTarget.id} sẽ chuyển sang trạng thái đã hủy. Bạn có thể đặt lịch khác bất cứ lúc nào.</p>
            <div className="workspace-modal-actions">
              <button className="workspace-secondary-button" onClick={() => setCancelTarget(null)} type="button">Giữ lịch</button>
              <button className="workspace-danger-button" onClick={confirmCancel} type="button">Xác nhận hủy</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function BookingPage({ onNavigate, setAppointments, Icon, showToast, profile }) {
  if (profile?.useDemoBooking) {
    return (
      <DemoBookingPage
        Icon={Icon}
        onNavigate={onNavigate}
        profile={profile}
        setAppointments={setAppointments}
        showToast={showToast}
      />
    );
  }

  if (!profile?.patientId) {
    return (
      <p className="booking-profile-error" role="alert">
        Không tìm thấy mã bệnh nhân trong phiên đăng nhập. Vui lòng đăng xuất
        và đăng nhập lại trước khi đặt lịch.
      </p>
    );
  }

  return (
    <div className="mobile-booking-host">
      <PatientBookingPage isMobile patientProfile={profile} />
    </div>
  );
}

function DemoBookingPage({ onNavigate, setAppointments, Icon, showToast, profile }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    specialty: specialties[0],
    doctor: doctorsBySpecialty[specialties[0]][0],
    date: todayString(),
    selectedSchedule: null,
    patientId: "BN001",
    patientName: profile.fullName || "",
    phoneNumber: profile.phone || "",
    reason: "",
    symptoms: "",
  });
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const chooseSpecialty = (event) => {
    const specialty = event.target.value;
    setForm((current) => ({
      ...current,
      specialty,
      doctor: doctorsBySpecialty[specialty][0],
      selectedSchedule: null,
    }));
  };

  const submitBooking = (event) => {
    event.preventDefault();
    if (!form.selectedSchedule) return;
    const appointment = {
      specialty: form.specialty,
      doctor: form.doctor,
      date: form.date,
      time: form.selectedSchedule.startTime,
      patientId: form.patientId,
      patientName: form.patientName,
      phoneNumber: form.phoneNumber,
      reason: form.reason,
      symptoms: form.symptoms,
      room: form.selectedSchedule.roomId,
      id: `LH${Date.now()}`,
      status: "PENDING",
    };
    setAppointments((current) => [appointment, ...current]);
    setCreatedAppointment(appointment);
    showToast("Đã tạo lịch hẹn mẫu.");
  };

  if (createdAppointment) {
    return (
      <section className="booking-success">
        <span className="booking-success-icon"><Icon name="check" size={36} /></span>
        <p className="eyebrow">ĐẶT LỊCH THÀNH CÔNG</p>
        <h1>Đã tạo phiếu hẹn mẫu</h1>
        <p className="booking-success-copy">Mã lịch hẹn</p>
        <strong className="booking-reference">{createdAppointment.id}</strong>
        <div className="booking-summary booking-ticket">
          <div><span>Bệnh nhân</span><strong>{createdAppointment.patientName} ({createdAppointment.patientId})</strong></div>
          <div><span>Điện thoại</span><strong>{createdAppointment.phoneNumber}</strong></div>
          <div><span>Chuyên khoa</span><strong>{createdAppointment.specialty}</strong></div>
          <div><span>Bác sĩ</span><strong>{createdAppointment.doctor}</strong></div>
          <div><span>Ngày khám</span><strong>{formatDate(createdAppointment.date)}</strong></div>
          <div><span>Giờ hẹn dự kiến</span><strong>{createdAppointment.time}</strong></div>
          <div><span>Phòng khám</span><strong>{createdAppointment.room}</strong></div>
          <span className="status-pill status-pending">{statusLabels.PENDING}</span>
        </div>
        <p className="workspace-note">Đây chỉ là phiếu hẹn minh họa. Lịch chưa được gửi đến phòng khám và chưa được xác nhận.</p>
        <button className="workspace-primary-button full-width-button" onClick={() => onNavigate("appointments")} type="button">Xem lịch hẹn</button>
        <button className="workspace-link-button" onClick={() => { setCreatedAppointment(null); setStep(1); }} type="button">Đặt thêm lịch mới</button>
      </section>
    );
  }

  return (
    <>
      <PageHeading title="Đặt lịch khám" description="Làm theo 4 bước để tạo phiếu hẹn." Icon={Icon} icon="calendar" />
      <div className="booking-progress" aria-label={`Bước ${step} trên 4`}>
        {[
          ["1", "Bác sĩ"],
          ["2", "Ca khám"],
          ["3", "Thông tin"],
          ["4", "Phiếu hẹn"],
        ].map(([number, label], index) => (
          <div
            className={`booking-progress-step${step === index + 1 ? " is-active" : ""}${step > index + 1 ? " is-done" : ""}`}
            key={number}
          >
            <span>{step > index + 1 ? <Icon name="check" size={15} /> : number}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="booking-form">
          <div className="booking-step-label"><span>1</span><div><strong>Chọn chuyên khoa và bác sĩ</strong><small>Bác sĩ được lọc theo chuyên khoa đã chọn</small></div></div>
          <label className="workspace-field">
            <span>Chuyên khoa khám <b>*</b></span>
            <select value={form.specialty} onChange={chooseSpecialty}>
              {specialties.map((specialty) => <option key={specialty}>{specialty}</option>)}
            </select>
          </label>
          <label className="workspace-field">
            <span>Bác sĩ điều trị <b>*</b></span>
            <select value={form.doctor} onChange={(event) => { update("doctor", event.target.value); update("selectedSchedule", null); }}>
              {doctorsBySpecialty[form.specialty].map((doctor) => <option key={doctor}>{doctor}</option>)}
            </select>
          </label>
          <div className="booking-selection-summary">
            <span className="record-card-icon"><Icon name="doctor" size={21} /></span>
            <span><strong>{form.doctor}</strong><small>{form.specialty} · Thông tin bác sĩ minh họa</small></span>
          </div>
          <div className="workspace-note">Danh sách bác sĩ trong bản demo chưa được lấy từ lịch làm việc thực tế của phòng khám.</div>
          <button className="workspace-primary-button full-width-button" onClick={() => setStep(2)} type="button">
            Tiếp tục: Chọn ngày & ca khám <Icon name="chevron" size={19} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="booking-form">
          <div className="booking-step-label"><span>2</span><div><strong>Chọn ngày và ca khám</strong><small>Chọn ca phù hợp với thời gian của bạn</small></div></div>
          <div className="booking-selected-doctor">
            <Icon name="doctor" size={19} />
            <span>{form.doctor} · {form.specialty}</span>
            <button className="workspace-inline-link" onClick={() => setStep(1)} type="button">Đổi</button>
          </div>
          <label className="workspace-field">
            <span>Ngày khám dự kiến <b>*</b></span>
            <input
              min={todayString()}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value, selectedSchedule: null }))}
              required
              type="date"
              value={form.date}
            />
          </label>
          <div className="schedule-section-heading">
            <strong>Các ca khám còn nhận khách</strong>
            <small>{formatDate(form.date)} · Lịch mẫu</small>
          </div>
          <div className="mobile-schedule-list">
            {demoSchedules.map((schedule) => {
              const selected = form.selectedSchedule?.id === schedule.id;
              return (
                <button
                  aria-pressed={selected}
                  className={`mobile-schedule-card${selected ? " is-selected" : ""}`}
                  key={schedule.id}
                  onClick={() => update("selectedSchedule", schedule)}
                  type="button"
                >
                  <span className="mobile-schedule-radio">{selected && <span />}</span>
                  <span className="mobile-schedule-main">
                    <strong>{schedule.startTime} – {schedule.endTime}</strong>
                    <small><Icon name="pin" size={15} /> Phòng {schedule.roomId}</small>
                  </span>
                  <span className="mobile-schedule-capacity">Tối đa {schedule.maxPatients} BN</span>
                </button>
              );
            })}
          </div>
          <div className="workspace-note">Các ca và số lượng tiếp nhận chỉ để minh họa; cần kiểm tra lịch trống thực tế khi kết nối Backend.</div>
          <div className="booking-wizard-actions">
            <button className="workspace-secondary-button" onClick={() => setStep(1)} type="button"><Icon name="back" size={18} /> Quay lại</button>
            <button className="workspace-primary-button" disabled={!form.selectedSchedule} onClick={() => setStep(3)} type="button">Tiếp tục <Icon name="chevron" size={18} /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form className="booking-form" onSubmit={(event) => { event.preventDefault(); setStep(4); }}>
          <div className="booking-step-label"><span>3</span><div><strong>Thông tin bệnh nhân</strong><small>Kiểm tra thông tin liên hệ trước khi xác nhận</small></div></div>
          <div className="booking-review-summary">
            <strong>{form.specialty} · {form.doctor}</strong>
            <span>{formatDate(form.date)} · {form.selectedSchedule?.startTime} – {form.selectedSchedule?.endTime}</span>
            <button className="workspace-inline-link" onClick={() => setStep(2)} type="button">Đổi ca khám</button>
          </div>
          <label className="workspace-field">
            <span>Họ và tên bệnh nhân <b>*</b></span>
            <input autoComplete="name" maxLength={100} onChange={(event) => update("patientName", event.target.value)} placeholder="Ví dụ: Nguyễn Văn A" required value={form.patientName} />
          </label>
          <label className="workspace-field">
            <span>Số điện thoại liên hệ <b>*</b></span>
            <input autoComplete="tel" inputMode="tel" maxLength={15} onChange={(event) => update("phoneNumber", event.target.value)} placeholder="Ví dụ: 0912345678" required type="tel" value={form.phoneNumber} />
          </label>
          <label className="workspace-field">
            <span>Mã bệnh nhân <small>(nếu có)</small></span>
            <input maxLength={30} onChange={(event) => update("patientId", event.target.value)} value={form.patientId} />
          </label>
          <label className="workspace-field">
            <span>Lý do khám <b>*</b></span>
            <textarea maxLength={500} onChange={(event) => update("reason", event.target.value)} placeholder="Mô tả lý do bạn muốn khám" required rows={3} value={form.reason} />
          </label>
          <label className="workspace-field">
            <span>Triệu chứng ban đầu <small>(không bắt buộc)</small></span>
            <textarea maxLength={500} onChange={(event) => update("symptoms", event.target.value)} placeholder="Mô tả ngắn gọn triệu chứng nếu có" rows={3} value={form.symptoms} />
          </label>
          <div className="workspace-note">Thông tin này hiện chỉ dùng để tạo phiếu hẹn mẫu trong giao diện.</div>
          <div className="booking-wizard-actions">
            <button className="workspace-secondary-button" onClick={() => setStep(2)} type="button"><Icon name="back" size={18} /> Quay lại</button>
            <button className="workspace-primary-button" type="submit">Xem phiếu hẹn <Icon name="chevron" size={18} /></button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div className="booking-form">
          <div className="booking-step-label"><span>4</span><div><strong>Kiểm tra phiếu hẹn</strong><small>Xác nhận thông tin trước khi hoàn tất</small></div></div>
          <div className="booking-review-ticket">
            <div className="booking-ticket-header"><span>MÃ PHIẾU HẸN</span><strong>Được tạo sau khi xác nhận</strong></div>
            {[
              ["Bệnh nhân", form.patientName],
              ["Mã bệnh nhân", form.patientId || "Chưa cung cấp"],
              ["Điện thoại", form.phoneNumber],
              ["Chuyên khoa", form.specialty],
              ["Bác sĩ", form.doctor],
              ["Ngày khám", formatDate(form.date)],
              ["Giờ hẹn", `${form.selectedSchedule?.startTime} – ${form.selectedSchedule?.endTime}`],
              ["Phòng khám", form.selectedSchedule?.roomId],
              ["Lý do khám", form.reason],
            ].map(([label, value]) => <div className="booking-ticket-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
            {form.symptoms && <div className="booking-ticket-row"><span>Triệu chứng</span><strong>{form.symptoms}</strong></div>}
          </div>
          <div className="workspace-note">Khi xác nhận, ứng dụng chỉ lưu lịch mẫu trong bộ nhớ của trang. Không có yêu cầu nào được gửi đến Backend.</div>
          <div className="booking-wizard-actions">
            <button className="workspace-secondary-button" onClick={() => setStep(3)} type="button"><Icon name="back" size={18} /> Chỉnh sửa</button>
            <button className="workspace-primary-button" onClick={submitBooking} type="button"><Icon name="check" size={18} /> Xác nhận đặt lịch</button>
          </div>
        </div>
      )}
    </>
  );
}

function RecordsPage({ Icon, onNavigate, initialTab = "visits", patientId }) {
  const [tab, setTab] = useState(initialTab);
  const [expandedId, setExpandedId] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(!!patientId);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    getMedicalRecords(patientId)
      .then((data) => {
        if (cancelled) return;
        setRecords(data);
        setLoadError("");
        setLoading(false);
      })
      .catch((error) => {
        if (cancelled) return;
        setRecords([]);
        setLoadError(errorMessage(error, "Không thể tải hồ sơ khám."));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  const prescriptions = records.filter((record) => record.prescription);
  const invoices = records.filter((record) => record.invoice);

  return (
    <>
      <PageHeading
        title="Hồ sơ sức khỏe"
        description="Xem lại thông tin các lần khám của bạn."
        Icon={Icon}
        icon="records"
      />
      <div className="workspace-tabs records-tabs" role="tablist" aria-label="Loại hồ sơ">
        {[
          ["visits", "Lần khám"],
          ["prescriptions", "Đơn thuốc"],
          ["invoices", "Hóa đơn"],
        ].map(([id, label]) => (
          <button
            aria-selected={tab === id}
            className={tab === id ? "is-selected" : ""}
            key={id}
            onClick={() => { setTab(id); setExpandedId(null); }}
            role="tab"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="workspace-list">
        {tab === "visits" && records.map((visit) => (
          <article className="workspace-card record-card" key={visit.id}>
            <button className="record-card-toggle" onClick={() => setExpandedId(expandedId === visit.id ? null : visit.id)} type="button">
              <span className="record-card-icon"><Icon name="heart" size={21} /></span>
              <span className="record-card-title"><strong>{visit.specialtyName || "Chuyên khoa khám"}</strong><small>{formatDate(visit.date)} · {visit.doctorName || "BS. Chưa cập nhật"}</small></span>
              <Icon name="chevron" size={19} />
            </button>
            {expandedId === visit.id && (
              <div className="record-expanded">
                <p><strong>Triệu chứng</strong>{visit.symptoms}</p>
                <p><strong>Chẩn đoán</strong>{visit.diagnosis}</p>
                <p><strong>Lời dặn</strong>{visit.notes}</p>
                <button className="workspace-inline-link" onClick={() => setTab("prescriptions")} type="button">Xem đơn thuốc liên quan</button>
              </div>
            )}
          </article>
        ))}
        {tab === "prescriptions" && prescriptions.map((record) => (
          <article className="workspace-card record-card" key={record.prescription.id}>
            <button className="record-card-toggle" onClick={() => setExpandedId(expandedId === record.prescription.id ? null : record.prescription.id)} type="button">
              <span className="record-card-icon purple"><Icon name="pill" size={21} /></span>
              <span className="record-card-title"><strong>Đơn thuốc · {record.prescription.id}</strong><small>{formatDate(record.prescription.date)} · {record.doctorName || "BS. Chưa cập nhật"}</small></span>
              <Icon name="chevron" size={19} />
            </button>
            {expandedId === record.prescription.id && (
              <div className="record-expanded">
                {record.prescription.medicines.map((medicine) => (
                  <div className="medicine-row" key={medicine.medicineId}>
                    <strong>{medicine.medicineName}</strong>
                    <span>{medicine.dosage || "Theo chỉ định của bác sĩ"}</span>
                    <small>
                      {medicine.quantity} {medicine.unit || "đơn vị"}
                      {medicine.unitPrice ? ` · ${new Intl.NumberFormat("vi-VN").format(medicine.unitPrice)}đ` : ""}
                    </small>
                  </div>
                ))}
                {record.prescription.advice && (
                  <p className="workspace-note">{record.prescription.advice}</p>
                )}
                <p className="workspace-note">Dùng thuốc đúng theo hướng dẫn của bác sĩ. Không tự ý thay đổi liều dùng.</p>
              </div>
            )}
          </article>
        ))}
        {tab === "invoices" && invoices.map((record) => {
          const invoice = record.invoice;
          const paid = invoice.paymentStatus === "DaThanhToan";
          return (
            <article className="workspace-card invoice-card" key={invoice.id}>
              <div className="invoice-card-heading">
                <span className="record-card-icon orange"><Icon name="invoice" size={21} /></span>
                <div><strong>{invoice.id}</strong><small>{formatDate(record.date)}</small></div>
                <span className={`status-pill ${paid ? "status-paid" : "status-unpaid"}`}>
                  {paid ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </div>
              <div className="invoice-detail-list">
                {invoice.items.map((item) => (
                  <span key={`${item.itemType || ""}-${item.itemName}`}>
                    {item.itemName}
                    {item.quantity > 1 ? ` × ${item.quantity}` : ""}: {new Intl.NumberFormat("vi-VN").format(item.totalPrice)}đ
                  </span>
                ))}
              </div>
              <div className="invoice-total"><span>Tổng cộng</span><strong>{new Intl.NumberFormat("vi-VN").format(invoice.total)}đ</strong></div>
              {!paid && <p className="workspace-note">Vui lòng liên hệ quầy thu ngân để được hướng dẫn thanh toán.</p>}
            </article>
          );
        })}
      </div>
      {loading && <p className="workspace-note">Đang tải hồ sơ khám...</p>}
      {!loading && loadError && <p className="workspace-note" role="alert">{loadError}</p>}
      {!loading && !loadError && records.length === 0 && (
        <p className="workspace-note">Chưa có dữ liệu hồ sơ khám. Sau khi khám xong, kết quả sẽ hiển thị tại đây.</p>
      )}
      {tab === "visits" && (
        <button className="workspace-secondary-button full-width-button" onClick={() => onNavigate("appointments")} type="button">Xem lịch khám</button>
      )}
      <button className="assistant-entry-card" onClick={() => onNavigate("assistant")} type="button">
        <span><Icon name="chat" size={22} /></span>
        <span><strong>Cần hướng dẫn?</strong><small>Hỏi trợ lý về quy trình và cách dùng ứng dụng</small></span>
        <Icon name="chevron" size={19} />
      </button>
    </>
  );
}

function ProfilePage({ profile, setProfile, onLogout, Icon, showToast }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [loading, setLoading] = useState(!!profile?.patientId);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");

  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

  useEffect(() => {
    if (!profile?.patientId) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    getProfile(profile.patientId)
      .then((data) => {
        if (cancelled) return;
        setDraft({
          ...profile,
          ...data,
          patientId: data.patientId || profile.patientId,
          fullName: data.fullName || profile.fullName || "",
          birthDate: data.birthDate || "",
          gender: data.gender || "Nam",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          medicalHistory: data.medicalHistory || "",
        });
        setLoadError("");
        setLoading(false);
      })
      .catch((error) => {
        if (cancelled) return;
        setLoadError(errorMessage(error, "Không thể tải hồ sơ cá nhân."));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.patientId]);

  const save = async (event) => {
    event.preventDefault();
    if (!profile?.patientId) return;
    setSaving(true);
    try {
      const saved = await updateProfile(profile.patientId, {
        fullName: draft.fullName,
        birthDate: draft.birthDate || null,
        gender: draft.gender,
        phone: draft.phone,
        email: draft.email,
        address: draft.address,
        medicalHistory: draft.medicalHistory,
        bloodGroup: draft.bloodGroup,
        healthInsuranceNumber: draft.healthInsuranceNumber,
      });
      const merged = { ...draft, ...saved };
      setDraft(merged);
      setProfile(merged);

      // đồng bộ phiên để tiêu đề & lần đăng nhập sau dùng thông tin mới
      const storage = sessionStorage.getItem("clinic-patient-session")
        ? sessionStorage
        : localStorage;
      const raw = storage.getItem("clinic-patient-session");
      if (raw) {
        try {
          const session = JSON.parse(raw);
          session.patient = {
            ...session.patient,
            fullName: saved.fullName,
            phone: saved.phone,
            email: saved.email,
            gender: saved.gender,
          };
          storage.setItem("clinic-patient-session", JSON.stringify(session));
        } catch {
          /* bỏ qua phiên hỏng */
        }
      }

      setEditing(false);
      showToast("Đã cập nhật hồ sơ.");
    } catch (error) {
      showToast(errorMessage(error, "Không thể cập nhật hồ sơ."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeading
        title="Thông tin cá nhân"
        description="Thông tin giúp phòng khám hỗ trợ bạn tốt hơn."
        Icon={Icon}
        icon="user"
        action={!editing && (
          <button className="workspace-icon-action" onClick={() => { setDraft(profile); setEditing(true); }} type="button" aria-label="Chỉnh sửa hồ sơ">
            <Icon name="user" size={21} />
          </button>
        )}
      />
      <div className="profile-summary-card">
        <span className="profile-summary-avatar"><Icon name="user" size={27} /></span>
        <div><strong>{profile.fullName || "Bệnh nhân"}</strong><small>Hồ sơ bệnh nhân</small></div>
      </div>
      {loading && <p className="workspace-note">Đang tải hồ sơ...</p>}
      {!loading && loadError && <p className="workspace-note" role="alert">{loadError}</p>}
      {editing ? (
        <form className="profile-form" onSubmit={save}>
          <label className="workspace-field"><span>Họ và tên</span><input maxLength={100} onChange={(event) => update("fullName", event.target.value)} required value={draft.fullName} /></label>
          <label className="workspace-field"><span>Ngày sinh</span><input onChange={(event) => update("birthDate", event.target.value)} type="date" value={draft.birthDate} /></label>
          <label className="workspace-field"><span>Giới tính</span><select onChange={(event) => update("gender", event.target.value)} value={draft.gender}><option>Nam</option><option>Nữ</option><option>Khác</option></select></label>
          <label className="workspace-field"><span>Số điện thoại</span><input autoComplete="tel" inputMode="tel" maxLength={15} onChange={(event) => update("phone", event.target.value)} value={draft.phone} /></label>
          <label className="workspace-field"><span>Email</span><input autoComplete="email" onChange={(event) => update("email", event.target.value)} type="email" value={draft.email} /></label>
          <label className="workspace-field"><span>Địa chỉ</span><input autoComplete="street-address" onChange={(event) => update("address", event.target.value)} value={draft.address} /></label>
          <label className="workspace-field"><span>Tiền sử bệnh <small>(không bắt buộc)</small></span><textarea maxLength={500} onChange={(event) => update("medicalHistory", event.target.value)} rows={3} value={draft.medicalHistory} /></label>
          <button className="workspace-primary-button full-width-button" disabled={saving} type="submit"><Icon name="check" size={20} /> {saving ? "Đang lưu..." : "Lưu thông tin"}</button>
          <button className="workspace-link-button" onClick={() => setEditing(false)} type="button">Hủy chỉnh sửa</button>
        </form>
      ) : (
        <div className="profile-detail-list">
          {[
            ["Ngày sinh", formatDate(profile.birthDate)],
            ["Giới tính", profile.gender || "Chưa cập nhật"],
            ["Số điện thoại", profile.phone || "Chưa cập nhật"],
            ["Email", profile.email || "Chưa cập nhật"],
            ["Địa chỉ", profile.address || "Chưa cập nhật"],
            ["Tiền sử bệnh", profile.medicalHistory || "Chưa cập nhật"],
          ].map(([label, value]) => <div className="profile-detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
      )}
      <button className="patient-logout-button" onClick={onLogout} type="button"><Icon name="logout" size={19} /> Đăng xuất</button>
    </>
  );
}

function NotificationsPage({ Icon, onNavigate, showToast, read, onMarkRead }) {
  const markRead = () => {
    onMarkRead();
    showToast("Đã đánh dấu thông báo đã đọc.");
  };

  return (
    <>
      <PageHeading
        title="Thông báo"
        description="Nhắc lịch và cập nhật dành cho bạn."
        Icon={Icon}
        icon="bell"
        action={<button className="workspace-text-action" onClick={markRead} type="button">Đánh dấu đã đọc</button>}
      />
      <div className="workspace-list">
        <button className={`workspace-card notification-card${read ? " is-read" : ""}`} onClick={() => onNavigate("appointments")} type="button">
          <span className="notification-card-icon"><Icon name="calendar" size={22} /></span>
          <span><strong>Nhắc lịch khám</strong><small>Bạn có lịch hẹn ngày 14/10/2026 lúc 09:30. Vui lòng đến trước giờ khám 15 phút.</small><em>Hôm nay · Lịch minh họa</em></span>
          {!read && <i aria-label="Chưa đọc" />}
        </button>
        <div className="workspace-note">Thông báo trong bản demo là nội dung minh họa, chưa gửi thông báo thực tế.</div>
      </div>
    </>
  );
}

function AssistantPage({ Icon }) {
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const suggestions = [
    "Tôi nên chuẩn bị gì trước khi khám?",
    "Tôi muốn đặt lịch khám",
    "Tôi cần xem đơn thuốc",
  ];

  const ask = (value) => {
    const text = value.trim();
    if (!text) return;
    setLastQuestion(text);
    setQuestion("");
    const normalized = text.toLocaleLowerCase("vi");
    if (normalized.includes("đặt lịch") || normalized.includes("lịch khám")) {
      setAnswer("Bạn có thể vào mục “Lịch khám” → “Đặt lịch khám mới”, sau đó chọn chuyên khoa, bác sĩ, ngày, giờ và nhập lý do khám.");
    } else if (normalized.includes("đơn thuốc") || normalized.includes("thuốc")) {
      setAnswer("Mở mục “Hồ sơ” và chọn tab “Đơn thuốc” để xem hướng dẫn trong đơn. Hãy dùng thuốc theo chỉ định của bác sĩ; nếu có thắc mắc, vui lòng liên hệ phòng khám.");
    } else if (normalized.includes("chuẩn bị") || normalized.includes("trước khi khám")) {
      setAnswer("Bạn nên đến sớm 15 phút, mang theo giấy tờ tùy thân, thẻ bảo hiểm (nếu có), danh sách thuốc đang dùng và các kết quả khám trước đây.");
    } else {
      setAnswer("Mình có thể hướng dẫn cách sử dụng ứng dụng và quy trình khám. Mình không thể chẩn đoán bệnh hoặc kê đơn. Nếu có triệu chứng đáng lo ngại, hãy liên hệ nhân viên y tế; trường hợp khẩn cấp, gọi 115.");
    }
  };

  return (
    <>
      <PageHeading title="Trợ lý phòng khám" description="Hướng dẫn sử dụng ứng dụng và quy trình khám." Icon={Icon} icon="chat" />
      <div className="assistant-safety-note"><Icon name="shield" size={21} /><p>Trợ lý chỉ cung cấp hướng dẫn chung, không chẩn đoán và không kê đơn thuốc.</p></div>
      <div className="assistant-conversation" aria-live="polite">
        <div className="assistant-message assistant-reply">Xin chào! Bạn cần hướng dẫn về lịch khám, hồ sơ hay quy trình tại phòng khám?</div>
        {lastQuestion && <div className="assistant-message assistant-question">{lastQuestion}</div>}
        {answer && <div className="assistant-message assistant-reply">{answer}</div>}
      </div>
      <div className="assistant-suggestions">
        {suggestions.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)} type="button">{suggestion}</button>)}
      </div>
      <form className="assistant-input-row" onSubmit={(event) => { event.preventDefault(); ask(question); }}>
        <input aria-label="Câu hỏi" onChange={(event) => setQuestion(event.target.value)} placeholder="Nhập câu hỏi của bạn..." value={question} />
        <button aria-label="Gửi câu hỏi" type="submit"><Icon name="chevron" size={22} /></button>
      </form>
      <p className="workspace-demo-caption">Trợ lý minh họa chạy trên thiết bị, không gửi câu hỏi đến AI/backend.</p>
    </>
  );
}

function PatientWorkspace({
  page,
  onNavigate,
  Icon,
  appointments,
  setAppointments,
  profile,
  setProfile,
  showToast,
  notificationsRead,
  onMarkNotificationsRead,
  onLogout,
}) {
  return (
    <section className="patient-section workspace-page">
      {page === "appointments" && (
        <AppointmentPage
          appointments={appointments}
          Icon={Icon}
          onNavigate={onNavigate}
          patientId={profile?.patientId}
          setAppointments={setAppointments}
          showToast={showToast}
        />
      )}
      {page === "booking" && (
        <BookingPage
          Icon={Icon}
          onNavigate={onNavigate}
          profile={profile}
          setAppointments={setAppointments}
          showToast={showToast}
        />
      )}
      {["records", "prescription", "invoices"].includes(page) && (
        <RecordsPage
          Icon={Icon}
          initialTab={page === "prescription" ? "prescriptions" : page === "invoices" ? "invoices" : "visits"}
          key={page}
          onNavigate={onNavigate}
          patientId={profile?.patientId}
        />
      )}
      {page === "profile" && (
        <ProfilePage
          Icon={Icon}
          onLogout={onLogout}
          profile={profile}
          setProfile={setProfile}
          showToast={showToast}
        />
      )}
      {page === "notifications" && (
        <NotificationsPage
          Icon={Icon}
          onMarkRead={onMarkNotificationsRead}
          onNavigate={onNavigate}
          read={notificationsRead}
          showToast={showToast}
        />
      )}
      {page === "assistant" && <AssistantPage Icon={Icon} />}
    </section>
  );
}

export default PatientWorkspace;
