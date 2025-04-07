
import { ACTIVITY_TIMEOUT } from './constants';
import { setUserActive } from './globalState';

/**
 * Records user activity and resets inactivity timeout
 */
export const recordUserActivity = () => {
  setUserActive(true);
  
  // Reset user active flag after timeout
  setTimeout(() => {
    const { lastActivityTime } = require('./globalState').getGlobalAnimationState();
    if (Date.now() - lastActivityTime >= ACTIVITY_TIMEOUT) {
      setUserActive(false);
    }
  }, ACTIVITY_TIMEOUT);
};

/**
 * Sets up event listeners for user activity
 * @returns Cleanup function to remove event listeners
 */
export const setupActivityListeners = (): () => void => {
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
};
