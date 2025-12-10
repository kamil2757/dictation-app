import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteDictationMutation } from 'entities/dictation';

interface DeleteDictationButtonProps {
  id: number;
  title?: string; 
}

export const DeleteDictationButton: React.FC<DeleteDictationButtonProps> = ({ id, title }) => {
  const [deleteDictation, { isLoading }] = useDeleteDictationMutation();

  const confirm = async () => {
    try {
      await deleteDictation(id).unwrap();
      message.success('Диктант удален');
    } catch (error) {
      message.error('Не удалось удалить диктант');
      console.error(error);
    }
  };

  return (
    <Popconfirm
      title="Удалить диктант?"
      description={`Вы уверены, что хотите удалить "${title || 'этот диктант'}"?`}
      onConfirm={confirm}
      okText="Да, удалить"
      cancelText="Отмена"
      okButtonProps={{ danger: true, loading: isLoading }} 
    >
      <Button 
        type="text" 
        danger 
        icon={<DeleteOutlined />} 
        onClick={(e) => e.stopPropagation()} 
      />
    </Popconfirm>
  );
};