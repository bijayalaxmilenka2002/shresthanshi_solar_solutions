import React from 'react';
import { ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ProcessTimeline } from '../../components/common/ProcessTimeline';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { getSolarSolutions } from '../../data/solutions';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';

export const SolarSolutionsOverviewPage: React.FC = () => {
  const solutions = getSolarSolutions();
  const { openGuideModal } = useSolarGuideModal();

  return (
    <div>
      <SEO
        title="Solar Solutions — Rooftop Solar, Water Pumps & Commercial Systems"
        description="Explore tailored solar solutions in Odisha: residential rooftop solar under PM Surya Ghar, commercial systems, agricultural solar water pumps, and routine maintenance."
        canonicalPath="/solar-solutions"
      />
      <Breadcrumbs items={[{ label: 'Solar Solutions' }]} />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Solar Solutions Portfolio
            </span>
            <h1 className="page-hero__title">
              Solar Systems Built Around Your Site.
            </h1>
            <p className="page-hero__subtitle">
              Rooftop solar for homes, daytime solar for commercial roofs, and standalone solar water pumps for Odisha farms.
            </p>
            <div className="page-hero__actions">
              <Button
                to="/contact?intent=assessment"
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
                onClick={() => openGuideModal('Exploring Solar Solutions Overview')}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Hero image: solar panels on a modern home]"
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
            eyebrow="Choose Your Application"
            title="Four Ways to Put Solar to Work."
            subtitle="Select a solution to review components, suitability factors, and scheme guidance."
          />

          <div className="solutions-stack">
            {solutions.map((solution, idx) => (
              <Card
                key={solution.id}
                variant={idx % 2 === 0 ? 'soft-green' : 'white'}
                padding="lg"
                className="solution-detail-row"
              >
                <div className="solution-detail-row__grid">
                  <div className="solution-detail-row__media">
                    <ImagePlaceholder
                      label={solution.image}
                      sublabel={solution.audience}
                      aspectRatio="16/10"
                      variant={idx % 2 === 0 ? 'white' : 'soft-green'}
                      src={solution.imageSrc}
                    />
                  </div>
                  <div className="solution-detail-row__content">
                    <span className="badge" style={{ marginBottom: '0.65rem' }}>
                      {solution.audience}
                    </span>
                    <h2>{solution.title}</h2>
                    <p className="solution-detail-row__tagline">{solution.tagline}</p>
                    <p>{solution.summary}</p>
                    <ul className="feature-list" style={{ margin: '1rem 0' }}>
                      {solution.keyHighlights.map((item) => (
                        <li key={item} className="feature-list-item">
                          <span className="feature-list-icon">
                            <CheckCircle2 size={14} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="solution-detail-row__actions">
                      <Button
                        to={solution.path}
                        variant="primary"
                        size="md"
                        iconRight={<ArrowRight size={16} />}
                      >
                        {solution.ctaLabel}
                      </Button>
                      <Button
                        to={`/contact?solution=${solution.slug}`}
                        variant="outline"
                        size="md"
                      >
                        Get a Solar Assessment
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="Consultation Process"
            title="How We Size Your System"
            align="center"
          />
          <ProcessTimeline />
        </Container>
      </section>

      <CTASection
        prefillTopic="Solar Solutions Overview Enquiry"
        image="[Image: rooftop solar installation]"
      />
    </div>
  );
};
