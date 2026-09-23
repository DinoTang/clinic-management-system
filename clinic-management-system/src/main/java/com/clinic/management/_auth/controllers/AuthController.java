package com.clinic.management._auth.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;


import org.springframework.http.ResponseEntity; 
import com.clinic.management._auth.services.AuthService;
import com.clinic.management._auth.dtos.*;

import com.clinic.management._user.entities.User;


@RestController
@RequestMapping("/auth")
public class AuthController {
	private final AuthService authService;

	public AuthController(AuthService authService){
		this.authService=authService;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
		LoginResponse result = authService.login(request);
		return ResponseEntity.ok(result);
	}
}
