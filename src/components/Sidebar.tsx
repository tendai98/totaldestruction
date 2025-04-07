
import React, { useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '../types';
import { X, AlertTriangle } from 'lucide-react';
import { countries } from '../data/mockData';
import { useIsMobile } from '../hooks/use-mobile';

interface SidebarProps {
  articles: Article[];
  selectedCountry: string | null;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ articles, selectedCountry, onClose }) => {
  const country = countries.find(c => c.id === selectedCountry);
  const isMobile = useIsMobile();
  
  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && selectedCountry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedCountry, isMobile]);

  if (!selectedCountry) {
    return null;
  }

  return (
    <div className="cyber-border-red fixed right-0 top-0 h-screen w-full md:w-96 bg-cyber-black/90 backdrop-blur-md z-50 overflow-y-auto transition-transform duration-300 transform shadow-lg">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-cyber-black/90 to-cyber-black/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-cyber-red">
        <div>
          <h2 className="text-cyber-red text-xl font-bold tracking-wider">
            {country?.name || 'Unknown Region'}
          </h2>
          <p className="text-white/70 text-xs">
            {articles.length} incident{articles.length !== 1 ? 's' : ''} reported
          </p>
        </div>
        <button 
          onClick={onClose}
          className="bg-cyber-darkgray hover:bg-cyber-red text-white p-2 rounded-sm transition-colors"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4">
        {articles.length > 0 ? (
          articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div className="cyber-border-blue p-4 flex flex-col items-center justify-center opacity-70 h-48">
            <AlertTriangle size={30} className="text-cyber-blue mb-2" />
            <p className="text-center text-white">No incidents reported in this region yet.</p>
            <p className="text-center text-xs text-cyber-blue mt-2">
              DATA COLLECTION IN PROGRESS
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
