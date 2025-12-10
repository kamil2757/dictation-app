import React from 'react';
import { CreateDictationForm } from 'features/create-dictation'; 

export const DictationCreatePage: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100%', 
      backgroundColor: '#f0f2f5', 
      padding: '40px 20px'        
    }}>
      <CreateDictationForm />
    </div>
  );
};