import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import CryptoJS from "crypto-js";

interface Point {
  x: number;
  y: number;
}

interface SignaturePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signatureData: Point[][];
  signatureNumber: number;
  name?: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
    country_code?: string;
  };
}

interface TerminalLine {
  id: string;
  text: string;
}

interface PointLine {
  id: string;
  text: string;
}

interface HashLine {
  id: string;
  text: string;
}

export const SignaturePreviewDialog = ({
  open,
  onOpenChange,
  signatureData,
  signatureNumber,
  name,
  location,
}: SignaturePreviewDialogProps) => {
  const [scanX, setScanX] = useState(0);
  const [scanY, setScanY] = useState(0);
  const [pointLines, setPointLines] = useState<PointLine[]>([]);
  const [hashLines, setHashLines] = useState<HashLine[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const pointRef = useRef<HTMLDivElement>(null);
  const hashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      // Reset state when dialog opens
      setScanX(0);
      setScanY(0);
      setPointLines([]);
      setHashLines([]);
      setIsScanning(true);

      // Start scanning animation
      startScanning();
    }
  }, [open]);

  useEffect(() => {
    // Auto-scroll terminals to bottom with smooth behavior
    if (pointRef.current) {
      pointRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    if (hashRef.current) {
      hashRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [pointLines, hashLines]);

  const startScanning = () => {
    const allPoints: Point[] = [];
    signatureData.forEach((stroke) => {
      allPoints.push(...stroke);
    });

    if (allPoints.length === 0) return;

    let currentIndex = 0;
    const scanInterval = setInterval(() => {
      if (currentIndex >= allPoints.length) {
        // Reset and loop
        currentIndex = 0;
        setPointLines([]);
        setHashLines([]);
        setScanX(0);
        setScanY(0);
        return;
      }

      const point = allPoints[currentIndex];
      setScanX(point.x);
      setScanY(point.y);

      // Add point data to point terminal
      const pointStr = `X:${point.x.toFixed(2)} Y:${point.y.toFixed(2)}`;
      addPointLine(`point_${currentIndex}_${Date.now()}`, `> Point ${currentIndex + 1}: ${pointStr}`);

      // Generate and add full MD5 hash to hash terminal
      const hash = CryptoJS.MD5(`${point.x},${point.y}`).toString();
      addHashLine(`hash_${currentIndex}_${Date.now()}`, `${hash}`);

      currentIndex++;
    }, 200);

    // Store interval ID for cleanup
    return () => clearInterval(scanInterval);
  };

  const addPointLine = (id: string, text: string) => {
    setPointLines((prev) => [...prev, { id, text }]);
  };

  const addHashLine = (id: string, text: string) => {
    setHashLines((prev) => [...prev, { id, text }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cyber-darkgray border-2 border-[#F97316] shadow-neon-orange max-w-xl h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#F97316] font-mono">
              {name ? name.toUpperCase() : `SIGNATURE #${signatureNumber}`} - ANALYSIS
            </DialogTitle>
          </div>
          {location && (location.city || location.country) && (
            <div className="text-sm text-white/60 font-mono mt-1">
              LOCATION: {[location.city, location.region, location.country].filter(Boolean).join(", ")}
            </div>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-3 flex-1 min-h-0">
          {/* Top - Signature with scanning lines */}
          <div className="flex flex-col min-h-0 h-[35%]">
            <div className="text-xs text-white/50 mb-1 font-mono">VISUAL SCAN</div>
            <div className="relative border-2 border-[#F97316]/30 rounded bg-black/50 flex-1 min-h-0 overflow-hidden">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 200"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
              >
                {/* Draw signature */}
                {signatureData.map((stroke, strokeIndex) => (
                  <polyline
                    key={strokeIndex}
                    points={stroke.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* Scanning lines */}
                {isScanning && (
                  <>
                    {/* Vertical line (X) */}
                    <line
                      x1={scanX}
                      y1="0"
                      x2={scanX}
                      y2="200"
                      stroke="#00ff00"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                    {/* Horizontal line (Y) */}
                    <line
                      x1="0"
                      y1={scanY}
                      x2="500"
                      y2={scanY}
                      stroke="#00ff00"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                    {/* Crosshair at intersection */}
                    <circle
                      cx={scanX}
                      cy={scanY}
                      r="5"
                      fill="#00ff00"
                      opacity="0.8"
                    />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Bottom - Streams side by side on larger screens, stacked on mobile */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 flex-1 min-h-0">
            {/* Left - Point stream */}
            <div className="flex flex-col min-h-0">
              <div className="text-xs text-white/50 mb-1 font-mono">
                POINT STREAM
              </div>
              <ScrollArea className="flex-1 min-h-0 border-2 border-[#F97316]/30 rounded bg-black/90">
                <div ref={pointRef} className="p-2 font-mono text-xs text-[#00ff00] space-y-1">
                  {pointLines.map((line) => (
                    <div key={line.id} className="animate-in fade-in duration-200">
                      {line.text}
                    </div>
                  ))}
                  {isScanning && (
                    <div className="inline-block w-2 h-4 bg-[#00ff00] animate-pulse">
                      &nbsp;
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Right - Hash stream */}
            <div className="flex flex-col min-h-0">
              <div className="text-xs text-white/50 mb-1 font-mono">
                MD5 HASH STREAM
              </div>
              <ScrollArea className="flex-1 min-h-0 border-2 border-[#F97316]/30 rounded bg-black/90">
                <div ref={hashRef} className="p-2 font-mono text-xs text-[#00ff00] space-y-1 break-all">
                  {hashLines.map((line) => (
                    <div key={line.id} className="animate-in fade-in duration-200">
                      {line.text}
                    </div>
                  ))}
                  {isScanning && (
                    <div className="inline-block w-2 h-4 bg-[#00ff00] animate-pulse">
                      &nbsp;
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
