
import { useState, useCallback } from 'react';
import { Article } from '../types';
import { articles } from '../data/mockData';

export const useArticles = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  
  const getArticlesByCountry = useCallback((countryId: string) => {
    setSelectedCountry(countryId);
    const filtered = articles.filter(article => article.countryId === countryId);
    setFilteredArticles(filtered);
    return filtered;
  }, []);
  
  const clearSelection = useCallback(() => {
    setSelectedCountry(null);
    setFilteredArticles([]);
  }, []);
  
  return {
    articles: filteredArticles,
    selectedCountry,
    getArticlesByCountry,
    clearSelection
  };
};
