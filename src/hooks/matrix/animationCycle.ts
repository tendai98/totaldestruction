
import { ANIMATION_CYCLE, ANIMATION_DURATION } from './constants';
import { getGlobalAnimationState, setGlobalAnimationActive } from './globalState';

/**
 * Checks if a global animation cycle should start
 * @param callback Function to call when animation starts
 * @returns true if animation started
 */
export const checkGlobalAnimationCycle = (callback?: () => void): boolean => {
  const now = Date.now();
  const { active, startTime, userActive } = getGlobalAnimationState();
  
  if (!userActive && !active && (now - startTime >= ANIMATION_CYCLE)) {
    setGlobalAnimationActive(true);
    
    // Schedule end of animation
    setTimeout(() => {
      setGlobalAnimationActive(false);
    }, ANIMATION_DURATION);
    
    // Call the callback if provided
    if (callback) {
      callback();
    }
    
    return true;
  }
  
  return false;
};

// Set up periodic global animation cycles
let cycleInterval: NodeJS.Timeout;

export const startAnimationCycles = () => {
  if (!cycleInterval) {
    cycleInterval = setInterval(() => {
      const { userActive } = getGlobalAnimationState();
      if (!userActive) {
        setGlobalAnimationActive(true);
        
        setTimeout(() => {
          setGlobalAnimationActive(false);
        }, ANIMATION_DURATION);
      }
    }, ANIMATION_CYCLE);
  }
};

export const stopAnimationCycles = () => {
  if (cycleInterval) {
    clearInterval(cycleInterval);
    cycleInterval = undefined;
  }
};

// Start the animation cycles
startAnimationCycles();
