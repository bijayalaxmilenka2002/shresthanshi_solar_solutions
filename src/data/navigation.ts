import { NavItem } from '../types';
import { companyConfig } from './company';

export const getPrimaryNavigation = (): NavItem[] => {
  const serviceChildren = [
    {
      label: 'All Solar Services',
      path: '/services',
      description: 'Turnkey solar engineering, rooftop systems, solar water pumps, and street lighting.',
    },
    {
      label: 'Residential Rooftop Solar',
      path: '/solar-solutions/residential-rooftop-solar',
      description: 'Turnkey on-grid and hybrid solar installations for independent homes with PM Surya Ghar assistance.',
    },
    {
      label: 'Commercial Solar Plants',
      path: '/solar-solutions/commercial-solar',
      description: 'Three-phase rooftop solar power systems for shops, offices, rice mills, and institutions.',
    },
    {
      label: 'Solar Water Pumps',
      path: '/solar-solutions/solar-water-pumps',
      description: 'Dual-mode DC/AC solar pumping and irrigation controllers for farms across Odisha.',
    },
    {
      label: 'Solar Street Lighting',
      path: '/solar-solutions/solar-street-lighting',
      description: 'Raised solar LED street lights with dusk-to-dawn automation and battery backup.',
    },
  ];

  if (companyConfig.features.confirmMaintenanceServicesOffered) {
    serviceChildren.push({
      label: 'Solar Maintenance & AMC',
      path: '/solar-solutions/solar-maintenance-support',
      description: 'Systematic module washing, electrical health checks, and preventive maintenance.',
    });
  }

  return [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Services',
      path: '/services',
      children: serviceChildren,
    },
    {
      label: 'Who We Serve',
      path: '/who-we-serve',
      children: [
        {
          label: 'Homeowners',
          path: '/who-we-serve/homeowners',
          description: 'Practical rooftop solar guidance for independent houses and residential buildings.',
        },
        {
          label: 'Farmers',
          path: '/who-we-serve/farmers',
          description: 'Reliable daytime irrigation with solar water pumps and dual-mode controllers.',
        },
        {
          label: 'Businesses & Institutions',
          path: '/who-we-serve/businesses-institutions',
          description: 'Manage daytime operational power costs across commercial and community properties.',
        },
      ],
    },
    {
      label: 'Projects',
      path: '/projects',
      children: [
        {
          label: 'Executed Works Portfolio',
          path: '/projects',
          description: 'Field-executed solar water pumps, rooftop installations, and street lighting projects.',
        },
        {
          label: 'Field Photo Gallery',
          path: '/gallery',
          description: 'Authentic photo records of solar installations, pump arrays, and site executions.',
        },
      ],
    },
    {
      label: 'About',
      path: '/about',
    },
    {
      label: 'Resources',
      path: '/resources',
      children: [
        {
          label: 'Solar FAQs',
          path: '/resources/solar-faqs',
          description: 'Clear answers to common questions before investing in solar.',
        },
        {
          label: 'Subsidy & Scheme Guidance',
          path: '/resources/subsidy-scheme-guidance',
          description: 'Understanding PM Surya Ghar, PM-KUSUM, and eligibility rules.',
        },
        {
          label: 'Solar Guides and Articles',
          path: '/resources/guides-articles',
          description: 'In-depth educational articles on sizing, battery storage, and maintenance.',
        },
      ],
    },
    {
      label: 'Contact',
      path: '/contact',
    },
  ];
};

export const footerLegalLinks = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  { label: 'Disclaimer', path: '/disclaimer' },
  { label: 'Grievance & Contact Information', path: '/grievance-redressal' },
];

