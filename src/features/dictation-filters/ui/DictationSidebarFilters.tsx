import React from 'react';
import { Space, Typography } from 'antd';
import { Select, Input } from 'shared/ui';

const { Title } = Typography;

interface DictationSidebarFiltersProps {
  language: string | null;
  onChangeLanguage: (val: string | null) => void;
}

export const DictationSidebarFilters: React.FC<DictationSidebarFiltersProps> = ({ 
  language, 
  onChangeLanguage 
}) => {
  return (
    <div style={{ width: '100%' }}>
      
      <div style={{ marginBottom: 30 }}>
        <Title level={5} style={{ marginBottom: 12 }}>Язык</Title>
        <Select
          value={language}
          placeholder="Любой"
          allowClear
          onChange={onChangeLanguage}
          options={[
            { value: 'ru', label: '🇷🇺 Русский' },
            { value: 'en', label: '🇬🇧 Английский' },
            { value: 'de', label: '🇩🇪 Немецкий' },
          ]}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <Title level={5} style={{ marginBottom: 12 }}>Кол-во слов</Title>
        <Space>
           <Input placeholder="От" style={{ width: 80 }} />
           <Input placeholder="До" style={{ width: 80 }} />
        </Space>
      </div>

    </div>
  );
};