package com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response;

public record AuthResponse(
        String token,
        String tokenType,
        String role
) {
}

