# AI-Based Job Discovery System — Project Analysis

## 1) Current project state

The workspace already contains a Spring Boot application scaffold, but it is still in an early prototype stage rather than a production-ready backend implementation.

Key findings from inspection:
- Base project created with Spring Boot and JPA.
- MySQL dependency is configured.
- Security starter is commented out in `pom.xml`.
- `application.properties` contains hardcoded DB credentials and a dev-style user configuration.
- The application uses `spring.jpa.hibernate.auto-ddl=create`, which is acceptable only for development and not for production.
- No custom JWT security, repository layer, service layer, DTOs, or controller business logic exist yet.
- `HomeController` is just a placeholder.
- `UserEntity` is a minimal prototype entity and does not match the domain model described in the project brief.

Important mismatch to note:
- The prompt requires Java 21, but the current `pom.xml` declares `java.version=25`.
- The project brief requires a proper JWT + role-based system, but security is currently disabled or not implemented.

This means the project is not yet at a production-grade implementation stage, and the architecture below should be treated as the target design to implement next.

---

## 2) Proposed project architecture

### Layered architecture

The backend should follow the required layered structure:

Controller
↓
Service
↓
Repository
↓
Database

Responsibilities:
- Controller: handles HTTP requests, validation, and response mapping.
- Service: contains business logic and orchestration.
- Repository: persistence access using Spring Data JPA.
- Entity: persistence model only.
- DTO: input/output transport model.
- Exception layer: central `@RestControllerAdvice` error handling.
- Security layer: JWT auth, role checks, filters, and password encoding.
- AI layer: abstraction over Ollama/provider-specific logic.

### Recommended package structure

```text
src/main/java/com/majorProject/RecruitmentAndSkillTrainingPlatform/
├── config/
│   ├── SecurityConfig.java
│   ├── JwtConfig.java
│   ├── OpenApiConfig.java (optional)
│   └── AppProperties.java
├── controller/
│   ├── AuthController.java
│   ├── HomeController.java
│   ├── UserController.java
│   └── AdminController.java
├── dto/
│   ├── request/
│   │   ├── RegisterRequest.java
│   │   ├── LoginRequest.java
│   │   ├── ResumeUploadRequest.java
│   │   ├── JobRequest.java
│   │   └── ApplyJobRequest.java
│   └── response/
│       ├── JwtResponse.java
│       ├── UserResponse.java
│       ├── JobResponse.java
│       ├── JobPostingResponse.java
│       └── ApiErrorResponse.java
├��─ entity/
│   ├── UserEntity.java
│   ├── JobEntity.java
│   ├── ApplicationEntity.java
│   ├── ResumeProfileEntity.java
│   └── Role.java
├── repository/
│   ├── UserRepository.java
│   ├── JobRepository.java
│   ├── ApplicationRepository.java
│   └── ResumeProfileRepository.java
├── service/
│   ├── AuthService.java
│   ├── JobService.java
│   ├── UserService.java
│   ├── ResumeService.java
│   ├── ApplicationService.java
│   ├── RateLimitService.java
│   └── impl/
│       ├── AuthServiceImpl.java
│       ├── JobServiceImpl.java
│       ├── ResumeServiceImpl.java
│       └── ApplicationServiceImpl.java
├── security/
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   ├── UserDetailsImpl.java
│   └── CustomUserDetailsService.java
├── ai/
│   ├── AIService.java
│   ├── OllamaAIService.java
│   ├── AIResponseValidator.java
│   └── model/
│       ├── ResumeAnalysisResult.java
│       └── JobRelevanceResult.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── BadRequestException.java
│   ├── UnauthorizedException.java
│   ├── ForbiddenException.java
│   └── ConflictException.java
├── util/
│   ├── FileValidationUtil.java
│   ├── PasswordUtil.java
│   └── DateTimeUtil.java
└── RecruitmentAndSkillTrainingPlatformApplication.java
```

### Design decision

The project should separate domain persistence (`entity`) from API contracts (`dto`) and keep all business logic inside `service`. This prevents controllers from becoming too large and keeps validation and security logic clean and testable.

---

## 3) Database ER design

### Core domain rules

The project is a recruitment + AI matching platform with the following relationships:
- One user can apply to many jobs.
- One job can have many applicants.
- A user may upload one or more resumes/profile snapshots.
- Each application should record the fact that the user applied to a specific job and when it happened.
- A job should support AI-based relevance filtering and user matchmaking.

### Proposed entities

#### 1. User
Fields:
- `id` (PK)
- `email` (unique, indexed)
- `password` (hashed)
- `phone`
- `role` (enum: USER, ADMIN)
- `createdAt`
- `updatedAt`

Relationships:
- One-to-many: `User` -> `Application`
- One-to-many: `User` -> `ResumeProfile`

#### 2. Job
Fields:
- `id` (PK)
- `title`
- `link`
- `description`
- `deadline`
- `eligibility`
- `relatedTo` (e.g., developer, clerk, CA, lawyer)
- `source`
- `isActive`
- `createdAt`
- `updatedAt`

Relationships:
- One-to-many: `Job` -> `Application`

#### 3. Application
Fields:
- `id` (PK)
- `userId` (FK to User)
- `jobId` (FK to Job)
- `appliedAt`
- `status` (PENDING, APPLIED, REJECTED, etc.)
- `coverNote` (optional)

Constraint:
- Unique composite index on `(user_id, job_id)` so a user cannot apply to the same job twice.

#### 4. ResumeProfile
Fields:
- `id` (PK)
- `userId` (FK to User)
- `fileName`
- `storedFilePath` or object storage reference
- `contentType`
- `fileSize`
- `parsedName`
- `parsedEmail`
- `parsedPhone`
- `skills` (JSON or text)
- `education`
- `experienceYears`
- `fieldOfWork`
- `confidenceScore`
- `rawAiResponse` (stored only if needed; handle carefully)
- `createdAt`

This entity captures the AI-extracted candidate profile used for job matching.

### Relationships summary

```text
User 1 --- * ResumeProfile
User 1 --- * Application
Job  1 --- * Application
```

### Primary keys and foreign keys
- `User.id` -> PK
- `Job.id` -> PK
- `Application.id` -> PK
- `Application.user_id` -> FK to `User.id`
- `Application.job_id` -> FK to `Job.id`
- `ResumeProfile.user_id` -> FK to `User.id`

### Recommended indexes
- `User.email` -> unique index
- `Job.title` -> index
- `Job.related_to` -> index
- `Job.deadline` -> index
- `Application.user_id` -> index
- `Application.job_id` -> index
- `Application(user_id, job_id)` -> unique index
- `ResumeProfile.user_id` -> index

### N+1 considerations
Potential N+1 queries can occur if:
- loading a user and then fetching all applications
- loading jobs and then fetching applicants
- loading resume profiles for many users

Mitigation:
- Use `@EntityGraph` or fetch joins where needed.
- Keep application listing queries explicit and paginated.
- Avoid lazy-loading large object graphs in REST responses.

### Proposed schema rationale
This schema is designed to keep the system normalized while supporting AI-assisted matching and duplicate prevention. Application is modeled as a separate aggregate table rather than a simple collection on `User` to allow explicit timestamps, status tracking, and future analytics.

---

## 4) API specification

The system requires a set of public and authenticated endpoints. Below is the target design.

### Authentication endpoints

#### 1. `POST /home/register`
- Purpose: register a new user
- Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "StrongPass@123",
    "phone": "+919876543210"
  }
  ```
- Response body:
  ```json
  {
    "userId": 1,
    "email": "user@example.com",
    "role": "USER"
  }
  ```
- Status: `201 CREATED`
- Auth: none
- Authorization: none
- Validation: `@Email`, `@NotBlank`, `@Size`, password policy
- Errors: duplicate email, weak password, invalid payload

#### 2. `POST /home/login`
- Purpose: authenticate user and return JWT
- Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "StrongPass@123"
  }
  ```
- Response body:
  ```json
  {
    "token": "jwt-token",
    "tokenType": "Bearer",
    "role": "USER"
  }
  ```
- Status: `200 OK`
- Auth: none
- Authorization: none
- Validation: not blank email/password
- Errors: invalid credentials, locked account, 429 on rate limiting

#### 3. `POST /home/login/forgot-password`
- Purpose: request password reset or recovery flow
- Request body:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- Response body:
  ```json
  {
    "message": "Password reset instructions sent."
  }
  ```
- Status: `200 OK`
- Auth: none
- Authorization: none
- Validation: valid email
- Errors: email not found, rate limit exceeded

### Home/public endpoints

#### 4. `POST /home/upload-resume`
- Purpose: upload resume for AI analysis without login; rate-limited
- Request body: multipart/form-data
  - file
  - optional metadata
- Response body:
  ```json
  {
    "resumeId": 10,
    "status": "processed",
    "candidate": {
      "name": "Rahul",
      "email": "rahul@example.com",
      "skills": ["Java", "Spring Boot"],
      "experienceYears": 2,
      "fieldOfWork": "Software Development"
    }
  }
  ```
- Status: `200 OK`
- Auth: none for upload preview access, but rate-limited
- Authorization: none
- Validation: file type, size, safe filename, content-type check
- Errors: unsupported file, file too large, invalid content, AI failure

#### 5. `POST /home/upload-info`
- Purpose: manual profile info update for non-logged-in or guest users
- Request body:
  ```json
  {
    "name": "Rahul",
    "email": "rahul@example.com",
    "skills": ["Java", "Spring Boot"],
    "education": "B.Tech",
    "experienceYears": 2,
    "fieldOfWork": "IT"
  }
  ```
- Response body: profile summary
- Status: `200 OK`
- Auth: none
- Authorization: none
- Validation: required fields, email format, skills size
- Errors: invalid request

#### 6. `GET /home/job-postings`
- Purpose: list job postings for public browsing, with guest rate limit
- Response body:
  ```json
  {
    "jobs": [
      {
        "id": 1,
        "title": "Java Developer",
        "company": "Example Corp",
        "location": "Remote",
        "deadline": "2026-12-31"
      }
    ]
  }
  ```
- Status: `200 OK`
- Auth: none
- Authorization: none
- Validation: none beyond request params
- Errors: rate limit exceeded (`429`)

#### 7. `GET /home/job-postings/apply-job/{id}`
- Purpose: guest user may attempt to view apply route; in a real system it should require login before actual application
- Status: `401 UNAUTHORIZED` when user is not logged in
- Auth: none for the route, but actual apply action should require login
- Authorization: none
- Validation: valid job id
- Errors: job not found, unauthorized

### Admin endpoints

#### 8. `GET /admin/job-postings`
- Purpose: list all jobs for admin
- Response body: paginated job list
- Status: `200 OK`
- Auth: required
- Authorization: ADMIN only
- Validation: pagination params optional
- Errors: 401/403/404

#### 9. `POST /admin/job-postings/add-job`
- Purpose: create a job posting
- Request body:
  ```json
  {
    "title": "Senior Java Developer",
    "link": "https://example.com/job/1",
    "description": "Java backend role",
    "deadline": "2026-12-31",
    "eligibility": "B.Tech, Java",
    "relatedTo": "DEVELOPER",
    "source": "NCS"
  }
  ```
- Status: `201 CREATED`
- Auth: required
- Authorization: ADMIN only
- Validation: not blank title, valid date, non-empty description
- Errors: invalid fields, duplicate job if business rule requires it

#### 10. `PUT /admin/job-postings/update-job/{id}`
- Purpose: update a job
- Auth: required
- Authorization: ADMIN only
- Status: `200 OK`
- Validation: id exists, data valid
- Errors: not found, validation failure

#### 11. `DELETE /admin/job-postings/delete-job/{id}`
- Purpose: delete job by id
- Auth: required
- Authorization: ADMIN only
- Status: `200 OK` or `204 NO CONTENT`
- Errors: not found, forbidden

### User endpoints

#### 12. `POST /user/{userId}/upload-resume`
- Purpose: upload resume for authenticated user profile
- Auth: required
- Authorization: user can only modify own profile
- Status: `200 OK`
- Validation: same as public resume upload

#### 13. `POST /user/{userId}/upload-info`
- Purpose: update profile details for a logged-in user
- Auth: required
- Authorization: self only
- Status: `200 OK`

#### 14. `GET /user/{userId}/job-postings`
- Purpose: list personalized job matches
- Auth: required
- Authorization: self only
- Response body: matched or recommended jobs
- Status: `200 OK`
- Validation: user id path exists

#### 15. `GET /user/{userId}/job-postings/apply-job/{id}`
- Purpose: trigger apply action after login
- Auth: required
- Authorization: self only
- Status: `201 CREATED` if applied
- Validation: job exists, not already applied
- Errors: duplicate application, forbidden, not found

### Rate limiting requirements
- Login/authentication attempts: max 5 per minute per IP
- User applications: max 10 jobs per day per user
- Guest job posting access: max 5 per hour per IP
- Exceeding limit returns `429 Too Many Requests`

---

## 5) Security architecture

### Core security requirements
- Password hashing with BCrypt.
- JWT authentication for both ADMIN and USER roles.
- Authorization via role checks and method security.
- Login endpoints public.
- Admin endpoints restricted to ADMIN.
- User endpoints restricted to the logged-in user or ADMIN.
- Duplicate applications blocked.
- Guests may view public jobs but not apply without login.

### Proposed security flow
1. User sends credentials to `/home/login`.
2. AuthenticationManager validates credentials.
3. Passwords are hashed using BCrypt on registration.
4. Server issues JWT with claims including `sub`, `role`, `exp`.
5. JWT filter reads Authorization header and loads user details.
6. Request is checked against role-based access rules.
7. 401 for unauthenticated access.
8. 403 for authenticated users without permission.

### Security design decisions
- Use a custom `UserDetailsService` rather than hardcoded user details.
- Do not expose user password in API responses.
- Use Spring Security `AuthenticationEntryPoint` and `AccessDeniedHandler` for consistent responses.
- Keep guest job-view access separate from application logic so public browsing remains available without login.

### Security risks in the current project
- Hardcoded DB credentials in `application.properties`.
- Hardcoded sample admin credentials in properties.
- Security dependency commented out.
- `create` schema mode is unsafe for real deployments.
- JWT secret and app secrets must come from environment variables.

---

## 6) AI architecture

### AI purpose
The AI layer is used to process uploaded resumes and job-page content.

#### Resume parsing flow
1. User uploads PDF/DOC resume.
2. File is validated for type and size.
3. Safe storage strategy is applied.
4. AI service parses the file to extract:
   - candidate name
   - email
   - phone
   - education details
   - skills
   - field of work
   - experience years
   - confidence score
   - summary/description
5. The result is validated before being stored and trusted.

#### Job relevance flow
1. Web crawler scrapes seeded public and company portals.
2. Candidate page is checked for job keywords.
3. AI decides whether the page is a valid job posting.
4. AI extracts structured information such as:
   - title
   - deadline
   - eligibility
   - description
   - location
   - skills
   - application URL
5. The backend stores only validated values.

### AI abstraction
Create an interface like:

```java
public interface AIService {
    ResumeAnalysisResult analyzeResume(MultipartFile file);
    JobRelevanceResult assessJobPage(String pageUrl, String html);
}
```

Then provide an implementation such as `OllamaAIService` that calls Ollama with a strict JSON schema. This keeps the rest of the application independent from Ollama itself and allows future provider swaps.

### AI validation requirements
- AI output must be JSON-locked.
- Strict validation of fields before database persistence.
- Confidence score threshold should be enforced.
- If AI fails or returns malformed output, reject the response and log the failure.
- Never allow AI output to write sensitive fields directly without validation.

### File handling rules
- Validate file type: allow only PDF/DOC/DOCX or configured types.
- Validate file size: e.g., max 5MB.
- Use sanitized filenames.
- Prevent path traversal.
- Store metadata separately from content.
- Avoid storing sensitive resume content in the repository directly if object storage is available.

---

## 7) Redis architecture (deferred / optional)

Redis is not required for the MVP if the team wants to keep the project simple and focused. However, it is a good candidate for future optimization.

### Recommended uses for Redis
- rate limit counters (for guest browse limits and auth attempts)
- JWT blacklist / token revocation cache
- temporary AI response cache
- job-posting caching for common public queries

### Why not implement it now
The prompt explicitly says to use the given stack unless there is a strong reason not to. Redis is not in the mandatory stack and would add operational complexity. It is better to keep the MVP simple and add Redis only if the application becomes bottlenecked or the rate-limiting requirement becomes more advanced.

---

## 8) RabbitMQ architecture (deferred / optional)

RabbitMQ is also not required for the MVP.

### Recommended uses for RabbitMQ
- async crawler jobs for daily scraping
- AI processing queue for resume parsing
- email dispatch queue after application submission
- event-driven notifications

### Why not implement it now
The brief mentions a crawler and email callback, but these can be implemented in a simpler synchronous-first architecture for a student project. RabbitMQ is useful when the scraping and AI tasks become heavier and need decoupling, but it adds infrastructure complexity that is not mandatory at this phase.

---

## 9) Development phases

The prompt specifies a staged delivery plan. This should be followed exactly.

### Phase 1 — Analysis
- inspect project state
- identify dependencies and architecture gaps
- define target design
- record risks

### Phase 2 — Project foundation
- setup Maven properly
- configure application properties
- define package structure
- add global exception handling and common utilities
- compile project

### Phase 3 — Database
- implement entities and relationships
- add repositories and indexes
- validate DB connectivity

### Phase 4 — Core business logic
- DTOs
- validation
- services
- controllers
- endpoint testing

### Phase 5 — Security
- registration
- login
- BCrypt
- JWT
- filters
- role-based access
- security tests

### Phase 6 — AI and rate limiting
- AI abstraction and Ollama implementation
- JSON/schema validation
- timeout and error handling
- rate limit logic

### Phase 7 — Final review
- security audit
- duplicate-code review
- N+1 checks
- validation review
- architecture summary

---

## 10) Potential technical risks

### 1. Java version mismatch
The current `pom.xml` uses Java 25, while the prompt explicitly requires Java 21. This mismatch can create compatibility issues and should be corrected before implementation.

### 2. Security configuration is incomplete
The project currently has security disabled. Without JWT and role-based authorization, the required API protection cannot be implemented correctly.

### 3. Hardcoded secrets and credentials
DB credentials and sample admin credentials are currently embedded in `application.properties`, which is not acceptable for a production-quality design.

### 4. DB schema is not aligned to domain model
The current `UserEntity` is only a placeholder. The real system needs `Job`, `Application`, `ResumeProfile`, and role-based access to match the domain.

### 5. AI response quality and validation
The AI layer can generate malformed or incorrect information. If not strictly validated, it can create bad data and affect matching quality.

### 6. Web scraping legal and technical risk
Web scraping may be blocked by robots.txt, anti-bot protections, or legal restrictions. The system should restrict itself to permitted public/legal sources only.

### 7. Duplicate application and race conditions
Without a unique constraint and transaction control, duplicate job applications may slip through concurrent requests.

### 8. N+1 query issues in matching logic
Job matching and listing all applications may trigger multiple DB calls if not optimized.

### 9. Rate limiting implementation risk
The system needs per-IP and per-user counters without breaking the public browsing experience. This must be designed carefully to avoid false negatives.

### 10. File upload security
Uploaded resumes can contain malware or malformed content; file validation, type enforcement, and safe storage are required.

### 11. Production readiness
The application is currently not production-grade because it lacks proper environment config, security, exception handling, and clean domain modeling.

---

## Final assessment

The current project is an early scaffold, not a complete backend implementation. The target design is clear, and the required architecture is well-defined by the prompt. The next implementation should begin only after fixing the project setup inconsistencies (especially Java version, security, and environment configuration) and then following the phased build plan in order.

This document is the proposed target architecture and API design to implement next, subject to approval before actual code changes begin.

