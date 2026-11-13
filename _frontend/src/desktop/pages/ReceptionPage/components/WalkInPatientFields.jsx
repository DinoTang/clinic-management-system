import React from "react";

export default function WalkInPatientFields({ formData, setFormData }) {
  if (formData.receptionType !== "TrucTiep") return null;

  return (
    <>
      <div className="form-row">
        <div>
          <label className="input-label">Họ và Tên Bệnh Nhân *</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={formData.patientName}
            onChange={(e) =>
              setFormData({ ...formData, patientName: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="input-label">Số Điện Thoại</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Ví dụ: 0912345678"
            value={formData.patientPhone}
            onChange={(e) =>
              setFormData({ ...formData, patientPhone: e.target.value })
            }
          />
        </div>
      </div>

      <div className="form-row">
        <div>
          <label className="input-label">Giới Tính</label>
          <select
            className="form-control"
            value={formData.patientGender}
            onChange={(e) =>
              setFormData({
                ...formData,
                patientGender: e.target.value,
              })
            }
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div>
          <label className="input-label">Ngày Sinh</label>
          <input
            type="date"
            className="form-control"
            value={formData.patientDob}
            onChange={(e) =>
              setFormData({ ...formData, patientDob: e.target.value })
            }
          />
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label className="input-label">Địa Chỉ</label>
        <input
          type="text"
          className="form-control"
          placeholder="Số nhà, đường, phường/xã..."
          value={formData.patientAddress}
          onChange={(e) =>
            setFormData({ ...formData, patientAddress: e.target.value })
          }
        />
      </div>
    </>
  );
}
