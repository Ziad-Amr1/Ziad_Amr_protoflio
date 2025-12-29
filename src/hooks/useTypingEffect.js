// src/hooks/useTypingEffect.js
import { useState, useEffect } from "react";

export default function useTypingEffect(
  words,
  typingSpeed = 120,
  deletingSpeed = 60,
  pauseTime = 2000
) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const currentWord = words[index % words.length];
    let timeout;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, words, typingSpeed, deletingSpeed, pauseTime]);

  // blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return { text, blink };
}
