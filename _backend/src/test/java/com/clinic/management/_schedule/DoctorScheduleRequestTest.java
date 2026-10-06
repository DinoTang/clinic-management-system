package com.clinic.management._schedule;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDate;
import java.time.LocalTime;
import org.junit.jupiter.api.Test;

class DoctorScheduleRequestTest {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Test
    void ignoresUnrelatedNullDoctorFieldsWhenReadingScheduleRequest() throws Exception {
        String json = """
                {
                  "doctor": {
                    "id": "BS001",
                    "experienceYears": null
                  },
                  "roomId": "P001",
                  "examinationDate": "2026-10-06",
                  "startTime": "07:30:00",
                  "endTime": "11:30:00",
                  "maxPatients": 30
                }
                """;

        DoctorScheduleRequest request = objectMapper.readValue(json, DoctorScheduleRequest.class);

        assertEquals("BS001", request.getDoctor().getId());
        assertEquals("P001", request.getRoomId());
        assertEquals(LocalDate.of(2026, 10, 6), request.getExaminationDate());
        assertEquals(LocalTime.of(7, 30), request.getStartTime());
        assertEquals(30, request.getMaxPatients());
    }
}
