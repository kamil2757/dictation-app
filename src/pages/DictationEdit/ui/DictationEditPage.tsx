import React from 'react';
import { useParams } from 'react-router-dom';
import { EditDictationForm } from 'features/edit-dictation';

export const DictationEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>Ошибка: ID не найден</div>;

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: '100%' }}>
      <EditDictationForm dictationId={id} />
    </div>
  );
};