package com.clinic.management._user.repositories;

import org.springframework.stereotype.Repository;
import com.clinic.management._user.entities.User;
import com.clinic.management._auth.dtos.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	User findByUsername(String username);
	User findByEmail(String email);
	Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    long count();

}