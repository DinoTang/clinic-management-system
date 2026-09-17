clinic-management-system
│
├── .mvn
│   └── wrapper
│
├── docs
│   │
│   ├── requirements
│   │   ├── scope.md
│   │   ├── business-rules.md
│   │   └── status-flow.md
│   │
│   ├── database
│   │   ├── erd.png
│   │   └── database-design.md
│   │
│   ├── api
│   │   └── api-contract.md
│   │
│   └── architecture
│       └── project-architecture.md
│
│
├── src
│   │
│   ├── main
│   │   │
│   │   ├── java
│   │   │   └── com
│   │   │       └── clinic
│   │   │           └── management
│   │   │
│   │   │
│   │   │               ├── ClinicManagementApplication.java
│   │   │               │
│   │   │               ├── common
│   │   │               │   │
│   │   │               │   ├── exception
│   │   │               │   │   ├── GlobalExceptionHandler.java
│   │   │               │   │   └── BusinessException.java
│   │   │               │   │
│   │   │               │   ├── response
│   │   │               │   │   └── ApiResponse.java
│   │   │               │   │
│   │   │               │   ├── enums
│   │   │               │   │   ├── Role.java
│   │   │               │   │   ├── Status.java
│   │   │               │   │   └── PaymentStatus.java
│   │   │               │   │
│   │   │               │   └── utils
│   │   │               │       └── DateUtils.java
│   │   │               │
│   │   │               │
│   │   │               ├── config
│   │   │               │   ├── SecurityConfig.java
│   │   │               │   ├── SwaggerConfig.java
│   │   │               │   └── JpaConfig.java
│   │   │               │
│   │   │               │
│   │   │               ├── security
│   │   │               │   ├── JwtAuthenticationFilter.java
│   │   │               │   ├── JwtService.java
│   │   │               │   └── CustomUserDetailsService.java
│   │   │               │
│   │   │               │
│   │   │               ├── auth
│   │   │               │   ├── controller
│   │   │               │   │   └── AuthController.java
│   │   │               │   │
│   │   │               │   ├── service
│   │   │               │   │   ├── AuthService.java
│   │   │               │   │   └── AuthServiceImpl.java
│   │   │               │   │
│   │   │               │   └── dto
│   │   │               │       ├── LoginRequest.java
│   │   │               │       └── RegisterRequest.java
│   │   │               │
│   │   │               │
│   │   │               ├── user
│   │   │               │   ├── entity
│   │   │               │   │   └── User.java
│   │   │               │   ├── repository
│   │   │               │   │   └── UserRepository.java
│   │   │               │   ├── service
│   │   │               │   │   ├── UserService.java
│   │   │               │   │   └── UserServiceImpl.java
│   │   │               │   ├── controller
│   │   │               │   │   └── UserController.java
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── patient
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── doctor
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── employee
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── appointment
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── reception
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── examination
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── prescription
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── medicine
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               ├── invoice
│   │   │               │   ├── controller
│   │   │               │   ├── service
│   │   │               │   ├── repository
│   │   │               │   ├── entity
│   │   │               │   └── dto
│   │   │               │
│   │   │               │
│   │   │               └── medicalservice
│   │   │                   ├── controller
│   │   │                   ├── service
│   │   │                   ├── repository
│   │   │                   ├── entity
│   │   │                   └── dto
│   │   │
│   │   │
│   │   └── resources
│   │       │
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       └── application-prod.properties
│   │
│   │
│   └── test
│       └── java
│
│
├── pom.xml
│
├── README.md
│
├── .gitignore
│
└── mvnw