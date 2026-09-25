package com.clinic.management._auth.controllers;

import com.clinic.management._auth.dtos.LoginRequest;
import com.clinic.management._auth.dtos.LoginResponse;
import com.clinic.management._auth.dtos.RegisterRequest;
import com.clinic.management._auth.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@GetMapping("/me")
	public ResponseEntity<LoginResponse> me(
		@RequestHeader("Authorization")
		String bearerToken
	) {
	    String token = bearerToken.startsWith("Bearer ") ? bearerToken.substring(7) : bearerToken;
	    
	    LoginResponse result = authService.me(token);
	    return ResponseEntity.ok(result);
	}

	@PostMapping("/register")
	public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request){
		LoginResponse result = authService.register(request);
		return ResponseEntity.ok(result);
	}

}
