package com.clinic.management._schedule;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DoctorScheduleRequest {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DoctorReference {
        private String id;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }

    private DoctorReference doctor;
    private String roomId;
    private LocalDate examinationDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer maxPatients;
    private String status;
}
