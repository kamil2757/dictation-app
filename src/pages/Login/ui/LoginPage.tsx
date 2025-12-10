import React from 'react';
import { LoginForm } from 'features/auth';

export const LoginPage: React.FC = () => {
  return (
    <div style={{ padding: '60px 20px' }}>
      <LoginForm />
    </div>
  );
};