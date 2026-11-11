import framesData from "./frames.json";

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  prefix?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  tags: string[];
  features: string[];
  image: string;
  recommendedPitch: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  neighborhood: string;
  quote: string;
  rating: number;
  verified: boolean;
  avatar: string;
  projectType: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Architectural Shingle" | "Standing Seam Metal" | "Commercial" | "Storm Restoration";
  location: string;
  specs: string;
  image: string;
  highlight: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  estimatedTime: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const siteConfig = {
  company: {
    name: "Apex Ridge Roofing",
    legalName: "Apex Ridge Exterior Systems & Architectural Roofing LLC",
    tagline: "Architectural Roofing. Engineered for Generations.",
    subtagline: "Colorado's premier residential & commercial roofing artisans. Specializing in high-wind architectural shingles, standing seam metal, and storm impact restoration.",
    phone: "+1 (800) 582-7434",
    phoneDisplay: "1-800-582-RIDGE",
    whatsappNumber: "18005827434",
    email: "concierge@apexridgeroofing.com",
    address: "740 Ridgeview Parkway, Suite 400",
    city: "Denver, CO",
    zip: "80202",
    serviceArea: "Denver Metro, Boulder, Vail, Evergreen, Cherry Creek & Front Range",
    yearsInBusiness: 28,
    licenseNumber: "CO-LIC #849201-A",
    insuredAmount: "$5,000,000 Umbrella & Workman's Comp",
  },

  colorTokens: {
    canvasDark: "#070A0F",
    canvasLight: "#F8FAFC",
    surfaceDark: "#0F141F",
    surfaceLight: "#FFFFFF",
    accentCopper: "#C25E00",
    accentAmber: "#EA580C",
    accentGlow: "rgba(234, 88, 12, 0.18)",
    borderMuted: "rgba(255, 255, 255, 0.08)",
  },

  stats: [
    { label: "Roofs Master-Engineered", value: 4850, suffix: "+", decimals: 0 },
    { label: "Years of Craftsmanship", value: 28, suffix: " yrs", decimals: 0 },
    { label: "Transferable Warranty", value: 50, suffix: "-Year", decimals: 0 },
    { label: "Client Satisfaction Score", value: 4.98, suffix: " / 5.0", decimals: 2 },
  ] as StatItem[],

  trustLogos: [
    { name: "GAF Master Elite® Certified", label: "Top 2% of US Roofers" },
    { name: "Owens Corning Platinum Contractor", label: "Preferred Pride" },
    { name: "CertainTeed Select ShingleMaster™", label: "Highest Accreditation" },
    { name: "NRCA Member", label: "National Roofing Contractors" },
    { name: "Haag Certified Inspector", label: "Forensic Damage Engineering" },
    { name: "Better Business Bureau A+", label: "28 Consecutive Years" },
  ],

  services: [
    {
      id: "replacement",
      title: "Architectural Roof Replacement",
      shortDesc: "Triple-laminated architectural shingles built to withstand 130 mph gusts and Class-4 hail impact.",
      fullDesc: "Complete structural tear-off, high-performance synthetic ice & water shielding, precision starter courses, and hand-nailed dimensional shingles with Lifetime Golden Pledge warranty.",
      icon: "ShieldCheck",
      tags: ["Class 4 Impact", "130 MPH Wind Rating", "50-Yr Warranty"],
      features: [
        "GAF Timberline HDZ & Owens Corning Duration high-definition profiles",
        "Dual self-sealing Dura-Grip adhesive barriers",
        "Seamless copper and powder-coated steel drip edge integration",
        "Attic thermal airflow equalization & ridge vent calibration",
      ],
      image: "/assets/images/roof_after_restoration_1794318168047.jpg",
      recommendedPitch: "4:12 to 14:12 steep slopes",
    },
    {
      id: "metal",
      title: "Custom Standing Seam Metal",
      shortDesc: "Architectural concealed-fastener 24-gauge Galvalume and natural copper roofs engineered for 70+ year durability.",
      fullDesc: "On-site precision roll-forming with concealed thermal expansion clips. Zero exposed fasteners, maximum alpine snow shedding, and unmistakable modern aesthetic appeal.",
      icon: "Layers",
      tags: ["24-Gauge Galvalume", "Hidden Fasteners", "Zero Rust"],
      features: [
        "Mechanical lock double-folded seams for zero water infiltration",
        "Kynar 500® architectural PVDF resin finishes resisting fade",
        "Integrated custom snow guards and valley snow rakes",
        "Solar-ready non-penetrating clamping bracket compatibility",
      ],
      image: "/assets/images/commercial_roof_showcase_1794318232306.jpg",
      recommendedPitch: "1.5:12 to ultra-steep custom geometry",
    },
    {
      id: "inspection",
      title: "Drone AI & Thermal Inspection",
      shortDesc: "Sub-millimeter 4K aerial scans and FLIR thermal infrared moisture detection with forensic report.",
      fullDesc: "Autonomous flight patterns capture every shingle facet, flashing joint, and hidden attic thermal anomaly without touching or damaging fragile slate or wet tiles.",
      icon: "Camera",
      tags: ["Sub-Millimeter AI", "FLIR Infrared", "Full PDF Report"],
      features: [
        "AI automated hail crater detection and shingle granulate loss mapping",
        "FLIR thermographic scan for hidden underlayment saturation",
        "Comprehensive 18-page insurance-ready engineering report",
        "Same-day digital client portal delivery",
      ],
      image: "/frame_0001.jpg",
      recommendedPitch: "All slopes and commercial flats",
    },
    {
      id: "storm",
      title: "Insurance Restoration & Storm Recovery",
      shortDesc: "Complete advocacy and Xactimate® damage forensic documentation for full replacement approval.",
      fullDesc: "Our licensed Haag-certified specialists meet your insurance adjuster on-site with full photographic proof, ensuring all code-mandated upgrades and full scope coverage.",
      icon: "CloudLightning",
      tags: ["Haag Engineering", "Xactimate® Estimating", "Adjuster Meetings"],
      features: [
        "Direct adjuster on-roof walk representation",
        "Code-required ice barrier & drip edge supplemental filings",
        "Rapid emergency tarping within 2 hours of catastrophic events",
        "Zero out-of-pocket costs beyond your deductible",
      ],
      image: "/assets/images/roof_before_damage_1794318109874.jpg",
      recommendedPitch: "Residential & Commercial structures",
    },
    {
      id: "commercial",
      title: "Commercial Low-Slope Systems",
      shortDesc: "Energy-efficient TPO, EPDM, and fluid-applied architectural roof coatings for commercial facilities.",
      fullDesc: "Engineered single-ply white reflective membranes with ISO insulation packages that slash summer HVAC loads by up to 30% while offering decades of watertight resilience.",
      icon: "Building2",
      tags: ["60-Mil TPO", "Energy Star®", "25-Yr NDL Guarantee"],
      features: [
        "Robotically heat-welded seam technology creating monolithic bond",
        "Tapered insulation drainage design eliminating ponding water",
        "Commercial parapet wall capping and gravel stop metals",
        "Comprehensive maintenance & leak response agreements",
      ],
      image: "/assets/images/commercial_roof_showcase_1794318232306.jpg",
      recommendedPitch: "Flat to 2:12 low-slope",
    },
    {
      id: "gutters",
      title: "Architectural Gutters & Snow Retention",
      shortDesc: "Seamless 6-inch heavy-gauge aluminum and handcrafted copper gutters with micro-mesh protection.",
      fullDesc: "Custom-extruded on location to the exact millimeter of your roofline. Paired with alpine snow retention systems that protect landscaping, decks, and walkways.",
      icon: "Droplets",
      tags: ["Custom Extruded", "Pure Copper Available", "Micro-Shield"],
      features: [
        "Continuous zero-seam trough eliminates 99% of leak points",
        "Heavy-duty internal hidden hangers tested to 150 lbs/ft snow load",
        "Stainless steel micro-filtration guards preventing pine needles",
        "Custom radius miters and rain chain drainage accents",
      ],
      image: "/assets/images/craftsman_crew_install_1794318293723.jpg",
      recommendedPitch: "All gutter fascia configurations",
    },
  ] as ServiceItem[],

  processSteps: [
    {
      step: "01",
      title: "Autonomous Drone Scan & Attic Audit",
      subtitle: "Forensic Data Collection",
      description: "Our certified FAA pilots conduct an autonomous 4K photogrammetry flight, capturing over 600 aerial angles alongside an interior attic ventilation and rafter deflection inspection.",
      deliverables: ["High-res 3D roof elevation map", "Thermal moisture heatmap", "Attic ventilation calculation"],
      estimatedTime: "45 Minutes",
    },
    {
      step: "02",
      title: "Precision 3D Estimate & Material Curation",
      subtitle: "Tailored Engineering Blueprint",
      description: "We generate a mathematically exact roof model with pitch-adjusted wind load simulations, presenting you with architectural samples from GAF, CertainTeed, and custom metal fabricators.",
      deliverables: ["Transparent line-item scope", "Architectural material physical samples", "Fixed-price contract guarantee"],
      estimatedTime: "24 Hours Post-Scan",
    },
    {
      step: "03",
      title: "Property Armor & White-Glove Prep",
      subtitle: "Zero Landscape Damage Protocol",
      description: "Before a single shingle is stripped, your property is encased in high-tensile Catch-All™ netting, plywood over vulnerable AC units, and magnetic perimeter ground sweeps.",
      deliverables: ["Shrub & flowerbed protective tarps", "Driveway protection wood runners", "Neighbor notification courtesies"],
      estimatedTime: "Morning of Day 1",
    },
    {
      step: "04",
      title: "Master Installation & Dynamic Inspections",
      subtitle: "Certified Master Craftsmen Only",
      description: "Our W2-employed master technicians execute the installation following strict manufacturer master-elite specifications, with intermediate decking and valley flash inspections.",
      deliverables: ["6-nail steep-slope fastening", "High-temp synthetic valley membranes", "Continuous ridge ventilation system"],
      estimatedTime: "1 to 2 Working Days",
    },
    {
      step: "05",
      title: "40-Point Sign-Off & Warranty Transfer",
      subtitle: "Lifetime Peace of Mind",
      description: "A master quality superintendent walks the entire perimeter with magnetic rollers, verifies every flashing joint, and certifies your 50-year non-prorated manufacturer warranty.",
      deliverables: ["Golden Pledge 50-Year Certificate", "Triple-sweep nail-free driveway guarantee", "Digital warranty transfer portal"],
      estimatedTime: "Same Afternoon",
    },
  ] as ProcessStep[],

  beforeAfter: {
    title: "The Restoration Transformation",
    subtitle: "Drag the slider to compare catastrophic storm degradation against our architectural shingle installation.",
    beforeLabel: "Storm Hail Damage",
    afterLabel: "Apex Ridge Master Install",
    beforeImage: "/assets/images/roof_before_damage_1794318109874.jpg",
    afterImage: "/assets/images/roof_after_restoration_1794318168047.jpg",
    specs: [
      { label: "Original Condition", value: "Class-3 Hail Shatter & Granular Depletion" },
      { label: "Installed System", value: "GAF Timberline HDZ Charcoal Architectural" },
      { label: "Wind Rating", value: "Certified to 130 MPH with LayerLock™" },
      { label: "Warranty Coverage", value: "50-Year Non-Prorated Transferable" },
    ],
  },

  projects: [
    {
      id: "1",
      title: "The Aspen Ridge Residence",
      category: "Architectural Shingle",
      location: "Boulder, CO",
      specs: "5,400 sq.ft. · Dual Charcoal Shingle · Hand-Bent Copper Valleys",
      image: "/assets/images/roof_after_restoration_1794318168047.jpg",
      highlight: "Completed in 3 days with zero disruption to client estate gardens.",
    },
    {
      id: "2",
      title: "The Fold Architectural Center",
      category: "Commercial",
      location: "Fort Collins, CO",
      specs: "12,200 sq.ft. · 24-Ga Matte Black Standing Seam · Custom Angles",
      image: "/assets/images/commercial_roof_showcase_1794318232306.jpg",
      highlight: "Awarded Colorado Commercial Exterior Design of the Year.",
    },
    {
      id: "3",
      title: "Cherry Creek Modern Manor",
      category: "Architectural Shingle",
      location: "Denver, CO",
      specs: "4,800 sq.ft. · Slate-Look Architectural Shingles · Hidden Ridge Vents",
      image: "/frame_0001.jpg",
      highlight: "Class-4 impact resistant shingles cutting homeowner insurance by 28%.",
    },
    {
      id: "4",
      title: "Highline Hail Reconstruction",
      category: "Storm Restoration",
      location: "Highlands Ranch, CO",
      specs: "3,900 sq.ft. · 100% Insurance Recovery · Upgraded Ice Shielding",
      image: "/assets/images/roof_before_damage_1794318109874.jpg",
      highlight: "Successfully negotiated $42,000 in missed code upgrades from carrier.",
    },
    {
      id: "5",
      title: "Golden Hour Artisan Shingle Overhaul",
      category: "Architectural Shingle",
      location: "Golden, CO",
      specs: "4,100 sq.ft. · 6-Nail Steep Pitch Installation · Copper Dormer Caps",
      image: "/assets/images/craftsman_crew_install_1794318293723.jpg",
      highlight: "Pneumatic precision alignment with 1/16-inch variance across entire ridge.",
    },
    {
      id: "6",
      title: "Vail Mountain Contemporary",
      category: "Standing Seam Metal",
      location: "Vail, CO",
      specs: "6,800 sq.ft. · Heavy Galvalume with Dual Snow Rail Retention",
      image: "/assets/images/commercial_roof_showcase_1794318232306.jpg",
      highlight: "Engineered to withstand 180 lbs/sq.ft. alpine snow loads.",
    },
  ] as ProjectItem[],

  testimonials: [
    {
      id: "t1",
      name: "Marcus Vance",
      role: "Architect & Homeowner",
      neighborhood: "Cherry Creek, Denver",
      quote: "As an architect, I scrutinize every flashing line and valley termination. Apex Ridge did not just install a roof—they crafted an architectural cap that elevated the entire aesthetic of our residence. Their drone scan found subtle rafter sagging that two other roofers completely missed.",
      rating: 5,
      verified: true,
      avatar: "MV",
      projectType: "Full Architectural Shingle & Copper Valleys",
    },
    {
      id: "t2",
      name: "Elena Rostova",
      role: "Estate Property Manager",
      neighborhood: "Boulder Foothills",
      quote: "When golf-ball size hail pummeled our 6,000 sq ft property, our insurer initially offered only a spot repair. Apex Ridge's Haag engineer documented every single fractured fiberglass core. Within two weeks, the insurance carrier authorized a full $78,000 replacement. Unbelievable professionalism.",
      rating: 5,
      verified: true,
      avatar: "ER",
      projectType: "Storm Recovery & Class-4 Shingles",
    },
    {
      id: "t3",
      name: "David Sterling",
      role: "Commercial Developer",
      neighborhood: "Fort Collins, CO",
      quote: "We partnered with Apex Ridge on the Fold Studio commercial project. Their metal craftsmen fabricated the concealed-fastener panels on-site with flawless lines. Completed on schedule, zero leaks after record blizzards, and their safety compliance was top tier.",
      rating: 5,
      verified: true,
      avatar: "DS",
      projectType: "Commercial Standing Seam Metal",
    },
    {
      id: "t4",
      name: "Claire & Thomas Whitman",
      role: "Homeowners",
      neighborhood: "Highlands Ranch",
      quote: "Their crew arrived at 7:00 AM like clockwork, blanketed our manicured flowerbeds in protective netting, and completed a 4,200 sq. ft. tear-off and replacement in 36 hours. When they left, I couldn't find a single stray nail in our driveway. Outstanding.",
      rating: 5,
      verified: true,
      avatar: "CW",
      projectType: "GAF Timberline HDZ Architectural Roof",
    },
  ] as TestimonialItem[],

  whyChooseUs: [
    {
      title: "Top 2% Master Elite® Craftsmanship",
      description: "Only 2 out of every 100 roofing contractors in North America meet the stringent licensing, insurance, and quality standards required for GAF Master Elite® status.",
      icon: "Award",
    },
    {
      title: "50-Year Non-Prorated Warranty",
      description: "Direct manufacturer-backed Golden Pledge warranties that cover both materials and our master labor for half a century, fully transferable to new owners.",
      icon: "ShieldAlert",
    },
    {
      title: "Autonomous Drone AI Forensics",
      description: "Sub-millimeter 4K aerial photogrammetry detects micro-cracks, hail bruising, and thermal insulation leaks invisible to manual foot inspection.",
      icon: "Eye",
    },
    {
      title: "Zero-Nail Driveway Guarantee",
      description: "Triple-pass high-intensity neodymium magnetic rollers and Catch-All™ ground protection ensure your kids, pets, and tires remain 100% safe.",
      icon: "Sparkles",
    },
    {
      title: "Direct Insurance Claim Advocacy",
      description: "Our in-house Haag-certified forensic inspectors meet your insurance adjuster directly on your roof, ensuring full coverage without out-of-pocket surprise bills.",
      icon: "FileCheck",
    },
    {
      title: "Fixed-Price Lifetime Estimate Lock",
      description: "Once your contract is signed, your price is guaranteed. No mid-project material price gouging, no hidden plywood surprises without prior written sign-off.",
      icon: "Lock",
    },
  ],

  faqs: [
    {
      question: "How do I know if my roof needs a full replacement or just a repair?",
      answer: "Key indicators include granular loss accumulating in downspouts, curled or missing shingles after high wind storms, persistent attic moisture, or roofs exceeding 18–20 years in age. We deploy our 4K autonomous drone to inspect every square foot and provide an honest assessment of whether a targeted restoration can extend its life or if replacement is financially smarter.",
      category: "Inspection & Lifespan",
    },
    {
      question: "How does the 50-Year Non-Prorated Warranty work?",
      answer: "Unlike standard prorated warranties that diminish in value every year, our GAF Golden Pledge and CertainTeed 50-year warranties provide 100% non-prorated coverage for materials, disposal, and labor. If any defect occurs, the manufacturer covers the complete cost of remediation. The warranty is also fully transferable if you sell your home, adding substantial resale value.",
      category: "Warranties",
    },
    {
      question: "What is your process for handling hail and wind insurance claims?",
      answer: "We make the process completely frictionless. First, we conduct a free comprehensive drone inspection and compile a forensic damage report using Xactimate® (the exact software used by insurance carriers). When your adjuster inspects the property, our Haag-certified specialist meets them in person to walk the roof together. You only pay your deductible.",
      category: "Insurance Claims",
    },
    {
      question: "How long does a typical residential roof replacement take?",
      answer: "For most residential homes (2,500 to 5,500 square feet), our experienced master crews complete the entire tear-off, underlayment installation, shingle nailing, flashing, and thorough magnetic clean-up in just 1 to 2 days. We monitor weather radars meticulously and never open more roof than can be sealed before unexpected precipitation.",
      category: "Installation & Timelines",
    },
    {
      question: "What makes Class-4 impact resistant shingles worth the investment?",
      answer: "Class-4 shingles (UL 2218 rated) are tested by dropping a 2-inch steel ball from 20 feet without fracturing the structural fiberglass core. In hail-prone regions like Colorado, installing Class-4 shingles frequently qualifies homeowners for insurance premium discounts of 15% to 30% annually while preventing leaks from severe summer hail.",
      category: "Materials & Performance",
    },
    {
      question: "Can roofing be performed during the winter months?",
      answer: "Yes. Our crews are equipped for year-round installations with specialized cold-weather protocols, including thermal shingle storage, specialized winterized nail drivers, and hand-tabbing with SBS cold-adhesive sealants when temperatures dip below 40°F to guarantee instant thermal bonding.",
      category: "Weather & Scheduling",
    },
  ] as FaqItem[],

  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },

  animation: {
    FRAME_COUNT: 656,
    FRAME_PATH: "/frame_",
    FRAME_EXT: ".jpg",
    PAD: 4,
    getFrameUrl: (index: number) => {
      const clamped = Math.max(1, Math.min(656, Math.round(index)));
      return `/frame_${String(clamped).padStart(4, "0")}.jpg`;
    },
  },

  droneFrames: framesData as string[],
};
