package com.clinic.management._user.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.clinic.management._auth.dtos.*;
import com.clinic.management._user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	User findByUsername(String username);
	User findByEmail(String email);
	boolean existsByUsername(String username);
	boolean existsById(String userId);
    boolean existsByEmail(String email);
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