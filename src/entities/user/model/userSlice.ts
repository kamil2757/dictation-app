import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthResponse } from './types';

interface UserState {
  user: User | null;
  accessToken: string | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuth: !!localStorage.getItem('accessToken'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {

      const { user, accessToken } = action.payload; 
      state.user = user;
      state.accessToken = accessToken;
      state.isAuth = true;
      localStorage.setItem('accessToken', accessToken);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuth = false;
      localStorage.removeItem('accessToken');
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    }
  },
});

export const { setCredentials, logout, setUser, setToken } = userSlice.actions;
export default userSlice.reducer;