import React from "react";

export default function TreatmentNotesSection({
  exam,
  setExam,
  examEditable,
}) {
  return (
    <div className="exam-form-section" style={{ marginTop: "12px" }}>
      <label htmlFor="ex-notes">
        Ghi chú điều trị <span className="exam-required">*</span>
      </label>
      <textarea
        id="ex-notes"
        rows="2"
        placeholder="Hướng điều trị, dặn dò, theo dõi..."
        value={exam.notes}
        disabled={!examEditable}
        onChange={(e) => setExam({ ...exam, notes: e.target.value })}
      />
    </div>
  );
}
