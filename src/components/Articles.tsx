
import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';
import { articles } from '../data/mockData';

const Articles: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-cyber-green mb-8 tracking-wider">
        RECENT ENVIRONMENTAL INCIDENTS
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
