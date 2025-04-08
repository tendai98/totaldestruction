
import React from 'react';
import { GlitchColorStyle } from '../../utils/mapEffects';

interface CountryPathProps {
  pathData: string;
  countryId: string;
  countryName: string;
  isSelected: boolean;
  isHovered: boolean;
  isGlitching: boolean;
  isMobile: boolean;
  currentGlitchStyle: GlitchColorStyle;
  onCountrySelect: (countryId: string) => void;
  onHoverChange: (countryId: string | null) => void;
}

const CountryPath: React.FC<CountryPathProps> = ({
  pathData,
  countryId,
  countryName,
  isSelected,
  isHovered,
  isGlitching,
  isMobile,
  currentGlitchStyle,
  onCountrySelect,
  onHoverChange
}) => {
  return (
    <path 
      d={pathData}
      stroke={isSelected ? "#00ff00" : 
              isGlitching ? currentGlitchStyle.stroke : 
              isHovered && !isMobile ? "#00aaff" : "#333"}
      strokeWidth={isSelected ? 2 : isGlitching ? 2 : isHovered && !isMobile ? 1.5 : 1}
      strokeLinejoin="round"
      className={`
        cursor-pointer transition-all duration-300
        ${isSelected ? 'fill-cyber-green stroke-cyber-green opacity-70' : 
          isGlitching ? `fill-${currentGlitchStyle.fill} opacity-80 animate-borderGlitch` :
          isHovered && !isMobile ? 'fill-cyber-blue stroke-cyber-blue opacity-50' : 'fill-cyber-red opacity-40'}
      `}
      onClick={() => onCountrySelect(countryId)}
      onMouseEnter={() => !isMobile && onHoverChange(countryId)}
      onMouseLeave={() => !isMobile && onHoverChange(null)}
      onTouchStart={() => isMobile && onHoverChange(countryId)}
      onTouchEnd={() => isMobile && onHoverChange(null)}
    />
  );
};

export default CountryPath;
