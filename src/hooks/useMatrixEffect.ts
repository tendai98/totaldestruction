
import { useState, useEffect, useCallback, useRef } from 'react';

// Characters used for the Matrix effect
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|;:,.<>?/~`';

// Shared user activity state across all instances
let userActive = false;
let lastActivityTime = Date.now();
const ACTIVITY_TIMEOUT = 5000; // Consider user inactive after 5 seconds of no activity

export const useMatrixEffect = (
  originalText: string,
  durationMs: number = 2000,
  intervalMs: number = 10000, // Changed to 10 seconds
  forceAnimation: boolean = false
) => {
  const [displayText, setDisplayText] = useState(originalText);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to record user activity
  const recordUserActivity = useCallback(() => {
    userActive = true;
    lastActivityTime = Date.now();
    
    // Reset user active flag after timeout
    setTimeout(() => {
      if (Date.now() - lastActivityTime >= ACTIVITY_TIMEOUT) {
        userActive = false;
      }
    }, ACTIVITY_TIMEOUT);
  }, []);

  // Set up global mouse/touch movement detection once
  useEffect(() => {
    window.addEventListener('mousemove', recordUserActivity);
    window.addEventListener('touchmove', recordUserActivity);
    window.addEventListener('click', recordUserActivity);
    window.addEventListener('keydown', recordUserActivity);
    window.addEventListener('scroll', recordUserActivity);
    
    return () => {
      window.removeEventListener('mousemove', recordUserActivity);
      window.removeEventListener('touchmove', recordUserActivity);
      window.removeEventListener('click', recordUserActivity);
      window.removeEventListener('keydown', recordUserActivity);
      window.removeEventListener('scroll', recordUserActivity);
    };
  }, [recordUserActivity]);

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
    // Don't animate if user is active (unless forced)
    if (userActive && !forceAnimation) {
      return;
    }
    
    setIsAnimating(true);
    
    const startTime = Date.now();
    const endTime = startTime + durationMs;
    
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    
    animationRef.current = setInterval(() => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / durationMs);
      
      if (now >= endTime) {
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
        setDisplayText(originalText);
        setIsAnimating(false);
      } else {
        setDisplayText(scrambleText(progress));
      }
    }, 50); // Update scramble effect every 50ms for smoothness
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [originalText, durationMs, scrambleText, forceAnimation]);

  // Set up interval to trigger animation periodically
  useEffect(() => {
    // Function to check if animation should run
    const checkAndAnimate = () => {
      if (!userActive || forceAnimation) {
        animateText();
      }
    };
    
    // Initial animation after a short delay
    const initialDelay = setTimeout(() => {
      checkAndAnimate();
    }, 2000);
    
    // Set up the recurring interval
    triggerRef.current = setInterval(checkAndAnimate, intervalMs);
    
    return () => {
      clearTimeout(initialDelay);
      if (triggerRef.current) {
        clearInterval(triggerRef.current);
      }
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [animateText, intervalMs, forceAnimation]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      if (triggerRef.current) {
        clearInterval(triggerRef.current);
      }
    };
  }, []);

  return { displayText, isAnimating };
};
