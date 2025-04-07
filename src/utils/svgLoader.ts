
import React from 'react';

// Function to load SVG and extract paths
export const loadSvgMap = async (): Promise<Record<string, string>> => {
  try {
    const response = await fetch('/africa.svg');
    const svgText = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
    
    const pathElements = svgDoc.querySelectorAll('path');
    const countryPaths: Record<string, string> = {};
    
    pathElements.forEach((path) => {
      // Try to get the country code from different attributes
      const id = path.getAttribute('id');
      const dataId = path.getAttribute('data-id');
      const code = dataId || id;
      
      const pathData = path.getAttribute('d');
      
      if (code && pathData) {
        countryPaths[code] = pathData;
      }
    });
    
    return countryPaths;
  } catch (error) {
    console.error('Error loading SVG map:', error);
    return {};
  }
};
