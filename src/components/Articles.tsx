
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';
import { articles } from '../data/mockData';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from './ui/pagination';
import { useMatrixEffect } from '../hooks/useMatrixEffect';

// Create a dedicated interface for the window object with our custom property
interface CustomWindow extends Window {
  userActivityTimeout?: NodeJS.Timeout;
}

const Articles: React.FC = () => {
  const headerText = "ENVIRONMENTAL INCIDENTS";
  const { displayText: animatedHeader, isAnimating: headerAnimating } = 
    useMatrixEffect(headerText, 2000, 15000);
  
  // Track mouse movement to pause animations when user is active
  const [userActive, setUserActive] = useState(false);
  
  // Set up user activity tracking
  useEffect(() => {
    const handleActivity = () => {
      setUserActive(true);
      
      // Cast window to our custom interface to access the custom property
      const customWindow = window as CustomWindow;
      
      // Reset after 5 seconds of inactivity
      clearTimeout(customWindow.userActivityTimeout);
      customWindow.userActivityTimeout = setTimeout(() => {
        setUserActive(false);
      }, 5000);
    };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      
      // Clear timeout on unmount
      const customWindow = window as CustomWindow;
      clearTimeout(customWindow.userActivityTimeout);
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 
        className={`text-4xl font-bold ${headerAnimating && !userActive ? 'text-glitch' : 'text-[#F97316] cyber-glow'} mb-8 tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-40 after:h-1 after:bg-[#F97316] after:shadow-neon-orange`}
        style={{ minHeight: "3rem", display: "block" }}
      >
        {animatedHeader}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      <div className="mt-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink className="bg-cyber-darkgray text-cyber-blue border border-cyber-blue">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="bg-cyber-darkgray text-[#F97316] border border-[#F97316]">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="bg-cyber-darkgray text-cyber-red border border-cyber-red">3</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Articles;
