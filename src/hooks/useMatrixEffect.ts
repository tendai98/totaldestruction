
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
  intervalMs: number = 10000,
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
    window.addEventListener('mouseover', recordUserActivity); // Add mouseover listener
    
    return () => {
      window.removeEventListener('mousemove', recordUserActivity);
      window.removeEventListener('touchmove', recordUserActivity);
      window.removeEventListener('click', recordUserActivity);
      window.removeEventListener('keydown', recordUserActivity);
      window.removeEventListener('scroll', recordUserActivity);
      window.removeEventListener('mouseover', recordUserActivity);
    };
  }, [recordUserActivity]);

  // Function to create scrambled text with a more pronounced downward flow effect
  const scrambleText = useCallback((progress: number) => {
    return originalText
      .split('')
      .map((char, idx) => {
        // If character is a space, preserve it
        if (char === ' ') return ' ';
        
        // Calculate if this character should be scrambled based on progress and position
        // Create a wave-like pattern that flows from top to bottom
        const positionEffect = Math.sin((idx / originalText.length) * Math.PI * 2 + progress * Math.PI * 2);
        const shouldScramble = progress < 1 && 
          (progress < 0.5 ? 
            // First half of animation - characters scramble in a wave pattern
            (idx / originalText.length + positionEffect * 0.2) < progress * 2 : 
            // Second half - characters return to normal in reverse wave pattern
            ((originalText.length - idx) / originalText.length - positionEffect * 0.2) > (progress - 0.5) * 2);
        
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
    
    // Slow down the update frequency for smoother animation
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
    }, 70); // Slower update interval (was 50ms, now 70ms) for smoother animation
    
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

  // Immediately stop animation when user becomes active
  useEffect(() => {
    const handleUserActivity = () => {
      if (isAnimating && userActive) {
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
        setDisplayText(originalText);
        setIsAnimating(false);
      }
    };
    
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('mouseover', handleUserActivity);
    
    return () => {
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('mouseover', handleUserActivity);
    };
  }, [isAnimating, originalText]);

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
