
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';
import { articles } from '../data/mockData';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from './ui/pagination';
import { useMatrixEffect } from '../hooks/useMatrixEffect';

// Declare a type for the global timeout to fix TypeScript errors
declare global {
  interface Window {
    userActivityTimeout?: NodeJS.Timeout;
  }
}

const Articles: React.FC = () => {
  const headerText = "ENVIRONMENTAL INCIDENTS";
  const { displayText: animatedHeader, isAnimating: headerAnimating } = 
    useMatrixEffect(headerText, 2000, 10000);
  
  // Track mouse movement to pause animations when user is active
  const [userActive, setUserActive] = useState(false);
  
  // Set up user activity tracking
  useEffect(() => {
    const handleActivity = () => {
      setUserActive(true);
      
      // Reset after 5 seconds of inactivity
      clearTimeout(window.userActivityTimeout);
      window.userActivityTimeout = setTimeout(() => {
        setUserActive(false);
      }, 5000);
    };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity); // Add scroll listener
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity); // Remove scroll listener
      clearTimeout(window.userActivityTimeout);
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className={`text-4xl font-bold ${headerAnimating && !userActive ? 'text-glitch' : 'text-cyber-green'} mb-8 tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-40 after:h-1 after:bg-cyber-yellow`}>
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
              <PaginationLink className="bg-cyber-darkgray text-cyber-green border border-cyber-green">2</PaginationLink>
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
