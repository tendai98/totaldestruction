
import React from 'react';
import { Article } from '../types';
import { ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="cyber-border mb-4 p-4 bg-cyber-darkgray hover:bg-opacity-80 transition-all duration-300">
      <h3 className="text-cyber-green font-bold mb-2 text-lg tracking-wider">{article.title}</h3>
      
      <p className="text-sm text-white/70 mb-2">{article.description}</p>
      
      <div className="flex justify-between items-center text-xs text-cyber-blue mt-2">
        <div className="flex flex-col">
          <span className="text-white/50">SOURCE:</span>
          <span>{article.source}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/50">DATE:</span>
          <span>{article.date}</span>
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {article.tags.map(tag => (
          <span 
            key={tag} 
            className="text-xs px-2 py-1 bg-cyber-darkgray border border-cyber-red text-cyber-red rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-cyber-yellow hover:text-cyber-blue mt-2 transition-colors"
      >
        FULL REPORT <ExternalLink size={12} />
      </a>
    </div>
  );
};

export default ArticleCard;
