// Входящее слово (из диктанта)
export interface GameWord {
  text: string;
  audioUrl?: string; // На будущее
}

// Результат по одному слову
export interface GameAnswer {
  word: string;        // Что было загадано
  userInput: string;   // Что ввел юзер
  isCorrect: boolean;  // Правильно или нет
}