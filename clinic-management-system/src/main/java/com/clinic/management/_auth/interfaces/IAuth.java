package com.clinic.management._auth.interfaces;

import com.clinic.management._auth.dtos.*;

public interface IAuth{
	LoginResponse register(RegisterRequest request);
	LoginResponse login(LoginRequest request);
	LoginResponse me(String token);

}
