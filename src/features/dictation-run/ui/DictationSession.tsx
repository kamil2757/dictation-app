import React from 'react';
import { useDictationGame } from '../model/useDictationGame';
import { GameScreen } from './GameScreen/GameScreen';
import { ResultScreen } from './ResultScreen/ResultScreen';
import { DictationWordDto } from 'entities/dictation';

interface DictationSessionProps {
  words: DictationWordDto[];
  language: string;
  // === 1. ИСПРАВЛЕНИЕ ТИПА ===
  // Теперь мы говорим, что onFinish принимает число (score)
  onFinish?: (score: number) => void; 
}

export const DictationSession: React.FC<DictationSessionProps> = ({ 
  words, 
  language, 
  onFinish 
}) => {
  const {
    currentIndex,
    totalWords,
    isSpeaking,
    isFinished,
    answers,
    submitAnswer,
    repeatAudio,
    restart
  } = useDictationGame(words, language);

  if (isFinished) {
    // === 2. ВЫЧИСЛЯЕМ ОЧКИ ПЕРЕД ВЫХОДОМ ===
    const correctCount = answers.filter(a => a.isCorrect).length;
    // Защита от деления на ноль, если слов нет (хотя такого быть не должно)
    const score = totalWords > 0 ? Math.round((correctCount / totalWords) * 100) : 0;

    return (
      <ResultScreen 
        answers={answers} 
        onRetry={restart} 
        // === 3. ПЕРЕДАЕМ ОЧКИ В КОЛЛБЕК ===
        onBack={() => {
          if (onFinish) onFinish(score); 
        }} 
      />
    );
  }

  return (
    <GameScreen 
      currentIndex={currentIndex}
      totalWords={totalWords}
      isSpeaking={isSpeaking}
      onRepeat={repeatAudio}
      onSubmit={submitAnswer}
    />
  );
};