
import React from 'react';
import { Article } from '../types';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="cyber-border mb-6 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm bg-cyber-darkgray/90">
      <div className="absolute -right-2 -top-2 bg-cyber-red text-cyber-black text-xs font-bold px-2 py-0.5 rotate-12 shadow-neon-red z-10">
        ALERT
      </div>
      
      <CardHeader className="p-4 border-b border-cyber-green">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold tracking-wider text-cyber-green">{article.title}</h3>
          <AlertTriangle size={20} className="text-cyber-yellow ml-2 flex-shrink-0 animate-pulse" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4 border-b border-dashed border-cyber-green/30">
        <p className="text-sm text-white/80 mb-4 leading-relaxed">{article.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex flex-col">
            <span className="text-cyber-blue">SOURCE:</span>
            <span className="text-white font-mono">{article.source}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-cyber-blue">DATE:</span>
            <span className="text-white font-mono">{article.date}</span>
          </div>
        </div>
      </CardContent>
      
      <div className="p-4 flex flex-wrap gap-2">
        {article.tags.map(tag => (
          <span 
            key={tag} 
            className="text-xs px-2 py-1 bg-cyber-black border border-cyber-red text-cyber-red rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <CardFooter className="p-4 bg-cyber-black/50 flex justify-between items-center">
        <div className="h-1 w-1/3 bg-cyber-green animate-pulse rounded-full"></div>
        
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs bg-cyber-darkgray border border-cyber-yellow text-cyber-yellow px-3 py-1.5 hover:bg-cyber-yellow hover:text-cyber-black transition-colors"
        >
          ACCESS <ExternalLink size={10} />
        </a>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
