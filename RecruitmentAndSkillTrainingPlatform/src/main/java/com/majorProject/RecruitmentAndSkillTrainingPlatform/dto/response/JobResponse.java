package com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response;

import java.time.LocalDate;

public record JobResponse(
        Long id,
        String title,
        String link,
        String description,
        LocalDate deadline,
        String eligibility,
        String relatedTo,
        String source,
        boolean active
) {
}

