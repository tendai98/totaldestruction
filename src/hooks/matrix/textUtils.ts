
import { matrixChars } from './constants';

/**
 * Creates scrambled text with a consistent pattern
 * @param originalText The text to scramble
 * @param progress Animation progress from 0 to 1
 * @returns Scrambled text
 */
export const scrambleText = (originalText: string, progress: number): string => {
  return originalText
    .split('')
    .map((char, idx) => {
      // If character is a space, preserve it
      if (char === ' ') return ' ';
      
      // Calculate if this character should be scrambled based on progress
      // Create a wave-like pattern but consistent across all instances
      const shouldScramble = progress < 1 && 
        (progress < 0.5 ? 
          // First half of animation - characters scramble in a wave pattern
          (idx / originalText.length) < progress * 2 : 
          // Second half - characters return to normal
          ((originalText.length - idx) / originalText.length) > (progress - 0.5) * 2);
      
      if (shouldScramble) {
        return matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      }
      
      return char;
    })
    .join('');
};
