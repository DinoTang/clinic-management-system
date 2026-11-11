import React from "react";
import { AdminIcon } from "./AdminIcon.jsx";
import { MODULES, STATUS_LABELS } from "../adminConstants.js";

export function AdminModal({ modal, setModal, onSave }) {
  if (!modal) return null;

  const currentModuleConfig = MODULES[modal.moduleId];
  if (!currentModuleConfig) return null;

  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(event) =>
        event.target === event.currentTarget && setModal(null)
      }
    >
      <section
        className="admin-modal"
        aria-labelledby="admin-modal-title"
        aria-modal="true"
        role="dialog"
      >
        <div className="admin-modal-header">
          <div>
            <p className="admin-eyebrow">
              {modal.mode === "create" ? "THÊM MỚI" : "CẬP NHẬT"}
            </p>
            <h2 id="admin-modal-title">
              {modal.mode === "create"
                ? currentModuleConfig.addLabel
                : `Chỉnh sửa ${currentModuleConfig.title.toLocaleLowerCase("vi")}`}
            </h2>
          </div>
          <button
            className="admin-icon-button"
            onClick={() => setModal(null)}
            aria-label="Đóng"
            type="button"
          >
            <AdminIcon name="close" />
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="admin-form-grid">
            {currentModuleConfig.fields.map(
              ([key, label, type = "text", required, options]) => (
                <label
                  className={type === "textarea" ? "is-full" : ""}
                  key={key}
                >
                  <span>
                    {label}
                    {required && <i> *</i>}
                  </span>
                  {type === "select" ? (
                    <select
                      required={required}
                      onChange={(event) =>
                        setModal((previous) => ({
                          ...previous,
                          values: {
                            ...previous.values,
                            [key]: event.target.value,
                          },
                        }))
                      }
                      value={modal.values[key]}
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {STATUS_LABELS[option] ||
                            {
                              ADMIN: "Quản trị viên",
                              DOCTOR: "Bác sĩ",
                              STAFF: "Nhân viên",
                              PATIENT: "Bệnh nhân",
                            }[option] ||
                            option}
                        </option>
                      ))}
                    </select>
                  ) : type === "textarea" ? (
                    <textarea
                      onChange={(event) =>
                        setModal((previous) => ({
                          ...previous,
                          values: {
                            ...previous.values,
                            [key]: event.target.value,
                          },
                        }))
                      }
                      rows={3}
                      value={modal.values[key]}
                    />
                  ) : (
                    <input
                      min={type === "number" ? 0 : undefined}
                      required={required}
                      type={type}
                      onChange={(event) =>
                        setModal((previous) => ({
                          ...previous,
                          values: {
                            ...previous.values,
                            [key]: event.target.value,
                          },
                        }))
                      }
                      value={modal.values[key]}
                    />
                  )}
                </label>
              ),
            )}
          </div>
          <div className="admin-modal-note">
            Bản ghi này chỉ được thêm/cập nhật trong dữ liệu demo của giao diện.
          </div>
          <div className="admin-modal-actions">
            <button
              className="admin-secondary-button"
              onClick={() => setModal(null)}
              type="button"
            >
              Hủy
            </button>
            <button className="admin-primary-button" type="submit">
              {modal.mode === "create" ? "Thêm vào danh sách" : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
