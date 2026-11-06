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
  { id: 'all', label: 'All Photos & Media' },
  { id: 'awards', label: 'Awards & Certificates' },
  { id: 'videos', label: 'Site Videos' },
  { id: 'installations', label: 'Field Installations' },
  { id: 'summits', label: 'National Summits' },
  { id: 'branding', label: 'Company Brand' },
];

export const mediaItems: MediaItem[] = [
  // ==========================================
  // 1. AWARDS & OFFICIAL DISCOM CERTIFICATES
  // ==========================================
  {
    id: 'award-kalahandi-highest-pm-surya-ghar',
    title: 'District Award — Highest Solar Installations',
    category: 'awards',
    type: 'image',
    fileUrl: '/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg',
    badge: 'District First Place',
    location: 'Bhawanipatna, Kalahandi',
    date: '2025 – 2026',
    description:
      'Official district award presented to M/s Shresthanshi Construction & Suppliers for achieving the highest number of residential rooftop solar installations under PM Surya Ghar Muft Bijli Yojana across Kalahandi district.',
    verifiedBy: 'District Administration & Renewable Energy Cell',
  },
  {
    id: 'award-tpwodl-utility-aggregation',
    title: 'TPWODL Utility-Led Aggregation Award',
    category: 'awards',
    type: 'image',
    fileUrl: '/media/awards-certificates/tpwodl-utility-led-aggregation-award.jpg',
    badge: 'TPWODL Top Partner',
    location: 'Western Odisha Discom',
    date: '2025 – 2026',
    description:
      'Prestigious award from TP Western Odisha Distribution Limited (TPWODL — Joint Venture of Tata Power & Govt of Odisha) recognizing Shresthanshi as the leading solar EPC partner in western Odisha.',
    verifiedBy: 'TPWODL Executive Leadership',
  },
  {
    id: 'cert-tpwodl-aug-2025',
    title: 'TPWODL Appreciation Certificate (August 2025)',
    category: 'awards',
    type: 'image',
    fileUrl: '/media/awards-certificates/tpwodl-certificate-aug-2025.jpg',
    badge: 'Discom Certificate',
    location: 'Kalahandi, Odisha',
    date: 'August 2025',
    description:
      'Certificate of appreciation signed by Chief Technology & Renewable Energy and CEO of TPWODL honoring 14 successfully commissioned rooftop solar net-metered installations in August 2025.',
    verifiedBy: 'TPWODL (Tata Power & Odisha Govt)',
  },
  {
    id: 'cert-tpwodl-nov-2025',
    title: 'TPWODL Appreciation Certificate (November 2025)',
    category: 'awards',
    type: 'image',
    fileUrl: '/media/awards-certificates/tpwodl-certificate-nov-2025.jpg',
    badge: 'Discom Certificate',
    location: 'Balangir & Kalahandi',
    date: 'November 2025',
    description:
      'Certificate of appreciation from TPWODL certifying 26 verified rooftop solar installations across Balangir and Kalahandi with rapid DISCOM net-meter synchronizations.',
    verifiedBy: 'TPWODL (Tata Power & Odisha Govt)',
  },

  // ==========================================
  // 2. NATIONAL SUMMITS & LEADERSHIP
  // ==========================================
  {
    id: 'summit-bre-mnre-tpwodl-leader',
    title: 'National Solar Summit (New Delhi)',
    category: 'summits',
    type: 'image',
    fileUrl: '/media/summits-leadership/bre-summit-mnre-tpwodl-er-satyabrata-panda.jpg',
    badge: 'Top 100 Vendor Invitation',
    location: 'Bharat Mandapam, New Delhi',
    date: 'November 2026',
    description:
      'Invited by the Ministry of New and Renewable Energy (MNRE), Govt of India, as one of the Top 100 Renewable Energy Vendors of Odisha. Pictured: Shubham Pratap Singh alongside Er. Satyabrata Panda (TPWODL RE Cell).',
    verifiedBy: 'MNRE (Govt of India) & International Solar Alliance (ISA)',
  },
  {
    id: 'summit-mou-signing-ceremony',
    title: 'State Solar MoU Signing Ceremony',
    category: 'summits',
    type: 'image',
    fileUrl: '/media/summits-leadership/bre-summit-mou-signing-ceremony.jpg',
    badge: 'Odisha Energy MoU',
    location: 'Bharat Mandapam, New Delhi',
    date: '3rd November 2026',
    description:
      'Historic MoU Signing Ceremony stage under the theme "Powering Odisha’s Future", marking accelerated utility-scale and decentralized solar capacity expansion across rural and western Odisha.',
    verifiedBy: 'Bharat RE Summit & Odisha Renewable Energy Mission',
  },
  {
    id: 'summit-bharat-mandapam-urja-chakra',
    title: 'Urja Chakra National Energy Forum',
    category: 'summits',
    type: 'image',
    fileUrl: '/media/summits-leadership/bharat-mandapam-re-summit-shubham.jpg',
    badge: 'National Delegate',
    location: 'Bharat Mandapam, New Delhi',
    date: 'November 2026',
    description:
      'Proprietor Shubham Pratap Singh participating in national panel discussions on green energy, decentralized solar pumping, and PM Surya Ghar rural adoption at Bharat Mandapam.',
    verifiedBy: 'MNRE & ISA Summit Secretariat',
  },

  // ==========================================
  // 3. FIELD VIDEOS & SITE WALKTHROUGHS
  // ==========================================
  {
    id: 'video-field-1',
    title: 'Solar Panels Inspection Video',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-1.mp4',
    thumbnailUrl: '/media/field-installations/bhubaneswar-ground-mount-solar-trackers.jpg',
    badge: 'Site Video',
    location: 'Odisha Field Site',
    description:
      'Direct on-site camera footage inspecting structural tilt alignment, heavy-duty mounting clamps, and DC cabling channels across a verified field solar installation.',
    verifiedBy: 'On-Site Technical Team',
  },
  {
    id: 'video-field-2',
    title: 'Rooftop & Ground Solar Site Tour',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-2.mp4',
    thumbnailUrl: '/media/field-installations/narla-dual-elevated-rooftop-solar.jpg',
    badge: 'Site Video',
    location: 'Kalahandi Site Execution',
    description:
      'Comprehensive walkthrough capturing module array cleanliness, shadow-free clearance, high wind-resistance mounting structures, and inverter output stability.',
    verifiedBy: 'Field Quality Engineering',
  },
  {
    id: 'video-field-3',
    title: 'Electrical Testing & Meter Check',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-3.mp4',
    thumbnailUrl: '/media/field-installations/solar-engineer-multimeter-testing.jpg',
    badge: 'Testing Video',
    location: 'Western Odisha',
    description:
      'Hands-on technical clip showing electrical circuit continuity testing, string voltage verification, and DISCOM meter synchronization on-site.',
    verifiedBy: 'Solar Electrical Commissioning Lead',
  },
  {
    id: 'video-field-4',
    title: 'Panel Wiring & Safety Inspection',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-4.mp4',
    thumbnailUrl: '/media/field-installations/narla-polycab-inverter-net-meter.jpg',
    badge: 'Field Video',
    location: 'Residential Client Site',
    description:
      'Close-up visual audit inspecting fire-rated UV-resistant conduit piping, AC/DC distribution boxes, and grid sync safety breakers.',
    verifiedBy: 'Technical Solar Auditor',
  },
  {
    id: 'video-field-5',
    title: 'Solar Power Generation in Action',
    category: 'videos',
    type: 'video',
    fileUrl: '/media/videos/field-solar-video-5.mp4',
    thumbnailUrl: '/media/field-installations/kesinga-commercial-metal-shed-solar.jpg',
    badge: 'Operational Video',
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
    title: 'Rooftop Solar Client (Mahaling)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/mahaling-pm-surya-ghar-saranga-sahu.jpg',
    badge: 'Customer Handover',
    location: 'Mahaling, Kalahandi',
    coordinates: 'Lat 20.117954°, Long 82.870938°',
    date: '22/03/2025',
    description:
      'Customer Mr. Saranga Sahu standing on his terrace in Mahaling with his verified PM Surya Ghar application certificate in front of his newly energized rooftop solar plant.',
    verifiedBy: 'DISCOM Application No: NP-ODTW025-7709480',
  },
  {
    id: 'field-bhubaneswar-trackers',
    title: 'Ground Solar Panel Array (Bhubaneswar)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/bhubaneswar-ground-mount-solar-trackers.jpg',
    badge: 'Ground-Mount',
    location: 'Bhubaneswar, Odisha',
    coordinates: 'Lat 20.302357°, Long 85.8053°',
    date: '20/08/2026',
    description:
      'Turnkey ground-mount dual solar arrays with elevated civil foundations, mono-PERC high-efficiency panels, and integrated technical monitoring on-site.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-narla-dual-elevated',
    title: 'Elevated Rooftop Solar (Narla)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/narla-dual-elevated-rooftop-solar.jpg',
    badge: 'Elevated Rooftop',
    location: 'Narla, Kalahandi',
    coordinates: 'Lat 20.059394°, Long 83.38121°',
    date: '04/11/2026',
    description:
      'Twin-table elevated rooftop solar installation in Narla mounted on heavy-gauge galvanized steel columns, built above terrace height to preserve usable rooftop space.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-narla-polycab-inverter',
    title: 'Solar Inverter & Net Meter Setup (Narla)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/narla-polycab-inverter-net-meter.jpg',
    badge: 'Net-Meter & Inverter',
    location: 'Narla, Kalahandi',
    coordinates: 'Lat 20.059498°, Long 83.381272°',
    date: '04/11/2026',
    description:
      'Electrical panel board displaying Polycab solar grid-tied inverter, DISCOM bi-directional net meter, ACDB and DCDB surge protection devices, and concealed conduit wiring.',
    verifiedBy: 'TPWODL Discom Net-Metering Approval',
  },
  {
    id: 'field-badchiching-rooftop',
    title: 'Rooftop Solar Installation (Badchiching)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/badchiching-rooftop-solar.jpg',
    badge: 'Residential Solar',
    location: 'Badchiching, Kalahandi',
    coordinates: 'Lat 19.973718°, Long 83.301787°',
    date: '22/10/2025',
    description:
      'Turnkey on-grid rooftop solar array installed at Badchiching featuring non-penetrating heavy concrete ballast blocks, dual earthing, and lightning arrestor protection.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-kesinga-metal-shed',
    title: 'Tin-Shed Solar Installation (Kesinga)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/kesinga-commercial-metal-shed-solar.jpg',
    badge: 'Commercial Solar',
    location: 'Kesinga, Kalahandi',
    coordinates: 'Lat 20.181233°, Long 83.2139°',
    date: '15/10/2026',
    description:
      'Precision flush-mounted solar array installed over industrial tin-shed roofing in Kesinga using aluminum mid-clamps, end-clamps, and waterproof EPDM gaskets.',
    verifiedBy: 'Commercial Energy Audit Inspection',
  },
  {
    id: 'field-jitanaga-waaree-inverter',
    title: 'Waaree Solar Inverter Setup (Jitanaga)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/jitanaga-waaree-solar-inverter.jpg',
    badge: 'Waaree Hardware',
    location: 'Jitanaga, Odisha',
    coordinates: 'Lat 21.034673°, Long 86.584378°',
    date: '30/10/2026',
    description:
      'Wall-mounted Waaree smart high-efficiency solar inverter equipped with dual MPPT tracking, IP65 weatherproof casing, and Wi-Fi performance telemetry.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-jitanaga-array',
    title: 'Solar Panel Array (Jitanaga)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/jitanaga-rooftop-solar-array.jpg',
    badge: 'Rooftop Panels',
    location: 'Jitanaga, Odisha',
    coordinates: 'Lat 21.034596°, Long 86.584409°',
    date: '30/10/2026',
    description:
      'Multi-panel solar array with optimal southern orientation and 22-degree tilt angle designed for maximum solar power generation across all seasons.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-jhurikata-rooftop',
    title: 'Rooftop Solar Array (Jhurikata)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/jhurikata-rooftop-solar.jpg',
    badge: 'Residential Solar',
    location: 'Jhurikata, Odisha',
    coordinates: 'Lat 20.903991°, Long 84.272262°',
    date: '24/10/2026',
    description:
      'Rooftop solar generation system mounted on heavy hot-dip galvanized steel framing engineered for 150 km/h monsoon wind loads.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-khordha-rooftop',
    title: 'Home Solar Installation (Khordha)',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/khordha-rooftop-solar.jpg',
    badge: 'Residential Solar',
    location: 'Khordha, Odisha',
    coordinates: 'Lat 20.165672°, Long 85.609771°',
    date: '31/10/2026',
    description:
      'Residential rooftop solar system featuring heavy pre-cast concrete pedestals, corrosion-resistant clamps, and shadow-free positioning overlooking lush greenery.',
    verifiedBy: 'GPS Map Camera Verified',
  },
  {
    id: 'field-multimeter-testing',
    title: 'On-Site Voltage & Safety Testing',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/solar-engineer-multimeter-testing.jpg',
    badge: 'Quality Testing',
    location: 'Kalahandi Site',
    date: '2025 – 2026',
    description:
      'Certified electrical engineer measuring open-circuit string voltage (Voc) and short-circuit current (Isc) with a precision digital multimeter prior to connecting inverter.',
    verifiedBy: 'Certified Solar Technician Field Testing',
  },
  {
    id: 'field-narla-rooftop-wiring',
    title: 'Solar Panels & Weatherproof Wiring',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/narla-rooftop-inverter-wiring.jpg',
    badge: 'Safety Wiring',
    location: 'Narla, Kalahandi',
    coordinates: 'Lat 20.1241747°, Long 83.4063574°',
    date: 'CA: 903412061108',
    description:
      'Close-up view of premium monocrystalline half-cut solar panels with concealed DC cabling routing in PVC conduit, safeguarding against weathering, moisture, and pests.',
    verifiedBy: 'Discom Consumer Account: 903412061108',
  },
  {
    id: 'field-ballast-installation',
    title: 'Non-Drill Ballast Roof Mounting',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/residential-rooftop-ballast-installation.jpg',
    badge: 'Roof Mounting',
    location: 'Residential Site',
    date: '2025 – 2026',
    description:
      'Certified installation crew bolting structure legs into reinforced pre-cast concrete ballast blocks to guarantee zero roof punctures and prevent roof leaks.',
    verifiedBy: 'Field Civil & Structural Engineering Team',
  },
  {
    id: 'field-solar-community-water-tank',
    title: 'Solar Water Pump & Overhead Tank',
    category: 'installations',
    type: 'image',
    fileUrl: '/media/field-installations/solar-community-water-tank-overhead.jpg',
    badge: 'Solar Water Pump',
    location: 'Odisha Habitation Site',
    date: '2025 – 2026',
    description:
      'Solar pumping field array coupled to an automated deep tubewell submersible pump, supplying fresh drinking and irrigation water directly to a community water reservoir.',
    verifiedBy: 'Rural Infrastructure & Drinking Water Project',
  },

  // ==========================================
  // 5. OFFICIAL BRAND IDENTITY & ARTWORK
  // ==========================================
  {
    id: 'brand-equipment-showcase',
    title: 'Complete Solar Equipment Package',
    category: 'branding',
    type: 'image',
    fileUrl: '/media/branding/shresthanshi-brand-equipment-showcase.jpg',
    badge: 'Equipment Package',
    location: 'Head Office: Narla Road, Kalahandi',
    description:
      'Official brand showcase depicting Shresthanshi’s comprehensive solar ecosystem: Tier-1 PV modules, digital solar inverter, stainless steel borehole submersible pump, and solar cabling.',
    verifiedBy: 'M/s Shreshtanshi Construction & Suppliers',
  },
  {
    id: 'brand-official-logo',
    title: 'Official Company Logo & Seal',
    category: 'branding',
    type: 'image',
    fileUrl: '/media/branding/shresthanshi-official-logo.jpg',
    badge: 'Official Trademark',
    location: 'Kalahandi, Odisha',
    description:
      'High-resolution official trademark insignia of Shresthanshi Construction & Suppliers featuring rising sun irradiation arcs and multi-cell solar panel arrays.',
    verifiedBy: 'GSTIN: 21AVUPM9359D1Z6',
  },
];
