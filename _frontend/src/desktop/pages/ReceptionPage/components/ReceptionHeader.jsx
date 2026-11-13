import React from "react";

export default function ReceptionHeader({
  loggedInStaffId,
  loggedInStaffName,
  onResetForm,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <h2 className="panel-title" style={{ margin: 0, border: "none" }}>
          TIẾP NHẬN BỆNH NHÂN TẠI QUẦY
        </h2>
        {loggedInStaffId ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "4px 10px",
              backgroundColor: "#eff6ff",
              color: "#1d4ed8",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              border: "1px solid #bfdbfe",
            }}
            title="Nhân viên tiếp đón đang đăng nhập"
          >
            Nhân viên:{" "}
            {loggedInStaffName
              ? `${loggedInStaffName} (${loggedInStaffId})`
              : loggedInStaffId}
          </span>
        ) : (
          <span
            style={{
              padding: "4px 10px",
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              border: "1px solid #fecaca",
            }}
          >
            Chưa đăng nhập nhân viên
          </span>
        )}
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onResetForm}
        style={{ padding: "6px 12px" }}
      >
        Làm Mới
      </button>
    </div>
  );
}
