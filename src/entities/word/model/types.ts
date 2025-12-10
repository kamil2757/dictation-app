export interface Word {
  id: number;
  text: string;
  audioUrl?: string; 
  hint?: string;
  language: string; 
  dictationId?: number;
}