import React from 'react';
import { RegisterForm } from 'features/auth';

export const RegisterPage: React.FC = () => {
  return (
    <div style={{ padding: '60px 20px' }}>
      <RegisterForm />
    </div>
  );
};