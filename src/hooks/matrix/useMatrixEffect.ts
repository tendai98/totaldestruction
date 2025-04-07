
import { useState, useEffect, useCallback, useRef } from 'react';
import { scrambleText } from './textUtils';
import { setupActivityListeners } from './userActivity';
import { getGlobalAnimationState, setGlobalAnimationActive } from './globalState';
import { checkGlobalAnimationCycle } from './animationCycle';
import { ANIMATION_DURATION } from './constants';

export const useMatrixEffect = (
  originalText: string,
  durationMs: number = 2000,
  intervalMs: number = 25000, // 25 seconds
  forceAnimation: boolean = false
) => {
  const [displayText, setDisplayText] = useState(originalText);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to participate in the global animation
  const participateInGlobalAnimation = useCallback(() => {
    const { userActive } = getGlobalAnimationState();
    
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
      const { startTime, active } = getGlobalAnimationState();
      const elapsedTime = now - startTime;
      const progress = Math.min(1, elapsedTime / ANIMATION_DURATION);
      
      if (progress >= 1 || !active) {
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
        setDisplayText(originalText);
        setIsAnimating(false);
      } else {
        setDisplayText(scrambleText(originalText, progress));
      }
    }, 70); // Update interval for smoother animation
  }, [originalText, forceAnimation]);

  // Set up activity listeners once
  useEffect(() => {
    const cleanup = setupActivityListeners();
    return cleanup;
  }, []);

  // Set up listener for global animation state changes
  useEffect(() => {
    // Set up initial check and interval
    const initialCheck = setTimeout(() => {
      checkGlobalAnimationCycle(participateInGlobalAnimation);
    }, 2000);
    
    const intervalCheck = setInterval(() => {
      checkGlobalAnimationCycle(participateInGlobalAnimation);
    }, 1000);
    
    // Start immediate animation if global animation is already active
    const { active } = getGlobalAnimationState();
    if (active) {
      participateInGlobalAnimation();
    }
    
    // Listen for global animation state changes
    const handleAnimationStateChange = () => {
      const { active } = getGlobalAnimationState();
      if (active) {
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
      const { userActive } = getGlobalAnimationState();
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
