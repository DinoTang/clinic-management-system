import React from "react";
import "../../styles/desktop-schedule.css";
import { useDoctorSchedule } from "./useDoctorSchedule.js";
import { ScheduleHeader } from "./components/ScheduleHeader.jsx";
import { CreateScheduleForm } from "./components/CreateScheduleForm.jsx";
import { ScheduleListTable } from "./components/ScheduleListTable.jsx";
import { EditScheduleModal } from "./components/EditScheduleModal.jsx";

function SchedulePage() {
  const {
    doctors,
    availableRooms,
    loading,
    loadingRooms,
    searchTerm,
    setSearchTerm,
    formData,
    errors,
    handleDoctorChange,
    handleChange,
    handleCreateSchedule,
    handleFullRefresh,
    filteredSchedules,
    handleOpenEditModal,
    handleDeleteSchedule,
    isEditModalOpen,
    handleCloseEditModal,
    editingScheduleId,
    editFormData,
    editErrors,
    editAvailableRooms,
    editLoadingRooms,
    handleEditDoctorChange,
    handleEditChange,
    handleSaveEdit,
  } = useDoctorSchedule();

  return (
    <div className="schedule-container">
      <ScheduleHeader onRefresh={handleFullRefresh} />

      <div className="schedule-content">
        <CreateScheduleForm
          formData={formData}
          errors={errors}
          doctors={doctors}
          availableRooms={availableRooms}
          loadingRooms={loadingRooms}
          onDoctorChange={handleDoctorChange}
          onChange={handleChange}
          onSubmit={handleCreateSchedule}
        />

        <ScheduleListTable
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          filteredSchedules={filteredSchedules}
          onOpenEditModal={handleOpenEditModal}
          onDeleteSchedule={handleDeleteSchedule}
        />
      </div>

      <EditScheduleModal
        isOpen={isEditModalOpen}
        editingScheduleId={editingScheduleId}
        editFormData={editFormData}
        editErrors={editErrors}
        doctors={doctors}
        editAvailableRooms={editAvailableRooms}
        editLoadingRooms={editLoadingRooms}
        onClose={handleCloseEditModal}
        onDoctorChange={handleEditDoctorChange}
        onChange={handleEditChange}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default SchedulePage;
