import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Droplets, Sprout, Compass, Zap } from 'lucide-react';
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

export const SolarWaterPumpsPage: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();
  const solution = getSolarSolutions().find((s) => s.id === 'solar-water-pumps')!;

  const pumpingApplications = [
    {
      icon: <Sprout size={22} />,
      title: 'Borewell Farm Irrigation',
      imageLabel: '[Image: solar water pump in a farm]',
      imageSrc: '/images/farmers-solar-pumping.jpg',
      description: 'Submersible solar pumps for steady daytime crop irrigation.',
    },
    {
      icon: <Droplets size={22} />,
      title: 'Pond & Well Surface Pumping',
      imageLabel: '[Image: surface solar water pump near farm pond]',
      imageSrc: '/images/solar-pump-irrigation-field.jpg',
      description: 'Surface solar pumps for shallow open wells, ponds, and streams.',
    },
    {
      icon: <Compass size={22} />,
      title: 'Overhead Water Sensor Pumps',
      imageLabel: '[Project gallery image: solar overhead water sensor pump]',
      imageSrc: '/images/solar/solar-overhead-sensor-pump.jpg',
      description: 'Automated solar pumping into elevated tanks with level sensors.',
    },
    {
      icon: <Zap size={22} />,
      title: 'Deep Tubewell & Dual-Mode Pumping',
      imageLabel: '[Image: agricultural deep borewell solar pump setup in Odisha]',
      imageSrc: '/images/solar/solar-deep-borewell-tubewell.jpg',
      description: 'High-lift submersible solar pumps with dual-drive controllers that seamlessly switch between solar and electric grid.',
    },
  ];

  return (
    <div>
      <SEO
        title="Agricultural Solar Water Pumps in Odisha — PM-KUSUM Ready"
        description="Reliable solar borewell and open well irrigation pumps for farmers across Bhubaneswar, Kalahandi and Odisha. Replace diesel pumps with standalone solar power."
        canonicalPath="/solar-solutions/solar-water-pumps"
      />
      <Breadcrumbs
        items={[
          { label: 'Solar Solutions', path: '/solar-solutions' },
          { label: 'Solar Water Pumps' },
        ]}
      />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Agricultural Irrigation &amp; Rural Water Supply
            </span>
            <h1 className="page-hero__title">Solar Water Pumps</h1>
            <p className="page-hero__subtitle">{solution.tagline}</p>
            <div className="page-hero__actions">
              <Button
                to="/contact?solution=solar-water-pumps"
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
                onClick={() => openGuideModal('Solar Water Pumps')}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: solar water pump in a farm]"
              sublabel="Standalone Agricultural Solar Pumping"
              aspectRatio="16/10"
              variant="white"
              src="/images/for-your-farm-solar.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      {/* Image-Led Applications Grid */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Verified Field Expertise"
            title="Borewell &amp; Solar Pumping Applications"
            subtitle="Integrated groundwater drilling and solar pump commissioning across Odisha."
          />

          <div className="grid-2">
            {pumpingApplications.map((app) => (
              <Card key={app.title} variant="soft-green" padding="none" hoverable className="visual-card">
                <div className="visual-card__media">
                  <ImagePlaceholder
                    label={app.imageLabel}
                    aspectRatio="16/10"
                    variant="white"
                    src={app.imageSrc}
                    imgFit="cover"
                  />
                </div>
                <div className="visual-card__body">
                  <h3 className="visual-card__title">{app.title}</h3>
                  <p className="visual-card__desc">{app.description}</p>
                  <div className="visual-card__footer" style={{ marginTop: '0.75rem' }}>
                    <Link to={`/contact?solution=solar-water-pumps&intent=${encodeURIComponent(app.title)}`} className="ui-text-link">
                      <span>Get a Quote for {app.title}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Technical Sizing & PM-KUSUM */}
      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="System Sizing"
            title="Matched to Your Borewell &amp; Acreage"
          />

          <div className="grid-4">
            {solution.suitabilityFactors.map((factor) => (
              <Card key={factor.title} variant="white" padding="lg">
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.4rem' }}>{factor.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{factor.detail}</p>
              </Card>
            ))}
          </div>

          <Card variant="white" padding="lg" style={{ marginTop: '2rem' }}>
            <span className="badge" style={{ marginBottom: '0.65rem' }}>
              PM-KUSUM &amp; Agricultural Schemes
            </span>
            <h3>Agricultural Solar Pump Scheme Guidance</h3>
            <p style={{ marginTop: '0.4rem' }}>{solution.subsidyNote}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Button to="/contact?solution=solar-water-pumps" variant="primary" size="md">
                Get a Solar Assessment
              </Button>
              <Button to="/resources/subsidy-scheme-guidance" variant="outline" size="md">
                View Scheme Guide
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      <CTASection
        headline="Plan Daytime Irrigation for Your Farm."
        supportingCopy="Share your borewell depth and land location in Odisha for a solar pump assessment."
        prefillTopic="Agricultural Solar Water Pump Enquiry"
        image="[Image: solar water pump in a farm]"
      />
    </div>
  );
};
