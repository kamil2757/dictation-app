export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;


export type Role = (typeof Role)[keyof typeof Role];

export interface User {
  id: number;
  email: string;
  name?: string;
  role: Role; 
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}