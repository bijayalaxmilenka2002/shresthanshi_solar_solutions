import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Sun, ShieldCheck, Cpu, Layers } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Accordion } from '../../components/ui/Accordion';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { getSolarSolutions } from '../../data/solutions';
import { faqItems } from '../../data/faqs';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';

export const ResidentialSolarPage: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();
  const solution = getSolarSolutions().find((s) => s.id === 'residential-rooftop-solar')!;
  const residentialFaqs = faqItems.filter(
    (f) => f.category === 'residential' || f.category === 'general' || f.category === 'subsidy'
  );

  const componentIcons = [<Sun size={22} />, <Cpu size={22} />, <Layers size={22} />, <ShieldCheck size={22} />];

  return (
    <div>
      <SEO
        title="Residential Rooftop Solar Installation in Odisha — PM Surya Ghar"
        description="Save up to 80% on household daytime power with turnkey residential rooftop solar in Bhubaneswar, Kalahandi & Odisha. PM Surya Ghar subsidy guidance, net-metering & DISCOM approvals."
        canonicalPath="/solar-solutions/residential-rooftop-solar"
      />
      <Breadcrumbs
        items={[
          { label: 'Solar Solutions', path: '/solar-solutions' },
          { label: 'Residential Rooftop Solar' },
        ]}
      />

      {/* 1. Hero Section */}
      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              For Independent Homes &amp; Families
            </span>
            <h1 className="page-hero__title">Residential Rooftop Solar</h1>
            <p className="page-hero__subtitle">{solution.tagline}</p>
            <div className="page-hero__actions">
              <Button
                to="/contact?solution=residential-rooftop-solar"
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
                onClick={() => openGuideModal('Residential Rooftop Solar')}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: rooftop solar installation]"
              sublabel="Residential Terrace Solar Array"
              aspectRatio="16/10"
              variant="white"
              src="/images/homeowners-rooftop-solar.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      {/* 2. Side-by-Side Roof Suitability & On-Grid vs Hybrid */}
      <section className="section bg-white">
        <Container>
          <div className="split-showcase">
            <div className="split-showcase__media">
              <ImagePlaceholder
                label="[Image: rooftop solar installation]"
                sublabel="Shadow-Free RCC & Elevated Terrace Mounting"
                aspectRatio="4/3"
                variant="soft-green"
                src="/images/solar/residential-rooftop.jpg"
                imgFit="cover"
              />
            </div>
            <div className="split-showcase__content">
              <SectionHeading
                eyebrow="Site & Usage Check"
                title="How We Size Your Home System"
                subtitle="Four quick factors determine the right kilowatt rating for your roof."
              />
              <div className="grid-2 split-showcase__cards">
                {solution.suitabilityFactors.map((factor) => (
                  <Card key={factor.title} variant="soft-green" padding="md">
                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: '0.35rem' }}>{factor.title}</h3>
                    <p style={{ fontSize: 'var(--text-sm)' }}>{factor.detail}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: '2rem' }}>
            <Card variant="outlined" padding="lg">
              <span className="badge" style={{ marginBottom: '0.6rem' }}>Standard Bill Offset</span>
              <h3>On-Grid Rooftop System</h3>
              <p style={{ marginTop: '0.4rem' }}>
                Exports surplus daytime power via net metering to lower your monthly utility bill.
              </p>
            </Card>
            <Card variant="outlined" padding="lg">
              <span className="badge" style={{ marginBottom: '0.6rem' }}>Outage Backup</span>
              <h3>Hybrid System (With Battery)</h3>
              <p style={{ marginTop: '0.4rem' }}>
                Combines solar generation with battery storage to keep essential loads running during power cuts.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 3. System Components */}
      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="Key Hardware"
            title="What Goes Into Your Home Solar System"
            align="center"
          />

          <div className="grid-4">
            {solution.components.map((comp, idx) => (
              <Card key={comp.name} variant="white" padding="lg" className="component-card">
                <div className="component-card__icon">{componentIcons[idx % componentIcons.length]}</div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.4rem' }}>{comp.name}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{comp.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Subsidy Information */}
      <section className="section bg-white">
        <Container>
          <Card variant="soft-green" padding="lg">
            <span className="badge" style={{ marginBottom: '0.75rem' }}>
              PM Surya Ghar: Muft Bijli Yojana
            </span>
            <h2>Residential Rooftop Subsidy Guidance</h2>
            <p style={{ marginTop: '0.5rem' }}>{solution.subsidyNote}</p>
            <ul className="feature-list" style={{ margin: '1rem 0' }}>
              <li className="feature-list-item">
                <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                <span>Requires active residential consumer number and National Portal registration.</span>
              </li>
              <li className="feature-list-item">
                <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                <span>Uses approved Domestic Content Requirement (DCR) solar modules and net metering.</span>
              </li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/contact?intent=subsidy" variant="primary" size="md">
                Get a Solar Assessment
              </Button>
              <Button to="/resources/subsidy-scheme-guidance" variant="outline" size="md">
                View Subsidy Guide
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* 5. FAQs */}
      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="Homeowner FAQs"
            title="Common Residential Solar Questions"
            align="center"
          />
          <div className="faq-container">
            <Accordion items={residentialFaqs} defaultOpenIndex={0} />
          </div>
        </Container>
      </section>

      <CTASection
        headline="See What Your Home Roof Can Generate."
        supportingCopy="Share your recent electricity bill for a clear, no-obligation residential solar assessment."
        prefillTopic="Residential Rooftop Solar Enquiry"
        image="[Image: rooftop solar installation]"
      />
    </div>
  );
};
