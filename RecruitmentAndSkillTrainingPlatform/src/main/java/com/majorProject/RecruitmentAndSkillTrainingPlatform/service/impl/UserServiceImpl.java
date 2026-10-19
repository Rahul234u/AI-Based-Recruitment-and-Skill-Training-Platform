package com.majorProject.RecruitmentAndSkillTrainingPlatform.service.impl;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.ProfileResponse;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.ResumeProfileEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.UserEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.exception.ResourceNotFoundException;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.repository.ResumeProfileRepository;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.repository.UserRepository;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ResumeProfileRepository resumeProfileRepository;

    @Override
    @Transactional
    public ProfileResponse createOrUpdateProfile(Long userId, String name, String email, String phone, String education, List<String> skills, Integer experienceYears, String fieldOfWork) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        ResumeProfileEntity profile = ResumeProfileEntity.builder()
                .user(user)
                .fileName(name + "-resume")
                .storedPath("/tmp/" + userId)
                .contentType("application/octet-stream")
                .fileSize(0L)
                .parsedName(name)
                .parsedEmail(email)
                .parsedPhone(phone)
                .skills(skills == null ? "" : String.join(",", skills))
                .education(education)
                .fieldOfWork(fieldOfWork)
                .experienceYears(experienceYears)
                .confidenceScore(0.0)
                .build();

        resumeProfileRepository.save(profile);

        return new ProfileResponse(user.getId(), name, email, phone, education, skills, experienceYears, fieldOfWork, 0.0);
    }
}

