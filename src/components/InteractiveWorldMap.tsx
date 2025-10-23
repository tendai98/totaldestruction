import React, { useEffect, useRef, useState } from 'react';

interface InteractiveWorldMapProps {
  onCountryClick?: (countryName: string) => void;
  selectedCountry?: string;
}

// Map of ISO country codes to full country names
const countryCodeToName: Record<string, string> = {
  'ad': 'Andorra', 'ae': 'United Arab Emirates', 'af': 'Afghanistan', 'ag': 'Antigua and Barbuda',
  'ai': 'Anguilla', 'al': 'Albania', 'am': 'Armenia', 'ao': 'Angola', 'ar': 'Argentina',
  'as': 'American Samoa', 'at': 'Austria', 'au': 'Australia', 'aw': 'Aruba', 'ax': 'Aland Islands',
  'az': 'Azerbaijan', 'ba': 'Bosnia and Herzegovina', 'bb': 'Barbados', 'bd': 'Bangladesh',
  'be': 'Belgium', 'bf': 'Burkina Faso', 'bg': 'Bulgaria', 'bh': 'Bahrain', 'bi': 'Burundi',
  'bj': 'Benin', 'bl': 'Saint Barthelemy', 'bm': 'Bermuda', 'bn': 'Brunei', 'bo': 'Bolivia',
  'bq': 'Bonaire', 'br': 'Brazil', 'bs': 'Bahamas', 'bt': 'Bhutan', 'bw': 'Botswana',
  'by': 'Belarus', 'bz': 'Belize', 'ca': 'Canada', 'cc': 'Cocos Islands', 'cd': 'Democratic Republic of the Congo',
  'cf': 'Central African Republic', 'cg': 'Republic of the Congo', 'ch': 'Switzerland', 'ci': 'Ivory Coast',
  'ck': 'Cook Islands', 'cl': 'Chile', 'cm': 'Cameroon', 'cn': 'China', 'co': 'Colombia',
  'cr': 'Costa Rica', 'cu': 'Cuba', 'cv': 'Cape Verde', 'cw': 'Curacao', 'cx': 'Christmas Island',
  'cy': 'Cyprus', 'cz': 'Czech Republic', 'de': 'Germany', 'dj': 'Djibouti', 'dk': 'Denmark',
  'dm': 'Dominica', 'do': 'Dominican Republic', 'dz': 'Algeria', 'ec': 'Ecuador', 'ee': 'Estonia',
  'eg': 'Egypt', 'eh': 'Western Sahara', 'er': 'Eritrea', 'es': 'Spain', 'et': 'Ethiopia',
  'fi': 'Finland', 'fj': 'Fiji', 'fk': 'Falkland Islands', 'fm': 'Micronesia', 'fo': 'Faroe Islands',
  'fr': 'France', 'ga': 'Gabon', 'gb': 'United Kingdom', 'gd': 'Grenada', 'ge': 'Georgia',
  'gf': 'French Guiana', 'gg': 'Guernsey', 'gh': 'Ghana', 'gi': 'Gibraltar', 'gl': 'Greenland',
  'gm': 'Gambia', 'gn': 'Guinea', 'gp': 'Guadeloupe', 'gq': 'Equatorial Guinea', 'gr': 'Greece',
  'gs': 'South Georgia', 'gt': 'Guatemala', 'gu': 'Guam', 'gw': 'Guinea-Bissau', 'gy': 'Guyana',
  'hk': 'Hong Kong', 'hm': 'Heard Island', 'hn': 'Honduras', 'hr': 'Croatia', 'ht': 'Haiti',
  'hu': 'Hungary', 'id': 'Indonesia', 'ie': 'Ireland', 'il': 'Israel', 'im': 'Isle of Man',
  'in': 'India', 'io': 'British Indian Ocean Territory', 'iq': 'Iraq', 'ir': 'Iran', 'is': 'Iceland',
  'it': 'Italy', 'je': 'Jersey', 'jm': 'Jamaica', 'jo': 'Jordan', 'jp': 'Japan',
  'ke': 'Kenya', 'kg': 'Kyrgyzstan', 'kh': 'Cambodia', 'ki': 'Kiribati', 'km': 'Comoros',
  'kn': 'Saint Kitts and Nevis', 'kp': 'North Korea', 'kr': 'South Korea', 'kw': 'Kuwait', 'ky': 'Cayman Islands',
  'kz': 'Kazakhstan', 'la': 'Laos', 'lb': 'Lebanon', 'lc': 'Saint Lucia', 'li': 'Liechtenstein',
  'lk': 'Sri Lanka', 'lr': 'Liberia', 'ls': 'Lesotho', 'lt': 'Lithuania', 'lu': 'Luxembourg',
  'lv': 'Latvia', 'ly': 'Libya', 'ma': 'Morocco', 'mc': 'Monaco', 'md': 'Moldova',
  'me': 'Montenegro', 'mf': 'Saint Martin', 'mg': 'Madagascar', 'mh': 'Marshall Islands', 'mk': 'North Macedonia',
  'ml': 'Mali', 'mm': 'Myanmar', 'mn': 'Mongolia', 'mo': 'Macao', 'mp': 'Northern Mariana Islands',
  'mq': 'Martinique', 'mr': 'Mauritania', 'ms': 'Montserrat', 'mt': 'Malta', 'mu': 'Mauritius',
  'mv': 'Maldives', 'mw': 'Malawi', 'mx': 'Mexico', 'my': 'Malaysia', 'mz': 'Mozambique',
  'na': 'Namibia', 'nc': 'New Caledonia', 'ne': 'Niger', 'nf': 'Norfolk Island', 'ng': 'Nigeria',
  'ni': 'Nicaragua', 'nl': 'Netherlands', 'no': 'Norway', 'np': 'Nepal', 'nr': 'Nauru',
  'nu': 'Niue', 'nz': 'New Zealand', 'om': 'Oman', 'pa': 'Panama', 'pe': 'Peru',
  'pf': 'French Polynesia', 'pg': 'Papua New Guinea', 'ph': 'Philippines', 'pk': 'Pakistan', 'pl': 'Poland',
  'pm': 'Saint Pierre and Miquelon', 'pn': 'Pitcairn Islands', 'pr': 'Puerto Rico', 'ps': 'Palestine', 'pt': 'Portugal',
  'pw': 'Palau', 'py': 'Paraguay', 'qa': 'Qatar', 're': 'Reunion', 'ro': 'Romania',
  'rs': 'Serbia', 'ru': 'Russia', 'rw': 'Rwanda', 'sa': 'Saudi Arabia', 'sb': 'Solomon Islands',
  'sc': 'Seychelles', 'sd': 'Sudan', 'se': 'Sweden', 'sg': 'Singapore', 'sh': 'Saint Helena',
  'si': 'Slovenia', 'sj': 'Svalbard and Jan Mayen', 'sk': 'Slovakia', 'sl': 'Sierra Leone', 'sm': 'San Marino',
  'sn': 'Senegal', 'so': 'Somalia', 'sr': 'Suriname', 'ss': 'South Sudan', 'st': 'Sao Tome and Principe',
  'sv': 'El Salvador', 'sx': 'Sint Maarten', 'sy': 'Syria', 'sz': 'Eswatini', 'tc': 'Turks and Caicos Islands',
  'td': 'Chad', 'tf': 'French Southern Territories', 'tg': 'Togo', 'th': 'Thailand', 'tj': 'Tajikistan',
  'tk': 'Tokelau', 'tl': 'Timor-Leste', 'tm': 'Turkmenistan', 'tn': 'Tunisia', 'to': 'Tonga',
  'tr': 'Turkey', 'tt': 'Trinidad and Tobago', 'tv': 'Tuvalu', 'tw': 'Taiwan', 'tz': 'Tanzania',
  'ua': 'Ukraine', 'ug': 'Uganda', 'um': 'United States Minor Outlying Islands', 'us': 'United States', 'uy': 'Uruguay',
  'uz': 'Uzbekistan', 'va': 'Vatican City', 'vc': 'Saint Vincent and the Grenadines', 've': 'Venezuela', 'vg': 'British Virgin Islands',
  'vi': 'United States Virgin Islands', 'vn': 'Vietnam', 'vu': 'Vanuatu', 'wf': 'Wallis and Futuna', 'ws': 'Samoa',
  'xk': 'Kosovo', 'ye': 'Yemen', 'yt': 'Mayotte', 'za': 'South Africa', 'zm': 'Zambia', 'zw': 'Zimbabwe'
};

const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({ 
  onCountryClick, 
  selectedCountry 
}) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    const loadAndSetupMap = async () => {
      if (!svgRef.current) return;

      try {
        const response = await fetch('/world.svg');
        const svgText = await response.text();
        svgRef.current.innerHTML = svgText;

        const svgElement = svgRef.current.querySelector('svg');
        if (!svgElement) return;

        // Add proper attributes for responsive sizing
        svgElement.setAttribute('class', 'w-full h-auto max-h-[500px]');
        svgElement.style.filter = 'brightness(0.8) contrast(1.2)';

        // Get all path elements (countries)
        const paths = svgElement.querySelectorAll('path.landxx');
        
        paths.forEach((path) => {
          const element = path as SVGPathElement;
          const countryId = element.id.toLowerCase();
          const countryName = countryCodeToName[countryId] || countryId;

          // Make countries interactive
          element.style.cursor = 'pointer';
          element.style.transition = 'all 0.3s ease';

          // Hover effects
          element.addEventListener('mouseenter', () => {
            setHoveredCountry(countryName);
            element.style.fill = '#F97316';
            element.style.opacity = '0.8';
          });

          element.addEventListener('mouseleave', () => {
            setHoveredCountry(null);
            if (selectedCountry !== countryName) {
              element.style.fill = '#c0c0c0';
              element.style.opacity = '0.6';
            }
          });

          // Click handler
          element.addEventListener('click', () => {
            if (onCountryClick) {
              onCountryClick(countryName);
            }
          });

          // Highlight selected country
          if (selectedCountry === countryName) {
            element.style.fill = '#F97316';
            element.style.opacity = '1';
          } else {
            element.style.fill = '#c0c0c0';
            element.style.opacity = '0.6';
          }
        });
      } catch (error) {
        console.error('Error loading world map:', error);
      }
    };

    loadAndSetupMap();
  }, [selectedCountry, onCountryClick]);

  return (
    <div className="relative">
      <div ref={svgRef} className="w-full" />
      {hoveredCountry && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-cyber-darkgray border-2 border-[#F97316] px-4 py-2 rounded shadow-neon-orange">
          <p className="text-white font-mono font-bold text-sm">{hoveredCountry}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveWorldMap;
