
import React, { useState, useEffect, useCallback } from 'react';
import { countries } from '../data/mockData';
import { loadSvgMap } from '../utils/svgLoader';
import { useIsMobile } from '../hooks/use-mobile';
import { getGlobalAnimationState } from '../hooks/matrix/globalState';

interface MapProps {
  onCountrySelect: (countryId: string) => void;
  selectedCountry: string | null;
}

const Map: React.FC<MapProps> = ({ onCountrySelect, selectedCountry }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [countryPaths, setCountryPaths] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [glitchingCountries, setGlitchingCountries] = useState<string[]>([]);
  const [glitchColorIndex, setGlitchColorIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // Glitch color options
  const glitchColors = [
    { stroke: '#ff00ff', fill: 'cyber-orange' }, // Magenta + Orange
    { stroke: '#00ffff', fill: 'cyber-red' },    // Cyan + Red
    { stroke: '#ffff00', fill: 'cyber-blue' },   // Yellow + Blue
  ];
  
  useEffect(() => {
    const loadMap = async () => {
      setIsLoading(true);
      const paths = await loadSvgMap();
      setCountryPaths(paths);
      setIsLoading(false);
    };
    
    loadMap();
  }, []);

  // Create a mapping from country codes to IDs for easier lookup
  const countryCodeToId = countries.reduce((acc, country) => {
    if (country.code) {
      acc[country.code] = country.id;
    }
    return acc;
  }, {} as Record<string, string>);
  
  // Function to select a cluster of neighboring countries for glitching effect
  const selectCountryCluster = useCallback(() => {
    if (Object.keys(countryPaths).length === 0) return;
    
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
    
    // Change the glitch color for variation
    setGlitchColorIndex((prevIndex) => (prevIndex + 1) % glitchColors.length);
    setGlitchingCountries(cluster);
  }, [countryPaths, countryCodeToId]);

  // Listen for global animation state changes to sync with text effects
  useEffect(() => {
    // Handler for global animation state changes
    const handleAnimationStateChange = () => {
      const { active } = getGlobalAnimationState();
      if (active && !isLoading) {
        // Start glitching effect when global animation starts
        selectCountryCluster();
        
        // Clear the glitching effect after 2 seconds
        const timer = setTimeout(() => {
          setGlitchingCountries([]);
        }, 2000);
        
        return () => clearTimeout(timer);
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
  }, [isLoading, selectCountryCluster]);
  
  // Get current glitch style
  const currentGlitchStyle = glitchColors[glitchColorIndex];
  
  return (
    <div className="relative w-full h-full">
      {/* Map background with grid effect */}
      <div className="absolute inset-0 cyber-grid">
        <div className="absolute top-2 md:top-5 left-2 md:left-5 right-2 md:right-5 flex justify-between items-center">
          <div className="text-cyber-yellow text-xs md:text-sm font-kode-mono hidden sm:block">
            MONITORING ACTIVE: <span className="text-cyber-green animate-pulse">■</span>
          </div>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-cyber-green">
            <div className="text-lg md:text-xl font-kode-mono">LOADING MAP DATA...</div>
          </div>
        )}
        
        {/* Africa SVG map */}
        <div className="absolute inset-0 flex items-center justify-center scanning-effect">
          <svg 
            viewBox="0 0 1000 1001" 
            className="w-full h-full max-h-[calc(100vh-72px)]"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background for better visibility */}
            <rect x="0" y="0" width="1000" height="1001" fill="#121212" opacity="0.5" />
            
            {/* Map countries */}
            {Object.entries(countryPaths).map(([code, pathData]) => {
              const countryId = countryCodeToId[code] || code; // Use code as fallback if no matching country data
              const country = countries.find(c => c.id === countryId || c.code === code);
              
              // Default values if country not in our data
              const countryName = country?.name || code;
              const isSelected = selectedCountry === countryId;
              const isHovered = hoveredCountry === countryId;
              const isGlitching = glitchingCountries.includes(countryId);
              
              return (
                <path 
                  key={code}
                  d={pathData}
                  stroke={isSelected ? "#00ff00" : 
                          isGlitching ? currentGlitchStyle.stroke : 
                          isHovered && !isMobile ? "#00aaff" : "#333"}
                  strokeWidth={isSelected ? 2 : isGlitching ? 2 : isHovered && !isMobile ? 1.5 : 1}
                  strokeLinejoin="round"
                  className={`
                    cursor-pointer transition-all duration-300
                    ${isSelected ? 'fill-cyber-green stroke-cyber-green opacity-70' : 
                      isGlitching ? `fill-${currentGlitchStyle.fill} opacity-80 text-glitch` :
                      isHovered && !isMobile ? 'fill-cyber-blue stroke-cyber-blue opacity-50' : 'fill-cyber-red opacity-40'}
                  `}
                  onClick={() => onCountrySelect(countryId)}
                  onMouseEnter={() => !isMobile && setHoveredCountry(countryId)}
                  onMouseLeave={() => !isMobile && setHoveredCountry(null)}
                  onTouchStart={() => isMobile && setHoveredCountry(countryId)}
                  onTouchEnd={() => isMobile && setHoveredCountry(null)}
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* HUD Overlay - Simplified for mobile */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
        <div className="cyber-border p-2 md:p-3 bg-cyber-black/70 backdrop-blur-sm">
          <div className="text-xs text-cyber-green mb-1 font-kode-mono">STATUS</div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-cyber-green rounded-full animate-pulse"></div>
            <span className="text-xs text-white/70 font-kode-mono">ACTIVE</span>
          </div>
        </div>
        
        <div className="cyber-border p-2 md:p-3 bg-cyber-black/70 backdrop-blur-sm hidden md:block">
          <div className="text-xs text-cyber-yellow font-kode-mono">SELECT A REGION</div>
        </div>
      </div>
    </div>
  );
};

export default Map;
