
import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';
import { articles } from '../data/mockData';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from './ui/pagination';

const Articles: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-cyber-green mb-8 tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-40 after:h-1 after:bg-cyber-yellow">
        ENVIRONMENTAL INCIDENTS
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
