import React from 'react';
import { Form, Typography, Row, Col, type FormInstance } from 'antd';
import { Button, Input, Select } from 'shared/ui'; 

const { Text } = Typography;

interface MainInputsProps {
  form: FormInstance;
  isLoading: boolean;
}

export const MainInputs: React.FC<MainInputsProps> = ({ form, isLoading }) => {
  const wordsString = Form.useWatch('wordsString', form);

  const wordsCount = wordsString
    ? wordsString.split(',').filter((w: string) => w.trim().length > 0).length
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Название"
            name="title"
            rules={[{ required: true, message: 'Введите название' }]}
            style={{ marginBottom: 12 }} 
          >
            <Input placeholder="Например: Неправильные глаголы" />
          </Form.Item>
        </Col>
        
        <Col span={8}>
          <Form.Item 
            label="Язык" 
            name="language"
            style={{ marginBottom: 12 }}
          >
            <Select
              options={[
                { value: 'ru', label: '🇷🇺 RU' }, 
                { value: 'en', label: 'en EN' },
                { value: 'de', label: '🇩🇪 DE' },
                { value: 'fr', label: '🇫🇷 FR' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item 
        label="Описание" 
        name="description"
        style={{ marginBottom: 12 }}
      >
        <Input.TextArea 
          rows={2} 
          placeholder="Краткая заметка" 
          style={{ resize: 'none' }} 
        />
      </Form.Item>

      <Form.Item
        label={
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>Слова (через запятую)</span>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {wordsCount} слов
            </Text>
          </div>
        }
        name="wordsString"
        rules={[{ required: true, message: 'Введите слова' }]}
        style={{ marginBottom: 24 }}
      >
        <Input.TextArea
          rows={6} 
          placeholder="apple, banana, orange..."
          style={{ resize: 'none' }} 
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          size="large" 
          loading={isLoading}
        >
          Создать диктант
        </Button>
      </Form.Item>
    </div>
  );
};