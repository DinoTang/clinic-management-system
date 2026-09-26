package com.clinic.management._staff.entities;

import com.clinic.management.common.enums.StaffPosition;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Table(name = "NHANVIEN")
@Data
public class Staff {

    @Id
    @Column(name = "MANHANVIEN")
    private String id;

    @Column(name = "MANGUOIDUNG")
    private String userId;

    @Column(name = "VITRI", columnDefinition = "bit")
    private StaffPosition position;

    @Column(name = "NGAYVAOLAM")
    private LocalDate startAt;

    @Column(name = "TRANGTHAIXOA")
    private boolean deleted;

    public Staff(){}
    public Staff(
        String userId,
        StaffPosition position
    ){
        this.userId = userId;
        this.position=position;
        this.startAt=LocalDate.now();
        this.deleted=false;
    }

    // Getter and Setter 
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}

    public String getUserId() {return userId;}
    public void setUserId(String userId) {this.userId = userId;}

    public LocalDate getStartAt() {return startAt;}
    public void setStartAt(LocalDate startAt) {this.startAt = startAt;}

    public boolean getDeleted() {return deleted;}
    public void setDeleted(boolean deleted) {this.deleted = deleted;}
}