
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

interface MapLoadingProps {
  isLoading: boolean;
}

const MapLoading: React.FC<MapLoadingProps> = ({ isLoading }) => {
  const [binaryStream1, setBinaryStream1] = useState<string>('');
  const [binaryStream2, setBinaryStream2] = useState<string>('');

  // Generate random binary string
  const generateBinaryString = (length: number): string => {
    return Array.from({ length }, () => Math.round(Math.random())).join('');
  };

  useEffect(() => {
    if (!isLoading) return;
    
    // Initial values
    setBinaryStream1(generateBinaryString(40));
    setBinaryStream2(generateBinaryString(40));
    
    // Stream simulation for first line
    const interval1 = setInterval(() => {
      setBinaryStream1(prev => {
        // Shift binary string and add new random bit
        const shifted = prev.substring(1) + Math.round(Math.random());
        return shifted;
      });
    }, 100);

    // Stream simulation for second line with different timing
    const interval2 = setInterval(() => {
      setBinaryStream2(prev => {
        // Shift binary string and add new random bit
        const shifted = prev.substring(1) + Math.round(Math.random());
        return shifted;
      });
    }, 120);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <Dialog open={isLoading} modal={true}>
      <DialogContent className="bg-cyber-black border border-cyber-green text-cyber-green p-6 max-w-md">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-kode-mono tracking-wider text-center">SYSTEM INITIALIZING</h2>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="font-kode-mono text-xs text-cyber-green/70">
                {binaryStream1}
              </div>
              <div className="font-kode-mono text-sm flex items-center gap-2">
                <span className="animate-pulse">▶</span>
                <span>LOADING DATA...</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="font-kode-mono text-xs text-[#F97316]/70">
                {binaryStream2}
              </div>
              <div className="font-kode-mono text-sm flex items-center gap-2 text-[#F97316]">
                <span className="animate-pulse">▶</span>
                <span>RUNNING DATA ACQUISITION...</span>
              </div>
            </div>
            
            <div className="w-full h-1 bg-cyber-darkgray overflow-hidden">
              <div className="h-1 bg-cyber-green animate-pulse" 
                   style={{ width: '60%', animationDuration: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapLoading;
