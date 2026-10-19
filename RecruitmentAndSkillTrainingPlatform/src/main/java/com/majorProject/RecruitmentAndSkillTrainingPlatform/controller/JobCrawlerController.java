package com.majorProject.RecruitmentAndSkillTrainingPlatform.controller;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.JobCrawlingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class JobCrawlerController {

    private final JobCrawlingService jobCrawlingService;

    @PostMapping("/crawl-jobs")
    public ResponseEntity<Map<String, String>> triggerCrawl() {
        jobCrawlingService.crawlSeedLinks();
        return ResponseEntity.ok(Map.of("status", "crawl_started", "message", "Job crawler executed against approved seed links."));
    }

    @GetMapping("/crawler/seeds")
    public ResponseEntity<Map<String, Object>> getSeeds() {
        return ResponseEntity.ok(Map.of("seeds", jobCrawlingService.getAllowedSeedLinks()));
    }
}
