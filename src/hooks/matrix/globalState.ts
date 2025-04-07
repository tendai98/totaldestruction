
import { ANIMATION_DURATION } from './constants';

// Shared animation state
let globalAnimationActive = false;
let globalAnimationStartTime = 0;

// Shared user activity state
let userActive = false;
let lastActivityTime = Date.now();

export const getGlobalAnimationState = () => ({
  active: globalAnimationActive,
  startTime: globalAnimationStartTime,
  userActive,
  lastActivityTime
});

export const setGlobalAnimationActive = (active: boolean) => {
  globalAnimationActive = active;
  if (active) {
    globalAnimationStartTime = Date.now();
  }
  
  // Trigger event for all instances to listen
  window.dispatchEvent(new Event('globalAnimationStateChange'));
};

export const setUserActive = (active: boolean) => {
  userActive = active;
  if (active) {
    lastActivityTime = Date.now();
  }
};

// Initialize global animation cycle (run once on import)
setTimeout(() => {
  setGlobalAnimationActive(true);
  
  setTimeout(() => {
    setGlobalAnimationActive(false);
  }, ANIMATION_DURATION);
}, 3000);
