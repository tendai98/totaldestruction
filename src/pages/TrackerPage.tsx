
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { Home } from 'lucide-react';

const TrackerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-black flex flex-col">
      {/* Navbar */}
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
          
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-cyber-darkgray border border-cyber-blue text-cyber-blue px-4 py-2 hover:bg-cyber-blue hover:text-cyber-black transition-colors"
          >
            <Home size={18} />
            <span className="hidden md:inline">HOME</span>
          </Link>
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
