
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { Home, Menu, Book, FileText, FileSignature } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useMatrixEffect } from '../hooks/matrix';
import { SocialLinks } from '../components/SocialLinks';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TrackerPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const { displayText: logoText, isAnimating: logoAnimating } = 
    useMatrixEffect("DESTRUCTION", 2000, 25000);
    
  const { displayText: homeText, isAnimating: homeAnimating } = 
    useMatrixEffect("HOME", 1500, 25000);
    
  const { displayText: letterText, isAnimating: letterAnimating } = 
    useMatrixEffect("SIGN OPEN LETTER", 1800, 25000);
    
  const { displayText: signaturesText, isAnimating: signaturesAnimating } = 
    useMatrixEffect("SIGNATURES", 1600, 25000);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-cyber-black flex flex-col">
      <div className="bg-cyber-darkgray border-b-2 border-[#F97316] p-4 shadow-neon-orange">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <img 
                src="/lovable-uploads/fba348a5-0041-47be-817f-d536c340cf44.png" 
                alt="Total Destruction Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-widest cyber-glitch flex items-center">
              <span className="text-white">TOTAL</span>
              {/* Fixed width container for DESTRUCTION to prevent layout shifts during animation */}
              <div className="inline-block w-[140px] md:w-[180px] overflow-hidden">
                <span className={`${logoAnimating ? 'text-glitch' : 'text-cyber-green'}`}>{logoText}</span>
              </div>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyber-green shadow-neon-green"></span>
            </Link>
            <div className="hidden lg:block ml-4">
              <SocialLinks />
            </div>
          </div>
          
          {isMobile ? (
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors min-w-[44px]"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          ) : (
            <div className="flex items-center gap-1 md:gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/" 
                    className="flex items-center gap-1 md:gap-2 bg-cyber-darkgray border-2 border-cyber-blue text-cyber-blue px-2 md:px-4 py-2 hover:bg-cyber-blue hover:text-cyber-black transition-colors relative after:content-[''] after:absolute after:w-full after:h-full after:border after:border-cyber-blue/30 after:top-1 after:left-1 after:-z-10 min-w-[44px]"
                  >
                    <Home size={18} className="text-white flex-shrink-0" />
                    <div className="hidden md:inline-block max-w-[60px] overflow-hidden">
                      <span className={`tracking-wider font-bold text-white text-sm ${homeAnimating ? 'text-glitch' : ''}`}>{homeText}</span>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Return to homepage</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/petition" 
                    className="flex items-center gap-1 md:gap-2 p-2 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors min-w-[44px]"
                  >
                    <FileText size={18} className="text-white flex-shrink-0" />
                    <div className="hidden xl:inline-block max-w-[190px] overflow-hidden">
                      <span className={`tracking-wider font-bold text-white text-sm whitespace-nowrap ${letterAnimating ? 'text-glitch' : ''}`}>{letterText}</span>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign the open letter to CAF</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/signatures"
                    className="flex items-center gap-1 md:gap-2 p-2 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors min-w-[44px]"
                  >
                    <FileSignature size={18} className="text-white flex-shrink-0" />
                    <div className="hidden xl:inline-block max-w-[120px] overflow-hidden">
                      <span className={`tracking-wider font-bold text-white text-sm whitespace-nowrap ${signaturesAnimating ? 'text-glitch' : ''}`}>{signaturesText}</span>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View petition signatures</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/about" 
                    className="p-2 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors min-w-[44px]"
                  >
                    <Book size={18} className="text-white flex-shrink-0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>About this campaign</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
        
        {isMobile && menuOpen && (
          <div className="absolute top-[72px] left-0 right-0 bg-cyber-black/95 backdrop-blur-md z-50 border-b border-[#F97316] transition-all duration-300">
            <div className="container mx-auto py-4 px-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 mb-3 px-4 py-3 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors w-full min-h-[48px]"
                onClick={() => setMenuOpen(false)}
              >
                <Home size={20} className="text-white flex-shrink-0" />
                <div className="inline-block overflow-hidden">
                  <span className={`tracking-wider font-bold text-white ${homeAnimating ? 'text-glitch' : ''}`}>{homeText}</span>
                </div>
              </Link>
              
              <div className="grid grid-cols-3 gap-2">
                <Link 
                  to="/petition"
                  className="p-3 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors flex flex-col items-center justify-center gap-1 min-h-[64px]"
                  onClick={() => setMenuOpen(false)}
                >
                  <FileText size={20} className="text-white" />
                  <span className="text-xs font-kode-mono">LETTER</span>
                </Link>
                
                <Link 
                  to="/signatures"
                  className="p-3 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors flex flex-col items-center justify-center gap-1 min-h-[64px]"
                  onClick={() => setMenuOpen(false)}
                >
                  <FileSignature size={20} className="text-white" />
                  <span className="text-xs font-kode-mono">SIGNS</span>
                </Link>
                
                <Link 
                  to="/about"
                  className="p-3 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors flex flex-col items-center justify-center gap-1 min-h-[64px]"
                  onClick={() => setMenuOpen(false)}
                >
                  <Book size={20} className="text-white" />
                  <span className="text-xs font-kode-mono">ABOUT</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <Dashboard />
      </div>
      </div>
    </TooltipProvider>
  );
};

export default TrackerPage;
