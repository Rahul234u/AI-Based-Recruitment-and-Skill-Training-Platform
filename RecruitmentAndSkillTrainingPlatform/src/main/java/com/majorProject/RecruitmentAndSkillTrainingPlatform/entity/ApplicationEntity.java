package com.majorProject.RecruitmentAndSkillTrainingPlatform.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "applications",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_user_job_application", columnNames = {"user_id", "job_id"})
        },
        indexes = {
                @Index(name = "idx_applications_user", columnList = "user_id"),
                @Index(name = "idx_applications_job", columnList = "job_id"),
                @Index(name = "idx_applications_applied_at", columnList = "applied_at")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "job_id", nullable = false)
    private JobEntity job;

    @CreationTimestamp
    @Column(name = "applied_at", nullable = false, updatable = false)
    private LocalDateTime appliedAt;

    @Column(length = 50)
    private String status;
}

