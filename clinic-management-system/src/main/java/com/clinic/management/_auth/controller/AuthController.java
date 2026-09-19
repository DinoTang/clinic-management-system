package com.clinic.management._auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity; 

import com.clinic.management.security.JwtService;

import com.clinic.management._user.User;


@RestController
@RequestMapping("/auth")
public class AuthController {
	private final JwtService jwtService;

	public AuthController(JwtService jwtService){
		this.jwtService=jwtService;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user){
		String token = jwtService.generateToken(user.getUsername());
		return ResponseEntity.ok(token);
	}
}
