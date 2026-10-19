package com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record JobRequest(
        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "Link is required")
        String link,

        @NotBlank(message = "Description is required")
        String description,

        @NotNull(message = "Deadline is required")
        LocalDate deadline,

        String eligibility,
        String relatedTo,
        String source
) {
}

