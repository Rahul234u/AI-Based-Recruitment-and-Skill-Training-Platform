package com.majorProject.RecruitmentAndSkillTrainingPlatform.repository;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Long> {
}

