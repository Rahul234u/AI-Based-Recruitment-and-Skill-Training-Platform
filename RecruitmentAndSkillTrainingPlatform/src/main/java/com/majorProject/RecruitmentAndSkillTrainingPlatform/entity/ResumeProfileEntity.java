package com.majorProject.RecruitmentAndSkillTrainingPlatform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "resume_profiles",
        indexes = {
                @Index(name = "idx_resume_user", columnList = "user_id")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String storedPath;

    @Column(nullable = false)
    private String contentType;

    @Column(nullable = false)
    private Long fileSize;

    @Column(length = 255)
    private String parsedName;

    @Column(length = 255)
    private String parsedEmail;

    @Column(length = 50)
    private String parsedPhone;

    @Column(length = 1000)
    private String skills;

    @Column(length = 1000)
    private String education;

    @Column(length = 1000)
    private String fieldOfWork;

    private Integer experienceYears;

    private Double confidenceScore;

    @Column(columnDefinition = "TEXT")
    private String rawAiResponse;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}

