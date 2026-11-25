/**
 * Verified business configuration for Shreshtanshi Construction & Suppliers
 * Source: https://shresthanshi.com/ and Client Requirements Brief
 *
 * Unverified or client-confirmable fields are marked as explicit placeholders
 * so they can be completed without modifying component templates.
 */
export const companyConfig = {
  name: 'Shresthanshi Solar Solutions',
  legalName: 'M/s Shreshtanshi Construction & Suppliers (Shresthanshi Solar Solutions)',
  shortName: 'Shresthanshi Solar',
  proprietor: 'Mrs. Sinjita Shikha Mohapatra',
  tagline: 'Turnkey Solar Energy & Solar Water Pumping Solutions in Odisha',
  gstin: '21AVUPM9359D1Z6',
  websiteUrl: 'https://shresthanshi.com',

  // Contact Details (Primary: 9937000624, Secondary: 9438080874)
  contact: {
    primaryPhone: '9937000624',
    primaryPhoneDisplay: '+91 99370 00624',
    primaryPhoneHref: 'tel:+919937000624',
    secondaryPhone: '9438080874',
    secondaryPhoneDisplay: '+91 9438-080-874',
    secondaryPhoneHref: 'tel:+919438080874',
    // Default compatibility alias
    phoneDisplay: '+91 99370 00624',
    phoneHref: 'tel:+919937000624',
    whatsappHref: 'https://wa.me/919937000624',
    email: 'shresthanshi@gmail.com',
    emailHref: 'mailto:shresthanshi@gmail.com',
    primaryLocation: 'Kalahandi, Odisha (Head Office)',
    subBranchLocation: 'Bhubaneswar, Odisha (Sub-Branch)',
    existingDepartment: 'Head Office: Plot No- 406, Khata No- 225/51, Sargiguda, Narla Road, Kalahandi, Odisha – 766110',
    address: {
      line1: 'Plot No- 406, Khata No- 225/51, Sargiguda, Narla Road',
      line2: 'Sub-Branch Office: Bhubaneswar, Odisha',
      city: 'Kalahandi',
      state: 'Odisha',
      pincode: '766110',
      country: 'India',
      full: 'Head Office: Plot No- 406, Khata No- 225/51, Sargiguda, Narla Road, Kalahandi, Odisha – 766110 • Sub-Branch Office: Bhubaneswar, Odisha',
    },
    workingHours: '24/7 Technical Support & Field Assistance',
    confirmationNote: 'Registered Enterprise (GSTIN: 21AVUPM9359D1Z6).',
  },

  // Social Media Profiles (Connect With Us)
  social: {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    youtube: 'https://www.youtube.com',
  },

  // Major Achievements & Installation Milestones
  achievements: {
    pmSuryaGhar: {
      count: '350+',
      period: '2 Years',
      heading: 'Powering Homes with Solar Energy',
      description:
        'With 350+ successful PM Surya Ghar rooftop solar installations in just two years, Shreshtanshi Solar Solutions is helping households transition towards clean, affordable, and sustainable energy.',
      stats: [
        { label: 'Successful Installations', value: '350+' },
        { label: 'Years of Achievement', value: '2 Years' },
      ],
    },
    utilityAggregation: {
      period: '1 Year',
      heading: 'Utility-Led Aggregation',
      description:
        'Delivering reliable solar energy solutions through Utility-Led Aggregation, supporting household adoption of clean and sustainable electricity.',
      stats: [
        { label: 'Utility Execution Record', value: '1st Year' },
        { label: 'Household Aggregation', value: 'Verified Partner' },
      ],
    },
  },

  // Government & Institutional Collaborations
  governmentSectors: [
    {
      id: 'agro-odisha',
      name: 'Agro Odisha',
      title: 'Agricultural Sector Solar Solutions',
      summary:
        'Partnering with agricultural initiatives across Odisha to empower farmers with solar irrigation, borewell pumping, and subsidy-supported sustainable agriculture.',
      services: [
        'Agricultural Solar Water Pumping (DC/AC Hybrid)',
        'Micro-Irrigation & Sprinkler Integration',
        'PM-KUSUM Scheme Guidance & Empaneled Supply',
        'Farmland Feasibility & Soil Water Table Analysis',
      ],
      image: '/images/government/solar-irrigation-agro.jpg',
    },
    {
      id: 'forest-department',
      name: 'Forest Department',
      title: 'Forestry & Environmental Solar Infrastructure',
      summary:
        'Delivering specialized solar infrastructure for wildlife protection, forest nursery management, and eco-sensitive habitat conservation across Odisha.',
      services: [
        {
          name: 'Solar Water Pumps',
          description:
            'Solar-powered water pumping solutions for forest water bodies, nurseries, and wildlife water management requirements.',
          image: '/images/government/solar-water-pump-forest.jpg',
        },
        {
          name: 'Solar Irrigation Systems',
          description:
            'Solar-powered irrigation solutions to support agricultural, plantation, and nursery activities in fringe forest areas.',
          image: '/images/government/solar-irrigation-agro.jpg',
        },
        {
          name: 'Plantation Support',
          description:
            'Solar-powered infrastructure supporting large-scale afforestation, sapling nurturing, and plantation activities.',
          image: '/images/government/solar-plantation-support.jpg',
        },
        {
          name: 'Solar Fencing for Elephant Protection',
          description:
            'Non-lethal solar fencing solutions designed to prevent elephant movement into vulnerable human settlements and agricultural farmland, mitigating human-wildlife conflict.',
          image: '/images/government/solar-fencing-elephant-protection.jpg',
        },
      ],
    },
  ],

  features: {
    confirmMaintenanceServicesOffered: true,
  },

  // Verified Leadership & Founder Details
  founder: {
    name: 'Mrs. Sinjita Shikha Mohapatra',
    role: 'Proprietor, M/s Shresthanshi Construction & Suppliers',
    additionalRole: 'Director, Arch Exotic Private Limited, Bhubaneswar',
    hometown: 'Bhawanipatna, Kalahandi, Odisha',
    education: [
      "Master's in Business Administration (MBA) — BPUT",
      'Bachelor Degree — Bhawanipatna Government College',
      'Schooling at Bhawanipatna, Kalahandi',
      'Expertise: Solar Street Light, Solar Water Pump Panel, Borewell Irrigation & Fabrication',
    ],
    image: '[Image: proprietor portrait — Mrs. Sinjita Shikha Mohapatra]',
    imageSrc: '/images/existing/SINJITA.jpeg',
    bioParagraphs: [
      'Mrs. Sinjita Shikha Mohapatra is the Proprietor of M/s Shresthanshi Construction & Suppliers and Director at Arch Exotic Private Limited. An MBA graduate from BPUT and a native of Bhawanipatna, she established the enterprise to bring reliable clean energy and infrastructure directly to Kalahandi and Odisha.',
      'Under her leadership, the company empowers rural livelihoods through agricultural solar pumps, rooftop solar installations, and community awareness initiatives while creating meaningful local employment.',
    ],
  },

  // Verified Existing Service Footprint
  verifiedCapabilities: [
    {
      title: 'Solar Rooftop & Power Plants',
      description:
        'Residential rooftop solar systems and commercial three-phase grid-tied solar plants across Odisha.',
      coreSolar: true,
      imageLabel: '[Image: rooftop solar installation]',
      imageSrc: '/images/homeowners-rooftop-solar.jpg',
    },
    {
      title: 'Solar Agricultural Water Pumping',
      description:
        'Dual-mode solar water pump panels, DC-to-AC controllers, and automated irrigation pumping.',
      coreSolar: true,
      imageLabel: '[Image: solar water pump in a farm]',
      imageSrc: '/images/agricultural-tubewell-borewell.jpg',
    },
    {
      title: 'Solar Overhead Sensor Pumping & Filtration',
      description:
        'Automated water-level float sensor pumping and community drinking water filtration units.',
      coreSolar: true,
      imageLabel: '[Image: solar overhead sensor pump and elevated tank]',
      imageSrc: '/images/rural-water-pipeline-distribution.jpg',
    },
    {
      title: 'Solar Street Lighting Systems',
      description:
        'Raised standalone solar LED street light units with dusk-to-dawn sensors and battery backup for rural roads.',
      coreSolar: true,
      imageLabel: '[Image: solar street light unit]',
      imageSrc: '/images/solar/solar-street-light-road.jpg',
    },
  ],
};
