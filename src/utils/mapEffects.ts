
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

// Function to select a cluster of neighboring countries for glitching effect
export const selectCountryCluster = (
  countryPaths: Record<string, string>,
  countryCodeToId: Record<string, string>
): string[] => {
  if (Object.keys(countryPaths).length === 0) return [];
  
  const allCodes = Object.keys(countryPaths);
  
  // Select a random starting country
  const startIndex = Math.floor(Math.random() * allCodes.length);
  const startCode = allCodes[startIndex];
  const startId = countryCodeToId[startCode] || startCode;
  
  // Create a cluster by selecting nearby countries (based on code proximity as a simple heuristic)
  const cluster: string[] = [startId];
  const codeArray = allCodes.slice();
  
  // Sort by "proximity" to the start code (just using string similarity as a rough approximation)
  codeArray.sort((a, b) => {
    if (a === startCode) return -1;
    if (b === startCode) return 1;
    
    // Simple string similarity metric
    const aDiff = Math.abs(a.charCodeAt(0) - startCode.charCodeAt(0));
    const bDiff = Math.abs(b.charCodeAt(0) - startCode.charCodeAt(0));
    return aDiff - bDiff;
  });
  
  // Take the first few countries in the sorted array to form a cluster
  for (let i = 0; i < Math.min(5, codeArray.length); i++) {
    const code = codeArray[i];
    const id = countryCodeToId[code] || code;
    if (!cluster.includes(id)) {
      cluster.push(id);
    }
  }
  
  return cluster;
};

// Hook to manage the animation state for map glitching effects
export const useMapGlitchEffect = (
  isLoading: boolean, 
  selectClusterFn: () => string[] | undefined
) => {
  const [glitchingCountries, setGlitchingCountries] = React.useState<string[]>([]);
  const [glitchColorIndex, setGlitchColorIndex] = React.useState(0);
  
  // Get current glitch style
  const currentGlitchStyle = glitchColors[glitchColorIndex];
  
  // Listen for global animation state changes to sync with text effects
  React.useEffect(() => {
    // Remember the current glitching countries between animation cycles
    let currentGlitchingCountries: string[] = [];
    
    // Handler for global animation state changes
    const handleAnimationStateChange = () => {
      const { active } = getGlobalAnimationState();
      if (active && !isLoading) {
        // Only select new countries if we don't have any yet
        if (currentGlitchingCountries.length === 0) {
          const newCluster = selectClusterFn() || [];
          currentGlitchingCountries = newCluster;
        }
        
        // Update the glitch color for variation between cycles - faster color changes
        setGlitchColorIndex(Math.floor(Math.random() * glitchColors.length));
        
        // Apply the glitching effect
        setGlitchingCountries(currentGlitchingCountries);
        
        // Random color changes during the animation - TV effect
        const colorChangeInterval = setInterval(() => {
          setGlitchColorIndex(Math.floor(Math.random() * glitchColors.length));
        }, 40); // Ultra fast random color change every 40ms for TV effect
        
        // Clear the glitching effect after the animation duration
        const timer = setTimeout(() => {
          clearInterval(colorChangeInterval);
          setGlitchingCountries([]);
          // Keep the currentGlitchingCountries in memory so the next cycle will use the same countries
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
  }, [isLoading, selectClusterFn]);

  return { glitchingCountries, currentGlitchStyle };
};
