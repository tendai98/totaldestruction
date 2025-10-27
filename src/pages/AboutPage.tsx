
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatrixEffect } from "../hooks/matrix";
import { SocialLinks } from "../components/SocialLinks";

const aboutText = [
  "TotalEnergies is wrecking Africa. From oil spills to land grabs, gas expansion to community displacement, destroyed biodiversity to exacerbating war — they’re the continent’s biggest hydrocarbon polluter. Now, they’re pushing false climate solutions like LNG, locking Africans into decades of dirty energy.",
  "And to cover it all up? They slap their logo on AFCON — using sport to distract from the harm and win over public opinion.",
  "This site exists to call BS.",
  "Total Destruction is a digital frontline to expose Total’s greenwashing, amplify frontline stories, and build pressure for a pro-poor, decentralized renewable energy future. One that puts African communities first — not foreign shareholders.",
  "We love football. We hate pollution.",
  "We’re connecting the dots between sportswashing and fossil fuel destruction — and making it impossible to look away.",
  "Kick Polluters Out is a bold pan-African network of creatives hosted by Magamba Network, using satire, art, music, and more to fight fossil fuel expansion and reclaim our future.",
  "👉 Join the #KickTotalOutOfAFCON campaign – drop your email below and step into the fight."
];

const AboutPage: React.FC = () => {
  // Create glitch effects for each section with different timings
  const glitchEffects = aboutText.map((text, idx) => 
    useMatrixEffect(text, 1500 + (idx * 200), 20000 + (idx * 2000))
  );

  return (
    <div className="min-h-screen bg-cyber-black flex flex-col">
      <div className="bg-cyber-darkgray border-b-2 border-[#F97316] px-4 py-5 shadow-neon-orange flex items-center">
        <Link to="/" className="text-cyber-blue flex items-center gap-2 hover:text-[#F97316] transition-colors font-bold">
          <ArrowLeft size={20}/>
          <span>Back Home</span>
        </Link>
        <div className="flex-1 text-center">
          <span className="text-xl md:text-2xl font-bold tracking-wider font-orbitron text-white">ABOUT <span className="text-[#F97316]">TOTAL DESTRUCTION</span></span>
        </div>
        <div className="hidden md:block">
          <SocialLinks />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-cyber-darkgray/60 rounded-xl shadow-lg p-6 md:p-10 border border-cyber-red/20">
          {aboutText.slice(0, 3).map((t, idx) => (
            <p 
              key={idx} 
              className={`mb-6 text-lg md:text-xl font-kode-mono text-cyber-red ${glitchEffects[idx].isAnimating ? 'text-glitch' : ''}`}
            >
              {glitchEffects[idx].displayText}
            </p>
          ))}
          {aboutText.slice(3, 7).map((t, idx) => (
            <p 
              key={idx + 3} 
              className={`mb-4 text-base md:text-lg text-white font-orbitron ${glitchEffects[idx + 3].isAnimating ? 'text-glitch' : ''}`}
            >
              {glitchEffects[idx + 3].displayText}
            </p>
          ))}
          <p className={`mt-8 text-xl font-bold text-[#F97316] flex items-center font-orbitron ${glitchEffects[7].isAnimating ? 'text-glitch' : ''}`}>
            {glitchEffects[7].displayText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
