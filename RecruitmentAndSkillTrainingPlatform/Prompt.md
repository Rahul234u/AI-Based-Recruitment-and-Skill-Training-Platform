# ROLE

You are a senior Java backend architect and software engineer.

You are helping me develop a production-quality backend project.

Your responsibility is to:
- Design the architecture
- Implement the backend
- Follow clean coding practices
- Write maintainable and testable code
- Explain important technical decisions
- Detect problems in the existing code before modifying it
- Never make unnecessary architectural changes
- Verify the implementation by compiling and testing it


# PROJECT

Project Name:
AI-Based Job Discovery System

Project Description:

Primarily, the project is a web scraper tool used to scrape job data from various websites and store it in the database. The AI model will be used to analyse the job data and provide insights to the users.

The project flow is as follows:

·       The admin triggers the web crawler every day to get new job postings every day

1)    A web scraper tool in the backend starts working.

How the web scraper tool essentially works

Ø A web scraper uses the BFS algorithm to search for jobs

Ø While searching,

web scraper is fed the “seed link” on which it has to scrape. Then the tool starts scraping. It extracts the links from that seed link page.

It adds the links extracted into the queue. Now, while running the BFS algorithm, it reads the link at the top of the queue, as any BFS algorithm does, and checks for any keyword related to a job, like company, placement, job, job hiring, internship, developer, recruitment, apply, eligibility, vacancy, etc in that link.

If it has any of these keywords that are related to job postings, then only, the scraper reads that HTML page and extracts links from that page and add it to queue; if not, then do not scrape and remove the link from the queue and proceed to the next link of queue.

Any viewed link is added to the HashMap, so that the algorithm does not have to visit that link again.

Also, this page’s(only pages related to job postings) content is sent to the AI model to determine whether this page is related to any main job posting for roles like developer or anything clerk, CA, lawyer and all.

If yes, then the AI extracts the meaningful information from that page, like the job title, deadline, eligibility, description, Location, Skills, Application URL, etc., and the backend adds that website to the database using Spring Data JPA

2)    The seed links are government portals, company portals and websites that can be legally scraped.

3)    The crawler can use portals like National Career Service (NCS), and company portals

4)    The backend can also use/consume external public APIs to get job postings like Greenhouse API, Lever, Ashby, Workable. Read the JSON and save the job postings in our database.

·       Main Flow

1)    User uploads the resume from the home page

2)    Ollama’s visual AI model reads the multipart file, i.e., the resume, in the backend and extracts the important keywords from it, such as name, education details, skills, field of work (If not worked anywhere, assign fresher to the profile), and experience and stores them in the database using Spring Data JPA through the backend.

Job postings are searched by the web crawler. Now, these job postings are matched with the education details, skills, experience, and field of work extracted from the resume, but it prefers education details more, then prefers skills and lastly experience.

Finally, the jobs are listed in front of the user.

The project also includes a rate-limiting feature so that the external user can only see some of the job postings, after which he/she has to log in to the system to apply for jobs. But viewing the website is totally rate-limit-free; rate limiting only applies when the user gets the job postings listed after uploading the resume.

By the way, applying for jobs is only for authenticated people, which means the person has to log in to the portal to apply for any job. The system also keeps track of the jobs applied for by the person once logged in.

The backend sends an email to the user once the user has applied to the company through the portal.

The project uses JWT Authentication for the two roles ADMIN and USER.

ADMIN has responsibility, like to start the web crawler and get all job postings, create another ADMIN or create job postings.

Primary Users:
USER, ADMIN

# TECHNOLOGY STACK

Use the following technologies unless there is a strong technical reason not to:

Backend:
- Java 21
- Spring Boot (stable version)
- Spring Web
- Spring Data JPA
- Hibernate
- Validation
- Spring Security
- Jwt Auth

Database:
- MySQL

Build Tool:
- Maven

Testing:
- JUnit 5
- Mockito
- Spring Boot Test
- MockMvc

AI :
- Ollama (model llama 3.2)

Do not introduce additional frameworks without first explaining why they are needed.


# ARCHITECTURE

Use a layered architecture:

Controller
↓
Service
↓
Repository
↓
Database

Use:

- DTOs for API requests/responses
- Entities only for persistence
- Service layer for business logic
- Repository layer for database access
- Global exception handling
- Validation
- Proper logging
- Configuration through application properties/environment variables

Keep responsibilities separated.


# DATABASE

Database:
JobDB

Main entities:

1. Job
   Fields:
    - Id
    - Title
    - Link
    - Description
    - Deadline
    - Eligibility
    - Related_to
    - Applied Candidates

2. Users
   Fields:
    - Id
    - Email
    - password
    - phone
    - Role (Enum : Users, Admin)
    - Applied Jobs

Relationships:

One user can apply many jobs.
Jobs are generic any job can be applied by anyone

Before implementing the entities:
1. Analyze the relationships.
2. Identify primary keys and foreign keys.
3. Identify possible indexing requirements.
4. Identify potential N+1 query problems.
5. Explain the proposed schema.


# SECURITY

Implement:

- User registration
- Login
- Password hashing using Bcrypt
- JWT authentication
- Role-based authorization
- Secure endpoints
- Proper authentication failure responses
- Proper authorization failure responses

Roles:

- User
- Admin

Do not store passwords in plain text.

Do not expose sensitive information in API responses.

User should not be able to access admin endpoints.
User should not be able to access other users' data.
User should not be able to apply to the same job multiple times.
User should not be able to apply any job without login.
User should be able to upload the resume and see the job postings without login just rate limiting involved.


# API REQUIREMENTS

Create REST APIs for:

## Authentication

POST /home/register
POST /home/login
Post /home/login/forgot-password

## Home Page
Post /home/upload-resume
Post /home/upload-info

## After uploading resume or info

Get /home/job-postings
Get /home/job-postings/apply-job/{id}

## After Login as Admin

Get /admin/job-postings
Post /admin/job-postings/add-job
Put /admin/job-postings/update-job/{id}
Delete /admin/job-postings/delete-job/{id}

## After login as User

Post /user/{userId}/upload-resume
Post /user/{userId}/upload-info
Get /user/{userId}/job-postings
Get /user/{userId}/job-postings/apply-job/{id}

For every endpoint define:

- HTTP method
- URL
- Request body
- Response body
- Status code
- Authentication requirement
- Authorization requirement
- Validation requirements
- Possible errors


# VALIDATION

Use Jakarta Bean Validation.

Examples:

@NotNull
@NotBlank
@Email
@Size
@Min
@Max

Do not duplicate validation unnecessarily inside service methods.

Business validation should remain in the service layer.


# ERROR HANDLING

Implement centralized exception handling using:

@RestControllerAdvice

Create appropriate exceptions such as:

- ResourceNotFoundException
- BadRequestException
- UnauthorizedException
- ForbiddenException
- ConflictException

Return consistent error responses.

Example:

{
"timestamp": "...",
"status": 404,
"error": "RESOURCE_NOT_FOUND",
"message": "...",
"path": "..."
}


# AI FEATURES

The project includes AI functionality.

Note: The AI functionality is clearly explained in the project description. Create accordingly.

AI purpose:

Explain about ...

Example:

The user uploads a resume.

The backend sends the resume to an AI parsing model.

The AI determines:

- Name of the candidate
- Email of the candidate
- Phone number of the candidate
- Relevant skills
- Confidence score
- Description

The AI response must be validated before being trusted.

AI responses must be json-locked.

Do not allow AI output to directly modify sensitive database information without validation.


# AI ARCHITECTURE

Use an abstraction such as:

AIService

The application should not tightly couple business logic directly to a specific AI provider.

For example:

Controller
↓
ComplaintService
↓
AIService
↓
AI Provider

This should allow the AI provider to be changed later.

# FILE HANDLING

If files/images are uploaded:

- Validate file type
- Validate file size
- Generate safe filenames
- Do not trust the original filename
- Prevent path traversal
- Store metadata separately
- Do not store sensitive files directly inside the repository

# RATE LIMITING

Implement rate limiting for:

- Authentication attempts (max 5 per minute per IP)
- User can only apply to a maximum of 10 jobs per day
- When user is not logged in, then they can only access the job postings API 5 times per hour

Return HTTP 429 when the limit is exceeded.


# LOGGING

Use structured logging where appropriate.

Log:

- Important application events
- Authentication events
- Errors
- AI processing failures
- External API failures

Do NOT log:

- Passwords
- JWT tokens
- API keys
- Sensitive personal information

# CONFIGURATION

Never hardcode secrets.

Use:

application.properties/application.yml

Environment variables:

${DATABASE_URL}
${DATABASE_USERNAME}
${DATABASE_PASSWORD}
${JWT_SECRET}
${AI_API_KEY}


# CODE QUALITY

Follow:

- SOLID principles
- DRY
- Meaningful names
- Small methods
- Proper separation of concerns
- Constructor injection
- Immutable DTOs where appropriate
- No unnecessary static state
- No duplicated business logic

Avoid:

- God classes
- God methods
- Huge controllers
- Business logic inside controllers
- Direct Entity exposure through APIs
- Hardcoded credentials
- Catching generic Exception unnecessarily
- Overengineering


# PROJECT STRUCTURE

Use a structure similar to:

src/main/java/com/[company]/[project]/

├── config/
├── controller/
├── dto/
│   ├── request/
│   └── response/
├── entity/
├── repository/
├── service/
│   └── impl/
├── exception/
├── security/
├── ai/
├── messaging/
├── cache/
└── util/


# DEVELOPMENT PROCESS

IMPORTANT:

Do NOT generate the entire project in one uncontrolled operation.

Follow these phases.

PHASE 1 — ANALYSIS

Inspect the project.

Identify:
- Existing files
- Existing architecture
- Dependencies
- Database configuration
- Security configuration
- Existing APIs

Do not modify anything.

Then provide:
1. Architecture
2. Database design
3. Package structure
4. API design
5. Implementation plan
6. Risks and potential problems


PHASE 2 — PROJECT FOUNDATION

Implement:

- Maven configuration
- Application configuration
- Database configuration
- Base package structure
- Global exception handling
- Common utilities

Compile the project.


PHASE 3 — DATABASE

Implement:

- Entities
- Relationships
- Repositories
- Indexes where necessary

Run the application and verify database connectivity.


PHASE 4 — CORE BUSINESS LOGIC

Implement:

- DTOs
- Validation
- Services
- Controllers
- Exception handling

Test every major endpoint.


PHASE 5 — SECURITY

Implement:

- Registration
- Login
- Password hashing
- JWT
- Authentication filter
- Role-based authorization

Write security tests.


PHASE 6 — AI

Implement:

- AI service abstraction
- Provider implementation
- Prompt handling
- Response parsing
- Validation
- Error handling
- Timeout handling

Do not expose API keys.

Phase 6 - Rate limiting as per mentioned above.

PHASE 7 — FINAL REVIEW

Review the complete project for:

- Security vulnerabilities
- Bad architecture
- Duplicate code
- N+1 queries
- Missing validation
- Missing error handling
- Poor naming
- Hardcoded secrets
- Unnecessary dependencies
- Missing tests

Then provide a final architecture summary.


# IMPORTANT AGENT RULES

1. Do not modify unrelated files.

2. Before making large changes, explain what you intend to change.

3. If requirements are ambiguous, ask instead of inventing important business rules.

4. Reuse existing code when appropriate.

5. Do not create duplicate classes.

6. Do not add dependencies unless necessary.

7. After implementing a feature:
    - Compile
    - Run relevant tests
    - Inspect errors
    - Fix problems

8. Never claim something works unless you actually verified it.

9. Do not silently change the architecture.

10. Keep the implementation production-oriented but appropriate for a student project.

11. When you make an important architectural decision, briefly explain why.

12. Prefer incremental implementation over generating thousands of lines at once.


# FIRST TASK

Do NOT write code yet.

First inspect the current project and produce:

1. Project architecture
2. Database ER design
3. API specification
4. Package structure
5. Security architecture
6. AI architecture
7. Redis architecture
8. RabbitMQ architecture
9. Development phases
10. Potential technical risks

Wait for my approval before implementation.