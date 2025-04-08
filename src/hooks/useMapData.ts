
import { useState, useEffect, useMemo } from 'react';
import { loadSvgMap } from '../utils/svgLoader';
import { countries } from '../data/mockData';

export const useMapData = () => {
  const [countryPaths, setCountryPaths] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Load map data
  useEffect(() => {
    const loadMap = async () => {
      setIsLoading(true);
      const paths = await loadSvgMap();
      setCountryPaths(paths);
      setIsLoading(false);
    };
    
    loadMap();
  }, []);
  
  // Create a mapping from country codes to IDs for easier lookup
  const countryCodeToId = useMemo(() => {
    return countries.reduce((acc, country) => {
      if (country.code) {
        acc[country.code] = country.id;
      }
      return acc;
    }, {} as Record<string, string>);
  }, []);
  
  return {
    countryPaths,
    isLoading,
    countryCodeToId
  };
};
