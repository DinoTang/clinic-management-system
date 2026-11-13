import React from "react";

export default function VitalSignsSection({ formData, setFormData }) {
  return (
    <div style={{ marginTop: "14px" }}>
      <label className="input-label" style={{ color: "#0369a1" }}>
        Đo Chỉ Số Sinh Hiệu (Sinh Tồn):
      </label>
      <div className="vitals-grid">
        <div className="vital-item">
          <label>Mạch (lần/phút)</label>
          <input
            type="number"
            placeholder="80"
            value={formData.pulse}
            onChange={(e) =>
              setFormData({ ...formData, pulse: e.target.value })
            }
          />
        </div>
        <div className="vital-item">
          <label>Nhiệt Độ (°C)</label>
          <input
            type="number"
            step="0.1"
            placeholder="37.0"
            value={formData.temperature}
            onChange={(e) =>
              setFormData({ ...formData, temperature: e.target.value })
            }
          />
        </div>
        <div className="vital-item">
          <label>Huyết Áp (mmHg)</label>
          <input
            type="text"
            placeholder="120/80"
            value={formData.bloodPressure}
            onChange={(e) =>
              setFormData({ ...formData, bloodPressure: e.target.value })
            }
          />
        </div>
        <div className="vital-item">
          <label>Cân Nặng (kg)</label>
          <input
            type="number"
            step="0.1"
            placeholder="65.5"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />
        </div>
        <div className="vital-item">
          <label>Chiều Cao (cm)</label>
          <input
            type="number"
            step="0.1"
            placeholder="170"
            value={formData.height}
            onChange={(e) =>
              setFormData({ ...formData, height: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
