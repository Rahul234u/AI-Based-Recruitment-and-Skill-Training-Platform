package com.majorProject.RecruitmentAndSkillTrainingPlatform.repository;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.ResumeProfileEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeProfileRepository extends JpaRepository<ResumeProfileEntity, Long> {
    List<ResumeProfileEntity> findByUser(UserEntity user);
}

