package com.majorProject.RecruitmentAndSkillTrainingPlatform.service;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.JobRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.JobResponse;

import java.util.List;

public interface JobService {
    List<JobResponse> getAllJobs();
    JobResponse getById(Long id);
    JobResponse createJob(JobRequest request);
    JobResponse updateJob(Long id, JobRequest request);
    void deleteJob(Long id);
}

