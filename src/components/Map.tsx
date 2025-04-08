import React, { useState, useCallback } from 'react';
import { countries } from '../data/mockData';
import { useIsMobile } from '../hooks/use-mobile';
import { useMapData } from '../hooks/useMapData';
import { selectRandomCountries, useMapGlitchEffect } from '../utils/mapEffects';
import CountryPath from './map/CountryPath';
import MapHUD from './map/MapHUD';
import MapLoading from './map/MapLoading';

interface MapProps {
  onCountrySelect: (countryId: string) => void;
  selectedCountry: string | null;
}

const Map: React.FC<MapProps> = ({ onCountrySelect, selectedCountry }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { countryPaths, isLoading, countryCodeToId } = useMapData();
  
  // Function to select random countries - wrapped with useCallback for dependency array
  const selectRandomCountriesCallback = useCallback(() => {
    return selectRandomCountries(countryPaths, countryCodeToId);
  }, [countryPaths, countryCodeToId]);
  
  // Use our custom hook for the glitch effect
  const { glitchingCountries, currentGlitchStyle } = useMapGlitchEffect(isLoading, selectRandomCountriesCallback);
  
  return (
    <div className="relative w-full h-full">
      {/* Binary stream loading dialog */}
      <MapLoading isLoading={isLoading} />
      
      {/* Map background with grid effect */}
      <div className="absolute inset-0 cyber-grid">
        <MapHUD 
          isMobile={isMobile} 
          isLoading={isLoading} 
          selectedCountry={selectedCountry} 
        />
        
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
                <CountryPath
                  key={code}
                  pathData={pathData}
                  countryId={countryId}
                  countryName={countryName}
                  isSelected={isSelected}
                  isHovered={isHovered}
                  isGlitching={isGlitching}
                  isMobile={isMobile}
                  currentGlitchStyle={currentGlitchStyle}
                  onCountrySelect={onCountrySelect}
                  onHoverChange={setHoveredCountry}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Map;
