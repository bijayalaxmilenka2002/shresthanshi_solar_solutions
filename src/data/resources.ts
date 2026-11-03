import { ResourceArticle } from '../types';

export const resourceArticles: ResourceArticle[] = [
  {
    id: 'res-1',
    slug: 'solar-faqs',
    title: 'Solar FAQs: Essential Questions to Ask Before Going Solar',
    category: 'Fundamentals',
    readTime: '5 min read',
    imageSrc: '/images/solar/solar-site-assessment.jpg',
    excerpt:
      'A practical roundup of the most important questions homeowners, farmers, and business owners should clarify before committing to a solar installation.',
    keyTakeaways: [
      'Always start with your past 12 months of electricity bills or daily irrigation water demand.',
      'Understand the difference between grid-tied (on-grid), off-grid, and hybrid systems.',
      'Verify roof shadow patterns, sanctioned load limits, and official scheme eligibility upfront.',
    ],
    sections: [
      {
        heading: 'Why Good Questions Lead to Better Solar Systems',
        paragraphs: [
          'A solar installation is a long-term infrastructure investment. Whether you are installing panels on an independent house roof, a commercial shop, or an agricultural borewell in Odisha, the outcome depends on how carefully the system is matched to your site conditions.',
          'Rather than starting with a fixed kilowatt package, start by asking how your current energy consumption, roof geometry, and local grid behavior affect system design.',
        ],
        bullets: [
          'How many units (kWh) do I consume across summer, monsoon, and winter months?',
          'Is my roof or farmland completely free from tree and building shadows between 9 AM and 4 PM?',
          'Does my goal require daytime bill reduction (on-grid) or backup power during outages (hybrid/off-grid)?',
        ],
      },
      {
        heading: 'Documentation and After-Installation Clarity',
        paragraphs: [
          'Before finalizing any solar proposal, request a clear breakdown of module specifications, inverter type, mounting structure material, safety earthing, and net-metering or scheme paperwork responsibilities.',
        ],
      },
    ],
    relatedSolutionPath: '/resources/solar-faqs',
    relatedSolutionLabel: 'View Interactive Solar FAQs Page',
  },
  {
    id: 'res-2',
    slug: 'solar-system-sizing',
    title: 'Solar System Sizing: Matching Capacity to Your Actual Energy Needs',
    category: 'Cost & Sizing',
    readTime: '6 min read',
    imageSrc: '/images/solar/residential-rooftop.jpg',
    excerpt:
      'Learn how electricity consumption slabs, sanctioned load, and unshaded roof area work together to determine the right solar system size.',
    keyTakeaways: [
      'System size is driven by average daily kWh usage, usable roof area, and sanctioned load.',
      'Each 1 kW of rooftop solar typically requires 80–100 sq. ft. of shadow-free roof space.',
      'Oversizing or undersizing without bill analysis reduces financial clarity.',
    ],
    sections: [
      {
        heading: 'Step 1: Reviewing Your Utility Electricity Bills',
        paragraphs: [
          'Every electricity bill shows the number of kilowatt-hours (units) consumed per billing cycle. Because cooling loads in Odisha peak during summer months and drop during winter, reviewing a full year of bills gives an accurate monthly average.',
          'In general climatic conditions across Odisha, 1 kW of well-oriented, unshaded rooftop solar generates roughly 3.5 to 4.5 units per day on an annual average—though actual output varies by tilt, dust, and seasonal cloud cover.',
        ],
      },
      {
        heading: 'Step 2: Checking Roof Space and Sanctioned Load',
        paragraphs: [
          'Even if your electricity bill justifies a larger capacity, two physical and regulatory checks must align: your shadow-free roof area and the sanctioned load listed on your electricity connection.',
        ],
        bullets: [
          'Parapet walls, overhead water tanks, and staircase rooms cast moving shadows throughout the day.',
          'Elevated fabricated mounting structures can lift panels above low obstacles while keeping terrace space usable.',
          'Your local distribution utility (DISCOM) sets net-metering capacity rules relative to your sanctioned load.',
        ],
      },
    ],
    relatedSolutionPath: '/solar-solutions/residential-rooftop-solar',
    relatedSolutionLabel: 'Explore Residential Rooftop Solar',
  },
  {
    id: 'res-3',
    slug: 'solar-installation-costs',
    title: 'Solar Installation Costs: What Drives the Price of a Quality System',
    category: 'Cost & Sizing',
    readTime: '6 min read',
    imageSrc: '/images/for-your-home-solar.jpg',
    excerpt:
      'Understand the hardware, structural fabrication, safety protection, and site factors that determine the true cost of a solar installation.',
    keyTakeaways: [
      'Total cost depends on system type (on-grid vs. hybrid), structure height, and safety components.',
      'Cutting corners on mounting steel, DC cabling, or earthing compromises long-term safety.',
      'Compare proposals by complete bill-of-materials rather than headline price alone.',
    ],
    sections: [
      {
        heading: 'Core Cost Components of a Solar Installation',
        paragraphs: [
          'Two solar quotes of the same kilowatt rating can differ significantly in price depending on what goes into the system. Understanding the major cost buckets helps you compare proposals fairly.',
        ],
        bullets: [
          'Solar PV Modules: Cell technology (Mono PERC / TOPCon / Bi-facial) and DCR vs. non-DCR classification.',
          'Inverter & Controller: Standard on-grid string inverter versus hybrid inverter with battery charging capability.',
          'Mounting Structure: Low-profile rail mounts versus custom-fabricated elevated galvanized steel structures.',
          'Electrical Balance of System: ACDB/DCDB protection boxes, surge arresters, UV-resistant DC cables, and multiple chemical/GI earthing pits.',
        ],
      },
      {
        heading: 'Why Site Conditions Matter',
        paragraphs: [
          'Cable routing length between the roof and main distribution board, civil foundation blocks, and site accessibility also influence installation effort. A physical site assessment ensures there are no hidden surprises later.',
        ],
      },
    ],
    relatedSolutionPath: '/solar-solutions/commercial-solar',
    relatedSolutionLabel: 'Explore Commercial Solar Solutions',
  },
  {
    id: 'res-4',
    slug: 'solar-panels-on-cloudy-days',
    title: 'How Solar Panels Perform on Cloudy and Monsoon Days',
    category: 'Fundamentals',
    readTime: '4 min read',
    imageSrc: '/images/homeowners-rooftop-solar.jpg',
    excerpt:
      'What happens to your rooftop solar or agricultural water pump during overcast monsoon weather, and how annual sizing accounts for seasonal shifts.',
    keyTakeaways: [
      'Solar panels generate power from daylight (irradiance), not heat—so they still work in diffused light.',
      'Output during heavy overcast days is lower than on clear sunny afternoons.',
      'Rain naturally washes away surface dust, helping panels rebound strongly once skies clear.',
    ],
    sections: [
      {
        heading: 'Direct Sunlight vs. Diffused Daylight',
        paragraphs: [
          'A common misconception is that solar panels stop working completely when clouds cover the sun. In reality, photovoltaic cells respond to both direct sunlight and diffused daylight scattered through clouds.',
          'On lightly cloudy days, panels continue producing a meaningful portion of their rated output. During heavy monsoon downpours, instantaneous output drops, which is why grid-tied homes automatically draw supplemental power from the utility grid.',
        ],
      },
      {
        heading: 'Planning for Seasonal Variations in Odisha',
        paragraphs: [
          'For agricultural solar water pumps, monsoon rainfall simultaneously reduces irrigation demand while recharging groundwater tables. During dry pre-monsoon and post-monsoon months when crops need water most, solar irradiance is typically strong and consistent.',
        ],
      },
    ],
    relatedSolutionPath: '/solar-solutions',
    relatedSolutionLabel: 'Compare All Solar Solutions',
  },
  {
    id: 'res-5',
    slug: 'battery-storage',
    title: 'Battery Storage & Hybrid Solar: Do You Need Batteries?',
    category: 'Fundamentals',
    readTime: '5 min read',
    imageSrc: '/images/solar/commercial-rooftop.jpg',
    excerpt:
      'Compare standard on-grid net-metered solar against battery-backed hybrid solar systems to decide which setup fits your backup needs and budget.',
    keyTakeaways: [
      'On-grid systems offer the simplest design and lowest maintenance when grid power is stable.',
      'Hybrid systems add battery storage to keep essential loads running during power cuts.',
      'Batteries have a finite replacement lifecycle that should be factored into your budget.',
    ],
    sections: [
      {
        heading: 'When On-Grid Solar Is Sufficient',
        paragraphs: [
          'If your primary goal is lowering your monthly electricity bill and you already have a small home inverter for occasional brief outages, a standard on-grid rooftop solar system is usually the most cost-effective choice.',
          'Through net metering, excess solar electricity generated during the day is exported to the grid and credited against the power you draw at night.',
        ],
      },
      {
        heading: 'When Battery Storage Makes Sense',
        paragraphs: [
          'If your location experiences frequent or prolonged daytime and evening power outages—or if you run critical equipment in a rural clinic, office, or farmhouse—a hybrid solar system stores solar energy in batteries for uninterrupted use.',
        ],
        bullets: [
          'Separate essential backup loads (lights, fans, Wi-Fi, water pump) from heavy non-essential loads.',
          'Compare tubular lead-acid versus lithium-ferro-phosphate (LFP) battery lifespans and warranties.',
        ],
      },
    ],
    relatedSolutionPath: '/solar-solutions/residential-rooftop-solar',
    relatedSolutionLabel: 'Explore Residential Rooftop Solar',
  },
  {
    id: 'res-6',
    slug: 'pm-surya-ghar-guidance',
    title: 'PM Surya Ghar Guidance: Understanding Residential Rooftop Solar Assistance',
    category: 'Government Schemes',
    readTime: '6 min read',
    imageSrc: '/images/page-hero-solar-home.jpg',
    excerpt:
      'A clear overview of how residential rooftop solar subsidies work under PM Surya Ghar: Muft Bijli Yojana, eligibility criteria, and process steps.',
    keyTakeaways: [
      'Applicable strictly to residential electricity consumers with grid-connected rooftop systems.',
      'Requires registration on the official national portal, DISCOM feasibility, and DCR-compliant panels.',
      'Subsidy amounts are slab-based and disbursed after commissioning and net-meter inspection.',
    ],
    sections: [
      {
        heading: 'Who Qualifies for PM Surya Ghar Financial Assistance?',
        paragraphs: [
          'The PM Surya Ghar: Muft Bijli Yojana is a Government of India initiative designed to help residential households install grid-connected rooftop solar systems. Commercial, industrial, and off-grid battery-only setups are not covered under residential subsidy slabs.',
          'Eligibility requires an active residential electricity connection in the applicant’s name, sufficient roof ownership/access rights, and compliance with technical norms specified by the Ministry of New and Renewable Energy (MNRE) and the local electricity distribution company (DISCOM).',
        ],
      },
      {
        heading: 'Key Steps in the Official Process',
        paragraphs: [
          'Understanding the official sequence protects homeowners from misinformation and delays:',
        ],
        bullets: [
          'Step 1: Consumer registration on the official national rooftop solar portal using electricity consumer details.',
          'Step 2: Technical feasibility approval from the respective DISCOM based on sanctioned load and transformer capacity.',
          'Step 3: Installation using approved Domestic Content Requirement (DCR) solar modules and compliant inverters.',
          'Step 4: Joint inspection, bi-directional net-meter installation, and direct benefit transfer (DBT) claim processing.',
        ],
      },
    ],
    relatedSolutionPath: '/resources/subsidy-scheme-guidance',
    relatedSolutionLabel: 'Read Full Subsidy & Scheme Guidance',
  },
  {
    id: 'res-7',
    slug: 'solar-water-pumps-guide',
    title: 'Solar Water Pumps: A Practical Guide for Farmers & Rural Irrigation',
    category: 'Fundamentals',
    readTime: '6 min read',
    imageSrc: '/images/solar-pump-irrigation-field.jpg',
    excerpt:
      'How standalone solar water pumps work with borewells and surface water sources to provide dependable daytime irrigation without diesel expenses.',
    keyTakeaways: [
      'Matches solar PV panels directly to a submersible or surface water pump via an MPPT controller.',
      'Correct sizing depends on borewell water depth (total dynamic head) and daily water need.',
      'Also supports solar overhead water sensor pumps and community water filtration units.',
    ],
    sections: [
      {
        heading: 'How a Solar Water Pumping System Works',
        paragraphs: [
          'A standalone agricultural solar water pump converts sunlight into electricity through a ground-mounted solar array and feeds it through a variable-frequency / MPPT pump controller to run a water pump during daylight hours.',
          'Because water itself can be pumped directly to fields or stored in an overhead tank during sunny hours, expensive battery banks are generally not needed for farm irrigation.',
        ],
      },
      {
        heading: 'Matching the Pump to Your Borewell or Water Source',
        paragraphs: [
          'Having executed both borewell irrigation and solar water pump works across Kalahandi and Odisha, our team emphasizes that the pump must match your specific water source:',
        ],
        bullets: [
          'Submersible Solar Pumps: Installed deep inside borewells where the water table lies deeper underground.',
          'Surface Solar Pumps: Suitable for open wells, farm ponds, canals, or rivers where suction head is shallow.',
          'Automated Sensor Integration: Overhead storage systems can integrate water-level sensors to start and stop automatically.',
        ],
      },
    ],
    relatedSolutionPath: '/solar-solutions/solar-water-pumps',
    relatedSolutionLabel: 'Explore Solar Water Pumps',
  },
  {
    id: 'res-8',
    slug: 'pm-kusum-guidance',
    title: 'PM-KUSUM Guidance: Agricultural Solar Pump Schemes Explained',
    category: 'Government Schemes',
    readTime: '5 min read',
    imageSrc: '/images/agricultural-tubewell-borewell.jpg',
    excerpt:
      'Understand how agricultural solar pump assistance operates under PM-KUSUM and state nodal agencies, and how to avoid fraudulent portals.',
    keyTakeaways: [
      'PM-KUSUM supports solar agricultural pumps and feeder/grid solarization for eligible farmers.',
      'Applications are processed strictly through official state nodal agency portals during active windows.',
      'Landholding records, water source verification, and beneficiary contribution rules apply.',
    ],
    sections: [
      {
        heading: 'Overview of Agricultural Solar Scheme Support',
        paragraphs: [
          'The Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) aims to support farmers in installing standalone solar agricultural water pumps and reducing dependence on diesel and rural grid subsidies.',
          'In Odisha and across India, implementation is managed through designated state nodal agencies (such as OREDA / Agriculture & Horticulture departments) subject to annual capacity allocations and active application windows.',
        ],
      },
      {
        heading: 'Staying Informed and Avoiding Misleading Claims',
        paragraphs: [
          'Farmers should always verify whether an official government application window is open and never transfer money to unverified third-party websites claiming instant subsidy allotment.',
        ],
        bullets: [
          'Keep land record documents (Record of Rights / Patta), identity proof, and bank details ready.',
          'Verify whether your borewell or water source meets the depth and technical norms of the scheme.',
          'Consult our team for straightforward technical guidance on pump sizing and borewell readiness.',
        ],
      },
    ],
    relatedSolutionPath: '/resources/subsidy-scheme-guidance',
    relatedSolutionLabel: 'View Subsidy & Scheme Guidance',
  },
  {
    id: 'res-9',
    slug: 'solar-installer-selection',
    title: 'How to Choose a Solar Installer: 7 Practical Criteria',
    category: 'Operations & Care',
    readTime: '5 min read',
    imageSrc: '/images/existing/FBR-1.jpg',
    excerpt:
      'What to look for in a solar partner—from local field presence and structural fabrication quality to honest sizing and post-commissioning support.',
    keyTakeaways: [
      'Look for an installer who inspects your site and electricity bills before quoting.',
      'Evaluate mounting structure fabrication quality, earthing standards, and cable protection.',
      'Local presence in Odisha ensures accessible support long after commissioning.',
    ],
    sections: [
      {
        heading: 'Look Beyond the Lowest Per-Kilowatt Price',
        paragraphs: [
          'A solar system remains on your roof or farmland for 20+ years. Choosing an installer solely on the lowest headline quote often leads to thin mounting structures, undersized cables, poor earthing, or unresponsive service when an inverter fault occurs.',
        ],
        bullets: [
          'Site-First Assessment: Does the team measure your roof, shadow angles, or borewell depth first?',
          'Structural Fabrication Strength: Are mounting structures properly fabricated and corrosion-protected?',
          'Electrical Safety: Are DC/AC surge protectors, lightning arresters, and earthing pits clearly specified?',
          'Local Accountability: Does the firm have a verifiable registered office, GSTIN, and local service footprint?',
        ],
      },
    ],
    relatedSolutionPath: '/about',
    relatedSolutionLabel: 'Learn About Shreshtanshi Construction & Suppliers',
  },
  {
    id: 'res-10',
    slug: 'solar-maintenance-guide',
    title: 'Solar Maintenance Guide: Keeping Panels, Inverters & Pumps Efficient',
    category: 'Operations & Care',
    readTime: '5 min read',
    imageSrc: '/images/solar/solar-maintenance.jpg',
    excerpt:
      'Simple preventive care routines and periodic technical inspections that protect your solar generation and water pump output year after year.',
    keyTakeaways: [
      'Clean solar panels with soft water during early morning or evening hours—never when glass is hot.',
      'Check mounting bolts, earthing pits, and cable conduits before and after monsoon season.',
      'Schedule professional diagnostics if generation or water flow drops unexpectedly.',
    ],
    sections: [
      {
        heading: 'Safe Solar Panel Cleaning Practices',
        paragraphs: [
          'Dust, pollen, and bird droppings block sunlight from reaching solar cells and can reduce generation by 10% to 25% during dry months. Regular gentle cleaning restores full light transmission.',
        ],
        bullets: [
          'Clean panels early in the morning or late in the evening when the glass surface is cool to prevent thermal shock.',
          'Use clean water and a soft sponge or nylon brush—never use abrasive metal scrubbers or harsh detergents.',
          'Never walk or stand on solar modules, as body weight causes invisible micro-cracks in silicon cells.',
        ],
      },
      {
        heading: 'Periodic Electrical and Mechanical Checks',
        paragraphs: [
          'Beyond surface cleaning, having a qualified technician inspect MC4 connectors, DC/AC isolator switches, earthing resistance, structure fasteners, and solar pump sensor wiring once or twice a year prevents minor wear from turning into downtime.',
        ],
      },
    ],
    relatedSolutionPath: '/solar-solutions/solar-maintenance-support',
    relatedSolutionLabel: 'Explore Solar Maintenance & Support',
  },
];

