package com.majorProject.RecruitmentAndSkillTrainingPlatform.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public interface RateLimitService {
    boolean allowRequest(String key, int maxRequests, int windowSeconds);
    Map<String, Integer> getStats();
    default Map<String, Integer> getUsageMap() {
        return new ConcurrentHashMap<>();
    }
}

