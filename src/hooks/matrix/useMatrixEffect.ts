
import { useState, useEffect, useCallback, useRef } from 'react';
import { scrambleText } from './textUtils';
import { getGlobalAnimationState, setGlobalAnimationActive } from './globalState';
import { checkGlobalAnimationCycle } from './animationCycle';
import { ANIMATION_DURATION } from './constants';

export const useMatrixEffect = (
  originalText: string,
  durationMs: number = 2000,
  intervalMs: number = 15000, // Changed to 15 seconds
  forceAnimation: boolean = false
) => {
  const [displayText, setDisplayText] = useState(originalText);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to participate in the global animation - removed user activity check
  const participateInGlobalAnimation = useCallback(() => {
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
  }, [originalText]);

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

  return { displayText, isAnimating };
};
