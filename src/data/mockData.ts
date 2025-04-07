
import { Article, Country } from "../types";

export const countries: Country[] = [
  { id: "nga", name: "Nigeria", code: "NG" },
  { id: "dza", name: "Algeria", code: "DZ" },
  { id: "egy", name: "Egypt", code: "EG" },
  { id: "lby", name: "Libya", code: "LY" },
  { id: "ago", name: "Angola", code: "AO" },
  { id: "gha", name: "Ghana", code: "GH" },
  { id: "zaf", name: "South Africa", code: "ZA" },
  { id: "tza", name: "Tanzania", code: "TZ" },
  { id: "moz", name: "Mozambique", code: "MZ" },
  { id: "cog", name: "Republic of Congo", code: "CG" },
  { id: "cod", name: "Democratic Republic of the Congo", code: "CD" },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "Major Oil Spill Discovered in Niger Delta",
    description: "Environmental activists report a massive oil spill affecting local communities and wildlife in the Niger Delta region. The spill is estimated to cover over 20 square kilometers.",
    date: "2025-03-15",
    source: "African Environmental Watch",
    url: "#",
    imageUrl: "/spill.jpg",
    countryId: "nga",
    tags: ["oil spill", "pollution", "niger delta"]
  },
  {
    id: "2",
    title: "New Pipeline Project Threatens Protected Wetlands",
    description: "Construction begins on controversial pipeline project despite protests from local communities and international organizations concerned about the environmental impact.",
    date: "2025-02-28",
    source: "EcoAlert Africa",
    url: "#",
    countryId: "nga",
    tags: ["pipeline", "wetlands", "construction"]
  },
  {
    id: "3",
    title: "Offshore Drilling Expansion Approved Despite Environmental Concerns",
    description: "Government approves expansion of offshore drilling operations along the coast, raising concerns about potential marine ecosystem damage and increased risk of oil spills.",
    date: "2025-03-02",
    source: "Marine Conservation Initiative",
    url: "#",
    countryId: "dza",
    tags: ["offshore drilling", "marine ecosystem", "regulation"]
  },
  {
    id: "4",
    title: "Indigenous Communities Protest Land Seizure for Oil Extraction",
    description: "Local indigenous groups are organizing against what they call illegal appropriation of ancestral lands for new oil extraction projects in the southern region.",
    date: "2025-03-10",
    source: "Indigenous Rights Coalition",
    url: "#",
    countryId: "ago",
    tags: ["indigenous rights", "land dispute", "protests"]
  },
  {
    id: "5",
    title: "Record-Breaking Temperatures Linked to Oil Flaring",
    description: "Scientific study connects unprecedented local temperature increases to extensive gas flaring from nearby oil operations, exacerbating climate change effects in the region.",
    date: "2025-02-15",
    source: "Climate Science Monitor",
    url: "#",
    countryId: "lby",
    tags: ["gas flaring", "climate change", "temperature"]
  },
  {
    id: "6",
    title: "Toxic Waste from Refineries Linked to Increasing Health Issues",
    description: "Health officials report alarming rise in respiratory and skin conditions in communities surrounding oil refineries, with toxic waste disposal suspected as the primary cause.",
    date: "2025-03-05",
    source: "Public Health Association",
    url: "#",
    countryId: "egy",
    tags: ["toxic waste", "health crisis", "refineries"]
  },
  {
    id: "7",
    title: "Deforestation Accelerates as Oil Exploration Expands",
    description: "Satellite imagery reveals rapid forest clearing to make way for new oil exploration projects, threatening one of Africa's most biodiverse regions.",
    date: "2025-02-20",
    source: "Forest Protection Agency",
    url: "#",
    countryId: "cog",
    tags: ["deforestation", "biodiversity", "exploration"]
  },
  {
    id: "8",
    title: "Corruption Investigation Reveals Environmental Regulation Bypass",
    description: "Government officials under investigation for accepting bribes to bypass environmental impact assessments for major oil infrastructure projects.",
    date: "2025-03-12",
    source: "Transparency International",
    url: "#",
    countryId: "zaf",
    tags: ["corruption", "regulation", "governance"]
  },
  {
    id: "9",
    title: "Groundwater Contamination Spreads to Agricultural Areas",
    description: "Tests confirm oil-related contaminants have reached agricultural lands, threatening food security and livelihoods of farming communities.",
    date: "2025-02-25",
    source: "Agricultural Research Institute",
    url: "#",
    countryId: "tza",
    tags: ["groundwater", "agriculture", "contamination"]
  },
  {
    id: "10",
    title: "International Oil Corporation Faces Lawsuit Over Environmental Damages",
    description: "Class action lawsuit filed against major international oil corporation for decades of environmental negligence and damages to coastal communities.",
    date: "2025-03-08",
    source: "Environmental Justice Network",
    url: "#",
    countryId: "moz",
    tags: ["lawsuit", "corporate responsibility", "damages"]
  },
];
