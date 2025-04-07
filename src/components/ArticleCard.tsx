
import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { useMatrixEffect } from '../hooks/useMatrixEffect';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ScrollArea } from './ui/scroll-area';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Track if this card should be animated
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Store original heights to maintain card dimensions
  const [titleHeight, setTitleHeight] = useState<number | null>(null);
  const [descHeight, setDescHeight] = useState<number | null>(null);
  
  // Apply matrix effect to title and description
  const { displayText: titleText, isAnimating: titleAnimating } = 
    useMatrixEffect(article.title, 3000, shouldAnimate && !isHovering ? 100 : 999999999);
  
  const { displayText: descriptionText, isAnimating: descriptionAnimating } = 
    useMatrixEffect(article.description, 3500, shouldAnimate && !isHovering ? 100 : 999999999);

  // References for measuring elements
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const descRef = React.useRef<HTMLParagraphElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Measure original heights on first render
  useEffect(() => {
    if (titleRef.current && !titleHeight) {
      setTitleHeight(titleRef.current.clientHeight);
    }
    if (descRef.current && !descHeight) {
      setDescHeight(descRef.current.clientHeight);
    }
  }, [titleHeight, descHeight]);

  // Handle hover events to stop animation
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Set up global animation manager for all cards
  useEffect(() => {
    // Function to select a random card for animation
    const selectRandomCard = () => {
      // Each card has a small chance of being chosen
      const shouldThisCardAnimate = Math.random() < 0.15; // Reduced chance to 15% for each card
      setShouldAnimate(shouldThisCardAnimate);
      
      // If this card was chosen, animate it for a longer time then reset
      if (shouldThisCardAnimate) {
        setTimeout(() => {
          setShouldAnimate(false);
        }, 4000); // Increased from 3000 to 4000ms
      }
    };

    // Set up interval to randomly activate cards every 12 seconds (increased from 10)
    const interval = setInterval(selectRandomCard, 12000);
    
    // Initially have a chance to start animation
    selectRandomCard();
    
    return () => clearInterval(interval);
  }, []);

  // Function to truncate text and add ellipsis
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Truncated versions for display - increase description length from 120 to 180
  const truncatedTitle = truncateText(article.title, 60);
  const truncatedDescription = truncateText(article.description, 180);

  return (
    <Card 
      ref={cardRef}
      className="cyber-border mb-6 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm bg-cyber-darkgray/90 flex flex-col h-[450px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader className="p-4 border-b border-[#F97316] h-[100px] overflow-hidden">
        <div className="flex items-start justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 
                  ref={titleRef}
                  className={`text-xl font-bold tracking-wider ${titleAnimating && !isHovering ? 'text-[#F97316] text-glitch' : 'text-[#F97316] cyber-glitch'} line-clamp-2 overflow-hidden`}
                  style={{ maxHeight: '4rem' }} // Increased from 3rem to 4rem
                >
                  {titleAnimating && !isHovering ? titleText : truncatedTitle}
                </h3>
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
              <p 
                ref={descRef}
                className={`text-sm mb-4 leading-relaxed ${descriptionAnimating && !isHovering ? 'text-cyber-blue font-mono text-glitch' : 'text-white/80'} line-clamp-4 overflow-hidden`}
                style={{ maxHeight: '6rem' }}
              >
                {descriptionAnimating && !isHovering ? descriptionText : truncatedDescription}
              </p>
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
