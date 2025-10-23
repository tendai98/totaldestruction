
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { Home, Menu, Book, FileText, FileSignature } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useMatrixEffect } from '../hooks/matrix';
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
          <div className="flex items-center gap-3">
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
          </div>
          
          {isMobile ? (
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 bg-cyber-darkgray border-2 border-cyber-blue text-cyber-blue px-4 py-2 hover:bg-cyber-blue hover:text-cyber-black transition-colors relative after:content-[''] after:absolute after:w-full after:h-full after:border after:border-cyber-blue/30 after:top-1 after:left-1 after:-z-10"
                  >
                    <Home size={18} className="text-white" />
                    <div className="hidden md:inline-block w-[60px] overflow-hidden">
                      <span className={`tracking-wider font-bold text-white ${homeAnimating ? 'text-glitch' : ''}`}>{homeText}</span>
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
                    className="flex items-center gap-2 ml-2 p-2 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors"
                  >
                    <FileText size={18} className="text-white" />
                    <div className="hidden lg:inline-block w-[190px] overflow-hidden">
                      <span className={`tracking-wider font-bold text-white ${letterAnimating ? 'text-glitch' : ''}`}>{letterText}</span>
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
                    className="flex items-center gap-2 p-2 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors"
                  >
                    <FileSignature size={18} className="text-white" />
                    <div className="hidden lg:inline-block w-[120px] overflow-hidden">
                      <span className={`tracking-wider font-bold text-white ${signaturesAnimating ? 'text-glitch' : ''}`}>{signaturesText}</span>
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
                    className="p-2 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors"
                  >
                    <Book size={18} className="text-white" />
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
                className="flex items-center gap-2 mb-4 px-4 py-2 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors w-full"
                onClick={() => setMenuOpen(false)}
              >
                <Home size={18} className="text-white" />
                <div className="inline-block w-[60px] overflow-hidden">
                  <span className={`tracking-wider font-bold text-white ${homeAnimating ? 'text-glitch' : ''}`}>{homeText}</span>
                </div>
              </Link>
              
              <div className="flex gap-2">
                <Link 
                  to="/petition"
                  className="flex-1 p-3 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <FileText size={18} className="text-white" />
                </Link>
                
                <Link 
                  to="/signatures"
                  className="flex-1 p-3 bg-cyber-darkgray border border-[#F97316] text-white hover:bg-[#F97316] hover:text-cyber-black transition-colors flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <FileSignature size={18} className="text-white" />
                </Link>
                
                <Link 
                  to="/about"
                  className="flex-1 p-3 bg-cyber-darkgray border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black transition-colors flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <Book size={18} className="text-white" />
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
