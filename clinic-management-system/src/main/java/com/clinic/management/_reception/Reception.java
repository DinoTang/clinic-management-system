package com.clinic.management._reception;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tiepdonkham")
public class Reception {

    @Id
    @Column(name = "MATIEPDON", length = 20)
    private String id;

    @Column(name = "MABENHNHAN", length = 20, nullable = false)
    private String patientId;

    @Column(name = "MANHANVIEN", length = 20, nullable = false)
    private String employeeId;

    @Column(name = "MAPHONG", length = 20, nullable = false)
    private String roomId;

    @Column(name = "MABACSI", length = 20, nullable = false)
    private String doctorId;

    @Column(name = "MALICHHEN", length = 20)
    private String appointmentId;

    @Column(name = "NGAYTIEPDON", nullable = false)
    private LocalDate receptionDate;

    @Column(name = "SOTHUTU", nullable = false)
    private Integer queueNumber;

    @Column(name = "LOAITIEPDON", length = 20)
    private String receptionType = "TrucTiep";

    @Column(name = "TRANGTHAIHANGDOI", length = 20)
    private String queueStatus = "ChoKham";

    @Column(name = "TRIEUCHUNGBANDAU", columnDefinition = "TEXT")
    private String initialSymptoms;

    @Column(name = "MACH")
    private Integer pulse;

    @Column(name = "NHIETDO", precision = 4, scale = 1)
    private BigDecimal temperature;

    @Column(name = "HUYETAP", length = 20)
    private String bloodPressure;

    @Column(name = "CANNANG", precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "CHIEUCAO", precision = 5, scale = 2)
    private BigDecimal height;

    @Column(name = "THOIGIANTIEPDON", insertable = false, updatable = false)
    private LocalDateTime receptionTime;

    @Column(name = "TRANGTHAIXOA")
    private Boolean deleted = false;

    public Reception() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    public LocalDate getReceptionDate() {
        return receptionDate;
    }

    public void setReceptionDate(LocalDate receptionDate) {
        this.receptionDate = receptionDate;
    }

    public Integer getQueueNumber() {
        return queueNumber;
    }

    public void setQueueNumber(Integer queueNumber) {
        this.queueNumber = queueNumber;
    }

    public String getReceptionType() {
        return receptionType;
    }

    public void setReceptionType(String receptionType) {
        this.receptionType = receptionType;
    }

    public String getQueueStatus() {
        return queueStatus;
    }

    public void setQueueStatus(String queueStatus) {
        this.queueStatus = queueStatus;
    }

    public String getInitialSymptoms() {
        return initialSymptoms;
    }

    public void setInitialSymptoms(String initialSymptoms) {
        this.initialSymptoms = initialSymptoms;
    }

    public Integer getPulse() {
        return pulse;
    }

    public void setPulse(Integer pulse) {
        this.pulse = pulse;
    }

    public BigDecimal getTemperature() {
        return temperature;
    }

    public void setTemperature(BigDecimal temperature) {
        this.temperature = temperature;
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public BigDecimal getHeight() {
        return height;
    }

    public void setHeight(BigDecimal height) {
        this.height = height;
    }

    public LocalDateTime getReceptionTime() {
        return receptionTime;
    }

    public void setReceptionTime(LocalDateTime receptionTime) {
        this.receptionTime = receptionTime;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}