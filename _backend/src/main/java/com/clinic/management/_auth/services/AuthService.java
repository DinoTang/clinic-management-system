package com.clinic.management._auth.services;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import com.clinic.management.security.JwtService;
import com.clinic.management._auth.dtos.*;
import com.clinic.management._auth.interfaces.IAuth;
import com.clinic.management._user.services.UserQueryService;
import com.clinic.management._user.services.UserRegistrationService;
import com.clinic.management._user.entities.User;
import com.clinic.management._patient.Patient;
import com.clinic.management._patient.PatientRepository;
import com.clinic.management._doctor.repositories.DoctorRepository;
import com.clinic.management._doctor.entities.Doctor;
import com.clinic.management._staff.repositories.StaffRepository;
import com.clinic.management._staff.entities.Staff;
import com.clinic.management.common.enums.Role;
import java.util.Locale;

@Service 
public class AuthService implements IAuth{
	private final UserQueryService userQueryService;
	private final UserRegistrationService userRegistrationService;
	private final JwtService jwtService;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final StaffRepository staffRepository;

	public AuthService(
		UserQueryService userQueryService,
		UserRegistrationService userRegistrationService,
		JwtService jwtService,
        PatientRepository patientRepository,
        DoctorRepository doctorRepository,
        StaffRepository staffRepository
	){
		this.userQueryService=userQueryService;
		this.userRegistrationService = userRegistrationService;
		this.jwtService = jwtService;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.staffRepository = staffRepository;
	}

	@Override
	public LoginResponse registerLocal(RegisterRequest request){

		if(userQueryService.existsByUsername(request.getUsername())){
			throw new RuntimeException("Tên tài khoản đã tồn tại. Vui lòng thử tên khác");
		}

		if(userQueryService.existsByEmail(request.getEmail())){
			throw new RuntimeException("Email đã tồn tại. Vui lòng thử email khác");
		}

		User user = userRegistrationService.createByLocal(request);
		LoginRequest loginRequest = new LoginRequest(
			request.getUsername(),
			request.getPassword()
		);
		return this.loginLocal(loginRequest);
	}

	@Override
	public LoginResponse registerGoogle(GoogleUserInfo googleUser){
        String sub = googleUser.googleId();;
        
		if(userQueryService.existsByGoogleId(sub)){
			return this.loginGoogle(sub);
		}

		User user = userRegistrationService.createByGoogle(googleUser);
		return this.loginGoogle(sub);
	}


	@Override
	public LoginResponse loginGoogle(String googleId){
		if(!userQueryService.existsByGoogleId(googleId))
			throw new RuntimeException("Email không tồn tại trong hệ thống");

		User user = userQueryService.findByGoogleId(googleId);

		String token = jwtService.generateToken(user.getUsername());
		return createLoginResponse(token, user);
	}

	@Override
	public LoginResponse loginLocal(LoginRequest request){
		User user = userQueryService.findByUsername(request.getUsername());
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		boolean isPassword = encoder.matches(request.getPassword(), user.getPassword());
		if(!isPassword){
			throw new RuntimeException("Tên tài khoản hoặc mật khẩu không chính xác");
		}
		String token = jwtService.generateToken(request.getUsername());
		return createLoginResponse(token, user);
	}

	@Override
	public LoginResponse me(String token){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
	    User user = userQueryService.findByUsername(username);
		return createLoginResponse(token, user);
	}

	private LoginResponse createLoginResponse(String token, User user) {
		LoginResponse response = new LoginResponse(token, user);
		if (user != null && user.getRole() != null) {
			if (user.getRole() == Role.PATIENT) {
				patientRepository.findByUserId(user.getId())
						.map(Patient::getId)
						.ifPresent(response::setPatientId);
			} else if (user.getRole() == Role.DOCTOR) {
				doctorRepository.findByUserId(user.getId())
						.map(Doctor::getId)
						.ifPresent(response::setDoctorId);
			} else if (user.getRole() == Role.STAFF || user.getRole() == Role.ADMIN) {
				staffRepository.findByUserIdAndDeletedFalse(user.getId())
						.or(() -> staffRepository.findByUserId(user.getId()))
						.map(Staff::getId)
						.ifPresent(response::setStaffId);
			}
		}
		return response;
	}

    @Transactional
    public LoginResponse registerPatient(PatientRegisterRequest request) {
        RegisterRequest userRequest = new RegisterRequest(
                request.getPhone(), // Dùng số điện thoại làm username
                request.getPassword(),
                request.getFullName(),
                request.getEmail(),
                request.getPhone()
        );

        // Service này đã kiểm tra username, email, số điện thoại trùng
        // và mã hóa mật khẩu trước khi lưu tài khoản.
        User user = userRegistrationService.createByLocal(userRequest);

        String maxPatientId = patientRepository.findMaxPatientId();
        int nextPatientNumber = maxPatientId == null
                ? 1
                : Integer.parseInt(maxPatientId.substring(2)) + 1;
        String patientId = String.format("BN%03d", nextPatientNumber);

        Patient patient = new Patient(
                patientId,
                user,
                request.getBirthDate(),
                normalizePatientGender(request.getGender()),
                null,
                null,
                null,
                null,
                false
        );
        patientRepository.save(patient);

        // Đăng ký xong trả token luôn; username trong token là số điện thoại.
        return loginLocal(new LoginRequest(request.getPhone(), request.getPassword()));
    }

    private String normalizePatientGender(String gender) {
        if (gender == null || gender.isBlank()) {
            return null;
        }

        return switch (gender.trim().toLowerCase(Locale.ROOT)) {
            case "male", "nam" -> "Nam";
            case "female", "nu", "nữ" -> "Nữ";
            case "other", "khac", "khác" -> "Khác";
            default -> throw new IllegalArgumentException("Giới tính không hợp lệ");
        };
    }

    public LoginResponse loginPatient(PatientLoginRequest request) {
        User user = userQueryService.findByPhone(request.getPhone());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        boolean isPassword = encoder.matches(request.getPassword(), user.getPassword());

        if (!isPassword || user.getRole() != Role.PATIENT) {
            throw new RuntimeException("Số điện thoại hoặc mật khẩu không chính xác");
        }

        String token = jwtService.generateToken(user.getUsername());
        return createLoginResponse(token, user);
    }
}
