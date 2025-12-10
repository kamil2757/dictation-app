import React, { type ReactNode } from 'react';
import { Card, Tag, Typography, Button } from 'antd';
import type { Dictation } from '../../model/types';
import { PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface DictationCardProps {
  dictation: Dictation;
  onClick: (id: number) => void;

  extra?: ReactNode;
}

export const DictationCard: React.FC<DictationCardProps> = ({
  dictation,
  onClick,
  extra
}) => {
  return (
    <Card
      hoverable
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}

      actions={[
        <Button key="play" type="link" icon={<PlayCircleOutlined />} onClick={() => onClick(dictation.id)}>
          Начать
        </Button>
      ]}
    >

      {extra && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 10
          }}

          onClick={(e) => e.stopPropagation()}
        >
          {extra}
        </div>
      )}


      <div style={{ marginBottom: 10, paddingRight: 30 }}>

        {dictation.isPublic && <Tag color="green">Public</Tag>}
        <Tag color={'gold'}>
          {dictation.language.toUpperCase()}
        </Tag>
      </div>


      <Title level={5} ellipsis={{ rows: 2, expandable: false, tooltip: dictation.title }}>
        {dictation.title}
      </Title>

      <Paragraph
        type="secondary"
        ellipsis={{ rows: 3, expandable: false, symbol: '...' }}
        style={{ marginBottom: 0 }}
      >
        {dictation.description || 'Нет описания'}
      </Paragraph>
    </Card>
  );
};