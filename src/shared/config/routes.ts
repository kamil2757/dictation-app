export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  
  // Диктанты
  DICTATION_LIST: '/dictations', // Список
  DICTATION_CREATE: '/dictations/create',
  
  // Для динамических путей делаем функции
  DICTATION_RUN: (id: number | string) => `/dictations/${id}/run`,
  DICTATION_EDIT: (id: number | string) => `/dictations/${id}/edit`,
} as const;