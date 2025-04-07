
import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import { useArticles } from '../hooks/useArticles';
import { BarChart2, Database, Layers, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { articles, selectedCountry, getArticlesByCountry, clearSelection } = useArticles();
  
  const handleCountrySelect = (countryId: string) => {
    getArticlesByCountry(countryId);
  };
  
  const handleCloseSidebar = () => {
    clearSelection();
  };
  
  return (
    <div className="relative min-h-screen flex flex-col bg-cyber-black">
      {/* Main Content - Map on left, options on right */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Map Container - Left Side */}
        <div className="flex-1 relative overflow-hidden border-r border-cyber-blue/30">
          <Map 
            onCountrySelect={handleCountrySelect}
            selectedCountry={selectedCountry}
          />
          
          {/* HUD Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
            <div className="cyber-border p-3 bg-cyber-black/70 backdrop-blur-sm">
              <div className="text-xs text-cyber-green mb-1">SYSTEM STATUS</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-cyber-green rounded-full animate-pulse"></div>
                <span className="text-xs text-white/70">SCANNERS ACTIVE</span>
              </div>
            </div>
            
            <div className="cyber-border p-3 bg-cyber-black/70 backdrop-blur-sm">
              <div className="text-xs text-cyber-yellow">SELECT A REGION TO VIEW INCIDENT DATA</div>
            </div>
          </div>
        </div>
        
        {/* Options Panel - Right Side */}
        <div className="w-full md:w-96 bg-cyber-darkgray/50 p-4 overflow-y-auto border-l border-cyber-blue/20">
          <div className="mb-6">
            <h2 className="text-xl text-cyber-green mb-2 font-bold tracking-wider">REGION INFORMATION</h2>
            <p className="text-white/70 text-sm mb-4">Select a country on the map to view environmental incident reports.</p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="cyber-border-green p-3 flex flex-col items-center">
                <div className="text-3xl text-cyber-green font-bold">{articles.length}</div>
                <div className="text-xs text-white/70">TOTAL INCIDENTS</div>
              </div>
              <div className="cyber-border-red p-3 flex flex-col items-center">
                <div className="text-3xl text-cyber-red font-bold">12</div>
                <div className="text-xs text-white/70">CRITICAL ALERTS</div>
              </div>
            </div>
            
            <div className="cyber-border-blue p-3 mb-4">
              <h3 className="text-cyber-blue text-sm mb-2">REGION STATS</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-white/70">MONITORING:</div>
                <div className="text-cyber-green">ACTIVE</div>
                <div className="text-white/70">LAST UPDATE:</div>
                <div className="text-white">12MIN AGO</div>
                <div className="text-white/70">RISK LEVEL:</div>
                <div className="text-cyber-red">HIGH</div>
              </div>
            </div>
            
            <div className="cyber-border-yellow p-3">
              <h3 className="text-cyber-yellow text-sm mb-2">MAP LEGEND</h3>
              <div className="grid grid-cols-2 gap-2 text-xs mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyber-red opacity-60"></div>
                  <span className="text-white/70">DEFAULT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyber-blue opacity-60"></div>
                  <span className="text-white/70">HOVERED</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyber-green opacity-70"></div>
                  <span className="text-white/70">SELECTED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar for Article Display */}
        <Sidebar 
          articles={articles}
          selectedCountry={selectedCountry}
          onClose={handleCloseSidebar}
        />
      </div>
    </div>
  );
};

export default Dashboard;
