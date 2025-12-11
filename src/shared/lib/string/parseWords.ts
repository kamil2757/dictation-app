export const parseWords = (input: string): string[] => {
  if (!input) return [];
  
  return input
    .split(',')
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
};