import { baseApi } from '../../../shared/api/baseApi';
import type { User, AuthResponse } from '../model/types';

export interface LoginRequest {
  email: string;
  password: string; 
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),

    getMe: build.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['User'], 
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetMeQuery,
  useLazyGetMeQuery 
} = userApi;