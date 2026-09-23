package com.clinic.management._auth.services;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.context.SecurityContextHolder;
import com.clinic.management.security.JwtService;
import com.clinic.management._auth.dtos.*;
import com.clinic.management._auth.interfaces.IAuth;
import com.clinic.management._user.services.UserService;
import com.clinic.management._user.entities.User;

@Service 
public class AuthService implements IAuth{
	private final UserService userService;
	private final JwtService jwtService;

	public AuthService(UserService userService, JwtService jwtService){
		this.userService = userService;
		this.jwtService = jwtService;
	}

	@Override
	public LoginResponse register(RegisterRequest request){

		if(userService.existsByUsername(request.getUsername())){
			throw new RuntimeException("Tên tài khoản đã tồn tại. Vui lòng thử tên khác");
		}

		if(userService.existsByEmail(request.getEmail())){
			throw new RuntimeException("Email đã tồn tại. Vui lòng thử email khác");
		}

		User user = userService.add(request);
		LoginRequest loginRequest = new LoginRequest(
			user.getUsername(),
			user.getPassword()
		);
		return this.login(loginRequest);
	}

	@Override
	public LoginResponse login(LoginRequest request){
		User user = userService.findByUsername(request.getUsername());
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		boolean isPassword = encoder.matches(request.getPassword(), user.getPassword());
		if(!isPassword){
			throw new RuntimeException("Tên tài khoản hoặc mật khẩu không chính xác");
		}
		String token = jwtService.generateToken(request.getUsername());
		return new LoginResponse(
			token,
			user.getId(),
			user.getUsername(),
			user.getEmail(),
			user.getRole()
		);
	}

	@Override
	public LoginResponse me(String token){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();    
	    User user = userService.findByUsername(username);
		return new LoginResponse(
			token,
			user.getId(),
			user.getUsername(),
			user.getEmail(),
			user.getRole()
		);
	}
}
