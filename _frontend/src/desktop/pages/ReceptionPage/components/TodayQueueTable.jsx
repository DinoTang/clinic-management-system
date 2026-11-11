import React from "react";

export default function TodayQueueTable({
  queueList,
  rooms,
  filterRoomId,
  setFilterRoomId,
}) {
  return (
    <div className="reception-right">
      <h2 className="panel-title">
        HÀNG ĐỢI KHÁM HÔM NAY ({queueList.length})
      </h2>

      <div className="queue-filter-bar" style={{ marginTop: "12px" }}>
        <select
          className="form-control"
          value={filterRoomId}
          onChange={(e) => setFilterRoomId(e.target.value)}
        >
          <option value="">-- Tất Cả Các Phòng Khám --</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.roomName || r.name}
            </option>
          ))}
        </select>
      </div>

      <div className="queue-table-wrapper">
        <table className="queue-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Tiếp Đón</th>
              <th>Bệnh Nhân</th>
              <th>Phòng</th>
              <th>Bác Sĩ</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {queueList
              .filter((item) => !filterRoomId || item.roomId === filterRoomId)
              .map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="stt-badge">{item.queueNumber}</span>
                  </td>
                  <td>
                    <b>{item.id}</b>
                  </td>
                  <td>{item.patientId}</td>
                  <td>{item.roomId}</td>
                  <td>{item.doctorId}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.queueStatus === "ChoKham"
                          ? "status-chokham"
                          : item.queueStatus === "DangKham"
                            ? "status-dangkham"
                            : "status-dakham"
                      }`}
                    >
                      {item.queueStatus}
                    </span>
                    {item.deferredAt && item.queueStatus === "ChoKham" && (
                      <span
                        style={{
                          marginLeft: "6px",
                          fontSize: "11px",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: "#fef3c7",
                          color: "#92400e",
                          fontWeight: 600,
                        }}
                        title={`Bệnh nhân vắng mặt khi gọi (${item.deferCount || 1} lần)`}
                      >
                        Vắng mặt (L.{item.deferCount || 1})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
