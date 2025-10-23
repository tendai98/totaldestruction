import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Globe, MapPin, Users } from 'lucide-react';

interface LocationData {
  country?: string;
  city?: string;
  region?: string;
  country_code?: string;
}

interface SignatureLocation {
  country: string;
  city: string;
  count: number;
}

const StatisticsTab: React.FC = () => {
  const [totalSignatures, setTotalSignatures] = useState(0);
  const [locationStats, setLocationStats] = useState<SignatureLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const { data, error } = await supabase
        .from('signatures')
        .select('location');

      if (error) throw error;

      setTotalSignatures(data.length);

      // Aggregate by country and city
      const locationMap = new Map<string, number>();
      
      data.forEach((sig) => {
        const loc = sig.location as LocationData | null;
        if (loc?.country) {
          const key = `${loc.country}|${loc.city || 'Unknown City'}`;
          locationMap.set(key, (locationMap.get(key) || 0) + 1);
        }
      });

      // Convert to array and sort by count
      const stats = Array.from(locationMap.entries())
        .map(([key, count]) => {
          const [country, city] = key.split('|');
          return { country, city, count };
        })
        .sort((a, b) => b.count - a.count);

      setLocationStats(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-cyber-blue font-mono">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Total Count Card */}
      <Card className="mb-8 bg-cyber-darkgray border-2 border-[#F97316] shadow-neon-orange">
        <div className="p-6 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-[#F97316]" />
          <h2 className="text-4xl font-bold text-white font-mono mb-2">{totalSignatures}</h2>
          <p className="text-cyber-blue font-mono text-sm tracking-wider">TOTAL SIGNATURES</p>
        </div>
      </Card>

      {/* World Map Visual */}
      <Card className="mb-8 bg-cyber-darkgray border-2 border-cyber-blue">
        <div className="p-4">
          <h3 className="text-xl font-bold text-white font-mono mb-4 flex items-center gap-2">
            <Globe className="text-cyber-blue" />
            GLOBAL SIGNATURE MAP
          </h3>
          <div className="w-full overflow-x-auto">
            <img 
              src="/world.svg" 
              alt="World Map" 
              className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </Card>

      {/* Location Statistics */}
      <Card className="bg-cyber-darkgray border-2 border-[#F97316]">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
            <MapPin className="text-[#F97316]" />
            SIGNATURES BY LOCATION
          </h3>
          
          {locationStats.length === 0 ? (
            <p className="text-cyber-blue font-mono text-center py-8">No location data available yet.</p>
          ) : (
            <div className="space-y-3">
              {locationStats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-cyber-black border border-cyber-blue/30 hover:border-[#F97316] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#F97316]/20 border border-[#F97316] text-[#F97316] font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-mono font-bold">{stat.country}</p>
                      <p className="text-cyber-blue text-sm font-mono">{stat.city}</p>
                    </div>
                  </div>
                  <div className="text-[#F97316] font-mono font-bold text-lg">
                    {stat.count}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StatisticsTab;
