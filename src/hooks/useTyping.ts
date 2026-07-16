import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number; // ms
  deletingSpeed?: number; // ms
  pauseMs?: number; // ms
}

export const useTyping = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 55,
  pauseMs = 900,
}: UseTypewriterOptions) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        // typing
        const next = currentWord.slice(0, text.length + 1);
        setText(next);

        if (next === currentWord) {
          // 단어 다 썼으면 잠깐 멈춘 뒤 deleting으로 전환
          window.setTimeout(() => setIsDeleting(true), pauseMs);
          return;
        }
      } else {
        // deleting
        const next = currentWord.slice(0, Math.max(0, text.length - 1));
        setText(next);

        if (next.length === 0) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
          return;
        }
      }
    };

    const delay = isDeleting ? deletingSpeed : typingSpeed;
    const timerId = window.setTimeout(tick, delay);

    return () => window.clearTimeout(timerId);
  }, [words, wordIndex, isDeleting, text, typingSpeed, deletingSpeed, pauseMs]);

  return { text };
};
