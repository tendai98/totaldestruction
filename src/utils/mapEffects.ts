
import React from 'react';
import { getGlobalAnimationState } from '../hooks/matrix/globalState';

export interface GlitchColorStyle {
  stroke: string;
  fill: string;
}

// TV-effect bright colors
export const glitchColors: GlitchColorStyle[] = [
  { stroke: '#ff00ff', fill: 'cyber-orange' },   // Bright magenta
  { stroke: '#00ffff', fill: 'cyber-red' },      // Bright cyan
  { stroke: '#ffff00', fill: 'cyber-blue' },     // Bright yellow
  { stroke: '#33ff33', fill: 'cyber-green' },    // Bright lime green
  { stroke: '#ff3366', fill: 'cyber-blue' },     // Hot pink
  { stroke: '#3366ff', fill: 'cyber-orange' },   // Bright blue
  { stroke: '#ff6600', fill: 'cyber-green' },    // Bright orange
  { stroke: '#66ff00', fill: 'cyber-red' }       // Chartreuse
];

// Function to randomly select countries for glitching effect
export const selectRandomCountries = (
  countryPaths: Record<string, string>,
  countryCodeToId: Record<string, string>
): string[] => {
  if (Object.keys(countryPaths).length === 0) return [];
  
  const allCodes = Object.keys(countryPaths);
  const result: string[] = [];
  
  // Determine how many countries to glitch (between 3-8 countries)
  const numCountriesToGlitch = Math.floor(Math.random() * 6) + 3;
  
  // Randomly select countries
  for (let i = 0; i < numCountriesToGlitch; i++) {
    const randomIndex = Math.floor(Math.random() * allCodes.length);
    const code = allCodes[randomIndex];
    const id = countryCodeToId[code] || code;
    
    // Avoid duplicates
    if (!result.includes(id)) {
      result.push(id);
    }
  }
  
  return result;
};

// Hook to manage the animation state for map glitching effects
export const useMapGlitchEffect = (
  isLoading: boolean, 
  selectCountriesFn: () => string[] | undefined
) => {
  const [glitchingCountries, setGlitchingCountries] = React.useState<string[]>([]);
  const [glitchColorIndex, setGlitchColorIndex] = React.useState(0);
  
  // Get current glitch style
  const currentGlitchStyle = glitchColors[glitchColorIndex];
  
  // Listen for global animation state changes to sync with text effects
  React.useEffect(() => {
    // Handler for global animation state changes
    const handleAnimationStateChange = () => {
      const { active } = getGlobalAnimationState();
      if (active && !isLoading) {
        // Select new countries every animation cycle
        const newRandomCountries = selectCountriesFn() || [];
        
        // Apply the glitching effect
        setGlitchingCountries(newRandomCountries);
        
        // Random initial color
        setGlitchColorIndex(Math.floor(Math.random() * glitchColors.length));
        
        // Random color changes during the animation - TV effect
        const colorChangeInterval = setInterval(() => {
          setGlitchColorIndex(Math.floor(Math.random() * glitchColors.length));
        }, 40); // Ultra fast random color change every 40ms for TV effect
        
        // Clear the glitching effect after the animation duration
        const timer = setTimeout(() => {
          clearInterval(colorChangeInterval);
          setGlitchingCountries([]);
        }, 2000);
        
        return () => {
          clearTimeout(timer);
          clearInterval(colorChangeInterval);
        };
      } else {
        // Clear glitching if animation stops
        setGlitchingCountries([]);
      }
    };
    
    // Check animation state initially
    handleAnimationStateChange();
    
    // Set up listener for animation state changes
    window.addEventListener('globalAnimationStateChange', handleAnimationStateChange);
    
    return () => {
      window.removeEventListener('globalAnimationStateChange', handleAnimationStateChange);
    };
  }, [isLoading, selectCountriesFn]);

  return { glitchingCountries, currentGlitchStyle };
};
