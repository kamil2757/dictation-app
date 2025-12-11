export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  
  DICTATION_LIST: '/dictations', 
  DICTATION_CREATE: '/dictations/create',
  
  DICTATION_RUN: (id: number | string) => `/dictations/${id}/run`,
  DICTATION_EDIT: (id: number | string) => `/dictations/${id}/edit`,
} as const;