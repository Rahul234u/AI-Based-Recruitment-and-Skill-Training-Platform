package com.majorProject.RecruitmentAndSkillTrainingPlatform.service.impl;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.LoginRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.RegisterRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.AuthResponse;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.Role;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.UserEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.exception.BadRequestException;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.exception.ConflictException;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.repository.UserRepository;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.security.JwtTokenProvider;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.security.UserDetailsImpl;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ConflictException("User with this email already exists.");
        }

        UserEntity user = UserEntity.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .phone(request.phone())
                .role(Role.USER)
                .build();

        userRepository.save(user);
        return new AuthResponse("", "Bearer", user.getRole().name());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(authentication);
        return new AuthResponse(token, "Bearer", principal.getAuthorities().iterator().next().getAuthority().replace("ROLE_", ""));
    }
}

