package com.clinic.management._auth.dtos;

public record GoogleUserInfo(
    String googleId,
    String email,
    String fullName,
    String picture
) {}