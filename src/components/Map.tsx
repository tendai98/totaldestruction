
import React, { useState, useEffect } from 'react';
import { countries } from '../data/mockData';
import { loadSvgMap } from '../utils/svgLoader';

interface MapProps {
  onCountrySelect: (countryId: string) => void;
  selectedCountry: string | null;
}

const Map: React.FC<MapProps> = ({ onCountrySelect, selectedCountry }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [countryPaths, setCountryPaths] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  return (
    <div className="relative w-full h-full min-h-[700px]">
      {/* Map background with grid effect */}
      <div className="absolute inset-0 cyber-grid">
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
          <h2 className="text-cyber-green text-2xl font-bold tracking-wider animate-glow font-orbitron">
            AFRICA OIL OPERATIONS
          </h2>
          <div className="text-cyber-yellow text-sm font-kode-mono">
            MONITORING ACTIVE: <span className="text-cyber-green animate-pulse">■</span>
          </div>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-cyber-green">
            <div className="text-xl font-kode-mono">LOADING MAP DATA...</div>
          </div>
        )}
        
        {/* Africa SVG map */}
        <div className="absolute inset-0 flex items-center justify-center scanning-effect">
          <svg 
            viewBox="0 0 1000 1001" 
            className="w-full h-full max-w-4xl"
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
              
              return (
                <path 
                  key={code}
                  d={pathData}
                  stroke={isSelected ? "#00ff00" : isHovered ? "#00aaff" : "#333"}
                  strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 1}
                  strokeLinejoin="round"
                  className={`
                    cursor-pointer transition-all duration-300
                    ${isSelected ? 'fill-cyber-green stroke-cyber-green opacity-70' : 
                      isHovered ? 'fill-cyber-blue stroke-cyber-blue opacity-50' : 'fill-cyber-red opacity-40'}
                  `}
                  onClick={() => onCountrySelect(countryId)}
                  onMouseEnter={() => setHoveredCountry(countryId)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
              );
            })}
            
            {/* Country name labels */}
            {Object.entries(countryPaths).map(([code, pathData]) => {
              const countryId = countryCodeToId[code] || code;
              const country = countries.find(c => c.id === countryId || c.code === code);
              const countryName = country?.name || code;
              
              const isSelected = selectedCountry === countryId;
              
              // Extract all coordinates and find the approximate center
              const coords = pathData.match(/[0-9]+(\.[0-9]+)?,\s*[0-9]+(\.[0-9]+)?/g);
              if (!coords || coords.length === 0) return null;
              
              // Calculate centroid by averaging coordinates
              let sumX = 0, sumY = 0;
              coords.forEach(coord => {
                const [x, y] = coord.split(',').map(Number);
                sumX += x;
                sumY += y;
              });
              
              const centerX = sumX / coords.length;
              const centerY = sumY / coords.length;
              
              return (
                <text
                  key={`label-${code}`}
                  x={centerX}
                  y={centerY}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={isSelected ? "bold" : "normal"}
                  fill={isSelected ? "#00ff00" : "#ffffff"}
                  opacity={isSelected ? 1 : 0.7}
                  className="pointer-events-none font-kode-mono"
                >
                  {countryName.substring(0, 12)}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* HUD Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
        <div className="cyber-border p-3 bg-cyber-black/70 backdrop-blur-sm">
          <div className="text-xs text-cyber-green mb-1 font-kode-mono">SYSTEM STATUS</div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-cyber-green rounded-full animate-pulse"></div>
            <span className="text-xs text-white/70 font-kode-mono">SCANNERS ACTIVE</span>
          </div>
        </div>
        
        <div className="cyber-border p-3 bg-cyber-black/70 backdrop-blur-sm">
          <div className="text-xs text-cyber-yellow font-kode-mono">SELECT A REGION TO VIEW INCIDENT DATA</div>
        </div>
      </div>
    </div>
  );
};

export default Map;
