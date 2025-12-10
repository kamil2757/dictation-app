import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px', 
      background: '#f0f2f5', 
      marginTop: 'auto' // Чтобы прилипал к низу
    }}>
      Dictation Platform ©{new Date().getFullYear()}. Created for practice.
    </footer>
  );
};