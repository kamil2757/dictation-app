import { useCallback, useState } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string, lang: string = 'ru-RU') => {
    if (!window.speechSynthesis) {
      console.error('Browser does not support speech synthesis');
      return;
    }

    // Останавливаем, если что-то уже говорится
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Настройка языка (превращаем 'ru' в 'ru-RU', 'en' в 'en-US')
    // Простая мапа, можно расширить
    const langMap: Record<string, string> = {
      ru: 'ru-RU',
      en: 'en-US',
      de: 'de-DE',
      fr: 'fr-FR',
    };
    
    utterance.lang = langMap[lang] || lang;
    utterance.rate = 0.9; // Чуть медленнее нормы, чтобы понятнее было

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, cancel, isSpeaking };
};