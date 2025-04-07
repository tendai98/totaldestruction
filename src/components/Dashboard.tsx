
import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import { useArticles } from '../hooks/useArticles';
import { AlertTriangle, BarChart2, Database, Layers } from 'lucide-react';

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
      {/* Header Bar */}
      <div className="bg-cyber-darkgray border-b border-cyber-green p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyber-green text-cyber-black flex items-center justify-center font-bold text-lg">
              TD
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wider cyber-glitch">
              TOTAL<span className="text-cyber-green">DESTRUCTION</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-cyber-blue text-xs">
              <Database size={14} />
              <span>CORE SYSTEMS OPERATIONAL</span>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <div className="h-2 w-2 bg-cyber-green rounded-full animate-pulse"></div>
              <span className="text-xs text-white/70">LIVE DATA</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors">
                <Layers size={18} />
              </button>
              <button className="p-2 bg-cyber-darkgray border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors">
                <BarChart2 size={18} />
              </button>
              <button className="p-2 bg-cyber-darkgray border border-cyber-red text-cyber-red hover:bg-cyber-red hover:text-cyber-black transition-colors">
                <AlertTriangle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        <Map 
          onCountrySelect={handleCountrySelect}
          selectedCountry={selectedCountry}
        />
        
        {/* Sidebar for Article Display */}
        <Sidebar 
          articles={articles}
          selectedCountry={selectedCountry}
          onClose={handleCloseSidebar}
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
    </div>
  );
};

export default Dashboard;
