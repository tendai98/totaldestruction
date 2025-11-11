
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
    title: "South African Court Halts TotalEnergies' Offshore Drilling Permit",
    description: "A Western Cape High Court has set aside the environmental approval for TotalEnergies and Shell to drill in offshore Block 5/6/7, citing inadequate climate and community impact studies. The court ruled that Total must fix deficiencies identified, including failures to assess socio-economic impacts and climate change risks.",
    date: "2025-08-14",
    source: "Reuters",
    url: "https://www.reuters.com/sustainability/climate-energy/south-african-court-rescinds-totalenergies-oil-exploration-permit-2025-08-14/",
    countryId: "zaf",
    tags: ["court ruling", "offshore drilling", "environmental assessment"]
  },
  {
    id: "2",
    title: "French Court Fines TotalEnergies for Misleading 'Green' Claims",
    description: "A Paris civil court found TotalEnergies guilty of deceptive greenwashing, ruling the company misled consumers with claims of being 'carbon neutral by 2050'. The court ordered TotalEnergies to remove all carbon-neutrality statements from its website and pay fines and reparations to NGOs.",
    date: "2025-10-23",
    source: "Reuters",
    url: "https://www.reuters.com/sustainability/boards-policy-regulation/french-court-rules-totalenergies-misled-consumers-with-carbon-neutrality-claims-2025-10-23/",
    countryId: "dza",
    tags: ["greenwashing", "consumer protection", "climate law"]
  },
  {
    id: "3",
    title: "TotalEnergies' Tilenga Oil Project Cuts Through Uganda's Largest National Park",
    description: "Investigations show TotalEnergies has drilled hundreds of wells for its Tilenga oilfield, with roughly one-third inside Murchison Falls National Park. Audits reveal that promised biodiversity safeguards are woefully inadequate, threatening elephants, lions and other endangered species.",
    date: "2025-02-18",
    source: "Africa Uncensored",
    url: "https://africauncensored.online/blog/2025/02/18/totalenergies-tilenga-project-destroys-a-ugandan-national-park-backed-by-questionable-permits/",
    countryId: "nga",
    tags: ["national park", "biodiversity", "Tilenga project"]
  },
  {
    id: "4",
    title: "Ugandan Families Evicted to Make Way for TotalEnergies Oil Plant",
    description: "Local residents say TotalEnergies' oil projects have displaced dozens of families in Uganda's Lake Albert region. Police armed with guns demolished homes to clear space for Total's Tilenga central processing facility. Those displaced report receiving tiny replacement plots far from schools, clinics and pastures.",
    date: "2025-05-08",
    source: "Drilled",
    url: "https://www.drilledpodcast.com/",
    countryId: "nga",
    tags: ["displacement", "land rights", "Tilenga project"]
  },
  {
    id: "5",
    title: "Report: East African Oil Pipeline Displaced Thousands with Inadequate Compensation",
    description: "An NGO report finds that around 13,000 people were forced to move for the East African Crude Oil Pipeline (EACOP) yet received unfair or insufficient resettlement support. Many displaced farmers say cash payments were far below market value, leaving affected communities worse off after relocation.",
    date: "2025-04-01",
    source: "The Guardian",
    url: "https://www.theguardian.com/environment",
    countryId: "tza",
    tags: ["EACOP", "displacement", "compensation"]
  },
  {
    id: "6",
    title: "Activists Sue to Halt TotalEnergies' Uganda–Tanzania Pipeline",
    description: "Environmental lawyers and campaigners have filed legal challenges against TotalEnergies' EACOP project in East African courts. Civil society groups appealed to the East African Court of Justice to stop construction, arguing EACOP violates regional climate and human rights laws.",
    date: "2025-05-15",
    source: "Drilled",
    url: "https://www.drilledpodcast.com/",
    countryId: "tza",
    tags: ["EACOP", "legal challenge", "environmental law"]
  },
  {
    id: "7",
    title: "Satellite Imagery Shows TotalEnergies Clearing in Ugandan Park and Wetland",
    description: "Satellite analysis reveals TotalEnergies' oil project encroaching deep into protected areas. About 630 km² of forest has been cleared near Murchison Falls National Park, and 22% of a feeder line cuts through a Ramsar-designated wetland, posing serious spill risks to freshwater fisheries and wildlife.",
    date: "2025-09-17",
    source: "Mongabay",
    url: "https://www.mongabay.com/",
    countryId: "nga",
    tags: ["satellite imagery", "Murchison Falls", "wetlands"]
  },
  {
    id: "8",
    title: "Violence and Land-Grabs in Mozambique's Gas Project",
    description: "Reports describe forced displacements and violence tied to TotalEnergies' $20 billion LNG project in Cabo Delgado, northern Mozambique. Investigators found thousands of hectares seized 'at all costs,' with some villagers beaten, shot or buried alive and given tiny, infertile plots far from their homes.",
    date: "2025-05-31",
    source: "Drilled",
    url: "https://www.drilledpodcast.com/",
    countryId: "moz",
    tags: ["Mozambique", "LNG", "insurgency", "land grabbing"]
  },
  {
    id: "9",
    title: "Persistent Pollution at TotalEnergies' Congo Oil Terminal",
    description: "A Mongabay investigation found evidence of decades of oil contamination around TotalEnergies' terminal at Djeno. Official data show roughly 96,000 liters of crude have spilled into local wetlands since the 1990s. Despite these findings, TotalEnergies won the rights to manage the terminal for 20 more years.",
    date: "2025-02-20",
    source: "Mongabay",
    url: "https://www.mongabay.com/",
    countryId: "cog",
    tags: ["oil spill", "pollution", "wetlands"]
  },
  {
    id: "10",
    title: "Nigerian Sale Blocked as Niger Delta Oil Spills Mount",
    description: "Nigeria's regulator canceled approval of TotalEnergies' $860 million sale of its 10% stake in onshore SPDC fields. The decision forces TotalEnergies to retain a share in a joint venture plagued by chronic spills. Total still faces liability for hundreds of oil spills in the Niger Delta from theft, sabotage and aging pipelines.",
    date: "2025-09-23",
    source: "Reuters",
    url: "https://www.reuters.com/",
    countryId: "nga",
    tags: ["oil spills", "Niger Delta", "Nigeria", "asset sale"]
  },
  {
    id: "11",
    title: "Leaked Audits Show TotalEnergies Greenwashing in Africa",
    description: "Climate Whistleblowers' 'GreenFakes' series reveals how environmental consultancies colluded with TotalEnergies to downplay project impacts. Leaked documents show Total-funded audits watering down biodiversity risks of its megaprojects in Africa, enabling TotalEnergies to tout net-gain biodiversity claims while drilling in parks.",
    date: "2025-02-21",
    source: "Climate Whistleblowers",
    url: "https://climatewhistleblowers.org/",
    countryId: "nga",
    tags: ["environmental audit", "greenwashing", "biodiversity"]
  },
  {
    id: "12",
    title: "Activists Harassed Over TotalEnergies' Oil Pipeline",
    description: "Global Witness reported that communities opposing TotalEnergies' EACOP pipeline face intimidation. In Tanzania and Uganda, police summoned critics repeatedly, seized phones for 'inspections,' and interrogated villagers. Tanzanian activist Richard Senkondo was forced into hiding under threat of arrest.",
    date: "2024-04-18",
    source: "Global Witness",
    url: "https://www.globalwitness.org/",
    countryId: "tza",
    tags: ["human rights", "EACOP", "activism", "harassment"]
  },
];
