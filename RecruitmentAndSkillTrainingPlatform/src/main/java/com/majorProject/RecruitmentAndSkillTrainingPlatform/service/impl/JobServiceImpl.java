package com.majorProject.RecruitmentAndSkillTrainingPlatform.service.impl;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.JobRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.JobResponse;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.JobEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.exception.ResourceNotFoundException;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.repository.JobRepository;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    @Override
    @Transactional(readOnly = true)
    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public JobResponse getById(Long id) {
        JobEntity job = findJobEntity(id);
        return toResponse(job);
    }

    @Override
    @Transactional
    public JobResponse createJob(JobRequest request) {
        JobEntity job = JobEntity.builder()
                .title(request.title())
                .link(request.link())
                .description(request.description())
                .deadline(request.deadline())
                .eligibility(request.eligibility())
                .relatedTo(request.relatedTo())
                .source(request.source())
                .active(true)
                .build();

        return toResponse(jobRepository.save(job));
    }

    @Override
    @Transactional
    public JobResponse updateJob(Long id, JobRequest request) {
        JobEntity job = findJobEntity(id);
        job.setTitle(request.title());
        job.setLink(request.link());
        job.setDescription(request.description());
        job.setDeadline(request.deadline());
        job.setEligibility(request.eligibility());
        job.setRelatedTo(request.relatedTo());
        job.setSource(request.source());

        return toResponse(jobRepository.save(job));
    }

    @Override
    @Transactional
    public void deleteJob(Long id) {
        JobEntity job = findJobEntity(id);
        jobRepository.delete(job);
    }

    private JobEntity findJobEntity(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
    }

    private JobResponse toResponse(JobEntity job) {
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getLink(),
                job.getDescription(),
                job.getDeadline(),
                job.getEligibility(),
                job.getRelatedTo(),
                job.getSource(),
                job.isActive()
        );
    }
}
