import React from "react";
import { AdminIcon } from "./AdminIcon.jsx";
import { CHART_VALUES, STATUS_LABELS } from "../adminConstants.js";
import { formatMoney, getInitials, getStatusClass } from "../adminUtils.js";

export function AdminOverviewView({
  revenue,
  todayAppointments,
  activeDoctors,
  totalDoctors,
  lowStockCount,
  period,
  setPeriod,
  allAppointments,
  unpaidInvoicesCount,
  onNavigate,
  onDotsClick,
}) {
  return (
    <>
      <div className="admin-welcome-row">
        <div>
          <p className="admin-eyebrow">TRUNG TÂM ĐIỀU HÀNH</p>
          <h1>Tổng quan phòng khám</h1>
          <p className="admin-page-subtitle">
            Theo dõi hoạt động và các chỉ số vận hành trong ngày.
          </p>
        </div>
        <button className="admin-date-button" type="button">
          <AdminIcon name="calendar" size={18} />
          Chủ nhật, 11 tháng 10, 2026
        </button>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <div className="admin-stat-icon is-blue">
            <AdminIcon name="appointments" />
          </div>
          <span className="admin-stat-label">Lịch hẹn hôm nay</span>
          <strong>{todayAppointments + 18}</strong>
          <span className="admin-stat-foot">
            <b>+12%</b> so với hôm qua
          </span>
          <span className="admin-stat-sparkline is-blue-line">▂▄▃▅▄▆▅▇</span>
        </article>

        <article className="admin-stat-card">
          <div className="admin-stat-icon is-green">
            <AdminIcon name="patients" />
          </div>
          <span className="admin-stat-label">Lượt khám trong ngày</span>
          <strong>32</strong>
          <span className="admin-stat-foot">
            <b>24</b> hoàn tất · <b>8</b> đang chờ
          </span>
          <span className="admin-stat-sparkline is-green-line">▃▅▄▆▅▇▆█</span>
        </article>

        <article className="admin-stat-card">
          <div className="admin-stat-icon is-violet">
            <AdminIcon name="reports" />
          </div>
          <span className="admin-stat-label">Doanh thu đã thu</span>
          <strong className="admin-stat-money">{formatMoney(revenue)}</strong>
          <span className="admin-stat-foot">
            <b>+8,4%</b> so với kỳ trước
          </span>
          <span className="admin-stat-sparkline is-violet-line">▂▃▅▄▆▅▇█</span>
        </article>

        <article className="admin-stat-card">
          <div className="admin-stat-icon is-amber">
            <AdminIcon name="doctors" />
          </div>
          <span className="admin-stat-label">Bác sĩ đang hoạt động</span>
          <strong>
            {activeDoctors}
            <small> / {totalDoctors}</small>
          </strong>
          <span className="admin-stat-foot">
            <b>5</b> chuyên khoa đang mở
          </span>
          <span className="admin-stat-sparkline is-amber-line">▅▅▆▆▇▆▇█</span>
        </article>
      </div>

      <div className="admin-overview-grid">
        <section className="admin-panel admin-revenue-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Doanh thu phòng khám</h2>
              <p>Tổng doanh thu hóa đơn đã thanh toán</p>
            </div>
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              aria-label="Chọn kỳ báo cáo"
            >
              <option>Tháng này</option>
              <option>Quý này</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="admin-revenue-total">
            <strong>{formatMoney(revenue + 12400000)}</strong>
            <span>
              <b>↗ 8,4%</b> so với kỳ trước
            </span>
          </div>
          <div className="admin-chart">
            <div className="admin-chart-grid">
              <span>20tr</span>
              <span>15tr</span>
              <span>10tr</span>
              <span>5tr</span>
              <span>0</span>
            </div>
            <div className="admin-chart-bars">
              {CHART_VALUES.map((value, index) => (
                <div className="admin-chart-column" key={index}>
                  <span
                    className="admin-chart-bar"
                    style={{ height: `${value}%` }}
                  />
                  <small>
                    {
                      [
                        "1",
                        "3",
                        "5",
                        "7",
                        "9",
                        "11",
                        "13",
                        "15",
                        "17",
                        "19",
                        "21",
                        "23",
                      ][index]
                    }
                  </small>
                </div>
              ))}
            </div>
          </div>
          <div className="admin-chart-legend">
            <i /> Doanh thu <span>Đơn vị: đồng</span>
          </div>
        </section>

        <section className="admin-panel admin-operations-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Tình hình vận hành</h2>
              <p>Cập nhật theo dữ liệu mẫu</p>
            </div>
            <button
              className="admin-icon-button"
              aria-label="Tùy chọn"
              type="button"
              onClick={onDotsClick}
            >
              <AdminIcon name="dots" />
            </button>
          </div>
          <div className="admin-operation-list">
            <div>
              <span className="admin-operation-icon is-blue">
                <AdminIcon name="appointments" size={18} />
              </span>
              <span>
                <b>Lịch hẹn chờ xác nhận</b>
                <small>Đang cần bác sĩ xử lý</small>
              </span>
              <strong>06</strong>
            </div>
            <div>
              <span className="admin-operation-icon is-green">
                <AdminIcon name="patients" size={18} />
              </span>
              <span>
                <b>Bệnh nhân đang chờ</b>
                <small>Trong hàng đợi khám</small>
              </span>
              <strong>08</strong>
            </div>
            <div>
              <span className="admin-operation-icon is-violet">
                <AdminIcon name="invoices" size={18} />
              </span>
              <span>
                <b>Hóa đơn chưa thanh toán</b>
                <small>Cần được thu ngân xử lý</small>
              </span>
              <strong>
                {unpaidInvoicesCount.toString().padStart(2, "0")}
              </strong>
            </div>
            <div>
              <span className="admin-operation-icon is-amber">
                <AdminIcon name="medicines" size={18} />
              </span>
              <span>
                <b>Thuốc sắp hết hàng</b>
                <small>Tồn kho dưới 30 đơn vị</small>
              </span>
              <strong>
                {lowStockCount.toString().padStart(2, "0")}
              </strong>
            </div>
          </div>
          <button
            className="admin-text-link"
            onClick={() => onNavigate("medicines")}
            type="button"
          >
            Xem danh mục thuốc <AdminIcon name="arrow" size={16} />
          </button>
        </section>
      </div>

      <div className="admin-lower-grid">
        <section className="admin-panel admin-recent-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Lịch hẹn gần đây</h2>
              <p>Các lượt khám mới nhất trong hệ thống</p>
            </div>
            <button
              className="admin-text-link"
              onClick={() => onNavigate("appointments")}
              type="button"
            >
              Tất cả lịch hẹn <AdminIcon name="arrow" size={16} />
            </button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table admin-compact-table">
              <thead>
                <tr>
                  <th>Bệnh nhân</th>
                  <th>Bác sĩ</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments.slice(0, 4).map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <div className="admin-person-cell">
                        <span className="admin-avatar">
                          {getInitials(appointment.patient)}
                        </span>
                        <span>
                          {appointment.patient}
                          <small>{appointment.id}</small>
                        </span>
                      </div>
                    </td>
                    <td>{appointment.doctor}</td>
                    <td>
                      {appointment.date.slice(5).replace("-", "/")} ·{" "}
                      {appointment.time}
                    </td>
                    <td>
                      <span
                        className={`admin-status ${getStatusClass(appointment.status)}`}
                      >
                        <i />
                        {STATUS_LABELS[appointment.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-panel admin-specialty-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Lượt khám theo chuyên khoa</h2>
              <p>Phân bố lượt khám trong tháng</p>
            </div>
          </div>
          <div className="admin-specialty-bars">
            {[
              ["Nội khoa", 78, "blue"],
              ["Tim mạch", 62, "violet"],
              ["Nhi khoa", 48, "green"],
              ["Tai Mũi Họng", 34, "amber"],
            ].map(([label, value, color]) => (
              <div className="admin-specialty-bar-row" key={label}>
                <span>{label}</span>
                <div>
                  <i
                    className={`is-${color}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <b>{Math.round(value * 1.4)}</b>
              </div>
            ))}
          </div>
          <button
            className="admin-text-link"
            onClick={() => onNavigate("specialties")}
            type="button"
          >
            Quản lý chuyên khoa <AdminIcon name="arrow" size={16} />
          </button>
        </section>
      </div>
    </>
  );
}
