
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Articles from '../components/Articles';
import { AlertTriangle, BarChart2, Database, Layers, Map, Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useMatrixEffect } from '../hooks/useMatrixEffect';

const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Add Matrix effects to header text and status texts
  const { displayText: logoText, isAnimating: logoAnimating } = 
    useMatrixEffect("DESTRUCTION", 2000, 15000);
    
  const { displayText: systemsText, isAnimating: systemsAnimating } = 
    useMatrixEffect("SYSTEMS OPERATIONAL", 1500, 15000);
    
  const { displayText: liveDataText, isAnimating: liveDataAnimating } = 
    useMatrixEffect("LIVE DATA", 1500, 15000);
    
  const { displayText: trackerText, isAnimating: trackerAnimating } = 
    useMatrixEffect("TRACKER", 1500, 15000);
  
  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Header Bar */}
      <div className="bg-cyber-darkgray border-b-2 border-[#F97316] p-4 shadow-neon-orange">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <img 
                src="/lovable-uploads/fba348a5-0041-47be-817f-d536c340cf44.png" 
                alt="Total Destruction Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-widest cyber-glitch relative">
              <span className="text-white">TOTAL</span>
              <span className={`${logoAnimating ? 'text-glitch' : 'text-[#F97316]'} inline-block w-[112px] md:w-[140px]`}>{logoText}</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#F97316] shadow-neon-orange"></span>
            </Link>
          </div>
          
          {isMobile ? (
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="p-2 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-cyber-blue text-xs bg-cyber-black/40 px-3 py-1.5 border border-cyber-blue">
                <Database size={14} />
                <span className={`font-mono ${systemsAnimating ? 'text-glitch' : ''}`}>{systemsText}</span>
              </div>
              
              <div className="hidden md:flex items-center gap-2 bg-cyber-black/40 px-3 py-1.5 border border-[#F97316]">
                <div className="h-2 w-2 bg-[#F97316] rounded-full animate-pulse"></div>
                <span className={`text-xs text-white/70 font-mono ${liveDataAnimating ? 'text-glitch' : ''}`}>{liveDataText}</span>
              </div>
              
              <Link 
                to="/tracker" 
                className="flex items-center gap-2 bg-cyber-darkgray border-2 border-[#F97316] text-white px-4 py-2 hover:bg-[#F97316] hover:text-cyber-black transition-colors relative after:content-[''] after:absolute after:w-full after:h-full after:border after:border-[#F97316]/30 after:top-1 after:left-1 after:-z-10"
              >
                <Map size={18} className="text-white" />
                <span className={`hidden md:inline tracking-wider font-bold text-white ${trackerAnimating ? 'text-glitch' : ''}`}>{trackerText}</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-3">
                <button className="p-2 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors">
                  <Layers size={18} className="text-white" />
                </button>
                <button className="p-2 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors">
                  <BarChart2 size={18} className="text-white" />
                </button>
                <button className="p-2 bg-cyber-darkgray border border-cyber-red text-cyber-red hover:bg-cyber-red hover:text-cyber-black transition-colors">
                  <AlertTriangle size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMobile && menuOpen && (
          <div className="absolute top-[72px] left-0 right-0 bg-cyber-black/95 backdrop-blur-md z-50 border-b border-[#F97316]">
            <div className="container mx-auto py-4 px-4 space-y-4">
              <Link 
                to="/tracker" 
                className="flex items-center gap-2 bg-cyber-darkgray border border-[#F97316] text-white px-4 py-3 hover:bg-[#F97316] hover:text-cyber-black transition-colors w-full"
                onClick={() => setMenuOpen(false)}
              >
                <Map size={18} />
                <span className={`tracking-wider font-bold text-white ${trackerAnimating ? 'text-glitch' : ''}`}>{trackerText}</span>
              </Link>
              
              <div className="flex justify-between gap-2">
                <button className="flex-1 p-3 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors flex items-center justify-center">
                  <Layers size={18} className="text-white" />
                </button>
                <button className="flex-1 p-3 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors flex items-center justify-center">
                  <BarChart2 size={18} className="text-white" />
                </button>
                <button className="flex-1 p-3 bg-cyber-darkgray border border-cyber-red text-cyber-red hover:bg-cyber-red hover:text-cyber-black transition-colors flex items-center justify-center">
                  <AlertTriangle size={18} />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-cyber-blue text-xs bg-cyber-black/40 px-3 py-2 border border-cyber-blue">
                <Database size={14} />
                <span className={`font-mono ${systemsAnimating ? 'text-glitch' : ''}`}>{systemsText}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="cyber-grid py-6 md:py-10 px-4 md:px-0">
        <Articles />
      </div>
      
      {/* Footer */}
      <div className="bg-cyber-darkgray border-t-2 border-[#F97316] p-4 text-center">
        <div className="container mx-auto px-4 md:px-0">
          <p className="text-white/50 text-xs font-mono">TOTAL<span className="text-[#F97316]">DESTRUCTION</span> // ENVIRONMENTAL MONITORING SYSTEM V1.0</p>
          <p className="mt-2 text-cyber-blue text-xs font-mono">COPYRIGHT © 2025 // DATA LAST UPDATED: 04-07-2025</p>
          
          <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-6 text-xs">
            <a href="#" className="text-white/70 hover:text-[#F97316] transition-colors">ABOUT</a>
            <a href="#" className="text-white/70 hover:text-[#F97316] transition-colors">CONTACT</a>
            <a href="#" className="text-white/70 hover:text-[#F97316] transition-colors">PRIVACY</a>
            <a href="#" className="text-white/70 hover:text-[#F97316] transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
