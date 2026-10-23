package com.clinic.management._user.repositories;

import org.springframework.stereotype.Repository;
import com.clinic.management._auth.dtos.*;
import com.clinic.management._user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

@Repository
public interface UserRepository extends 
            JpaRepository<User, String>,
            JpaSpecificationExecutor<User>
    {
	User findByUsername(String username);
	User findByEmail(String email);
    User findByPhone(String phone);
    User findByGoogleId(String googleId);
    boolean existsByGoogleId(String googleId);   
	boolean existsByUsername(String username);
	boolean existsById(String userId);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    long count();

	default User softDeleteById(String userId) {
        User user = this.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại: " + userId));
        
        user.setDeleted(true);
        
        return this.save(user);
    }

	default User hardDeleteById(String userId) {
        User user = this.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại: " + userId));
        
        this.deleteById(userId);
        
        return user;
    }

	default User restoreById(String userId) {
        User user = this.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại: " + userId));
        
        user.setDeleted(false);
        
        return this.save(user);
    }
}