import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const PetitionDialog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has seen the dialog or already signed
    const hasSeenDialog = localStorage.getItem("hasSeenPetitionDialog");
    const hasSigned = document.cookie.includes("petition_signed=true");
    
    // Don't show dialog if user has already signed
    if (!hasSeenDialog && !hasSigned) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenPetitionDialog", "true");
    setOpen(false);
    navigate("/petition");
  };

  const handleViewLetter = () => {
    localStorage.setItem("hasSeenPetitionDialog", "true");
    setOpen(false);
    navigate("/petition");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-cyber-black border-2 border-[#F97316] shadow-neon-orange p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-2xl flex items-center gap-2 text-white font-bold">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#F97316] flex-shrink-0" />
            <span className="leading-tight">Open Letter to CAF: Kick Total Out of AFCON</span>
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 pt-4 text-white/80">
            <p className="font-semibold text-white">
              Join us in demanding CAF terminate its sponsorship deal with Total Energies.
            </p>
            
            <p>
              As concerned African youth, we're calling on President Patrice Motsepe and CAF to end AFCON's sponsorship with Total Energies — a fossil fuel giant undermining our future through greenwashing, human rights abuses, and environmental destruction across Africa.
            </p>

            <div className="bg-cyber-darkgray/80 border border-[#F97316]/50 rounded p-3 sm:p-4 space-y-2">
              <p className="font-semibold text-[#F97316]">Why Total must be shown the red card:</p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-white/70">
                <li>Deliberate misinformation & greenwashing campaigns</li>
                <li>Human rights abuses in Mozambique and East Africa</li>
                <li>Prioritizing profits over African communities</li>
                <li>Co-opting our football culture to whitewash destruction</li>
              </ul>
            </div>

            <p className="text-white/80">
              Football should unite us — not be used as cover for exploitation. 
              <span className="font-semibold text-[#F97316]"> Read the full letter and add your signature.</span>
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button 
            onClick={handleClose} 
            variant="outline" 
            className="flex-1 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-black min-h-[44px] text-sm sm:text-base"
          >
            Maybe Later
          </Button>
          <Button 
            onClick={handleViewLetter} 
            className="flex-1 bg-[#F97316] text-cyber-black hover:bg-[#F97316]/90 border-2 border-[#F97316] min-h-[44px] text-sm sm:text-base"
          >
            Read & Sign the Letter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
