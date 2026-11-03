import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Home, Sprout, AlertCircle } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';

export const SubsidyGuidancePage: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();

  return (
    <div>
      <SEO
        title="PM Surya Ghar & PM-KUSUM Solar Subsidy Guidance in Odisha"
        description="Comprehensive guide to PM Surya Ghar Muft Bijli Yojana (residential) and PM-KUSUM (agricultural solar pump) subsidies in Odisha."
        canonicalPath="/resources/subsidy-scheme-guidance"
      />
      <Breadcrumbs
        items={[
          { label: 'Resources', path: '/resources' },
          { label: 'Subsidy & Scheme Guidance' },
        ]}
      />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Subsidy &amp; Financial Guidance
            </span>
            <h1 className="page-hero__title">
              Understand Solar Costs &amp; Scheme Rules Upfront.
            </h1>
            <p className="page-hero__subtitle">
              Government financial assistance depends on your consumer category, sanctioned load, and official portal registration.
            </p>
            <div className="page-hero__actions">
              <Button
                to="/contact?intent=subsidy"
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
                onClick={() => openGuideModal('Subsidy & Scheme Guidance')}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: rooftop solar installation]"
              sublabel="PM Surya Ghar & PM-KUSUM Guidance"
              aspectRatio="16/10"
              variant="white"
              src="/images/page-hero-solar-home.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Key Government Schemes"
            title="Residential &amp; Agricultural Solar Schemes"
          />

          <div className="grid-2">
            {/* PM Surya Ghar */}
            <Card variant="soft-green" padding="none" className="visual-card">
              <div className="visual-card__media">
                <ImagePlaceholder
                  label="[Image: rooftop solar installation]"
                  sublabel="Residential Rooftop Scheme"
                  aspectRatio="16/10"
                  variant="white"
                  src="/images/for-your-home-solar.jpg"
                  imgFit="cover"
                />
              </div>
              <div className="visual-card__body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Home size={18} color="var(--color-forest-green)" />
                  <span className="badge">For Households</span>
                </div>
                <h2>PM Surya Ghar: Muft Bijli Yojana</h2>
                <ul className="feature-list" style={{ margin: '1rem 0' }}>
                  <li className="feature-list-item">
                    <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                    <span>National Portal registration with active residential consumer number.</span>
                  </li>
                  <li className="feature-list-item">
                    <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                    <span>Approved DCR solar modules and bi-directional net metering.</span>
                  </li>
                  <li className="feature-list-item">
                    <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                    <span>Subsidy released after commissioning and DISCOM inspection.</span>
                  </li>
                </ul>
                <Button to="/resources/articles/pm-surya-ghar-guidance" variant="primary" size="sm" iconRight={<ArrowRight size={15} />}>
                  Read PM Surya Ghar Guide
                </Button>
              </div>
            </Card>

            {/* PM-KUSUM */}
            <Card variant="soft-green" padding="none" className="visual-card">
              <div className="visual-card__media">
                <ImagePlaceholder
                  label="[Image: solar water pump in a farm]"
                  sublabel="Agricultural Solar Pump Scheme"
                  aspectRatio="16/10"
                  variant="white"
                  src="/images/solar-pump-irrigation-field.jpg"
                  imgFit="cover"
                />
              </div>
              <div className="visual-card__body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Sprout size={18} color="var(--color-forest-green)" />
                  <span className="badge">For Farmers</span>
                </div>
                <h2>PM-KUSUM &amp; Farm Solar Schemes</h2>
                <ul className="feature-list" style={{ margin: '1rem 0' }}>
                  <li className="feature-list-item">
                    <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                    <span>Administered via State Nodal Agencies during active portal windows.</span>
                  </li>
                  <li className="feature-list-item">
                    <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                    <span>Requires landholding records (RoR / Patta) and water source details.</span>
                  </li>
                  <li className="feature-list-item">
                    <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                    <span>Apply strictly through official portals—avoid unverified links.</span>
                  </li>
                </ul>
                <Button to="/resources/articles/pm-kusum-guidance" variant="primary" size="sm" iconRight={<ArrowRight size={15} />}>
                  Read PM-KUSUM Guide
                </Button>
              </div>
            </Card>
          </div>

          <Card variant="outlined" padding="lg" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <AlertCircle size={22} color="var(--color-forest-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h3>Consumer Advisory</h3>
                <p style={{ marginTop: '0.35rem', fontSize: 'var(--text-sm)' }}>
                  Subsidy slabs, state top-ups, and application windows are governed by central and state notifications. We verify your consumer category and current portal rules before advising on eligibility.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <CTASection
        headline="Check Your Solar Cost &amp; Scheme Eligibility."
        supportingCopy="Speak with our Kalahandi team for a transparent assessment."
        prefillTopic="Subsidy & Cost Guidance Consultation"
        image="[Image: rooftop solar installation]"
      />
    </div>
  );
};
