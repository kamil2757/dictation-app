import React from 'react';
import { Typography, Progress } from 'antd';

const { Text } = Typography;

interface GameProgressProps {
  current: number; 
  total: number; 
}

export const GameProgress: React.FC<GameProgressProps> = ({ current, total }) => {
  const percent = Math.round((current / total) * 100);

  return (
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <Text type="secondary" style={{ fontSize: 16 }}>
        Слово {current + 1} из {total}
      </Text>
      <Progress 
        percent={percent} 
        showInfo={false} 
        strokeColor="#1677ff" 
        size="small" 
        style={{ marginTop: 10 }}
      />
    </div>
  );
};