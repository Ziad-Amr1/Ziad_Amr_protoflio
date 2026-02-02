// src/hooks/useTypingEffectAdvanced.js
import { useState, useEffect, useRef } from "react";

export default function useTypingEffectAdvanced(
  words = [],
  {
    typingSpeed = 120,
    deletingSpeed = 60,
    pauseTime = 2000,
    blinkSpeed = 500,
    autoStart = true,
  } = {}
) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [isPaused, setIsPaused] = useState(!autoStart);

  const timeoutRef = useRef(null);

  // 🛡️ defensive
  const safeWords = Array.isArray(words) ? words : [];
  const currentWord = safeWords[index % safeWords.length] || "";

  // ⌨️ typing logic
  useEffect(() => {
    if (!safeWords.length || isPaused) return;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [
    charIndex,
    isDeleting,
    index,
    isPaused,
    safeWords,
    currentWord,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  // | blinking cursor
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, blinkSpeed);

    return () => clearInterval(interval);
  }, [isPaused, blinkSpeed]);

  // 🎮 controls
  const pause = () => setIsPaused(true);

  const resume = () => setIsPaused(false);

  const reset = () => {
    clearTimeout(timeoutRef.current);
    setText("");
    setCharIndex(0);
    setIndex(0);
    setIsDeleting(false);
    setIsPaused(!autoStart);
  };

  return {
    text,
    blink,
    pause,
    resume,
    reset,
    isPaused,
  };
}
