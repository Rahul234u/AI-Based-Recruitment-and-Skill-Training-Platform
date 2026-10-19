package com.majorProject.RecruitmentAndSkillTrainingPlatform.controller;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.RateLimitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RateLimitController {

    private final RateLimitService rateLimitService;

    @GetMapping("/rate-limit-check")
    public ResponseEntity<Map<String, Object>> check(@RequestParam(defaultValue = "anonymous") String user) {
        boolean allowed = rateLimitService.allowRequest(user, 5, 60);
        return ResponseEntity.ok(Map.of(
                "user", user,
                "allowed", allowed,
                "stats", rateLimitService.getStats()
        ));
    }
}

