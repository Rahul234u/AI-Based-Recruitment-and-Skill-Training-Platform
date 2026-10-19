package com.majorProject.RecruitmentAndSkillTrainingPlatform.service.impl;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.RateLimitService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitServiceImpl implements RateLimitService {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    public boolean allowRequest(String key, int maxRequests, int windowSeconds) {
        String normalizedKey = key == null ? "anonymous" : key;
        Bucket bucket = buckets.computeIfAbsent(normalizedKey, ignored -> new Bucket(windowSeconds));
        long now = Instant.now().getEpochSecond();

        synchronized (bucket) {
            if (now - bucket.windowStart > windowSeconds) {
                bucket.windowStart = now;
                bucket.count = 0;
            }

            if (bucket.count >= maxRequests) {
                return false;
            }
            bucket.count++;
            return true;
        }
    }

    @Override
    public Map<String, Integer> getStats() {
        Map<String, Integer> stats = new ConcurrentHashMap<>();
        buckets.forEach((key, bucket) -> stats.put(key, bucket.count));
        return stats;
    }

    private static class Bucket {
        private long windowStart;
        private int count;

        Bucket(int windowSeconds) {
            this.windowStart = Instant.now().getEpochSecond();
            this.count = 0;
        }
    }
}

