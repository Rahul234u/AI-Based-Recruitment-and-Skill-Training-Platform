package com.majorProject.RecruitmentAndSkillTrainingPlatform.service.impl;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.JobResponse;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.JobEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.repository.JobRepository;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.JobMatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class JobMatchingServiceImpl implements JobMatchingService {

    private final JobRepository jobRepository;

    @Override
    public List<JobResponse> matchJobsForResume(String email, List<String> skills, String education, Integer experienceYears, String fieldOfWork) {
        return jobRepository.findAll().stream()
                .filter(job -> job.isActive())
                .map(job -> new JobMatchScore(job, scoreJob(job, skills, education, experienceYears, fieldOfWork)))
                .filter(entry -> entry.score > 0)
                .sorted(Comparator.comparingDouble(JobMatchScore::score).reversed())
                .limit(10)
                .map(entry -> toResponse(entry.job))
                .toList();
    }

    private double scoreJob(JobEntity job, List<String> skills, String education, Integer experienceYears, String fieldOfWork) {
        double score = 0;
        String jobText = (job.getTitle() + " " + job.getDescription() + " " + job.getEligibility() + " " + job.getRelatedTo()).toLowerCase(Locale.ROOT);

        if (education != null && !education.isBlank()) {
            if (jobText.contains(education.toLowerCase(Locale.ROOT))) {
                score += 5.0;
            }
        }

        if (skills != null) {
            for (String skill : skills) {
                if (skill != null && !skill.isBlank() && jobText.contains(skill.toLowerCase(Locale.ROOT))) {
                    score += 2.0;
                }
            }
        }

        if (experienceYears != null) {
            if (experienceYears >= 2) {
                score += 1.0;
            }
        }

        if (fieldOfWork != null && !fieldOfWork.isBlank() && jobText.contains(fieldOfWork.toLowerCase(Locale.ROOT))) {
            score += 1.5;
        }

        return score;
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

    private record JobMatchScore(JobEntity job, double score) {}
}

