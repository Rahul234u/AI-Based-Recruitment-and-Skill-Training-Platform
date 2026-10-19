package com.majorProject.RecruitmentAndSkillTrainingPlatform.service;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.ProfileResponse;

public interface UserService {
    ProfileResponse createOrUpdateProfile(Long userId, String name, String email, String phone, String education, java.util.List<String> skills, Integer experienceYears, String fieldOfWork);
}

