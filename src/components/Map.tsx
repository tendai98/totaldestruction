
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
  
  return (
    <div className="relative w-full h-full">
      {/* Map background with grid effect */}
      <div className="absolute inset-0 cyber-grid">
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
          <h2 className="text-cyber-green text-2xl font-bold tracking-wider animate-glow">
            AFRICA OIL OPERATIONS
          </h2>
          <div className="text-cyber-yellow text-sm">
            MONITORING ACTIVE: <span className="text-cyber-green animate-pulse">■</span>
          </div>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-cyber-green">
            <div className="text-xl">LOADING MAP DATA...</div>
          </div>
        )}
        
        {/* Africa SVG map */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
          <svg 
            viewBox="0 0 1000 1001" 
            className="w-full h-full"
          >
            {/* Map countries */}
            {countries.map((country) => {
              const pathData = countryPaths[country.code];
              const isSelected = selectedCountry === country.id;
              const isHovered = hoveredCountry === country.id;
              
              // If we have a path for this country, render it
              if (pathData) {
                return (
                  <path 
                    key={country.id}
                    d={pathData}
                    stroke="#333"
                    strokeWidth={1}
                    strokeLinejoin="round"
                    className={`
                      cursor-pointer transition-all duration-300
                      ${isSelected ? 'fill-cyber-green stroke-cyber-green opacity-70' : 
                        isHovered ? 'fill-cyber-blue stroke-cyber-blue opacity-50' : 'fill-cyber-red opacity-30'}
                    `}
                    onClick={() => onCountrySelect(country.id)}
                    onMouseEnter={() => setHoveredCountry(country.id)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                );
              }
              
              // Fallback for countries without paths
              // Display a point on the map for countries without matching SVG paths
              return (
                <g 
                  key={country.id}
                  onClick={() => onCountrySelect(country.id)}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className="cursor-pointer"
                >
                  <circle 
                    cx={400 + Math.random() * 200} 
                    cy={400 + Math.random() * 200} 
                    r={isSelected || isHovered ? 15 : 10}
                    className={`
                      ${isSelected ? 'fill-cyber-green stroke-white stroke-1 animate-pulse' : 
                        isHovered ? 'fill-cyber-blue stroke-white stroke-1' : 'fill-cyber-red'}
                      transition-all duration-300
                    `}
                  />
                  <text 
                    x={400 + Math.random() * 200} 
                    y={(400 + Math.random() * 200) - 20} 
                    textAnchor="middle" 
                    className={`
                      text-xs ${isSelected || isHovered ? 'text-white' : 'text-gray-500'}
                      transition-colors duration-300
                    `}
                  >
                    {country.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Map;
