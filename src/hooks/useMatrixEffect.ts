
import { useState, useEffect, useCallback, useRef } from 'react';

// Characters used for the Matrix effect
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|;:,.<>?/~`';

// Shared animation state across all instances
let globalAnimationActive = false;
let globalAnimationStartTime = 0;
const ANIMATION_DURATION = 4000; // 4 seconds for the animation
const ANIMATION_CYCLE = 15000; // 15 seconds between animation cycles

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
    window.addEventListener('mouseover', recordUserActivity);
    
    return () => {
      window.removeEventListener('mousemove', recordUserActivity);
      window.removeEventListener('touchmove', recordUserActivity);
      window.removeEventListener('click', recordUserActivity);
      window.removeEventListener('keydown', recordUserActivity);
      window.removeEventListener('scroll', recordUserActivity);
      window.removeEventListener('mouseover', recordUserActivity);
    };
  }, [recordUserActivity]);

  // Function to create scrambled text with a consistent pattern
  const scrambleText = useCallback((progress: number) => {
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
  }, [originalText]);

  // Function to participate in the global animation
  const participateInGlobalAnimation = useCallback(() => {
    // Don't animate if user is active (unless forced)
    if (userActive && !forceAnimation) {
      setDisplayText(originalText);
      setIsAnimating(false);
      return;
    }
    
    setIsAnimating(true);
    
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    
    // Update at a consistent rate to show the animation progress
    animationRef.current = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - globalAnimationStartTime;
      const progress = Math.min(1, elapsedTime / ANIMATION_DURATION);
      
      if (progress >= 1 || !globalAnimationActive) {
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
        setDisplayText(originalText);
        setIsAnimating(false);
      } else {
        setDisplayText(scrambleText(progress));
      }
    }, 70); // Update interval for smoother animation
  }, [originalText, scrambleText, forceAnimation]);

  // Set up listener for global animation state changes
  useEffect(() => {
    // Function to check if a global animation cycle should start
    const checkGlobalAnimationCycle = () => {
      const now = Date.now();
      
      if (!userActive && !globalAnimationActive && (now - globalAnimationStartTime >= ANIMATION_CYCLE)) {
        globalAnimationActive = true;
        globalAnimationStartTime = now;
        
        // Schedule end of animation
        setTimeout(() => {
          globalAnimationActive = false;
        }, ANIMATION_DURATION);
        
        // Participate in this global animation
        participateInGlobalAnimation();
      }
    };
    
    // Set up initial check and interval
    const initialCheck = setTimeout(() => {
      checkGlobalAnimationCycle();
    }, 2000);
    
    const intervalCheck = setInterval(checkGlobalAnimationCycle, 1000);
    
    // Start immediate animation if global animation is already active
    if (globalAnimationActive) {
      participateInGlobalAnimation();
    }
    
    // Listen for global animation state changes
    const handleAnimationStateChange = () => {
      if (globalAnimationActive) {
        participateInGlobalAnimation();
      }
    };
    
    window.addEventListener('globalAnimationStateChange', handleAnimationStateChange);
    
    return () => {
      clearTimeout(initialCheck);
      clearInterval(intervalCheck);
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      window.removeEventListener('globalAnimationStateChange', handleAnimationStateChange);
    };
  }, [participateInGlobalAnimation]);

  // Immediately stop animation when user becomes active
  useEffect(() => {
    const handleUserActivity = () => {
      if (isAnimating && userActive && !forceAnimation) {
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
  }, [isAnimating, originalText, forceAnimation]);

  return { displayText, isAnimating };
};

// Initialize global animation cycle (run once on import)
setTimeout(() => {
  globalAnimationActive = true;
  globalAnimationStartTime = Date.now();
  
  setTimeout(() => {
    globalAnimationActive = false;
  }, ANIMATION_DURATION);
  
  // Trigger event for all instances to listen
  window.dispatchEvent(new Event('globalAnimationStateChange'));
}, 3000);

// Start periodic global animation cycles
setInterval(() => {
  if (!userActive) {
    globalAnimationActive = true;
    globalAnimationStartTime = Date.now();
    
    setTimeout(() => {
      globalAnimationActive = false;
    }, ANIMATION_DURATION);
    
    // Trigger event for all instances to listen
    window.dispatchEvent(new Event('globalAnimationStateChange'));
  }
}, ANIMATION_CYCLE);
