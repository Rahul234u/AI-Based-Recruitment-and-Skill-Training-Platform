package com.majorProject.RecruitmentAndSkillTrainingPlatform.controller;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.ResumeInfoRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.JobResponse;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.response.ProfileResponse;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final JobService jobService;

    @PostMapping("/{userId}/upload-resume")
    @PreAuthorize("#userId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<String> uploadResume(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok("Resume upload endpoint is ready for implementation. UserId=" + userId + ", Filename=" + file.getOriginalFilename());
    }

    @PostMapping("/{userId}/upload-info")
    @PreAuthorize("#userId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<ProfileResponse> uploadInfo(@PathVariable Long userId, @Valid @RequestBody ResumeInfoRequest request) {
        return ResponseEntity.ok(new ProfileResponse(userId, request.name(), request.email(), request.phone(), request.education(), request.skills(), request.experienceYears(), request.fieldOfWork(), 0.0));
    }

    @GetMapping("/{userId}/job-postings")
    @PreAuthorize("#userId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<List<JobResponse>> getJobPostings(@PathVariable Long userId) {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{userId}/job-postings/apply-job/{id}")
    @PreAuthorize("#userId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<String> applyJob(@PathVariable Long userId, @PathVariable Long id) {
        return ResponseEntity.ok("Apply job endpoint is ready. UserId=" + userId + ", JobId=" + id);
    }
}

