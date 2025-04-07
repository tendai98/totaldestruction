
import React from 'react';
import { Link } from 'react-router-dom';
import Articles from '../components/Articles';
import { AlertTriangle, BarChart2, Database, Layers, Map, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Header Bar */}
      <div className="bg-cyber-darkgray border-b-2 border-cyber-green p-4 shadow-neon-green">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyber-green text-cyber-black flex items-center justify-center font-bold text-lg relative after:content-[''] after:absolute after:w-full after:h-full after:border after:border-white/20 after:top-1 after:left-1">
              TD
            </div>
            <Link to="/" className="text-2xl font-bold text-white tracking-widest cyber-glitch relative">
              TOTAL<span className="text-cyber-green">DESTRUCTION</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyber-green shadow-neon-green"></span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-cyber-blue text-xs bg-cyber-black/40 px-3 py-1.5 border border-cyber-blue">
              <Database size={14} />
              <span className="font-mono">SYSTEMS OPERATIONAL</span>
            </div>
            
            <div className="hidden md:flex items-center gap-2 bg-cyber-black/40 px-3 py-1.5 border border-cyber-green">
              <div className="h-2 w-2 bg-cyber-green rounded-full animate-pulse"></div>
              <span className="text-xs text-white/70 font-mono">LIVE DATA</span>
            </div>
            
            <Link 
              to="/tracker" 
              className="flex items-center gap-2 bg-cyber-darkgray border-2 border-cyber-green text-cyber-green px-4 py-2 hover:bg-cyber-green hover:text-cyber-black transition-colors relative after:content-[''] after:absolute after:w-full after:h-full after:border after:border-cyber-green/30 after:top-1 after:left-1 after:-z-10"
            >
              <Map size={18} />
              <span className="hidden md:inline tracking-wider font-bold">TRACKER</span>
            </Link>
            
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
      
      {/* Status Bar */}
      <div className="bg-cyber-black border-b border-cyber-blue/30 py-1.5">
        <div className="container mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-cyber-green">
              <Zap size={12} className="animate-pulse" />
              <span className="font-mono">SYSTEM ACTIVE</span>
            </div>
            <div className="text-white/50 font-mono hidden sm:block">GLOBAL MONITORING: ACTIVE</div>
          </div>
          <div className="text-cyber-yellow font-mono animate-pulse">PRIORITY ALERT: 3 NEW INCIDENTS</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="cyber-grid py-10">
        <Articles />
      </div>
      
      {/* Footer */}
      <div className="bg-cyber-darkgray border-t-2 border-cyber-green p-4 text-center">
        <div className="container mx-auto">
          <p className="text-white/50 text-xs font-mono">TOTAL<span className="text-cyber-green">DESTRUCTION</span> // ENVIRONMENTAL MONITORING SYSTEM V1.0</p>
          <p className="mt-2 text-cyber-blue text-xs font-mono">COPYRIGHT © 2025 // DATA LAST UPDATED: 04-07-2025</p>
          
          <div className="mt-4 flex justify-center gap-6 text-xs">
            <a href="#" className="text-white/70 hover:text-cyber-green transition-colors">ABOUT</a>
            <a href="#" className="text-white/70 hover:text-cyber-green transition-colors">CONTACT</a>
            <a href="#" className="text-white/70 hover:text-cyber-green transition-colors">PRIVACY</a>
            <a href="#" className="text-white/70 hover:text-cyber-green transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
