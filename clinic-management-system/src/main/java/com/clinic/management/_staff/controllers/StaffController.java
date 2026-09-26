package com.clinic.management._staff;

import com.clinic.management._staff.dtos.ProfileCreateRequest;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management._staff.interfaces.IStaffQuery;
import com.clinic.management._staff.interfaces.IStaffCreate;
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
import java.util.List;

@RestController
@RequestMapping("/api/staffs")
public class StaffController {

    private final IStaffCreate staffCreateService;    
    private final IStaffQuery staffQueryService;    

    public StaffController(
        IStaffQuery staffQueryService,
        IStaffCreate staffCreateService
    ){
        this.staffQueryService=staffQueryService;
        this.staffCreateService=staffCreateService;
    }

    // @GetMapping
    // public ResponseEntity<List<User>> findAll(){
    //     List<User> result = userQueryService.findAll();
    //     return ResponseEntity.ok(result);
    // }

    @PostMapping
    public ResponseEntity<Staff> create(
        @RequestBody ProfileCreateRequest request
    ){
        Staff result = staffCreateService.create(request);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<Staff>> findAll(){
        List<Staff> staffs = staffQueryService.findAll();
        return ResponseEntity.ok(staffs);
    }
}