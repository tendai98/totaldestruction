
import React from 'react';

interface MapHUDProps {
  isMobile: boolean;
  isLoading?: boolean;
  selectedCountry: string | null;
}

const MapHUD: React.FC<MapHUDProps> = ({ isMobile, isLoading, selectedCountry }) => {
  return (
    <>
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
    </>
  );
};

export default MapHUD;
