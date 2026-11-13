import React from "react";

export function ScheduleListTable({
  searchTerm,
  setSearchTerm,
  loading,
  filteredSchedules,
  onOpenEditModal,
  onDeleteSchedule,
}) {
  return (
    <div className="card-box-table">
      <div className="table-header-bar">
        <h2
          style={{
            fontSize: "18px",
            margin: 0,
            color: "#0d47a1",
            fontWeight: 600,
          }}
        >
          Danh Sách Lịch Trực
        </h2>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm theo mã lịch, phòng, bác sĩ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-scroll-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Mã Lịch</th>
              <th>Phòng</th>
              <th>Bác Sĩ</th>
              <th>Ngày Khám</th>
              <th>Khung Giờ</th>
              <th>Tối Đa</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "24px",
                    color: "#64748b",
                  }}
                >
                  Đang nạp dữ liệu...
                </td>
              </tr>
            ) : filteredSchedules.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "24px",
                    color: "#64748b",
                  }}
                >
                  Không tìm thấy lịch trực phù hợp
                </td>
              </tr>
            ) : (
              filteredSchedules.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <span className="badge-room">{item.roomId}</span>
                  </td>
                  <td>{item.doctor ? item.doctor.id : "N/A"}</td>
                  <td>{item.examinationDate}</td>
                  <td style={{ color: "#546e7a" }}>
                    {item.startTime} - {item.endTime}
                  </td>
                  <td>{item.maxPatients} BN</td>
                  <td>
                    <span
                      className={`badge-status ${
                        item.status === "MoDangKy" ||
                        item.status === "AVAILABLE"
                          ? "badge-available"
                          : "badge-other"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="btn-edit-action"
                        onClick={() => onOpenEditModal(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => onDeleteSchedule(item.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
