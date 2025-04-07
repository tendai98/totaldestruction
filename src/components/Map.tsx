
import React, { useState } from 'react';
import { countries } from '../data/mockData';

interface MapProps {
  onCountrySelect: (countryId: string) => void;
  selectedCountry: string | null;
}

const Map: React.FC<MapProps> = ({ onCountrySelect, selectedCountry }) => {
  // This is a simplified map representation using CSS grid
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  
  return (
    <div className="relative w-full h-full">
      {/* Map background with grid effect */}
      <div className="absolute inset-0 cyber-grid bg-cyber-black">
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
          <h2 className="text-cyber-green text-2xl font-bold tracking-wider animate-glow">
            AFRICA OIL OPERATIONS
          </h2>
          <div className="text-cyber-yellow text-sm">
            MONITORING ACTIVE: <span className="text-cyber-green animate-pulse">■</span>
          </div>
        </div>
        
        {/* Simple Africa outline as a placeholder */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <path 
              d="M500,200 Q650,250 700,400 Q750,550 650,700 Q550,850 500,850 Q450,850 350,700 Q250,550 300,400 Q350,250 500,200" 
              fill="none" 
              stroke="#333" 
              strokeWidth="2"
              className="opacity-50"
            />
            
            {/* Clickable country points */}
            {countries.map((country) => {
              // Each country would have its real coordinates in a real implementation
              // Here we're just distributing them around the map for demonstration
              const index = countries.indexOf(country);
              const total = countries.length;
              const angle = (index / total) * Math.PI * 2;
              const radius = 250;
              const x = 500 + Math.cos(angle) * radius;
              const y = 500 + Math.sin(angle) * radius;
              
              const isSelected = selectedCountry === country.id;
              const isHovered = hoveredCountry === country.id;
              
              return (
                <g 
                  key={country.id} 
                  onClick={() => onCountrySelect(country.id)}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className="cursor-pointer"
                >
                  <circle 
                    cx={x} 
                    cy={y} 
                    r={isSelected || isHovered ? 15 : 10}
                    className={`
                      ${isSelected ? 'fill-cyber-green shadow-neon-green animate-pulse' : 
                        isHovered ? 'fill-cyber-blue shadow-neon-blue' : 'fill-cyber-red opacity-70'}
                      transition-all duration-300
                    `}
                  />
                  <text 
                    x={x} 
                    y={y - 20} 
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
