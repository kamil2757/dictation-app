import React, { useState, useEffect, useRef } from 'react';
import { Card, Input as AntInput } from 'antd'; // Берем прямой AntInput для ref
import { Button } from 'shared/ui';
import { GameProgress } from './GameProgress';
import { AudioTrigger } from './AudioTrigger';

interface GameScreenProps {
  currentIndex: number;
  totalWords: number;
  isSpeaking: boolean;
  onRepeat: () => void;
  onSubmit: (text: string) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  currentIndex,
  totalWords,
  isSpeaking,
  onRepeat,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState('');
  
  // Реф нужен, чтобы возвращать фокус в поле после нажатия кнопок
  const inputRef = useRef<any>(null); 

  // Очищаем поле при смене слова
  useEffect(() => {
    setInputValue('');
    inputRef.current?.focus();
  }, [currentIndex]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return; // Не пускаем пустые
    onSubmit(inputValue);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', paddingTop: 20 }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        
        {/* 1. Прогресс */}
        <GameProgress current={currentIndex} total={totalWords} />

        {/* 2. Звук */}
        <AudioTrigger onClick={onRepeat} isSpeaking={isSpeaking} />

        {/* 3. Ввод */}
        <div style={{ marginBottom: 20 }}>
          <AntInput
            ref={inputRef}
            size="large"
            placeholder="Введите услышанное слово..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSubmit}
            style={{ 
              textAlign: 'center', 
              fontSize: 24, 
              height: 60,
              borderRadius: 12 
            }}
            autoFocus
          />
        </div>

        <Button 
          type="primary" 
          block 
          size="large" 
          onClick={handleSubmit}
          disabled={!inputValue.trim()} // Блокируем, если пусто
          style={{ height: 50, fontSize: 18 }}
        >
          {currentIndex === totalWords - 1 ? 'Завершить' : 'Далее'}
        </Button>

      </Card>
    </div>
  );
};