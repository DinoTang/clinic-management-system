import React from "react";

export default function QueueSidebar({
  filteredQueue,
  queue,
  selected,
  loadingQueue,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  statusCounts,
  STATUS_META,
  onSelectReception,
  onChangeStatus,
  onDeferPatient,
  isPastDate,
}) {
  return (
    <section className="exam-panel">
      <h2 className="exam-panel-title">
        Hàng đợi khám
        <span className="title-count">{filteredQueue.length} lượt</span>
      </h2>

      <div className="exam-queue-tools">
        <input
          type="text"
          placeholder="Tìm mã lượt, bệnh nhân, STT, phòng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="exam-status-tabs">
          {[
            ["all", "Tất cả"],
            ["ChoKham", "Chờ"],
            ["DangKham", "Đang K"],
            ["DaKham", "Đã K"],
            ["QuaHan", "Quá hạn"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`exam-status-tab ${statusFilter === key ? "active" : ""}`}
              onClick={() => setStatusFilter(key)}
            >
              {label} ({statusCounts[key] || 0})
            </button>
          ))}
        </div>
      </div>

      <div className="exam-queue-list">
        {loadingQueue && queue.length === 0 ? (
          <div className="exam-queue-empty">Đang tải hàng đợi...</div>
        ) : filteredQueue.length === 0 ? (
          <div className="exam-queue-empty">
            Không có lượt khám phù hợp.
            <br />
            Chọn bác sĩ và ngày khác để xem hàng đợi.
          </div>
        ) : (
          filteredQueue.map((item) => {
            const meta = STATUS_META[item.queueStatus] || {
              label: item.queueStatus,
              cls: "status-chokham",
            };
            return (
              <div
                key={item.id}
                className={`exam-queue-item ${selected?.id === item.id ? "selected" : ""}`}
                onClick={() => onSelectReception(item)}
              >
                <div className="exam-queue-item-top">
                  <span className="exam-queue-item-id">
                    STT {item.queueNumber} · {item.id}
                  </span>
                  <span className={`status-badge ${meta.cls}`}>
                    {meta.label}
                  </span>
                </div>
                <div className="exam-queue-item-meta">
                  <span>{item.patientId}</span>
                  <span>{item.roomId}</span>
                  {item.deferredAt && item.queueStatus === "ChoKham" && (
                    <span
                      className="exam-defer-tag"
                      title={`Bệnh nhân vắng mặt khi gọi lượt (${item.deferCount || 1} lần)`}
                    >
                      Nhỡ lượt (x{item.deferCount || 1})
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    marginTop: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {item.queueStatus === "QuaHan" && (
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#b91c1c",
                        fontWeight: 700,
                      }}
                    >
                      Đã quá hạn
                    </span>
                  )}
                  {item.queueStatus === "ChoKham" && !isPastDate && (
                    <button
                      type="button"
                      className="exam-btn-call"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeStatus(item, "DangKham");
                      }}
                    >
                      Gọi khám
                    </button>
                  )}
                  {item.queueStatus === "ChoKham" && isPastDate && (
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#b91c1c",
                        fontWeight: 700,
                      }}
                    >
                      Đã quá hạn
                    </span>
                  )}
                  {item.queueStatus === "BoQua" && !isPastDate && (
                    <button
                      type="button"
                      className="exam-btn-call"
                      title="Đưa bệnh nhân trở lại hàng chờ, giữ nguyên STT"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeferPatient(item);
                      }}
                    >
                      Đưa về chờ
                    </button>
                  )}
                  {item.queueStatus === "BoQua" && isPastDate && (
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#b91c1c",
                        fontWeight: 700,
                      }}
                    >
                      Đã quá hạn
                    </span>
                  )}
                  {item.queueStatus === "DangKham" && !isPastDate && (
                    <>
                      <button
                        type="button"
                        className="exam-btn-done"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChangeStatus(item, "DaKham");
                        }}
                      >
                        Hoàn tất
                      </button>
                      <button
                        type="button"
                        className="exam-btn-defer"
                        title="Bệnh nhân vắng mặt - giữ nguyên STT"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeferPatient(item);
                        }}
                      >
                        Vắng mặt
                      </button>
                      <button
                        type="button"
                        className="exam-line-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChangeStatus(item, "BoQua");
                        }}
                      >
                        Bỏ qua
                      </button>
                    </>
                  )}
                  {item.queueStatus === "DangKham" && isPastDate && (
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#b91c1c",
                        fontWeight: 700,
                      }}
                    >
                      Đã quá hạn
                    </span>
                  )}
                  {item.queueStatus === "DaKham" && (
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#15803d",
                        fontWeight: 700,
                      }}
                    >
                      Đã hoàn tất
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
