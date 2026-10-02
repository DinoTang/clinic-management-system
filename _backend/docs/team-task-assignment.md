# Team Task Assignment - Clinic Management System

## 1. Project Overview

**Project Name:** Clinic Management System

**Technology Stack:**

- Backend: Spring Boot
- Database: MySQL
- ORM: Hibernate / JPA
- API: RESTful API
- Architecture: Layered Architecture

Architecture flow:

```
Controller
      |
      |
Service
      |
      |
Repository
      |
      |
Database
```

---

# 2. Team Structure

Project is divided into 3 main modules:

```
Clinic Management System

            Backend

----------------------------------

Member 1        Member 2        Member 3

System          Examination     Medicine &
Management      Flow            Payment

Auth            Patient         Prescription
User            Appointment     Invoice
Employee        Medical Record  Service
```

---

# 3. Member 1 - Authentication & System Management

## Responsibilities

Responsible for system foundation, authentication and user management.

---

## Modules

### 1. Authentication

Functions:

- Login
- Logout
- Authentication
- Authorization
- Role management

Roles:

```
ADMIN
BACSI
NHANVIEN
BENHNHAN
```

---

### 2. User Management

Database:

```
NGUOIDUNG
```

Functions:

- Create user
- Update user information
- Delete user
- Manage account status
- Manage roles

APIs:

```
POST   /api/auth/login

GET    /api/users

GET    /api/users/{id}

POST   /api/users

PUT    /api/users/{id}

DELETE /api/users/{id}
```

---

### 3. Employee Management

Database:

```
NHANVIEN
```

Functions:

- Manage employee profile
- Manage working information


APIs:

```
GET    /api/employees

GET    /api/employees/{id}

POST   /api/employees

PUT    /api/employees/{id}

DELETE /api/employees/{id}
```

---

## Deliverables

Member 1 completes:

- Security configuration
- Authentication
- User CRUD
- Employee CRUD
- Common configuration


---

# 4. Member 2 - Patient & Examination Management

## Responsibilities

Responsible for patient examination workflow.

---

## Modules


# 4.1 Patient Management

Database:

```
BENHNHAN
```

Functions:

- Manage patient profile
- Store medical history information


APIs:

```
GET    /api/patients

GET    /api/patients/{id}

POST   /api/patients

PUT    /api/patients/{id}

DELETE /api/patients/{id}
```

---

# 4.2 Appointment Management

Database:

```
LICHHENKHAM
```

Functions:

- Create appointment
- View appointment
- Update appointment status
- Cancel appointment


APIs:

```
POST /api/appointments

GET  /api/appointments

GET  /api/appointments/{id}

PUT  /api/appointments/{id}/status
```

---

# 4.3 Doctor Schedule

Database:

```
LICHTRUCBACSI
```

Functions:

- Manage doctor working schedule
- Manage available examination slots


APIs:

```
GET  /api/doctor-schedules

POST /api/doctor-schedules
```

---

# 4.4 Reception Management

Database:

```
TIEPDONKHAM
```

Business flow:

```
Patient arrives

        |

Reception staff creates examination record

        |

Waiting queue

        |

Doctor examination
```

APIs:

```
POST /api/receptions

GET  /api/receptions/waiting

PUT  /api/receptions/{id}/status
```

---

# 4.5 Medical Record

Database:

```
BENHAN
```

Functions:

- Diagnosis
- Symptoms
- Doctor notes


APIs:

```
POST /api/medical-records

GET  /api/medical-records/{id}

PUT  /api/medical-records/{id}
```

---

## Deliverables

Member 2 completes:

- Patient management
- Appointment
- Doctor schedule
- Reception workflow
- Medical record


---

# 5. Member 3 - Medicine & Payment Management

## Responsibilities

Responsible for medication, services and payment workflow.

---

# 5.1 Doctor Information

Database:

```
BACSI
CHUYENKHOA
PHONGKHAM
```

Functions:

- Manage doctor information
- Manage specialties
- Manage examination rooms


APIs:

```
GET /api/doctors

GET /api/doctors/{id}
```

---

# 5.2 Medicine Management

Database:

```
THUOC
```

Functions:

- Medicine catalog
- Medicine inventory
- Medicine information


APIs:

```
GET    /api/medicines

POST   /api/medicines

PUT    /api/medicines/{id}

DELETE /api/medicines/{id}
```

---

# 5.3 Prescription Management

Database:

```
DONTHUOC
CHITIETDONTHUOC
```

Business flow:

```
Medical Record

        |

Prescription

        |

Prescription Detail

        |

Payment
```


APIs:

```
POST /api/prescriptions

GET  /api/prescriptions/{id}

POST /api/prescriptions/{id}/items
```

---

# 5.4 Service Management

Database:

```
DICHVU
CHIDINHDICHVU
```

Functions:

- Manage medical services
- Create service orders
- Update results


APIs:

```
GET  /api/services

POST /api/service-orders

PUT  /api/service-orders/{id}/result
```

---

# 5.5 Invoice Management

Database:

```
HOADON
CHITIETHOADON
```

Business flow:

```
Examination

+

Medicine

+

Medical Service

        |

Invoice
```


APIs:

```
POST /api/invoices

GET  /api/invoices/{id}

PUT  /api/invoices/{id}/payment
```

---

## Deliverables

Member 3 completes:

- Doctor information
- Medicine management
- Prescription
- Medical services
- Invoice
- Payment


---

# 6. Database Ownership

| Table | Owner |
|---|---|
| NGUOIDUNG | Member 1 |
| NHANVIEN | Member 1 |
| BENHNHAN | Member 2 |
| LICHHENKHAM | Member 2 |
| LICHTRUCBACSI | Member 2 |
| TIEPDONKHAM | Member 2 |
| BENHAN | Member 2 |
| BACSI | Member 3 |
| CHUYENKHOA | Member 3 |
| PHONGKHAM | Member 3 |
| THUOC | Member 3 |
| DONTHUOC | Member 3 |
| CHITIETDONTHUOC | Member 3 |
| DICHVU | Member 3 |
| CHIDINHDICHVU | Member 3 |
| HOADON | Member 3 |
| CHITIETHOADON | Member 3 |

---

# 7. Development Workflow

Git branch:

```
main

develop

feature/auth
feature/patient
feature/payment
```

Rules:

- Each member works on own feature branch.
- Do not directly modify another member's module.
- Changes affecting shared Entity must be discussed before merging.
- Merge feature branch into develop after testing.

---

# 8. Development Order

## Sprint 1

Member 1:

- Database connection
- Security
- User module


Member 2:

- Patient module


Member 3:

- Medicine module


---

## Sprint 2

Implement:

- Appointment
- Reception
- Medical Record
- Prescription
- Invoice


---

## Sprint 3

Complete:

- API testing
- Swagger documentation
- Integration testing
- Bug fixing
- Deployment
