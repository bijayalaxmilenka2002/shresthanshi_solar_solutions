import { AudienceProfile, SolarSolution } from '../types';
import { companyConfig } from './company';

const allSolarSolutions: SolarSolution[] = [
  {
    id: 'residential-rooftop-solar',
    slug: 'residential-rooftop-solar',
    title: 'Residential Rooftop Solar',
    shortTitle: 'Residential Solar',
    path: '/solar-solutions/residential-rooftop-solar',
    tagline: 'Custom rooftop solar sized for your household bills and unshaded terrace space.',
    summary:
      'Generate clean daytime power on your home roof with on-grid or hybrid solar tailored to your utility load.',
    image: '[Image: rooftop solar installation]',
    audience: 'Homeowners & Families',
    keyHighlights: [
      'Sized from your monthly kWh bills',
      'Shadow-free RCC & terrace assessment',
      'PM Surya Ghar & net-metering guidance',
      'Sturdy galvanized mounting frames',
    ],
    components: [
      {
        name: 'Solar PV Modules',
        description: 'High-efficiency monocrystalline or bi-facial panels matched to your roof area.',
      },
      {
        name: 'On-Grid or Hybrid Inverter',
        description: 'Converts rooftop DC power into household AC power synchronized with the grid.',
      },
      {
        name: 'Galvanized Mounting Structure',
        description: 'Corrosion-resistant low-profile or elevated frames built for Odisha wind loads.',
      },
      {
        name: 'Safety & Protection Kit',
        description: 'AC/DC distribution boxes, surge protection, earthing pits, and lightning arresters.',
      },
    ],
    suitabilityFactors: [
      {
        title: 'Monthly Bill History',
        detail: 'Past 6–12 utility bills establish your daytime load and seasonal peak usage.',
      },
      {
        title: 'Shadow-Free Roof Area',
        detail: 'Approx. 80–100 sq. ft. per kW of unshaded terrace space between 9 AM and 4 PM.',
      },
      {
        title: 'Sanctioned Meter Load',
        detail: 'Single-phase or three-phase meter capacity guides permissible system size.',
      },
      {
        title: 'Grid vs. Battery Backup',
        detail: 'On-grid systems lower monthly bills; hybrid systems add battery backup for outages.',
      },
    ],
    processNote: 'Every home proposal starts with a quick bill and roof check.',
    subsidyNote:
      'PM Surya Ghar: Muft Bijli Yojana applies to eligible residential consumers using approved DCR modules, DISCOM feasibility approval, and official portal registration.',
    ctaLabel: 'Explore Residential Solar',
  },
  {
    id: 'commercial-solar',
    slug: 'commercial-solar',
    title: 'Commercial Solar',
    shortTitle: 'Commercial Solar',
    path: '/solar-solutions/commercial-solar',
    tagline: 'Daytime solar power for shops, offices, workshops, mills, and institutions.',
    summary:
      'Offset peak daytime commercial electricity tariffs by converting idle RCC or metal-sheet roofs into productive power assets.',
    image: '[Image: commercial solar installation]',
    audience: 'Businesses & Institutions',
    keyHighlights: [
      'Aligned with 9 AM – 6 PM working loads',
      'RCC slab & industrial metal shed mounts',
      'Three-phase inverter & safety design',
      'Clear capacity and cost planning',
    ],
    components: [
      {
        name: 'Commercial PV Array',
        description: 'High-wattage solar modules arranged for maximum output per square meter.',
      },
      {
        name: 'Three-Phase String Inverters',
        description: 'Multi-MPPT commercial inverters with remote generation monitoring.',
      },
      {
        name: 'RCC or Shed Mounting',
        description: 'Custom-fabricated ballast, anchored, or standing-seam rail structures.',
      },
      {
        name: 'LT Panel & Safety Interface',
        description: 'Three-phase ACDB/DCDB, earthing pits, lightning protection, and net-meter readiness.',
      },
    ],
    suitabilityFactors: [
      {
        title: 'Daytime Working Load',
        detail: 'Direct daytime consumption delivers the strongest reduction in utility grid draw.',
      },
      {
        title: 'Roof Type & Strength',
        detail: 'Flat concrete slabs and sloped industrial metal sheds use distinct mounting hardware.',
      },
      {
        title: 'Contract Demand',
        detail: 'System capacity is matched to your sanctioned load and utility tariff category.',
      },
      {
        title: 'Safe Access & Walkways',
        detail: 'Array layouts preserve safe walkways for routine panel cleaning and inspection.',
      },
    ],
    processNote: 'We inspect your electrical panel, daytime load, and roof layout before quoting.',
    subsidyNote:
      'Commercial installations rely on direct daytime tariff savings and applicable tax/depreciation norms rather than residential consumer subsidies.',
    ctaLabel: 'Explore Commercial Solar',
  },
  {
    id: 'solar-water-pumps',
    slug: 'solar-water-pumps',
    title: 'Solar Water Pumps',
    shortTitle: 'Solar Water Pumps',
    path: '/solar-solutions/solar-water-pumps',
    tagline: 'Solar water pump panels, overhead sensor pumps, and borewell irrigation for Odisha farms.',
    summary:
      'Solar panels generate DC power converted by a solar pump controller to drive agricultural and community water pumps, with dual-mode daytime solar and electric operation.',
    image: '[Image: solar water pump in a farm]',
    audience: 'Farmers & Rural Communities',
    keyHighlights: [
      'Zero diesel cost during daytime irrigation',
      'Combined borewell & solar pump expertise',
      'Submersible & surface pump options',
      'Overhead sensor & community water units',
    ],
    components: [
      {
        name: 'Ground-Mounted PV Array',
        description: 'Solar panels on sturdy galvanized steel frames placed in unshaded farmland.',
      },
      {
        name: 'Submersible or Surface Pump',
        description: 'AC/DC solar pump sized to borewell depth, water table, and daily discharge needs.',
      },
      {
        name: 'MPPT Controller & Sensors',
        description: 'Weatherproof controller with dry-run protection and overhead tank level sensors.',
      },
      {
        name: 'Borewell & Piping Works',
        description: 'Column pipes, safety cables, earthing, and civil foundation works.',
      },
    ],
    suitabilityFactors: [
      {
        title: 'Water Source & Depth',
        detail: 'Borewell depth, open well level, or pond suction head determines pump type.',
      },
      {
        title: 'Irrigated Acreage',
        detail: 'Pump HP and panel wattage are matched to seasonal crop water demand.',
      },
      {
        title: 'Shadow-Free Field Spot',
        detail: 'Panel frames are sited near the borewell away from tree or structure shade.',
      },
      {
        title: 'Delivery Method',
        detail: 'Supports direct field channels, drip/sprinkler lines, or overhead storage tanks.',
      },
    ],
    processNote: 'We evaluate groundwater depth and solar pump capacity together.',
    subsidyNote:
      'Agricultural schemes such as PM-KUSUM operate through official state nodal agency portal windows, landholding verification, and scheme guidelines.',
    ctaLabel: 'Explore Solar Water Pumps',
  },
  {
    id: 'solar-street-lighting',
    slug: 'solar-street-lighting',
    title: 'Solar Street Lighting Systems',
    shortTitle: 'Solar Street Lighting',
    path: '/solar-solutions/solar-street-lighting',
    tagline: 'Autonomous dusk-to-dawn outdoor LED street lighting with integrated battery storage.',
    summary:
      'Supply, structural fabrication, and erection of standalone raised solar LED street lights. Engineered with high-efficiency photovoltaic panels, intelligent dusk-to-dawn sensors, IP66-rated luminaires, and elevated anti-theft battery enclosures.',
    image: '[Image: solar street light system]',
    audience: 'Gram Panchayats, Institutions & Campuses',
    keyHighlights: [
      'Dusk-to-dawn automatic lux sensor switching',
      'Hot-dip galvanized steel poles (4m–7m) with anti-theft battery box',
      'IP65/IP66 weather-resistant high-lumen LED luminaire',
      'Autonomous solar operation — zero recurring electric bills',
    ],
    components: [
      {
        name: 'Solar Photovoltaic Module',
        description: 'High-efficiency monocrystalline or polycrystalline solar panel with durable anodized aluminum frame.',
      },
      {
        name: 'High-Lumen LED Luminaire',
        description: 'Durable die-cast aluminum housing with IP65/IP66 waterproof rating and optical wide-beam lens.',
      },
      {
        name: 'Intelligent Solar Charge Controller',
        description: 'Microcontroller-based PWM/MPPT unit with automatic dusk-to-dawn switching and multi-stage dimming.',
      },
      {
        name: 'Deep-Cycle Battery Storage',
        description: 'Long-life LiFePO4 lithium iron phosphate or tubular gel battery housed in elevated tamper-resistant cage.',
      },
      {
        name: 'Hot-Dip Galvanized Pole & Foundation',
        description: '4m to 7m tubular or octagonal steel pole with corrosion-resistant galvanizing and anchor civil bolts.',
      },
    ],
    suitabilityFactors: [
      {
        title: 'Road Width & Luminaire Wattage',
        detail: '12W, 18W, 24W, 30W, or 45W LED luminaires matched to road width, pole spacing, and lux requirements.',
      },
      {
        title: 'Pole Height & Placement',
        detail: '4-meter poles for narrow village pathways and 6-7 meter poles for wider village main roads and junctions.',
      },
      {
        title: 'Cloudy Day Autonomy',
        detail: 'Battery bank sized to maintain 2 to 3 consecutive nights of illumination during monsoon or overcast weather.',
      },
      {
        title: 'Anti-Theft & Security',
        detail: 'Elevated battery box positioned high on the pole with tamper-proof mechanical locking hardware.',
      },
    ],
    processNote: 'We evaluate site layout, road width, and required pole spacing to provide a detailed bill of materials.',
    subsidyNote:
      'Street lighting projects can be funded through Gram Panchayat 15th Finance Commission grants, CSR funds, and local infrastructure development schemes.',
    ctaLabel: 'Explore Solar Street Lighting',
  },
  {
    id: 'solar-maintenance-support',
    slug: 'solar-maintenance-support',
    title: 'Solar Maintenance & Support',
    shortTitle: 'Maintenance & Support',
    path: '/solar-solutions/solar-maintenance-support',
    tagline: 'Routine inspection, cleaning, and servicing for panels, inverters, and pumps.',
    summary:
      'Keep your rooftop solar array or agricultural water pump operating safely and efficiently across every season. [Placeholder: Client to confirm specific AMC packages if applicable]',
    image: '[Image: solar panel inspection and maintenance]',
    audience: 'Existing Solar Owners',
    keyHighlights: [
      'Module cleaning & hotspot checks',
      'Inverter, controller & cable diagnostics',
      'Earthing & lightning safety checks',
      'Solar pump & sensor troubleshooting',
    ],
    components: [
      {
        name: 'Panel Surface Care',
        description: 'Safe dust removal and visual inspection for shading or junction wear.',
      },
      {
        name: 'Electrical & Inverter Check',
        description: 'String voltage testing, fault log review, and AC/DC isolator inspection.',
      },
      {
        name: 'Earthing & Structure Check',
        description: 'Verification of earth resistance, lightning arresters, and mounting bolt torque.',
      },
      {
        name: 'Pump & Sensor Servicing',
        description: 'Checking pump water discharge, controller health, and automatic level sensors.',
      },
    ],
    suitabilityFactors: [
      {
        title: 'Lower Generation Output',
        detail: 'Identifies why monthly bill savings or water flow have dropped.',
      },
      {
        title: 'High-Dust Locations',
        detail: 'Farms and roadside buildings benefit from scheduled periodic cleaning.',
      },
      {
        title: 'Seasonal Monsoon Checks',
        detail: 'Pre- and post-monsoon checks protect structures, conduits, and earthing.',
      },
      {
        title: 'Community Installations',
        detail: 'Keeps solar street lights, water filters, and sensor pumps working reliably.',
      },
    ],
    processNote: 'Share your existing system capacity and location to schedule a check.',
    subsidyNote: 'Maintenance is an operational support service tailored to your site.',
    ctaLabel: 'Explore Maintenance',
    isMaintenance: true,
  },
];

export const getSolarSolutions = (): SolarSolution[] => {
  if (companyConfig.features.confirmMaintenanceServicesOffered) {
    return allSolarSolutions;
  }
  return allSolarSolutions.filter((s) => !s.isMaintenance);
};

export const audienceProfiles: AudienceProfile[] = [
  {
    id: 'homeowners',
    slug: 'homeowners',
    title: 'Homeowners',
    path: '/who-we-serve/homeowners',
    headline: 'Rooftop Solar for Independent Homes',
    subtitle:
      'Lower your monthly daytime electricity bills with a clean rooftop solar system sized for your terrace and household load.',
    image: '[Image: rooftop solar installation]',
    imageSrc: '/images/homeowners-rooftop-solar.jpg',
    challengeTitle: 'Home Energy Challenges We Solve',
    challenges: [
      'Rising monthly electricity bills from cooling and household appliances',
      'Unsure how much shadow-free terrace space is needed',
      'Choosing between on-grid bill savings and hybrid battery backup',
      'Understanding genuine PM Surya Ghar subsidy steps',
    ],
    recommendedSolutions: [
      {
        title: 'Residential Rooftop Solar',
        description: 'Custom-sized rooftop solar matched to your past 12 months of electricity bills.',
        path: '/solar-solutions/residential-rooftop-solar',
      },
      {
        title: 'Solar Maintenance & Support',
        description: 'Periodic panel care, electrical safety checks, and structure inspection.',
        path: '/solar-solutions/solar-maintenance-support',
      },
    ],
    considerations: [
      {
        title: 'Shadow-Free Terrace',
        description: 'Checking unshaded roof area between 9 AM and 4 PM while keeping usable space.',
      },
      {
        title: 'Sanctioned Meter Load',
        description: 'Matching inverter capacity with your utility meter and net-metering rules.',
      },
      {
        title: 'Clear Cost & Subsidy Steps',
        description: 'Itemized hardware pricing and transparent PM Surya Ghar portal guidance.',
      },
    ],
    ctaText: 'Get a Solar Assessment',
  },
  {
    id: 'farmers',
    slug: 'farmers',
    title: 'Farmers',
    path: '/who-we-serve/farmers',
    headline: 'Solar Water Pumping & Borewell Irrigation',
    subtitle:
      'Irrigate crops reliably during daylight hours without recurring diesel costs or rural grid voltage issues.',
    image: '[Image: solar water pump in a farm]',
    imageSrc: '/images/farmers-solar-pumping.jpg',
    challengeTitle: 'Farm Irrigation Challenges We Solve',
    challenges: [
      'High diesel fuel expenses for running irrigation pumps',
      'Low voltage and erratic power timings on agricultural feeders',
      'Matching pump horsepower to borewell depth and water table',
      'Clear guidance on PM-KUSUM and state agricultural schemes',
    ],
    recommendedSolutions: [
      {
        title: 'Solar Water Pumps',
        description: 'Submersible and surface solar pumps sized to your borewell depth and acreage.',
        path: '/solar-solutions/solar-water-pumps',
      },
      {
        title: 'Solar Maintenance & Support',
        description: 'Field servicing for solar pump arrays, controllers, and water level sensors.',
        path: '/solar-solutions/solar-maintenance-support',
      },
    ],
    considerations: [
      {
        title: 'Borewell Depth & Head',
        description: 'Selecting submersible or surface pumps based on groundwater depth.',
      },
      {
        title: 'Seasonal Crop Demand',
        description: 'Sizing daily water output for kharif and rabi cultivation cycles.',
      },
      {
        title: 'Field-Ready Structures',
        description: 'Galvanized mounting frames built for rural weather conditions in Odisha.',
      },
    ],
    ctaText: 'Get a Solar Assessment',
  },
  {
    id: 'businesses-institutions',
    slug: 'businesses-institutions',
    title: 'Businesses & Institutions',
    path: '/who-we-serve/businesses-institutions',
    headline: 'Daytime Solar Power for Commercial Sites',
    subtitle:
      'Reduce daytime operating costs across shops, offices, workshops, schools, and community buildings.',
    image: '[Image: commercial solar installation]',
    imageSrc: '/images/for-your-business-solar.jpg',
    challengeTitle: 'Commercial Energy Priorities We Address',
    challenges: [
      'High commercial electricity tariffs during daytime working hours',
      'Continuous daytime loads from lighting, cooling, computers, or machinery',
      'Unused RCC or industrial metal-sheet rooftops exposed to sun',
      'Need for clear technical specs, safety compliance, and payback clarity',
    ],
    recommendedSolutions: [
      {
        title: 'Commercial Solar',
        description: 'Three-phase rooftop and shed-mounted solar systems built for daytime loads.',
        path: '/solar-solutions/commercial-solar',
      },
      {
        title: 'Solar Water & Street Lighting',
        description: 'Overhead water sensor pumps, community filtration units, and solar street lights.',
        path: '/solar-solutions/solar-water-pumps',
      },
    ],
    considerations: [
      {
        title: 'Load vs. Roof Area',
        description: 'Aligning daytime kilowatt demand with available RCC or metal shed space.',
      },
      {
        title: 'Structural & Electrical Safety',
        description: 'Wind-safe mounting frames, earthing pits, and surge protection.',
      },
      {
        title: 'Smooth Site Execution',
        description: 'Planned installation schedules that avoid disrupting daily business.',
      },
    ],
    ctaText: 'Get a Solar Assessment',
  },
];
