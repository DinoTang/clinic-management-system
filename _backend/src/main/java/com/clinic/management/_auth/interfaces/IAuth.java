package com.clinic.management._auth.interfaces;

import com.clinic.management._auth.dtos.*;

public interface IAuth{
	LoginResponse registerLocal(RegisterRequest request);
	LoginResponse registerGoogle(GoogleUserInfo googleUser);
	LoginResponse loginLocal(LoginRequest request);
	LoginResponse loginGoogle(String googleId);
	LoginResponse me(String token);
}
