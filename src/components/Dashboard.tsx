
import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import { useArticles } from '../hooks/useArticles';
import { useIsMobile } from '../hooks/use-mobile';
import { BarChart2, Database, Layers, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { articles, selectedCountry, getArticlesByCountry, clearSelection } = useArticles();
  const isMobile = useIsMobile();
  
  const handleCountrySelect = (countryId: string) => {
    getArticlesByCountry(countryId);
  };
  
  const handleCloseSidebar = () => {
    clearSelection();
  };
  
  return (
    <div className="relative h-[calc(100vh-72px)] flex flex-col bg-cyber-black overflow-hidden">
      {/* Main Content - Map and sidebar in a fixed-size container */}
      <div className="flex-1 flex flex-col md:flex-row h-full">
        {/* Map Container - Always maintain size, but on mobile when sidebar is open, only show top half */}
        <div className={`relative w-full h-full transition-all duration-300 ${isMobile && selectedCountry ? 'h-[50vh]' : 'h-full'}`}>
          <Map 
            onCountrySelect={handleCountrySelect}
            selectedCountry={selectedCountry}
          />
          
          {/* HUD Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
            <div className="cyber-border p-3 bg-cyber-black/70 backdrop-blur-sm">
              <div className="text-xs text-[#F97316] mb-1 font-kode-mono">SYSTEM STATUS</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-[#F97316] rounded-full animate-pulse"></div>
                <span className="text-xs text-white/70 font-kode-mono">SCANNERS ACTIVE</span>
              </div>
            </div>
            
            {!isMobile && !selectedCountry && (
              <div className="cyber-border p-3 bg-cyber-black/70 backdrop-blur-sm">
                <div className="text-xs text-cyber-yellow font-kode-mono">SELECT A REGION TO VIEW INCIDENT DATA</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Options Panel - Below on mobile, right side on desktop */}
        {!selectedCountry && (
          <div className="w-full md:w-[40%] bg-cyber-darkgray/50 p-3 sm:p-4 overflow-y-auto border-l border-cyber-blue/20 max-h-[40vh] md:max-h-full">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl text-[#F97316] mb-2 font-bold tracking-wider font-orbitron">REGION INFORMATION</h2>
              <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">Select a country on the map to view environmental incident reports.</p>
              
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="cyber-border p-2 sm:p-3 flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl text-[#F97316] font-bold">{articles.length}</div>
                  <div className="text-[10px] sm:text-xs text-white/70">TOTAL INCIDENTS</div>
                </div>
                <div className="cyber-border-red p-2 sm:p-3 flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl text-cyber-red font-bold">12</div>
                  <div className="text-[10px] sm:text-xs text-white/70">CRITICAL ALERTS</div>
                </div>
              </div>
              
              <div className="cyber-border-blue p-2 sm:p-3 mb-3 sm:mb-4">
                <h3 className="text-cyber-blue text-xs sm:text-sm mb-2 font-kode-mono">REGION STATS</h3>
                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs">
                  <div className="text-white/70">MONITORING:</div>
                  <div className="text-[#F97316]">ACTIVE</div>
                  <div className="text-white/70">LAST UPDATE:</div>
                  <div className="text-white">12MIN AGO</div>
                  <div className="text-white/70">RISK LEVEL:</div>
                  <div className="text-cyber-red">HIGH</div>
                </div>
              </div>
              
              <div className="cyber-border-yellow p-2 sm:p-3">
                <h3 className="text-cyber-yellow text-xs sm:text-sm mb-2 font-kode-mono">MAP LEGEND</h3>
                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyber-red opacity-60"></div>
                    <span className="text-white/70">DEFAULT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyber-blue opacity-60"></div>
                    <span className="text-white/70">HOVERED</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#F97316] opacity-70"></div>
                    <span className="text-white/70">SELECTED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Sidebar for Article Display */}
        <Sidebar 
          articles={articles}
          selectedCountry={selectedCountry}
          onClose={handleCloseSidebar}
        />
      </div>
      
      {/* Mobile indication to select a country */}
      {isMobile && !selectedCountry && (
        <div className="fixed bottom-4 left-4 right-4 bg-cyber-black/90 border border-cyber-yellow p-3 text-center text-cyber-yellow text-sm font-kode-mono rounded-sm shadow-md">
          Tap on a country to view incident data
        </div>
      )}
    </div>
  );
};

export default Dashboard;
