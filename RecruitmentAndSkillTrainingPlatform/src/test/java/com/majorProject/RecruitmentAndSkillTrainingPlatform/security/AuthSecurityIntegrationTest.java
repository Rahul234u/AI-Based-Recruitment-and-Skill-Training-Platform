package com.majorProject.RecruitmentAndSkillTrainingPlatform.security;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.LoginRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.dto.request.RegisterRequest;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.Role;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.UserEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
class AuthSecurityIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private final ObjectMapper objectMapper = JsonMapper.builder().build();

    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
        userRepository.deleteAll();

        UserEntity admin = UserEntity.builder()
                .email("admin@example.com")
                .password(passwordEncoder.encode("Admin@123"))
                .role(Role.ADMIN)
                .phone("9999999999")
                .build();

        userRepository.save(admin);
    }

    @Test
    void register_shouldCreateUserWithUserRole() throws Exception {
        RegisterRequest request = new RegisterRequest("newuser@example.com", "StrongPass@123", "9876543210");

        mockMvc.perform(post("/home/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void login_shouldReturnJwtToken() throws Exception {
        UserEntity user = UserEntity.builder()
                .email("user@example.com")
                .password(passwordEncoder.encode("StrongPass@123"))
                .role(Role.USER)
                .phone("1234567890")
                .build();
        userRepository.save(user);

        LoginRequest request = new LoginRequest("user@example.com", "StrongPass@123");

        mockMvc.perform(post("/home/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void adminEndpoint_shouldRequireAuthentication() throws Exception {
        mockMvc.perform(get("/admin/job-postings"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void adminEndpoint_shouldAllowAuthorizedAdmin() throws Exception {
        LoginRequest request = new LoginRequest("admin@example.com", "Admin@123");

        String token = mockMvc.perform(post("/home/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String jwt = objectMapper.readTree(token).get("token").asText();

        mockMvc.perform(get("/admin/job-postings")
                        .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk());
    }
}
