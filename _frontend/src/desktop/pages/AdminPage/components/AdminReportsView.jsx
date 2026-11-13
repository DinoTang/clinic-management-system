import React from "react";
import { AdminIcon } from "./AdminIcon.jsx";
import { CHART_VALUES, STATUS_LABELS } from "../adminConstants.js";
import { formatMoney, getInitials, getStatusClass } from "../adminUtils.js";

export function AdminReportsView({
  data,
  allAppointments,
  revenue,
  period,
  setPeriod,
  onExport,
}) {
  const doctorRanking = data.doctors
    .map((doctor) => ({
      ...doctor,
      visitCount: allAppointments.filter(
        (appointment) => appointment.doctor === doctor.name,
      ).length,
    }))
    .sort((left, right) => right.visitCount - left.visitCount);

  const completedAppointments = allAppointments.filter(
    (appointment) => appointment.status === "COMPLETED",
  ).length;

  const onlineAppointments = allAppointments.filter(
    (appointment) => appointment.source === "ONLINE",
  ).length;

  const walkInAppointments = allAppointments.filter(
    (appointment) => appointment.source === "WALK_IN",
  ).length;

  const totalAppointmentsCount =
    onlineAppointments + walkInAppointments + 124;

  return (
    <>
      <div className="admin-welcome-row admin-module-welcome">
        <div>
          <p className="admin-eyebrow">QUẢN TRỊ HỆ THỐNG / BÁO CÁO</p>
          <h1>Báo cáo & thống kê</h1>
          <p className="admin-page-subtitle">
            Tổng hợp doanh thu, lượt khám và hiệu suất bác sĩ.
          </p>
        </div>
        <div className="admin-report-actions">
          <select
            aria-label="Chọn kỳ báo cáo"
            onChange={(event) => setPeriod(event.target.value)}
            value={period}
          >
            <option>Tháng này</option>
            <option>Quý này</option>
            <option>Năm nay</option>
          </select>
          <button
            className="admin-primary-button"
            onClick={onExport}
            type="button"
          >
            <AdminIcon name="download" size={17} /> Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="admin-report-stat-grid">
        <article>
          <span>Doanh thu đã thu</span>
          <strong>{formatMoney(revenue)}</strong>
          <small className="is-up">↗ 8,4% so với kỳ trước</small>
        </article>
        <article>
          <span>Tổng lượt khám</span>
          <strong>{allAppointments.length + 124}</strong>
          <small className="is-up">↗ 12,6% so với kỳ trước</small>
        </article>
        <article>
          <span>Đặt lịch online</span>
          <strong>{onlineAppointments + 93}</strong>
          <small>
            {Math.round(
              ((onlineAppointments + 93) / totalAppointmentsCount) * 100,
            )}
            % tổng lượt
          </small>
        </article>
        <article>
          <span>Walk-in</span>
          <strong>{walkInAppointments + 31}</strong>
          <small>
            {Math.round(
              ((walkInAppointments + 31) / totalAppointmentsCount) * 100,
            )}
            % tổng lượt
          </small>
        </article>
      </div>

      <div className="admin-report-grid">
        <section className="admin-panel admin-report-chart">
          <div className="admin-panel-heading">
            <div>
              <h2>Doanh thu theo thời gian</h2>
              <p>
                Doanh thu hóa đơn đã thanh toán ·{" "}
                {period.toLocaleLowerCase("vi")}
              </p>
            </div>
            <span className="admin-report-chart-total">
              {formatMoney(revenue + 12400000)}
            </span>
          </div>
          <div className="admin-chart admin-chart-large">
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

        <section className="admin-panel admin-report-source">
          <div className="admin-panel-heading">
            <div>
              <h2>Nguồn bệnh nhân</h2>
              <p>Phân loại lượt khám</p>
            </div>
          </div>
          <div className="admin-source-summary">
            <div className="admin-source-donut">
              <strong>{totalAppointmentsCount}</strong>
              <small>lượt khám</small>
            </div>
            <div className="admin-source-legend">
              <div>
                <i className="is-online" />
                <span>Đặt lịch online</span>
                <b>{onlineAppointments + 93}</b>
              </div>
              <div>
                <i className="is-walkin" />
                <span>Khám trực tiếp</span>
                <b>{walkInAppointments + 31}</b>
              </div>
            </div>
          </div>
          <div className="admin-source-foot">
            <span>Đã hoàn thành trong dữ liệu hiện có</span>
            <b>{completedAppointments} lượt</b>
          </div>
        </section>
      </div>

      <section className="admin-panel admin-ranking-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Lượt khám theo bác sĩ</h2>
            <p>Xếp hạng theo số lượt khám được tiếp nhận</p>
          </div>
          <span className="admin-ranking-period">{period}</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hạng</th>
                <th>Bác sĩ</th>
                <th>Chuyên khoa</th>
                <th>Lượt khám</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {doctorRanking.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td>
                    <span
                      className={`admin-rank-number${index === 0 ? " is-first" : ""}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </td>
                  <td>
                    <div className="admin-person-cell">
                      <span className="admin-avatar">
                        {getInitials(doctor.name)}
                      </span>
                      <span>
                        {doctor.name}
                        <small>
                          {doctor.id} · {doctor.degree}
                        </small>
                      </span>
                    </div>
                  </td>
                  <td>{doctor.specialty}</td>
                  <td>
                    <b>{doctor.visitCount + [38, 31, 24, 17][index % 4]}</b>{" "}
                    lượt
                  </td>
                  <td>
                    <span
                      className={`admin-status ${getStatusClass(doctor.status)}`}
                    >
                      <i />
                      {STATUS_LABELS[doctor.status] || doctor.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="admin-report-footnote">
          Số liệu hiển thị là dữ liệu minh họa cho giao diện, chưa được lấy từ hệ
          thống backend.
        </p>
      </section>
    </>
  );
}
