package com.clinic.management._auth.dtos;

import com.clinic.management._user.entities.User;
import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String type = "Bearer";
    private User user;
    private String patientId;

    public LoginResponse(){}
    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
