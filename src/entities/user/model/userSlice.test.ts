import userReducer, { setCredentials, logout } from './userSlice';
import type { User, Role } from './types';

const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  role: 'USER' as Role,
  name: 'Test User'
};

const initialState = {
  user: null,
  accessToken: null,
  isAuth: false,
};

describe('userSlice', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const action = setCredentials({ user: mockUser, accessToken: 'token123' });
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      user: mockUser,
      accessToken: 'token123',
      isAuth: true,
    });
  });

  it('should handle logout', () => {
    const loggedState = {
      user: mockUser,
      accessToken: 'token123',
      isAuth: true,
    };

    const state = userReducer(loggedState, logout());

    expect(state).toEqual(initialState);
  });
});