
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { useMatrixEffect } from '../hooks/useMatrixEffect';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Track if this card should be animated
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // Store original heights to maintain card dimensions
  const [titleHeight, setTitleHeight] = useState<number | null>(null);
  const [descHeight, setDescHeight] = useState<number | null>(null);
  
  // Apply matrix effect to title and description
  const { displayText: titleText, isAnimating: titleAnimating } = 
    useMatrixEffect(article.title, 2000, shouldAnimate ? 100 : 999999999);
  
  const { displayText: descriptionText, isAnimating: descriptionAnimating } = 
    useMatrixEffect(article.description, 2500, shouldAnimate ? 100 : 999999999);

  // References for measuring elements
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const descRef = React.useRef<HTMLParagraphElement>(null);

  // Measure original heights on first render
  useEffect(() => {
    if (titleRef.current && !titleHeight) {
      setTitleHeight(titleRef.current.clientHeight);
    }
    if (descRef.current && !descHeight) {
      setDescHeight(descRef.current.clientHeight);
    }
  }, [titleHeight, descHeight]);

  // Set up global animation manager for all cards
  useEffect(() => {
    // Function to select a random card for animation
    const selectRandomCard = () => {
      // Each card has a small chance of being chosen
      const shouldThisCardAnimate = Math.random() < 0.2; // 20% chance for each card
      setShouldAnimate(shouldThisCardAnimate);
      
      // If this card was chosen, animate it for 2 seconds then reset
      if (shouldThisCardAnimate) {
        setTimeout(() => {
          setShouldAnimate(false);
        }, 3000);
      }
    };

    // Set up interval to randomly activate cards every 10 seconds (reduced from 30s)
    const interval = setInterval(selectRandomCard, 10000);
    
    // Initially have a chance to start animation
    selectRandomCard();
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="cyber-border mb-6 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm bg-cyber-darkgray/90">
      <CardHeader className="p-4 border-b border-cyber-green">
        <div className="flex items-start justify-between">
          <h3 
            ref={titleRef}
            className={`text-xl font-bold tracking-wider ${titleAnimating ? 'text-cyber-green text-glitch' : 'text-cyber-green'}`}
            style={titleHeight ? { minHeight: `${titleHeight}px` } : undefined}
          >
            {titleText}
          </h3>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 border-b border-dashed border-cyber-green/30">
        <p 
          ref={descRef}
          className={`text-sm mb-4 leading-relaxed ${descriptionAnimating ? 'text-cyber-blue font-mono text-glitch' : 'text-white/80'}`}
          style={descHeight ? { minHeight: `${descHeight}px` } : undefined}
        >
          {descriptionText}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
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
