package com.majorProject.RecruitmentAndSkillTrainingPlatform.service;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.JobResponse;

import java.util.List;

public interface JobMatchingService {
    List<JobResponse> matchJobsForResume(String email, List<String> skills, String education, Integer experienceYears, String fieldOfWork);
}

