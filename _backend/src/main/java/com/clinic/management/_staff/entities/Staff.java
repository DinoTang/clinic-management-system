package com.clinic.management._staff.entities;

import com.clinic.management.common.enums.StaffPosition;
import com.clinic.management._user.entities.User;
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

    @OneToOne
    @JoinColumn(name = "MANGUOIDUNG", referencedColumnName = "MANGUOIDUNG") 
    private User user;

    @Column(name = "VITRI", columnDefinition = "bit")
    private StaffPosition position;

    @Column(name = "NGAYVAOLAM")
    private LocalDate startAt;

    @Column(name = "TRANGTHAIXOA")
    private boolean deleted;

    public Staff(){}
    public Staff(
        User user,
        StaffPosition position
    ){
        this.user = user;
        this.position=position;
        this.startAt=LocalDate.now();
        this.deleted=false;
    }
}