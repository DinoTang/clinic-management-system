package com.clinic.management._dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperationItemDTO {
    private String type; // APPOINTMENT, PATIENT_QUEUE, INVOICE, MEDICINE
    private long count;
}
