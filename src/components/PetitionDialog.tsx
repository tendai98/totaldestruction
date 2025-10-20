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
    // Check if user has seen the dialog before
    const hasSeenDialog = localStorage.getItem("hasSeenPetitionDialog");
    if (!hasSeenDialog) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenPetitionDialog", "true");
    setOpen(false);
  };

  const handleViewLetter = () => {
    localStorage.setItem("hasSeenPetitionDialog", "true");
    setOpen(false);
    navigate("/petition");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Open Letter to CAF: Kick Total Out of AFCON
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed space-y-4 pt-4">
            <p className="font-semibold text-foreground">
              Join us in demanding CAF terminate its sponsorship deal with Total Energies.
            </p>
            
            <p>
              As concerned African youth, we're calling on President Patrice Motsepe and CAF to end AFCON's sponsorship with Total Energies — a fossil fuel giant undermining our future through greenwashing, human rights abuses, and environmental destruction across Africa.
            </p>

            <div className="bg-primary/10 border border-primary/30 rounded p-4 space-y-2">
              <p className="font-semibold text-foreground">Why Total must be shown the red card:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Deliberate misinformation & greenwashing campaigns</li>
                <li>Human rights abuses in Mozambique and East Africa</li>
                <li>Prioritizing profits over African communities</li>
                <li>Co-opting our football culture to whitewash destruction</li>
              </ul>
            </div>

            <p className="text-foreground">
              Football should unite us — not be used as cover for exploitation. 
              <span className="font-semibold text-primary"> Read the full letter and add your signature.</span>
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 mt-4">
          <Button onClick={handleClose} variant="outline" className="flex-1">
            Maybe Later
          </Button>
          <Button onClick={handleViewLetter} className="flex-1">
            Read & Sign the Letter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
