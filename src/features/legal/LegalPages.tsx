import React from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO } from '../../components/common/SEO';
import { companyConfig } from '../../data/company';

interface LegalPageProps {
  pageType: 'privacy' | 'terms' | 'disclaimer' | 'grievance';
}

export const LegalPage: React.FC<LegalPageProps> = ({ pageType }) => {
  const renderContent = () => {
    switch (pageType) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          subtitle: 'How Shreshtanshi Construction & Suppliers collects, uses, and protects your enquiry information.',
          sections: [
            {
              heading: '1. Information We Collect',
              body: `When you request our Free Solar Guide or submit a solar assessment enquiry on the website of ${companyConfig.legalName}, we collect only the details you voluntarily provide: your name, phone number, email address, location/district, preferred contact method, and message regarding your energy or water-pumping needs.`,
            },
            {
              heading: '2. How We Use Your Information',
              body: 'Your contact details and project notes are used strictly to share our educational solar guide, respond to your consultation request, evaluate technical feasibility for your site, and communicate relevant project proposals.',
            },
            {
              heading: '3. Data Protection & Non-Disclosure',
              body: 'We do not sell, rent, or trade your personal contact information to unauthorized third-party telemarketers. Information is shared only with authorized personnel of Shreshtanshi Construction & Suppliers involved in serving your enquiry.',
            },
            {
              heading: '4. Contact for Privacy Requests',
              body: `To update or request deletion of your enquiry records, please contact our office at ${companyConfig.contact.email} or call ${companyConfig.contact.phoneDisplay}.`,
            },
          ],
        };

      case 'terms':
        return {
          title: 'Terms & Conditions',
          subtitle: 'Terms governing the use of this website and preliminary solar guidance.',
          sections: [
            {
              heading: '1. Website Purpose',
              body: `This website is operated by ${companyConfig.legalName} (GSTIN: ${companyConfig.gstin}), headquartered at ${companyConfig.contact.address.full}, to provide educational information and consultation access for solar energy and infrastructure solutions.`,
            },
            {
              heading: '2. Site Assessment Requirement',
              body: 'All system sizing descriptions, component overviews, and guide materials on this website are for preliminary educational guidance. Final technical specifications, structural mounting designs, and commercial quotations are issued only after an individual site and load evaluation.',
            },
            {
              heading: '3. Intellectual Property',
              body: `All original text, custom brand marks, and website structure are the property of ${companyConfig.legalName} and may not be reproduced in a misleading manner.`,
            },
          ],
        };

      case 'disclaimer':
        return {
          title: 'Disclaimer',
          subtitle: 'Important disclosures regarding solar generation estimates and government subsidy schemes.',
          sections: [
            {
              heading: '1. Solar Generation & Savings Variability',
              body: 'Actual solar electricity generation and water pump output depend on local solar irradiance, seasonal weather (including monsoon cloud cover), roof orientation, tilt angle, shadow conditions, module cleanliness, and grid voltage stability.',
            },
            {
              heading: '2. Government Schemes & Subsidies (PM Surya Ghar / PM-KUSUM)',
              body: 'Financial assistance and subsidies under government schemes such as PM Surya Ghar: Muft Bijli Yojana and PM-KUSUM are governed strictly by the Ministry of New and Renewable Energy (MNRE), State Nodal Agencies, and local electricity distribution companies (DISCOMs). Eligibility, subsidy slabs, portal availability, and disbursement timelines are determined solely by the respective government authorities.',
            },
            {
              heading: '3. No Unverified Guarantees',
              body: `${companyConfig.legalName} provides honest technical guidance and never guarantees subsidy allotment outside official government portal rules.`,
            },
          ],
        };

      case 'grievance':
        return {
          title: 'Grievance & Contact Information',
          subtitle: 'Official enterprise registration, proprietor details, and customer grievance redressal channel.',
          sections: [
            {
              heading: '1. Registered Enterprise Details',
              body: `Legal Entity Name: ${companyConfig.legalName} | Proprietor: ${companyConfig.founder.name} | Goods & Services Tax Identification Number (GSTIN): ${companyConfig.gstin}.`,
            },
            {
              heading: '2. Registered Office Address',
              body: companyConfig.contact.address.full,
            },
            {
              heading: '3. Direct Grievance & Support Contact',
              body: `For any service feedback, project query, or grievance redressal, please contact us directly by phone at ${companyConfig.contact.phoneDisplay} or by email at ${companyConfig.contact.email}. Please include your name, contact number, and enquiry/project reference so we can address your concern promptly.`,
            },
          ],
        };
    }
  };

  const content = renderContent();

  return (
    <div>
      <SEO
        title={content.title}
        description={content.subtitle}
        canonicalPath={`/legal/${pageType}`}
      />
      <Breadcrumbs items={[{ label: content.title }]} />

      <section className="page-hero bg-soft-green">
        <Container>
          <span className="badge" style={{ marginBottom: '0.75rem' }}>
            Official Policy &amp; Compliance
          </span>
          <h1 className="page-hero__title">{content.title}</h1>
          <p className="page-hero__subtitle">{content.subtitle}</p>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <Card variant="soft-green" padding="lg" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {content.sections.map((sec) => (
              <div key={sec.heading} style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.5rem' }}>{sec.heading}</h2>
                <p>{sec.body}</p>
              </div>
            ))}
          </Card>
        </Container>
      </section>
    </div>
  );
};

