import wc from 'word-count';

interface TextStaticstic {
  char: number;
  word: number;
  para: number;
  readingTime: string;
}

export function analyzeText (rawText: string): TextStaticstic {
  const char = rawText.length;
  const word = wc(rawText);
  const para = rawText.split('\n').length;
  const readingSeconds = Math.floor(word / 5);
  const readingTime = transformReadingTime(readingSeconds);

  return {
    char,
    word,
    para,
    readingTime
  };
}

function transformReadingTime (seconds: number): string {
  if (seconds < 60) return `${seconds}S`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}M ${seconds % 60}S`;
  return '> 1H';
}