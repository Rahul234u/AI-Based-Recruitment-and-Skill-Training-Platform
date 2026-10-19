package com.majorProject.RecruitmentAndSkillTrainingPlatform.service;

import java.util.List;

public interface JobCrawlingService {
    void crawlSeedLinks();
    List<String> getAllowedSeedLinks();
}

