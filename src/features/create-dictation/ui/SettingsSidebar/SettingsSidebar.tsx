import React from 'react';
import { Form, Typography, Upload, Radio, message,type FormInstance } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface SettingsSidebarProps {
  form: FormInstance;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ form }) => {
  
  const handleFileUpload = (file: File) => {
    const isTxt = file.type === 'text/plain';
    if (!isTxt) {
      message.error('Пока поддерживаются только .txt файлы');
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        const formattedText = text.replace(/\n/g, ', ');
        
        const currentWords = form.getFieldValue('wordsString') || '';
        const newWords = currentWords ? `${currentWords}, ${formattedText}` : formattedText;
        
        form.setFieldValue('wordsString', newWords);
        message.success(`Загружено из файла!`);
      }
    };
    reader.readAsText(file);
    return false;
  };

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Title level={5}>Через файл</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
          Загрузите .txt файл для авто-заполнения.
        </Text>
        
        <Dragger 
          beforeUpload={handleFileUpload} 
          showUploadList={false} 
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: '#1677ff' }} />
          </p>
          <p className="ant-upload-text">
            Перетащите файл сюда
          </p>
        </Dragger>
      </div>

      <div>
        <Title level={5}>Приватность</Title>
        <Form.Item name="isPublic">
          <Radio.Group >
            <Radio value={true}>
              <span style={{ fontWeight: 500 }}>В общий доступ</span>
              <div style={{ fontSize: 12, color: '#888', marginLeft: 24 }}>
                Виден всем в библиотеке
              </div>
            </Radio>
            <Radio value={false}>
              <span style={{ fontWeight: 500 }}>Приватно</span>
              <div style={{ fontSize: 12, color: '#888', marginLeft: 24 }}>
                Только для вас
              </div>
            </Radio>
          </Radio.Group>
        </Form.Item>
      </div>
    </>
  );
};