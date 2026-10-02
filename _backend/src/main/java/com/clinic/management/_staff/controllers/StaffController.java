package com.clinic.management._staff;

import com.clinic.management.common.enums.StaffPosition;
import com.clinic.management._staff.dtos.ProfileCreateRequest;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.interfaces.IStaffCreate;
import com.clinic.management._staff.interfaces.IStaffDelete;
import com.clinic.management._staff.interfaces.IStaffUpdate;
import com.clinic.management._staff.interfaces.IStaffQuery;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity; 
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/staffs")
public class StaffController {
    private final IStaffCreate staffCreateService;
    private final IStaffDelete staffDeleteService;
    private final IStaffUpdate staffUpdateService;
    private final IStaffQuery staffQueryService;    

    public StaffController(
        IStaffUpdate staffUpdateService,
        IStaffDelete staffDeleteService,
        IStaffQuery staffQueryService,
        IStaffCreate staffCreateService
    ){
        this.staffUpdateService=staffUpdateService;
        this.staffDeleteService = staffDeleteService;
        this.staffQueryService=staffQueryService;
        this.staffCreateService=staffCreateService;
    }

    @PostMapping
    public ResponseEntity<Staff> create(
        @Valid
        @RequestBody ProfileCreateRequest request
    ){
        Staff result = staffCreateService.create(request);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<Page<Staff>> findAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Page<Staff> staffs = staffQueryService.findAll(page, size);

        return ResponseEntity.ok(staffs);
    }

    @GetMapping("/{staffId}")
    public ResponseEntity<Staff> findById(
        @PathVariable String staffId
    ){
        Staff staff = staffQueryService.findById(staffId);
        return ResponseEntity.ok(staff);
    }

    @PutMapping("/update-position/{staffId}")
    public ResponseEntity<Staff> updatePosition(
        @PathVariable String staffId,
        @RequestBody StaffPosition request
    ){
        Staff staff = staffUpdateService.updatePosition(staffId, request);
        return ResponseEntity.ok(staff);
    }

    @DeleteMapping("/soft-delete/{staffId}")
    public ResponseEntity<Staff> softDeleteById(
        @PathVariable String staffId
    ){
        Staff staff = staffDeleteService.softDeleteById(staffId);
        return ResponseEntity.ok(staff);
    }

    @DeleteMapping("/hard-delete/{staffId}")
    public ResponseEntity<Staff> hardDeleteById(
        @PathVariable String staffId
    ){
        Staff staff = staffDeleteService.hardDeleteById(staffId);
        return ResponseEntity.ok(staff);
    }

    @PutMapping("/restore/{staffId}")
    public ResponseEntity<Staff> restoreById(
        @PathVariable String staffId
    ){
        Staff staff = staffDeleteService.restoreById(staffId);
        return ResponseEntity.ok(staff);
    }
}