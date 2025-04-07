
import { useState, useEffect, useCallback } from 'react';

// Characters used for the Matrix effect
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|;:,.<>?/~`';

export const useMatrixEffect = (
  originalText: string,
  durationMs: number = 2000,
  intervalMs: number = 30000
) => {
  const [displayText, setDisplayText] = useState(originalText);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to create scrambled text
  const scrambleText = useCallback((progress: number) => {
    return originalText
      .split('')
      .map((char, idx) => {
        // If character is a space, preserve it
        if (char === ' ') return ' ';
        
        // Calculate if this character should be scrambled based on progress
        // Early characters scramble first and return to normal last
        const shouldScramble = progress < 1 && 
          (progress < 0.5 ? idx / originalText.length < progress * 2 : 
           (originalText.length - idx) / originalText.length > (progress - 0.5) * 2);
        
        if (shouldScramble) {
          return matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        }
        
        return char;
      })
      .join('');
  }, [originalText]);

  // Function to animate the text scrambling effect
  const animateText = useCallback(() => {
    setIsAnimating(true);
    
    const startTime = Date.now();
    const endTime = startTime + durationMs;
    
    const animationInterval = setInterval(() => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / durationMs);
      
      if (now >= endTime) {
        clearInterval(animationInterval);
        setDisplayText(originalText);
        setIsAnimating(false);
      } else {
        setDisplayText(scrambleText(progress));
      }
    }, 50); // Update scramble effect every 50ms for smoothness
    
    return () => clearInterval(animationInterval);
  }, [originalText, durationMs, scrambleText]);

  // Set up interval to trigger animation periodically
  useEffect(() => {
    const triggerInterval = setInterval(() => {
      animateText();
    }, intervalMs);
    
    return () => clearInterval(triggerInterval);
  }, [animateText, intervalMs]);

  return { displayText, isAnimating };
};
