import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    // Auto-scroll terminals to bottom
    if (pointRef.current) {
      pointRef.current.scrollTop = pointRef.current.scrollHeight;
    }
    if (hashRef.current) {
      hashRef.current.scrollTop = hashRef.current.scrollHeight;
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
        clearInterval(scanInterval);
        setIsScanning(false);
        addPointLine("SCAN_COMPLETE", "[SCAN COMPLETE]");
        addHashLine("SCAN_COMPLETE_HASH", "[SCAN COMPLETE]");
        return;
      }

      const point = allPoints[currentIndex];
      setScanX(point.x);
      setScanY(point.y);

      // Add point data to point terminal
      const pointStr = `X:${point.x.toFixed(2)} Y:${point.y.toFixed(2)}`;
      addPointLine(`point_${currentIndex}`, `> Point ${currentIndex + 1}: ${pointStr}`);

      // Generate and add full MD5 hash to hash terminal
      const hash = CryptoJS.MD5(`${point.x},${point.y}`).toString();
      addHashLine(`hash_${currentIndex}`, `${hash}`);

      currentIndex++;
    }, 100);
  };

  const addPointLine = (id: string, text: string) => {
    setPointLines((prev) => [...prev, { id, text }]);
  };

  const addHashLine = (id: string, text: string) => {
    setHashLines((prev) => [...prev, { id, text }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cyber-darkgray border-2 border-[#F97316] shadow-neon-orange max-w-6xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#F97316] font-mono">
              SIGNATURE #{signatureNumber} - ANALYSIS
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 h-[calc(80vh-120px)]">
          {/* Left - Signature with scanning lines */}
          <div className="flex flex-col h-full">
            <div className="text-xs text-white/50 mb-2 font-mono">VISUAL SCAN</div>
            <div className="relative border-2 border-[#F97316]/30 rounded bg-black/50 h-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 200"
                preserveAspectRatio="xMidYMid meet"
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

          {/* Middle - Point stream */}
          <div className="flex flex-col h-full">
            <div className="text-xs text-white/50 mb-2 font-mono">
              POINT STREAM
            </div>
            <div
              ref={pointRef}
              className="h-full border-2 border-[#F97316]/30 rounded bg-black/90 p-4 overflow-y-auto font-mono text-xs text-[#00ff00] space-y-1"
            >
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
          </div>

          {/* Right - Hash stream */}
          <div className="flex flex-col h-full">
            <div className="text-xs text-white/50 mb-2 font-mono">
              MD5 HASH STREAM
            </div>
            <div
              ref={hashRef}
              className="h-full border-2 border-[#F97316]/30 rounded bg-black/90 p-4 overflow-y-auto font-mono text-xs text-[#00ff00] space-y-1 break-all"
            >
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
