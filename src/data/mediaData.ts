export type MediaCategory =
  | 'all'
  | 'awards'
  | 'videos'
  | 'installations'
  | 'summits'
  | 'branding';

export interface MediaItem {
  id: string;
  title: string;
  category: 'awards' | 'videos' | 'installations' | 'summits' | 'branding';
  type: 'image' | 'video';
  fileUrl: string;
  thumbnailUrl?: string;
  badge: string;
  location?: string;
  coordinates?: string;
  date?: string;
  description: string;
  verifiedBy?: string;
}

export const mediaCategories: { id: MediaCategory; label: string; count?: number; icon?: string }[] = [
  { id: 'all', label: 'All Media & Documents' },
  { id: 'awards', label: 'Awards & DISCOM Certificates' },
  { id: 'videos', label: 'Field Videos & Site Walkthroughs' },
  { id: 'installations', label: 'GPS-Verified Field Installations' },
  { id: 'summits', label: 'National Summits & MoUs' },
  { id: 'branding', label: 'Official Brand Identity' },
];

export const mediaItems: MediaItem[] = [
  // ==========================================
  // 1. AWARDS & OFFICIAL DISCOM CERTIFICATES
  // ==========================================
  {
    id: 'award-kalahandi-highest-pm-surya-ghar',
    title: 'Award for Highest Rooftop Solar Installations — Kalahandi District',
    category: 'awards',
    type: 'image',
    fileUrl: '/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg',
    badge: 'District Top Achiever',
    location: 'Bhawanipatna, Kalahandi, Odisha',
    date: '2025 – 2026',
    description:
      'Official district recognition and framed award presented to M/s Shresthanshi Construction & Suppliers for achieving the highest number of residential rooftop solar installations under PM Surya Ghar Muft Bijli Yojana across Kalahandi district.',
    verifiedBy: 'District Administration & Renewable Energy Cell',
  },
  {
    id: 'award-tpwodl-utility-aggregation',
    title: 'Award for Highest Installation Under PM Surya Ghar Utility-Led Aggregation',
    category: 'awards',
    type: 'image',
    fileUrl: '/media/awards-certificates/tpwodl-utility-led-aggregation-award.jpg',
    badge: 'TPWODL Utility Aggregation Winner',
    location: 'TPWODL Corporate Office, Western Odisha',
    date: '2025 – 2026',
    description:
      'Prestigious utility-led aggregation award from TP Western Odisha Distribution Limited (TPWODL — Joint Venture of Tata Power & Govt of Odisha) recognizing Shresthanshi as the leading solar EPC partner in western Odisha.',
    verifiedBy: 'TPWODL Executive Leadership',
  },
  {
    id: 'cert-tpwodl-aug-2025',
    title: 'TPWODL Certificate of Appreciation — August 2025 (14 Rooftop Installations)',
    category: 'awards',
    type: 'image',
    fileUrl: '/media/awards-certificates/tpwodl-certificate-aug-2025.jpg',
    badge: 'Official DISCOM Certificate',
    location: 'Kalahandi, Western Odisha',
    date: 'August 2025',
    description:
      'Formal certificate of appreciation signed by Er. Ashish Kumar Patjoshi (Chief Technology & Renewable Energy) and Parveen Verma (Chief Executive Officer, TPWODL) honoring 14 successfully commissioned rooftop solar net-metered installations in August 2025.',
    verifiedBy: 'TPWODL (Tata Power & Odisha Govt)',
  },
  {
    id: 'cert-tpwodl-nov-2025',
    title: 'TPWODL Certificate of Appreciation — November 2025 (26 Rooftop Installations)',
    category: 'awards',
    type: 'image',
    fileUrl: '/media/awards-certificates/tpwodl-certificate-nov-2025.jpg',
    badge: 'Official DISCOM Certificate',
    location: 'Balangir & Kalahandi, Odisha',
    date: 'November 2025',
    description:
      'Formal certificate of appreciation from TPWODL certifying 26 verified rooftop solar installations across Balangir and Kalahandi within a single calendar month with rapid DISCOM meter synchronizations.',
    verifiedBy: 'TPWODL (Tata Power & Odisha Govt)',
  },

  // ==========================================
  // 2. NATIONAL SUMMITS & LEADERSHIP
  // ==========================================
  {
    id: 'summit-bre-mnre-tpwodl-leader',
    title: 'At the BRE Summit New Delhi with Er. Satyabrata Panda (TPWODL RE Cell)',
    category: 'summits',
    type: 'image',
    fileUrl: '/media/summits-leadership/bre-summit-mnre-tpwodl-er-satyabrata-panda.jpg',
    badge: 'Top 100 Vendors of Odisha — MNRE',
    location: 'Bharat Mandapam, New Delhi',
    date: 'November 2026',
    description:
      'Invited by the Ministry of New and Renewable Energy (MNRE), Govt of India, as one of the Top 100 Renewable Energy Vendors of Odisha. Pictured: Proprietor Shubham Pratap Singh alongside Er. Satyabrata Panda, Superintending Engineer, RE Cell, TPWODL at the Bharat RE Summit & Expo 2026.',
    verifiedBy: 'MNRE (Govt of India) & International Solar Alliance (ISA)',
  },
  {
    id: 'summit-mou-signing-ceremony',
    title: 'Bharat Renewable Energy Summit 2026 — MoU Signing Ceremony Stage',
    category: 'summits',
    type: 'image',
    fileUrl: '/media/summits-leadership/bre-summit-mou-signing-ceremony.jpg',
    badge: 'Powering Odisha’s Future MoU',
    location: 'Bharat Mandapam, New Delhi',
    date: '3rd November 2026',
    description:
      'Historic MoU Signing Ceremony stage under the theme "Powering Odisha’s Future", marking accelerated utility-scale and decentralized solar capacity expansion across rural and western Odisha.',
    verifiedBy: 'Bharat RE Summit & Odisha Renewable Energy Mission',
  },
  {
    id: 'summit-bharat-mandapam-urja-chakra',
    title: 'Urja Chakra Renewable Energy Forum — Bharat Mandapam',
    category: 'summits',
    type: 'image',
    fileUrl: '/media/summits-leadership/bharat-mandapam-re-summit-shubham.jpg',
    badge: 'National RE Leadership Delegate',
    location: 'Bharat Mandapam, New Delhi',
    date: 'November 2026',
    description:
      'Proprietor Shubham Pratap Singh participating in national panel discussions on green hydrogen, decentralized solar water pumping, and PM Surya Ghar rural adoption at Bharat Mandapam.',
    verifiedBy: 'MNRE & ISA Summit Secretariat',
  },

  // ==========================================
  // 3. FIELD VIDEOS & SITE WALKTHROUGHS
  // ==========================================
  {
    id: 'video-field-1',
    title: 'Field Solar Installation Video Walkthrough — Solar Array Inspection',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-1.mp4',
    thumbnailUrl: '/media/field-installations/bhubaneswar-ground-mount-solar-trackers.jpg',
    badge: 'Live Site Video',
    location: 'Odisha Field Site',
    description:
      'Direct on-site camera footage inspecting structural tilt alignment, heavy-duty mounting clamps, and DC cabling channels across a verified field solar installation.',
    verifiedBy: 'On-Site Technical Team',
  },
  {
    id: 'video-field-2',
    title: 'Field Solar Video Walkthrough — Ground & Rooftop Installation Tour',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-2.mp4',
    thumbnailUrl: '/media/field-installations/narla-dual-elevated-rooftop-solar.jpg',
    badge: 'Live Site Video',
    location: 'Kalahandi Site Execution',
    description:
      'Comprehensive walkthrough capturing module array cleanliness, shadow-free clearance, high wind-resistance mounting structures, and inverter output stability.',
    verifiedBy: 'Field Quality Engineering',
  },
  {
    id: 'video-field-3',
    title: 'Solar System Testing & Electrical Commissioning Walkthrough',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-3.mp4',
    thumbnailUrl: '/media/field-installations/solar-engineer-multimeter-testing.jpg',
    badge: 'Live Testing Video',
    location: 'Western Odisha',
    description:
      'Hands-on technical clip showing electrical circuit continuity testing, string voltage verification, and DISCOM meter synchronization on-site.',
    verifiedBy: 'Solar Electrical Commissioning Lead',
  },
  {
    id: 'video-field-4',
    title: 'On-Site Solar Panel & Wiring Quality Inspection',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-4.mp4',
    thumbnailUrl: '/media/field-installations/narla-polycab-inverter-net-meter.jpg',
    badge: 'Live Field Video',
    location: 'Residential Client Site',
    description:
      'Close-up visual audit inspecting fire-rated UV-resistant conduit piping, AC/DC distribution boxes, and grid sync safety breakers.',
    verifiedBy: 'Technical Solar Auditor',
  },
  {
    id: 'video-field-5',
    title: 'Field Solar Array Operational Verification',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-5.mp4',
    thumbnailUrl: '/media/field-installations/kesinga-commercial-metal-shed-solar.jpg',
    badge: 'Live Operational Video',
    location: 'Commercial & Agricultural Sector',
    description:
      'Operational site footage demonstrating uninterrupted solar generation and inverter performance under sunny daytime conditions.',
    verifiedBy: 'Turnkey Solar Installation Crew',
  },

  // ==========================================
  // 4. GPS-VERIFIED FIELD INSTALLATIONS
  // ==========================================
  {
    id: 'field-mahaling-saranga-sahu',
    title: 'PM Surya Ghar Client Saranga Sahu — Mahaling, Kalahandi',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/mahaling-pm-surya-ghar-saranga-sahu.jpg',
    badge: 'PM Surya Ghar Beneficiary',
    location: 'Mahaling, Kalahandi, Odisha 766036',
    coordinates: 'Lat 20.117954°, Long 82.870938°',
    date: '22/03/2025',
    description:
      'Customer Mr. Saranga Sahu standing proudly on his terrace in Mahaling with his verified PM Surya Ghar application certificate in front of his newly energized on-grid rooftop solar plant.',
    verifiedBy: 'GPS Map Camera & DISCOM Application No: NP-ODTW025-7709480',
  },
  {
    id: 'field-bhubaneswar-trackers',
    title: 'Dual High-Tilt Ground-Mounted Solar Arrays — Bhubaneswar',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/bhubaneswar-ground-mount-solar-trackers.jpg',
    badge: 'Ground-Mount Array',
    location: 'Bhubaneswar, Odisha 751015',
    coordinates: 'Lat 20.302357°, Long 85.8053°',
    date: '20/08/2026',
    description:
      'Turnkey ground-mount dual solar arrays with elevated civil foundations, mono-PERC high-efficiency panels, and integrated technical monitoring team on-site.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-narla-dual-elevated',
    title: 'Dual-Table Elevated Rooftop Solar Plant — Narla, Kalahandi',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/narla-dual-elevated-rooftop-solar.jpg',
    badge: 'Elevated Rooftop Plant',
    location: 'Narla, Kalahandi, Odisha 766100',
    coordinates: 'Lat 20.059394°, Long 83.38121°',
    date: '04/11/2026',
    description:
      'Twin-table elevated rooftop solar installation in Narla mounted on heavy-gauge galvanized steel columns with RCC foundation pedestals, built above terrace height to preserve usable rooftop space.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-narla-polycab-inverter',
    title: 'Polycab On-Grid Inverter & Bi-Directional Net-Meter — Narla',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/narla-polycab-inverter-net-meter.jpg',
    badge: 'DISCOM Net-Meter & Inverter',
    location: 'Narla, Kalahandi, Odisha 766100',
    coordinates: 'Lat 20.059498°, Long 83.381272°',
    date: '04/11/2026',
    description:
      'Neat electrical panel board displaying Polycab solar grid-tied inverter, DISCOM bi-directional net meter, ACDB and DCDB surge protection devices, and concealed conduit wiring.',
    verifiedBy: 'TPWODL Discom Net-Metering Approval',
  },
  {
    id: 'field-badchiching-rooftop',
    title: 'Rooftop Solar Plant with Heavy Concrete Ballasts — Badchiching',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/badchiching-rooftop-solar.jpg',
    badge: 'Residential Rooftop',
    location: 'Badchiching, Kalahandi, Odisha 766110',
    coordinates: 'Lat 19.973718°, Long 83.301787°',
    date: '22/10/2025',
    description:
      'Turnkey on-grid rooftop solar array installed at Badchiching featuring non-penetrating heavy concrete ballast blocks, dual earthing, and lightning arrestor protection.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-kesinga-metal-shed',
    title: 'Commercial Tin-Shed Rooftop Solar Installation — Kesinga',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/kesinga-commercial-metal-shed-solar.jpg',
    badge: 'Commercial Metal Shed Solar',
    location: 'Kesinga, Kalahandi, Odisha 766012',
    coordinates: 'Lat 20.181233°, Long 83.2139°',
    date: '15/10/2026',
    description:
      'Precision flush-mounted solar array installed over trapezoidal industrial tin-shed roofing in Kesinga using aluminum mid-clamps, end-clamps, and EPDM waterproof rubber gaskets.',
    verifiedBy: 'Commercial Energy Audit Inspection',
  },
  {
    id: 'field-jitanaga-waaree-inverter',
    title: 'Waaree Smart Solar Inverter & DC Switchgear — Jitanaga',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/jitanaga-waaree-solar-inverter.jpg',
    badge: 'Waaree Tier-1 Hardware',
    location: 'Jitanaga, Odisha 756127',
    coordinates: 'Lat 21.034673°, Long 86.584378°',
    date: '30/10/2026',
    description:
      'Wall-mounted Waaree "One with the Sun" high-efficiency transformerless solar inverter equipped with dual MPPT tracking, IP65 weatherproof casing, and Wi-Fi performance telemetry.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-jitanaga-array',
    title: 'Monocrystalline Solar Panel Array Installation — Jitanaga',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/jitanaga-rooftop-solar-array.jpg',
    badge: 'Rooftop Solar Array',
    location: 'Jitanaga, Odisha 756127',
    coordinates: 'Lat 21.034596°, Long 86.584409°',
    date: '30/10/2026',
    description:
      'Multi-panel solar array with optimal southern orientation and 22-degree tilt angle designed for maximum solar irradiation absorption throughout all four seasons in coastal/inland Odisha.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-jhurikata-rooftop',
    title: 'Elevated On-Grid Rooftop Array — Jhurikata',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/jhurikata-rooftop-solar.jpg',
    badge: 'Residential Solar',
    location: 'Jhurikata, Odisha 759126',
    coordinates: 'Lat 20.903991°, Long 84.272262°',
    date: '24/10/2026',
    description:
      'High-altitude rooftop solar generation system mounted on heavy hot-dip galvanized steel framing engineered for 150 km/h monsoon wind loads.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-khordha-rooftop',
    title: 'Four-Module Solar Array with Ballast Pillars — Khordha',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/khordha-rooftop-solar.jpg',
    badge: 'Residential Solar Array',
    location: 'Pallahat, Khordha, Odisha 752056',
    coordinates: 'Lat 20.165672°, Long 85.609771°',
    date: '31/10/2026',
    description:
      'Residential rooftop solar system featuring heavy pre-cast RCC pedestals, corrosion-resistant aluminum clamps, and shadow-free positioning overlooking lush foliage.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-multimeter-testing',
    title: 'Solar Engineer Circuit Multimeter Testing & Quality Audit',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/solar-engineer-multimeter-testing.jpg',
    badge: 'Engineering & Testing Audit',
    location: 'Active Commissioning Site, Kalahandi',
    date: '2025 – 2026',
    description:
      'Shresthanshi certified electrical engineer measuring open-circuit string voltage (Voc) and short-circuit current (Isc) with a precision digital multimeter prior to connecting inverter string inputs.',
    verifiedBy: 'Certified Solar Technician Field Testing',
  },
  {
    id: 'field-narla-rooftop-wiring',
    title: 'High-Efficiency Monocrystalline Panels & Conduit Routing',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/narla-rooftop-inverter-wiring.jpg',
    badge: 'Wiring & Safety Quality',
    location: 'Narla, Kalahandi, Odisha 766100',
    coordinates: 'Lat 20.1241747°, Long 83.4063574°',
    date: 'CA: 903412061108',
    description:
      'Close-up view of premium monocrystalline half-cut solar panels with concealed DC cabling routing in PVC conduit, safeguarding against weathering, rodents, and moisture.',
    verifiedBy: 'Discom Consumer Account: 903412061108',
  },
  {
    id: 'field-ballast-installation',
    title: 'Technical Team Assembling Pre-Cast Concrete Ballast Footings',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/residential-rooftop-ballast-installation.jpg',
    badge: 'Civil Foundation Works',
    location: 'Residential Installation Site',
    date: '2025 – 2026',
    description:
      'Shresthanshi certified installation crew carefully aligning four-panel solar module arrays and bolting structure legs into reinforced pre-cast concrete ballast blocks to guarantee zero roof punctures.',
    verifiedBy: 'Field Civil & Structural Engineering Team',
  },
  {
    id: 'field-solar-community-water-tank',
    title: 'Ground Solar Pumping Array with Elevated Overhead Water Tank',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/solar-community-water-tank-overhead.jpg',
    badge: 'Community Water Infrastructure',
    location: 'Rural Habitation Site, Odisha',
    date: '2025 – 2026',
    description:
      'Multi-kW ground solar pumping field array coupled to an automated deep tubewell submersible pump, supplying drinking and irrigation water directly to a high-capacity elevated community water reservoir.',
    verifiedBy: 'Rural Infrastructure & Drinking Water Project',
  },

  // ==========================================
  // 5. OFFICIAL BRAND IDENTITY & ARTWORK
  // ==========================================
  {
    id: 'brand-equipment-showcase',
    title: 'Shresthanshi Solar Solutions — Official Comprehensive Equipment Artwork',
    category: 'branding',
    type: 'image',
    fileUrl: '/media/branding/shresthanshi-brand-equipment-showcase.jpg',
    badge: 'Official Brand Equipment Showcase',
    location: 'Head Office: Sargiguda, Narla Road, Kalahandi',
    description:
      'Official brand showcase depicting Shresthanshi’s comprehensive solar ecosystem: Tier-1 PV modules, digital solar inverter, stainless steel borehole submersible pump, smart motor starter, and solar cabling.',
    verifiedBy: 'M/s Shreshtanshi Construction & Suppliers',
  },
  {
    id: 'brand-official-logo',
    title: 'Official Vector Brand Logo — Shresthanshi Construction & Suppliers',
    category: 'branding',
    type: 'image',
    fileUrl: '/media/branding/shresthanshi-official-logo.jpg',
    badge: 'Official Brand Trademark',
    location: 'Registered Enterprise, Kalahandi, Odisha',
    description:
      'High-resolution official trademark insignia of Shresthanshi Construction & Suppliers featuring rising sun irradiation arcs and multi-cell solar panel arrays.',
    verifiedBy: 'GSTIN: 21AVUPM9359D1Z6',
  },
];

