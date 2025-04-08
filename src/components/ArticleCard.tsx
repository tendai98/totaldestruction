
import React, { useState } from 'react';
import { Article } from '../types';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { useMatrixEffect } from '../hooks/matrix';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ScrollArea } from './ui/scroll-area';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Apply matrix effect to title and description with fixed heights and reduced interval to 15 seconds
  const { displayText: titleText, isAnimating: titleAnimating } = 
    useMatrixEffect(article.title, 3000, 15000);
  
  const { displayText: descriptionText, isAnimating: descriptionAnimating } = 
    useMatrixEffect(article.description, 3500, 15000);

  // Function to truncate text and add ellipsis
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Truncated versions for display
  const truncatedTitle = truncateText(article.title, 60);
  const truncatedDescription = truncateText(article.description, 180);

  return (
    <Card 
      className="cyber-border mb-6 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm bg-cyber-darkgray/90 flex flex-col h-[450px]"
    >
      <CardHeader className="p-4 border-b border-[#F97316] h-[120px] overflow-hidden">
        <div className="flex items-start justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-[5.5rem] flex items-end overflow-hidden w-full pb-1">
                  <h3 className={`text-xl font-bold tracking-wider ${titleAnimating ? 'text-[#F97316] text-glitch' : 'text-[#F97316] cyber-glow'}`}>
                    {titleAnimating ? titleText : truncatedTitle}
                  </h3>
                </div>
              </TooltipTrigger>
              {article.title.length > 60 && (
                <TooltipContent className="bg-cyber-black border border-[#F97316] text-[#F97316]">
                  <p>{article.title}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 border-b border-dashed border-[#F97316]/30 flex-1 overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-[6rem] overflow-hidden">
                <p className={`text-sm mb-4 leading-relaxed ${descriptionAnimating ? 'text-cyber-blue font-mono text-glitch' : 'text-white/80'}`}>
                  {descriptionAnimating ? descriptionText : truncatedDescription}
                </p>
              </div>
            </TooltipTrigger>
            {article.description.length > 180 && (
              <TooltipContent className="bg-cyber-black border border-[#F97316] text-white max-w-sm">
                <p>{article.description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-4">
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
      
      <div className="p-4 border-b border-dashed border-[#F97316]/30 h-[70px] overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex gap-2 min-w-max">
            {article.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 bg-cyber-black border border-cyber-red text-cyber-red rounded-sm whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <CardFooter className="p-4 bg-cyber-black/50 flex justify-between items-center mt-auto">
        <div className="h-1 w-1/3 bg-[#F97316] animate-pulse rounded-full"></div>
        
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
