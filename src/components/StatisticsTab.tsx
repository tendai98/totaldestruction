import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Globe, MapPin, Users, Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InteractiveWorldMap from './InteractiveWorldMap';
import { Button } from '@/components/ui/button';

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
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

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

  // Get unique countries for filter
  const countries = useMemo(() => {
    const uniqueCountries = Array.from(new Set(locationStats.map(s => s.country))).sort();
    return uniqueCountries;
  }, [locationStats]);

  // Filter location stats based on selected country
  const filteredStats = useMemo(() => {
    if (selectedCountry === 'all') return locationStats;
    return locationStats.filter(stat => stat.country === selectedCountry);
  }, [locationStats, selectedCountry]);

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
      <Card className="mb-8 bg-cyber-black border-2 border-[#F97316] shadow-neon-orange">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <Globe className="text-[#F97316]" />
                GLOBAL SIGNATURE MAP
              </h3>
              <p className="text-cyber-blue font-mono text-sm mt-1">Click on a country to filter signatures</p>
            </div>
            {selectedCountry !== 'all' && (
              <Button
                onClick={() => setSelectedCountry('all')}
                variant="outline"
                size="sm"
                className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-cyber-black"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filter
              </Button>
            )}
          </div>
          <div className="relative w-full cyber-grid scanning-effect rounded-lg overflow-hidden bg-cyber-black p-2 md:p-4">
            <InteractiveWorldMap 
              onCountryClick={(country) => setSelectedCountry(country)}
              selectedCountry={selectedCountry === 'all' ? undefined : selectedCountry}
            />
          </div>
        </div>
      </Card>

      {/* Location Statistics */}
      <Card className="bg-cyber-darkgray border-2 border-[#F97316]">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <MapPin className="text-[#F97316]" />
              SIGNATURES BY LOCATION
            </h3>
            
            {/* Country Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-cyber-blue w-4 h-4" />
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[200px] bg-cyber-black border-cyber-blue text-white font-mono">
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darkgray border-cyber-blue z-50">
                  <SelectItem value="all" className="text-white font-mono hover:bg-[#F97316] hover:text-cyber-black cursor-pointer">
                    All Countries
                  </SelectItem>
                  {countries.map((country) => (
                    <SelectItem 
                      key={country} 
                      value={country}
                      className="text-white font-mono hover:bg-[#F97316] hover:text-cyber-black cursor-pointer"
                    >
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredStats.length === 0 ? (
            <p className="text-cyber-blue font-mono text-center py-8">
              {selectedCountry === 'all' ? 'No location data available yet.' : 'No signatures from this country yet.'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredStats.map((stat, index) => (
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
