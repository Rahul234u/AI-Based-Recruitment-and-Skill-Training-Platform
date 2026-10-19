package com.majorProject.RecruitmentAndSkillTrainingPlatform.repository;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.ApplicationEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.JobEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {
    Optional<ApplicationEntity> findByUserAndJob(UserEntity user, JobEntity job);
    boolean existsByUserAndJob(UserEntity user, JobEntity job);
}

