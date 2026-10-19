package com.majorProject.RecruitmentAndSkillTrainingPlatform.service;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.LoginRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.RegisterRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}

