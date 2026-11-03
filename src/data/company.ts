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
  proprietor: 'Mr. Shubham Pratap Singh',
  tagline: 'Turnkey Solar Energy & Solar Water Pumping Solutions in Odisha',
  gstin: '21AVUPM9359D1Z6',
  websiteUrl: 'https://shresthanshi.com',

  // Verified Contact Details from shresthanshi.com
  contact: {
    phoneDisplay: '+91 9438-080-874',
    phoneHref: 'tel:+919438080874',
    whatsappHref: 'https://wa.me/919438080874',
    email: 'shresthanshi@gmail.com',
    emailHref: 'mailto:shresthanshi@gmail.com',
    address: {
      line1: 'Plot No-406, Khata No-225/51',
      line2: 'Sargiguda, Narla Road',
      city: 'Kalahandi',
      state: 'Odisha',
      pincode: '766110',
      country: 'India',
      full: 'Plot No-406, Khata No-225/51, Sargiguda, Narla Road, Kalahandi, Odisha – 766110',
    },
    workingHours: '24/7 Working Hours (as listed on shresthanshi.com)',
    confirmationNote: 'Verified from shresthanshi.com (GSTIN: 21AVUPM9359D1Z6).',
  },

  features: {
    confirmMaintenanceServicesOffered: true,
  },

  // Verified Leadership & Founder Details (Strictly from shresthanshi.com)
  founder: {
    name: 'Mrs. Sinjita Shikha Mohapatra',
    role: 'Proprietor, M/s Shreshtanshi Construction & Suppliers',
    additionalRole: 'Director, Arch Exotic Private Limited, Bhubaneswar',
    hometown: 'Bhawanipatna, Kalahandi, Odisha',
    education: [
      'MBA — Biju Patnaik University of Technology (BPUT), Odisha',
      'Bachelor’s Degree — Government College, Bhawanipatna, Kalahandi',
      'Schooling — Bhawanipatna, Kalahandi',
    ],
    image: '[Image: founder portrait — Mrs. Sinjita Shikha Mohapatra]',
    imageSrc: '/images/existing/SINJITA.jpeg',
    originalSitePhotoUrl: 'https://shresthanshi.com/assets/images/SINJITA.jpeg',
    bioParagraphs: [
      'Mrs. Sinjita Shikha Mohapatra is the Proprietor of M/s Shreshtanshi Construction & Suppliers and Director of Arch Exotic Private Limited, Bhubaneswar. A native of Bhawanipatna, Kalahandi, she completed her schooling in Bhawanipatna, earned her Bachelor’s degree from Bhawanipatna Government College, and holds an MBA from BPUT.',
      'Driven by her commitment to work for Kalahandi and Odisha, she established her enterprise to deliver high-performance solar water pump panels, solar overhead water sensor pumps, community drinking water filtration units, residential & commercial rooftop solar plants, and solar street lighting installations across Odisha.',
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
