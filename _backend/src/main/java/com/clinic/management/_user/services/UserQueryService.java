package com.clinic.management._user.services;

import com.clinic.management._user.entities.User;
import com.clinic.management._user.interfaces.IUserQuery;
import com.clinic.management._user.repositories.UserRepository;
import com.clinic.management._auth.dtos.*;
import com.clinic.management.common.enums.Role;
import com.clinic.management.common.enums.UserStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class UserQueryService implements IUserQuery {

    private final UserRepository userRepository;

    public UserQueryService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new RuntimeException("Không tìm thấy người dùng");
        return user;
    }

    @Override
    public User findByGoogleId(String googleId){
        User user = userRepository.findByGoogleId(googleId);
        if(user == null)
            throw new RuntimeException("Không tìm thấy người dùng");
        return user;
    }

    @Override
    public User findByEmail(String email) {
        User user =userRepository.findByEmail(email);
        if(user == null)
            throw new RuntimeException("Không tìm thấy người dùng");
        return user;
    }

    @Override
    public User findById(String userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
    }

    @Override
    public User findByPhone(String phone) {
        User user = userRepository.findByPhone(phone);
        if (user == null) {
            throw new RuntimeException("Số điện thoại hoặc mật khẩu không chính xác");
        }
        return user;
    }

    @Override
    public Page<User> findAll(int page, int size, Role role, UserStatus status) {
        Pageable pageable = PageRequest.of(page, size);

        return userRepository.findAll((root, query, cb) -> cb.and(
            role == null
                ? cb.conjunction() : cb.equal(root.get("role"), role),
            status == null
                ? cb.conjunction() : cb.equal(root.get("status"), status)
        ), pageable);
    }

    @Override
    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone){
        return userRepository.existsByPhone(phone);
    }

    @Override
    public boolean existsByGoogleId(String googleId){
        return userRepository.existsByGoogleId(googleId);
    }

}
