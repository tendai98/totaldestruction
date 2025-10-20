import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignatureCanvas } from "@/components/SignatureCanvas";
import { toast } from "sonner";

interface Point {
  x: number;
  y: number;
}

const PetitionPage = () => {
  const [showSignature, setShowSignature] = useState(false);
  const [signatures, setSignatures] = useState<Point[][][]>([]);

  const handleSaveSignature = (signatureData: Point[][]) => {
    setSignatures(prev => [...prev, signatureData]);
    setShowSignature(false);
    
    // Log the signature data as JSON
    console.log("Signature captured:", JSON.stringify(signatureData));
    
    toast.success("Signature added successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="glass-panel rounded-lg">
          {/* Header */}
          <div className="mb-8">
            <p className="text-muted-foreground mb-4">20 October 2025</p>
            <p className="text-foreground mb-2">To:</p>
            <p className="text-foreground font-semibold mb-1">President Patrice Motsepe</p>
            <p className="text-foreground font-semibold mb-6">Confederation of African Football (CAF)</p>
            <h1 className="text-3xl font-bold text-primary mb-6">
              Terminate CAF's Sponsorship Deal with Total Energies — For the Sake of Our Future
            </h1>
          </div>

          {/* Letter Content */}
          <div className="space-y-6 text-foreground leading-relaxed">
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
                <h3 className="font-bold text-primary mb-2">Deliberate misinformation & greenwashing</h3>
                <p>
                  Total has repeatedly presented itself as a company committed to sustainability, while continuing to develop new fossil projects and delay meaningful climate action. Its PR campaigns are increasingly judged by independent regulators as "misleading." (Financial Times) Sponsorship of AFCON gives it a veneer of legitimacy and "clean credentials" at precisely the moment it is doing the opposite.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Human rights abuses and community harm on the continent</h3>
                <p>
                  In Cabo Delgado, Mozambique, Total's LNG project in Afungi has been tied to forced displacements, interruption of livelihoods, and serious allegations that security forces guarding the site detained civilians in containers, beat them, deprived them of food, and caused deaths. (360 Mozambique) In East Africa (EACOP, Uganda/Tanzania), the pipeline project threatens over 100,000 people with displacement, undermines water sources, and violates land rights, while compensation practices and safeguards have been widely criticized. (Greenpeace)
                </p>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Profits above public good</h3>
                <p>
                  Total and peers in big oil extract massive profits while externalizing costs onto communities, ecosystems, and the climate. The resources spent lobbying, delaying emissions reductions, and resisting regulation could instead fund clean energy, health, education, and resilience across Africa. That they choose to sponsor AFCON and attempt to lull our youth into a false sense of security, instead of repairing the damage they've done to our continent, is morally bankrupt.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Co-opting African youth and sporting culture</h3>
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
            <div className="mt-8 pt-6 border-t border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary">Signatures ({signatures.length})</h3>
                <Button onClick={() => setShowSignature(true)}>
                  Sign the Letter
                </Button>
              </div>
              
              {signatures.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {signatures.map((sig, index) => (
                    <div key={index} className="border border-primary/30 rounded p-2 bg-black/20">
                      <svg width="100%" height="100" viewBox="0 0 300 100" className="bg-black/30 rounded">
                        {sig.map((stroke, strokeIndex) => (
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
                      <p className="text-xs text-muted-foreground mt-1">Signature #{index + 1}</p>
                    </div>
                  ))}
                </div>
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
    </div>
  );
};

export default PetitionPage;
