package com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response;

import java.util.List;

public record ProfileResponse(
        Long id,
        String name,
        String email,
        String phone,
        String education,
        List<String> skills,
        Integer experienceYears,
        String fieldOfWork,
        Double confidenceScore
) {
}

