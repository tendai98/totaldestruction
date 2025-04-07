
import React from 'react';
import { Link } from 'react-router-dom';
import Articles from '../components/Articles';
import { AlertTriangle, BarChart2, Database, Layers, Map } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Header Bar */}
      <div className="bg-cyber-darkgray border-b border-cyber-green p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyber-green text-cyber-black flex items-center justify-center font-bold text-lg">
              TD
            </div>
            <Link to="/" className="text-2xl font-bold text-white tracking-wider cyber-glitch">
              TOTAL<span className="text-cyber-green">DESTRUCTION</span>
            </Link>
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
            
            <Link 
              to="/tracker" 
              className="flex items-center gap-2 bg-cyber-darkgray border border-cyber-green text-cyber-green px-4 py-2 hover:bg-cyber-green hover:text-cyber-black transition-colors"
            >
              <Map size={18} />
              <span className="hidden md:inline">TRACKER</span>
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
      
      {/* Main Content */}
      <div className="cyber-grid py-8">
        <Articles />
      </div>
      
      {/* Footer */}
      <div className="bg-cyber-darkgray border-t border-cyber-green p-4 text-center text-white/50 text-xs">
        <p>TOTAL<span className="text-cyber-green">DESTRUCTION</span> // ENVIRONMENTAL MONITORING SYSTEM V1.0</p>
        <p className="mt-1">DATA LAST UPDATED: 2025-04-07 // SYSTEM OPERATIONAL</p>
      </div>
    </div>
  );
};

export default HomePage;
