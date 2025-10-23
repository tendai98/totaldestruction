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

export const SignaturePreviewDialog = ({
  open,
  onOpenChange,
  signatureData,
  signatureNumber,
}: SignaturePreviewDialogProps) => {
  const [scanX, setScanX] = useState(0);
  const [scanY, setScanY] = useState(0);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      // Reset state when dialog opens
      setScanX(0);
      setScanY(0);
      setTerminalLines([]);
      setIsScanning(true);

      // Start scanning animation
      startScanning();
    }
  }, [open]);

  useEffect(() => {
    // Auto-scroll terminal to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

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
        addTerminalLine("SCAN_COMPLETE", "[SCAN COMPLETE]");
        return;
      }

      const point = allPoints[currentIndex];
      setScanX(point.x);
      setScanY(point.y);

      // Add point data to terminal
      const pointStr = `X:${point.x.toFixed(2)} Y:${point.y.toFixed(2)}`;
      addTerminalLine(`point_${currentIndex}`, `> Point ${currentIndex + 1}: ${pointStr}`);

      // Generate and add MD5 hash
      const hash = CryptoJS.MD5(`${point.x},${point.y}`).toString();
      addTerminalLine(`hash_${currentIndex}`, `  Hash: ${hash.substring(0, 16)}...`);

      currentIndex++;
    }, 100);
  };

  const addTerminalLine = (id: string, text: string) => {
    setTerminalLines((prev) => [...prev, { id, text }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cyber-darkgray border-2 border-[#F97316] shadow-neon-orange max-w-4xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#F97316] font-mono">
              SIGNATURE #{signatureNumber} - ANALYSIS
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 h-full overflow-hidden">
          {/* Left side - Signature with scanning lines */}
          <div className="flex flex-col">
            <div className="text-xs text-white/50 mb-2 font-mono">VISUAL SCAN</div>
            <div className="relative border-2 border-[#F97316]/30 rounded bg-black/50 flex-1">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
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
                      y2="500"
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

          {/* Right side - Terminal output */}
          <div className="flex flex-col">
            <div className="text-xs text-white/50 mb-2 font-mono">
              POINT STREAM & HASH GENERATION
            </div>
            <div
              ref={terminalRef}
              className="flex-1 border-2 border-[#F97316]/30 rounded bg-black/90 p-4 overflow-y-auto font-mono text-xs text-[#00ff00] space-y-1"
            >
              {terminalLines.map((line) => (
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
