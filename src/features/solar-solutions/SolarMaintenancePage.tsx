import React from 'react';
import { Navigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Wrench, ShieldCheck, Activity, Sparkles } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { companyConfig } from '../../data/company';
import { getSolarSolutions } from '../../data/solutions';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';

export const SolarMaintenancePage: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();

  if (!companyConfig.features.confirmMaintenanceServicesOffered) {
    return <Navigate to="/solar-solutions" replace />;
  }

  const solution = getSolarSolutions().find((s) => s.id === 'solar-maintenance-support')!;
  const icons = [<Sparkles size={22} />, <Activity size={22} />, <ShieldCheck size={22} />, <Wrench size={22} />];

  return (
    <div>
      <SEO
        title="Solar Panel Cleaning, Maintenance & Health Audits in Odisha"
        description="Professional solar panel cleaning, inverter diagnostics, earthing checks, and preventive maintenance across Kalahandi and Odisha to sustain peak generation."
        canonicalPath="/solar-solutions/solar-maintenance-support"
      />
      <Breadcrumbs
        items={[
          { label: 'Solar Solutions', path: '/solar-solutions' },
          { label: 'Solar Maintenance & Support' },
        ]}
      />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Preventive Care &amp; Servicing
            </span>
            <h1 className="page-hero__title">Solar Maintenance &amp; Support</h1>
            <p className="page-hero__subtitle">{solution.tagline}</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              {solution.summary}
            </p>
            <div className="page-hero__actions">
              <Button
                to="/contact?solution=solar-maintenance-support"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                Request Service Check
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconLeft={<BookOpen size={18} />}
                onClick={() => openGuideModal('Solar Maintenance & Support')}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: solar panel inspection and maintenance]"
              sublabel="Routine Inspection, Cleaning & Diagnostics"
              aspectRatio="16/10"
              variant="white"
              src="/images/solar/solar-maintenance.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="What We Inspect"
            title="Solar Health &amp; Safety Checks"
          />

          <div className="grid-4">
            {solution.components.map((comp, idx) => (
              <Card key={comp.name} variant="soft-green" padding="lg">
                <div className="benefit-card__icon">{icons[idx % icons.length]}</div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.4rem' }}>{comp.name}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{comp.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        headline="Keep Your Solar System Running Reliably."
        supportingCopy="Schedule a preventive inspection for your rooftop array or solar water pump."
        prefillTopic="Solar Maintenance & Support Request"
        image="[Image: solar panel inspection and maintenance]"
      />
    </div>
  );
};
