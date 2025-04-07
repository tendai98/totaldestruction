
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { Home, Zap } from 'lucide-react';

const TrackerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-black flex flex-col">
      {/* Navbar */}
      <div className="bg-cyber-darkgray border-b-2 border-cyber-green p-4 shadow-neon-green">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyber-green text-cyber-black flex items-center justify-center font-bold text-lg relative after:content-[''] after:absolute after:w-full after:h-full after:border after:border-white/20 after:top-1 after:left-1">
              TD
            </div>
            <Link to="/" className="text-2xl font-bold text-white tracking-widest cyber-glitch">
              TOTAL<span className="text-cyber-green">DESTRUCTION</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyber-green shadow-neon-green"></span>
            </Link>
          </div>
          
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-cyber-darkgray border-2 border-cyber-blue text-cyber-blue px-4 py-2 hover:bg-cyber-blue hover:text-cyber-black transition-colors relative after:content-[''] after:absolute after:w-full after:h-full after:border after:border-cyber-blue/30 after:top-1 after:left-1 after:-z-10"
          >
            <Home size={18} />
            <span className="hidden md:inline tracking-wider font-bold">HOME</span>
          </Link>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-cyber-black border-b border-cyber-blue/30 py-1.5">
        <div className="container mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-cyber-green">
              <Zap size={12} className="animate-pulse" />
              <span className="font-mono">TRACKER ACTIVE</span>
            </div>
            <div className="text-white/50 font-mono hidden sm:block">GEOLOGICAL DATA: ACTIVE</div>
          </div>
          <div className="text-cyber-yellow font-mono">COORDINATES: AFRICA // SCANNING...</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <Dashboard />
      </div>
    </div>
  );
};

export default TrackerPage;
