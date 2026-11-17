export interface LicenceItem {
  id: string;
  title: string;
  shortTitle: string;
  category: 'Registration & Tax' | 'Government Empanelment' | 'DISCOM Accreditations' | 'Awards & Recognitions';
  issuingAuthority: string;
  registrationNumber?: string;
  validity?: string;
  date?: string;
  location: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  highlights: string[];
}

export const licencesAndCertifications: LicenceItem[] = [
  {
    id: 'lic-gstin',
    title: 'Goods and Services Tax Identification (GSTIN Registration)',
    shortTitle: 'GSTIN Registered Enterprise',
    category: 'Registration & Tax',
    issuingAuthority: 'Government of India & Government of Odisha (Commercial Tax)',
    registrationNumber: '21AVUPM9359D1Z6',
    validity: 'Active & Verified',
    date: 'Registered Enterprise',
    location: 'Bhubaneswar (HQ) & Kalahandi Department, Odisha',
    badge: 'Official Tax Registration',
    imageSrc: '/media/awards-certificates/tpwodl-certificate-nov-2025.jpg',
    imageAlt: 'GSTIN Verified Enterprise M/s Shreshtanshi Construction and Suppliers',
    description:
      'Official commercial enterprise tax registration for M/s Shreshtanshi Construction & Suppliers (Proprietor: Mr. Shubham Pratap Singh), authorizing turnkey solar engineering, government tenders, electrical fabrication, and solar water pumping across Odisha.',
    highlights: [
      'Verified GSTIN: 21AVUPM9359D1Z6',
      'Authorized Solar EPC & Infrastructure Contractor',
      'Fully compliant with central & state tax norms',
    ],
  },
  {
    id: 'lic-pm-surya-ghar',
    title: 'PM Surya Ghar: Muft Bijli Yojana Empaneled Solar Contractor',
    shortTitle: 'PM Surya Ghar Empanelment',
    category: 'Government Empanelment',
    issuingAuthority: 'Ministry of New and Renewable Energy (MNRE) & State DISCOMs',
    registrationNumber: 'Empaneled National Portal Vendor',
    validity: 'National Portal Active',
    date: '2024 – Present',
    location: 'Odisha State Coverage',
    badge: 'National Portal Empaneled',
    imageSrc: '/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg',
    imageAlt: 'PM Surya Ghar Empaneled Solar Contractor Award and Verification',
    description:
      'Officially empaneled vendor under the Government of India’s PM Surya Ghar Muft Bijli Yojana, authorized to supply ALMM-approved DCR solar panels, grid-tied inverters, and facilitate direct central financial assistance (subsidy) up to ₹78,000 for residential homeowners.',
    highlights: [
      '350+ verified rooftop solar installations completed',
      'Direct DBT subsidy facilitation for consumers',
      'Approved Tier-1 DCR solar modules & grid inverters',
    ],
  },
  {
    id: 'lic-tpwodl-aggregation',
    title: 'TPWODL Utility-Led Aggregation Agreement & Top Partner Award',
    shortTitle: 'TPWODL Utility Aggregation Partner',
    category: 'DISCOM Accreditations',
    issuingAuthority: 'TP Western Odisha Distribution Ltd (Tata Power & Odisha Govt JV)',
    registrationNumber: 'Utility-Led Aggregation Partner',
    validity: 'Active Utility Agreement',
    date: '2025 – 2026',
    location: 'Western Odisha DISCOM Area',
    badge: 'Leading Utility Partner',
    imageSrc: '/media/awards-certificates/tpwodl-utility-led-aggregation-award.jpg',
    imageAlt: 'TPWODL Utility Aggregation Top Solar Partner Award',
    description:
      'Formal utility agreement and prestigious partner award from TP Western Odisha Distribution Limited honoring Shreshtanshi as Western Odisha’s leading solar EPC partner for residential and commercial rooftop solar aggregation and rapid grid synchronization.',
    highlights: [
      'Tata Power & Govt of Odisha Joint Venture Partner',
      'Leading solar EPC partner across Western Odisha',
      'Rapid net-meter grid synchronization protocol',
    ],
  },
  {
    id: 'lic-tpwodl-nov-cert',
    title: 'TPWODL Certificate of Appreciation (Net-Meter Synchronization)',
    shortTitle: 'TPWODL Net-Meter Certificate',
    category: 'DISCOM Accreditations',
    issuingAuthority: 'Chief of Technology & Renewable Energy, TPWODL',
    registrationNumber: 'Ref: TPWODL/RE/2025/11',
    validity: 'Official DISCOM Commendation',
    date: 'November 2025',
    location: 'Balangir & Kalahandi, Odisha',
    badge: 'Official DISCOM Certificate',
    imageSrc: '/media/awards-certificates/tpwodl-certificate-nov-2025.jpg',
    imageAlt: 'TPWODL Certificate of Appreciation for Solar Net-Metering',
    description:
      'Official certificate of appreciation signed by the Chief of Technology & Renewable Energy and CEO of TPWODL certifying 26 verified rooftop solar installations across Balangir and Kalahandi with rapid DISCOM net-meter synchronizations and 100% technical safety compliance.',
    highlights: [
      'Certified by Chief of Renewable Energy, TPWODL',
      '26 rapid net-meter synchronizations verified',
      'Zero safety non-compliance audit record',
    ],
  },
  {
    id: 'lic-tpwodl-aug-cert',
    title: 'TPWODL Appreciation Certificate (August 2025 Net-Metering)',
    shortTitle: 'TPWODL August 2025 Certificate',
    category: 'DISCOM Accreditations',
    issuingAuthority: 'TPWODL Executive Leadership',
    registrationNumber: 'Ref: TPWODL/RE/2025/08',
    validity: 'Official DISCOM Commendation',
    date: 'August 2025',
    location: 'Kalahandi District, Odisha',
    badge: 'DISCOM Appreciation',
    imageSrc: '/media/awards-certificates/tpwodl-certificate-aug-2025.jpg',
    imageAlt: 'TPWODL Certificate of Appreciation August 2025',
    description:
      'Official appreciation certificate acknowledging 14 successfully commissioned rooftop solar net-metered installations in August 2025, executed with seamless utility meter coordination and zero safety defect reports.',
    highlights: [
      '14 verified rooftop solar net-meters synchronized',
      'Executive leadership sign-off',
      'Seamless discom bidirectional meter setup',
    ],
  },
  {
    id: 'lic-mnre-summit',
    title: 'National Solar Summit Delegate Credential (MNRE & ISA)',
    shortTitle: 'MNRE National Summit Delegate',
    category: 'Awards & Recognitions',
    issuingAuthority: 'Ministry of New and Renewable Energy (Govt of India)',
    registrationNumber: 'Top 100 Odisha Vendor Delegate',
    validity: 'National RE Conclave Delegate',
    date: 'November 2026',
    location: 'Bharat Mandapam, New Delhi',
    badge: 'Top 100 Vendor Invitation',
    imageSrc: '/media/summits-leadership/bre-summit-mnre-tpwodl-er-satyabrata-panda.jpg',
    imageAlt: 'MNRE National Solar Summit Delegate Bharat Mandapam New Delhi',
    description:
      'Official invitation by the Ministry of New and Renewable Energy (MNRE), Govt of India, honoring proprietor Shubham Pratap Singh as one of the Top 100 Renewable Energy Vendors of Odisha at Bharat Mandapam, New Delhi alongside TPWODL leadership.',
    highlights: [
      'Govt of India (MNRE) official invitation',
      'Top 100 Renewable Energy Vendors of Odisha',
      'National high-level panel at Bharat Mandapam',
    ],
  },
  {
    id: 'lic-district-award',
    title: 'District 1st Place Award — Highest PM Surya Ghar Installations',
    shortTitle: 'District 1st Place Award',
    category: 'Awards & Recognitions',
    issuingAuthority: 'District Administration & Renewable Energy Cell',
    registrationNumber: '1st Rank in District Execution',
    validity: 'District Excellence Award',
    date: '2025 – 2026',
    location: 'Bhawanipatna, Kalahandi, Odisha',
    badge: 'District First Place',
    imageSrc: '/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg',
    imageAlt: 'District First Place Award for Highest PM Surya Ghar Solar Installations',
    description:
      'Prestigious district award presented by the District Administration and Renewable Energy Cell for achieving the highest verified number of residential rooftop solar installations under PM Surya Ghar across Kalahandi district.',
    highlights: [
      '#1 District Rank in rooftop solar volume',
      'Direct District Administration & RE Cell honor',
      '100% verified beneficiary subsidy sanctions',
    ],
  },
];
