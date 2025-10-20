import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignatureCanvas } from "@/components/SignatureCanvas";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Point {
  x: number;
  y: number;
}

interface StoredSignature {
  id: string;
  signature_data: Point[][];
  signed_at: string;
}

const PetitionPage = () => {
  const navigate = useNavigate();
  const [showSignature, setShowSignature] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [signatures, setSignatures] = useState<StoredSignature[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load signatures from database
  useEffect(() => {
    loadSignatures();
  }, []);

  const loadSignatures = async () => {
    try {
      const { data, error } = await supabase
        .from('signatures')
        .select('*')
        .order('signed_at', { ascending: false });

      if (error) throw error;

      // Type cast the signature_data from Json to Point[][]
      const typedSignatures = (data || []).map(sig => ({
        ...sig,
        signature_data: sig.signature_data as unknown as Point[][]
      }));

      setSignatures(typedSignatures);
    } catch (error) {
      console.error('Error loading signatures:', error);
      toast.error("Failed to load signatures");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSignature = async (signatureData: Point[][]) => {
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('save-signature', {
        body: { signatureData }
      });

      if (error) throw error;

      setShowSignature(false);
      setShowThankYou(true);
      
      // Navigate to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error saving signature:', error);
      toast.error("Failed to save signature. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b-2 border-[#F97316] bg-cyber-darkgray shadow-neon-orange">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-[#F97316] hover:text-[#F97316]/80 transition-colors font-bold">
            <ArrowLeft className="w-5 h-5" />
            <span className="tracking-wider">BACK TO HOME</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="glass-panel rounded-lg border-2 border-[#F97316]/30">
          {/* Header */}
          <div className="mb-8">
            <p className="text-white/50 mb-4 font-mono">20 October 2025</p>
            <p className="text-white/70 mb-2">To:</p>
            <p className="text-white font-semibold mb-1">President Patrice Motsepe</p>
            <p className="text-white font-semibold mb-6">Confederation of African Football (CAF)</p>
            <h1 className="text-3xl font-bold text-[#F97316] mb-6 cyber-glitch">
              Terminate CAF's Sponsorship Deal with Total Energies — For the Sake of Our Future
            </h1>
          </div>

          {/* Letter Content */}
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>Dear President Motsepe and the CAF Executive Committee,</p>

            <p>
              As concerned African youth, we write to you with urgency: it is time for CAF to end its AFCON sponsorship deal with Total Energies and refuse to allow African football to be tainted by the image of a fossil fuel giant that is undermining our future.
            </p>

            <p>
              The planet is burning. The climate crisis is being fuelled in large part by the extraction, burning, and lobbying of oil and gas companies. It would be a betrayal of African youth and our collective heritage to allow our beloved game to be used by such actors as a vehicle for greenwashing.
            </p>

            <p className="font-semibold">Total Energies must be shown the red card, and here is why:</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#F97316] mb-2">Deliberate misinformation & greenwashing</h3>
                <p>
                  Total has repeatedly presented itself as a company committed to sustainability, while continuing to develop new fossil projects and delay meaningful climate action. Its PR campaigns are increasingly judged by independent regulators as "misleading." (Financial Times) Sponsorship of AFCON gives it a veneer of legitimacy and "clean credentials" at precisely the moment it is doing the opposite.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#F97316] mb-2">Human rights abuses and community harm on the continent</h3>
                <p>
                  In Cabo Delgado, Mozambique, Total's LNG project in Afungi has been tied to forced displacements, interruption of livelihoods, and serious allegations that security forces guarding the site detained civilians in containers, beat them, deprived them of food, and caused deaths. (360 Mozambique) In East Africa (EACOP, Uganda/Tanzania), the pipeline project threatens over 100,000 people with displacement, undermines water sources, and violates land rights, while compensation practices and safeguards have been widely criticized. (Greenpeace)
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#F97316] mb-2">Profits above public good</h3>
                <p>
                  Total and peers in big oil extract massive profits while externalizing costs onto communities, ecosystems, and the climate. The resources spent lobbying, delaying emissions reductions, and resisting regulation could instead fund clean energy, health, education, and resilience across Africa. That they choose to sponsor AFCON and attempt to lull our youth into a false sense of security, instead of repairing the damage they've done to our continent, is morally bankrupt.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#F97316] mb-2">Co-opting African youth and sporting culture</h3>
                <p>
                  CAF and AFCON have deep emotional resonance across the continent. By allowing Total to sponsor our game, we endorse their attempt to seduce our youth with the illusion of benevolence, while they continue extraction and environmental destruction behind the scenes. That is unacceptable. Football should unite us, not be sold as a fig leaf for exploitation. (Greenpeace)
                </p>
              </div>
            </div>

            <p>
              CAF stands at a crossroads. You can choose to protect the integrity of African football, align with the values of youth, community, and environment — or you can continue to partner with a company whose core business is antithetical to a livable future. The decision is clear.
            </p>

            <p className="font-semibold">We, the undersigned (fans, civil society groups, climate justice advocates, concerned citizens), call upon you to:</p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Immediately terminate the sponsorship deal with Total Energies (including all naming and branding rights)</li>
              <li>Publicly affirm that CAF will refuse future partnership with fossil fuel corporations</li>
              <li>Redirect outreach and sponsorship efforts toward clean energy, sustainable development, or ethical funding sources</li>
            </ul>

            <p>
              We demand not only a symbolic gesture but a structural change: African football must no longer be complicit in climate injustice. You have the power to act — and the world is watching.
            </p>

            <p className="font-semibold">Football on a burning planet is no victory. Let us choose life.</p>

            <p>Respectfully,</p>

            {/* Signatures Section */}
            <div className="mt-8 pt-6 border-t-2 border-[#F97316]/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#F97316]">
                  Signatures {loading ? '' : `(${signatures.length})`}
                </h3>
                <Button 
                  onClick={() => setShowSignature(true)}
                  disabled={saving}
                  className="bg-[#F97316] text-cyber-black hover:bg-[#F97316]/90 border-2 border-[#F97316] font-bold"
                >
                  {saving ? 'Saving...' : 'Sign the Letter'}
                </Button>
              </div>
              
              {loading ? (
                <p className="text-white/50 text-center py-8 font-mono">Loading signatures...</p>
              ) : signatures.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {signatures.map((sig, index) => (
                    <div key={sig.id} className="border-2 border-[#F97316]/30 rounded p-2 bg-cyber-darkgray/60">
                      <svg width="100%" height="100" viewBox="0 0 300 100" className="bg-black/50 rounded">
                        {sig.signature_data.map((stroke, strokeIndex) => (
                          <polyline
                            key={strokeIndex}
                            points={stroke.map(p => `${p.x},${p.y}`).join(' ')}
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ))}
                      </svg>
                      <p className="text-xs text-white/50 mt-1 font-mono">
                        Signature #{signatures.length - index}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-center py-8 font-mono">Be the first to sign!</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Signature Canvas Modal */}
      {showSignature && (
        <SignatureCanvas
          onSave={handleSaveSignature}
          onCancel={() => setShowSignature(false)}
        />
      )}

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="bg-cyber-darkgray border-2 border-[#F97316] shadow-neon-orange max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#F97316] text-center">
              Thank You for Signing!
            </DialogTitle>
            <DialogDescription className="text-white/80 text-center space-y-4 pt-4">
              <p className="text-lg">
                Your signature has been added to the petition.
              </p>
              <p>
                Together, we're building pressure for a pro-poor, decentralized renewable energy future that puts African communities first.
              </p>
              <p className="font-semibold text-[#F97316]">
                Join the #KickTotalOutOfAFCON campaign
              </p>
              <p className="text-sm text-white/60 font-mono">
                Redirecting to home page...
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetitionPage;
