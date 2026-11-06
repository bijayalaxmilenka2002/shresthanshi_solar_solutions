import React from 'react';
import { ArrowRight, BookOpen, Building2 } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { getSolarSolutions } from '../../data/solutions';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';

export const CommercialSolarPage: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();
  const solution = getSolarSolutions().find((s) => s.id === 'commercial-solar')!;

  const propertyTypes = [
    {
      title: 'Shops & Showrooms',
      detail: 'Offset daytime lighting and cooling loads.',
    },
    {
      title: 'Offices & Complexes',
      detail: 'Power computers, AC units, and common loads.',
    },
    {
      title: 'Workshops & Mills',
      detail: 'Use industrial metal sheds to reduce three-phase grid draw.',
    },
    {
      title: 'Schools & Institutions',
      detail: 'Match 8 AM – 4 PM campus hours with clean daytime power.',
    },
  ];

  return (
    <div>
      <SEO
        title="Commercial & Institutional Solar Plants in Odisha"
        description="Cut daytime operational electricity costs for commercial roofs, showrooms, rice mills, schools, and offices in Bhubaneswar, Kalahandi & Odisha with engineered solar plants."
        canonicalPath="/solar-solutions/commercial-solar"
      />
      <Breadcrumbs
        items={[
          { label: 'Solar Solutions', path: '/solar-solutions' },
          { label: 'Commercial Solar' },
        ]}
      />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              For Shops, Offices, Workshops &amp; Institutions
            </span>
            <h1 className="page-hero__title">Commercial Solar</h1>
            <p className="page-hero__subtitle">{solution.tagline}</p>
            <div className="page-hero__actions">
              <Button
                to="/contact?solution=commercial-solar"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                Get a Solar Assessment
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconLeft={<BookOpen size={18} />}
                onClick={() => openGuideModal('Commercial Solar')}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: commercial solar installation]"
              sublabel="Commercial Rooftop & Metal Shed Array"
              aspectRatio="16/10"
              variant="white"
              src="/images/for-your-business-solar.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      {/* Commercial Property Applications */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Applications"
            title="Built for Daytime Working Hours"
            subtitle="Immediate on-site consumption during peak business hours."
          />

          <div className="grid-4">
            {propertyTypes.map((prop) => (
              <Card key={prop.title} variant="soft-green" padding="lg">
                <div className="benefit-card__icon">
                  <Building2 size={22} />
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.4rem' }}>{prop.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{prop.detail}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Side-by-Side Feasibility & Components */}
      <section className="section bg-soft-green">
        <Container>
          <div className="split-showcase">
            <div className="split-showcase__media">
              <ImagePlaceholder
                label="[Image: commercial solar installation]"
                sublabel="Three-Phase Inverter & Industrial Shed Mounting"
                aspectRatio="4/3"
                variant="white"
                src="/images/solar/commercial-rooftop.jpg"
                imgFit="cover"
              />
            </div>
            <div className="split-showcase__content">
              <SectionHeading
                eyebrow="Site Feasibility"
                title="Commercial Sizing &amp; Hardware"
                subtitle="Engineered around your contract demand, roof structure, and safety standards."
              />
              <div className="grid-2 split-showcase__cards">
                {solution.components.map((comp) => (
                  <Card key={comp.name} variant="white" padding="md">
                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: '0.3rem' }}>{comp.name}</h3>
                    <p style={{ fontSize: 'var(--text-sm)' }}>{comp.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        headline="Put Your Commercial Roof to Work."
        supportingCopy="Request an on-site electrical and roof assessment from our engineering team in Bhubaneswar or our Kalahandi department."
        prefillTopic="Commercial Solar Assessment"
        image="[Image: commercial solar installation]"
      />
    </div>
  );
};
