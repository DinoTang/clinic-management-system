package com.clinic.management._auth.controllers;
import com.clinic.management._auth.dtos.LoginRequest;
import com.clinic.management._auth.dtos.LoginResponse;
import com.clinic.management._auth.dtos.PatientLoginRequest;
import com.clinic.management._auth.dtos.RegisterRequest;
import com.clinic.management._auth.services.AuthService;
import com.clinic.management._auth.dtos.PatientRegisterRequest;
import com.clinic.management._auth.dtos.GoogleUserInfo;
import com.clinic.management._auth.mappers.GoogleUserMapper;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.frontend-url}")
public class AuthController {
	private final AuthService authService;
	private final GoogleUserMapper googleUserMapper;

	public AuthController(
		AuthService authService,
		GoogleUserMapper googleUserMapper
	){
		this.authService=authService;
		this.googleUserMapper = googleUserMapper;
	}

	@GetMapping("/oauth-success")
    public ResponseEntity<?> registerGoogle(
            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        GoogleUserInfo googleUser = googleUserMapper.toDto(principal.getAttributes());
        LoginResponse response =  authService.registerGoogle(googleUser);
        return ResponseEntity.ok(response);
    }

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(
		@Valid
		@RequestBody LoginRequest request){
		LoginResponse result = authService.loginLocal(request);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/patient/login")
	public ResponseEntity<LoginResponse> loginPatient(
		@Valid @RequestBody PatientLoginRequest request
	) {
		LoginResponse result = authService.loginPatient(request);
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
	public ResponseEntity<LoginResponse> register(
		@Valid
		@RequestBody RegisterRequest request){
		LoginResponse result = authService.registerLocal(request);
		return ResponseEntity.ok(result);
	}

    @PostMapping("/patient/register")
    public ResponseEntity<LoginResponse> registerPatient(
            @Valid @RequestBody PatientRegisterRequest request
    ) {
        LoginResponse result = authService.registerPatient(request);
        return ResponseEntity.ok(result);
    }
}
