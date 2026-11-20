export interface NavSubItem {
  label: string;
  path: string;
  description?: string;
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavSubItem[];
}

export interface SolarSolution {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  path: string;
  tagline: string;
  summary: string;
  image: string;
  imageSrc?: string;
  audience: string;
  keyHighlights: string[];
  components: {
    name: string;
    description: string;
  }[];
  suitabilityFactors: {
    title: string;
    detail: string;
  }[];
  processNote: string;
  subsidyNote: string;
  ctaLabel: string;
  isMaintenance?: boolean;
}

export interface AudienceProfile {
  id: string;
  slug: string;
  title: string;
  path: string;
  headline: string;
  subtitle: string;
  image: string;
  imageSrc?: string;
  challengeTitle: string;
  challenges: string[];
  recommendedSolutions: {
    title: string;
    description: string;
    path: string;
  }[];
  considerations: {
    title: string;
    description: string;
  }[];
  ctaText: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category:
    | 'Solar Water Pumping'
    | 'Solar Street Lighting & Community'
    | 'Rooftop & Institutional Solar'
    | 'Solar Street Lighting'
    | 'Commercial Rooftop Solar'
    | 'Residential Rooftop Solar'
    | 'Borewell & Rural Infrastructure';
  location: string;
  district: string;
  description: string;
  scope: string[];
  image: string;
  imageSrc?: string;
  verifiedSource: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Solar Solutions' | 'Agricultural Pumping' | 'Community Infrastructure' | 'Field Operations';
  location: string;
  caption: string;
  image: string;
  imageSrc?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'residential' | 'commercial' | 'agricultural' | 'subsidy' | 'maintenance';
}

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Fundamentals' | 'Cost & Sizing' | 'Government Schemes' | 'Operations & Care';
  readTime: string;
  imageSrc?: string;
  excerpt: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  relatedSolutionPath: string;
  relatedSolutionLabel: string;
}

export interface CompanyService {
  id: string;
  slug: string;
  title: string;
  category:
    | 'Rooftop Solar'
    | 'Commercial Solar'
    | 'Solar Water Pumps'
    | 'Solar Street Lighting'
    | 'Solar Maintenance'
    | 'Solar Energy';
  tagline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  keyFeatures: string[];
  specsOrHighlight: string;
  targetClients: string;
  actionPath: string;
  actionText: string;
}

