package com.majorProject.RecruitmentAndSkillTrainingPlatform.controller;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.ResumeInfoRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.JobResponse;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.ProfileResponse;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.JobMatchingService;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.JobService;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.RateLimitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

    private final JobService jobService;
    private final RateLimitService rateLimitService;
    private final JobMatchingService jobMatchingService;

    @PostMapping("/upload-resume")
    public ResponseEntity<String> uploadResume(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok("Resume upload endpoint is ready. File name: " + file.getOriginalFilename());
    }

    @PostMapping("/upload-info")
    public ResponseEntity<ProfileResponse> uploadInfo(@Valid @RequestBody ResumeInfoRequest request) {
        return ResponseEntity.ok(new ProfileResponse(null, request.name(), request.email(), request.phone(), request.education(), request.skills(), request.experienceYears(), request.fieldOfWork(), 0.0));
    }

    @GetMapping("/job-postings")
    public ResponseEntity<List<JobResponse>> getJobPostings() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/job-postings/match")
    public ResponseEntity<List<JobResponse>> getMatchedJobs(
            @RequestParam String email,
            @RequestParam(required = false) List<String> skills,
            @RequestParam(required = false) String education,
            @RequestParam(required = false) Integer experienceYears,
            @RequestParam(required = false) String fieldOfWork) {

        boolean allowed = rateLimitService.allowRequest(email, 3, 60);
        if (!allowed) {
            return ResponseEntity.status(429).build();
        }

        return ResponseEntity.ok(jobMatchingService.matchJobsForResume(email, skills, education, experienceYears, fieldOfWork));
    }

    @GetMapping("/job-postings/apply-job/{id}")
    public ResponseEntity<String> applyJob(@PathVariable Long id) {
        return ResponseEntity.ok("Apply job endpoint is ready for job id: " + id);
    }
}
