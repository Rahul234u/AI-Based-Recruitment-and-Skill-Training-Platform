package com.majorProject.RecruitmentAndSkillTrainingPlatform.entity;

//import com.majorProject.RecruitmentAndSkillTrainingPlatform.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="UserEntity")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String username;
    private String password;

//    @Enumerated(EnumType.STRING)
//    private Role role;
}
