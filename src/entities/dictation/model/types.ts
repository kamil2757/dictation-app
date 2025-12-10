export interface Dictation<T = void> {
  id: number;
  title: string;
  description?: string;
  authorId: number;
  language: string;
  createdAt: string;
  isPublic: boolean;
  words?: T extends void ? never : T[]; 
}

export interface DictationPracticeResult {
  id: number;
  score: number;
  dictationId: number;
  userId: number;
  createdAt: string;
}


export interface DictationWordDto {
  text: string;
  hint?: string;
  audioUrl?: string;
}

export interface CreateDictationDto {
  title: string;
  description?: string;
  language: string;
  isPublic: boolean;
  words: DictationWordDto[]; 
}

export interface UpdateDictationDto extends Partial<Omit<CreateDictationDto, 'words'>> {
  id: number;
  words?: DictationWordDto[];
}