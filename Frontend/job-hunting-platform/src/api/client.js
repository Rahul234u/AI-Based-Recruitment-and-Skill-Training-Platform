import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 20000,
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message = 'Cannot reach the backend. Check that Spring Boot is running and VITE_API_BASE_URL is correct.'
    } else if (error.response.status === 401) {
      error.message = 'Please sign in to continue.'
    } else if (error.response.status === 403) {
      error.message = 'You do not have permission to perform this action.'
    }
    return Promise.reject(error)
  },
)

export const apiEndpoints = {
  dashboard: '/dashboard/summary',
  jobs: '/jobs',
  job: (id) => `/jobs/${encodeURIComponent(id)}`,
  applications: '/applications',
  resumeAnalyze: '/resume/analyze',
  profile: '/profile',
}

export default api
