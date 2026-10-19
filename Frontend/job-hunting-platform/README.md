# TalentPath — React + Tailwind frontend

Frontend for an AI-assisted job discovery platform. Backend implementation remains the responsibility of your team; this project only sends HTTP requests to the Spring Boot API.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` in `.env` to your backend API base, e.g. `http://localhost:8080/api`. Restart Vite after changing `.env`.

## API integration

All requests use the shared Axios client in `src/api/client.js`. It configures the base URL, a 20-second timeout, JSON headers, optional JWT bearer token from `localStorage` key `token`, and common network/401/403 errors. Endpoint paths are defined in `apiEndpoints` in that file.

| Method | Endpoint | Used for |
|---|---|---|
| GET | `/dashboard/summary` | Dashboard metrics |
| GET | `/jobs` | Job listings |
| GET | `/jobs/{id}` | Job details |
| POST | `/applications` | Apply with JSON `{ "jobId": "..." }` |
| GET | `/applications` | Application tracker |
| POST | `/resume/analyze` | Resume upload as multipart field `file` |
| GET | `/profile` | Load candidate profile |
| PUT | `/profile` | Save candidate profile |

These are assumed contracts, not verified backend endpoints. Coordinate the paths and JSON field names with your teammates. The UI uses sample data in selected pages when the API is not configured or cannot be reached. A resume-analysis response can look like:

```json
{
  "summary": "Full-stack developer with ...",
  "skills": ["React", "Java", "SQL"],
  "projects": [{ "name": "Project name", "description": "What it does" }],
  "experience": [{ "role": "Intern", "company": "Example", "duration": "3 months", "description": "..." }]
}
```

## Backend integration checklist

1. Start Spring Boot on the configured URL.
2. Configure CORS to allow `http://localhost:5173`.
3. Make endpoint paths and response DTOs match the contract above (or edit `src/api/client.js` and page mappings).
4. If the backend requires authentication, store the JWT under `localStorage` key `token` after login; the Axios client adds it automatically.
5. Never put AI provider secrets or crawler credentials in `VITE_*` variables; those values are exposed to the browser.
