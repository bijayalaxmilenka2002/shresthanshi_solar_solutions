import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Compass } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ProcessTimeline } from '../../components/common/ProcessTimeline';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { audienceProfiles } from '../../data/solutions';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';

interface AudienceDetailPageProps {
  audienceId: 'homeowners' | 'farmers' | 'businesses-institutions';
}

export const AudienceDetailPage: React.FC<AudienceDetailPageProps> = ({ audienceId }) => {
  const { openGuideModal } = useSolarGuideModal();
  const profile = audienceProfiles.find((a) => a.id === audienceId)!;

  return (
    <div>
      <SEO
        title={`Solar Solutions for ${profile.title} in Odisha`}
        description={profile.subtitle}
        canonicalPath={`/who-we-serve/${audienceId}`}
      />
      <Breadcrumbs
        items={[
          { label: 'Who We Serve', path: '/who-we-serve' },
          { label: profile.title },
        ]}
      />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Who We Serve: {profile.title}
            </span>
            <h1 className="page-hero__title">{profile.headline}</h1>
            <p className="page-hero__subtitle">{profile.subtitle}</p>
            <div className="page-hero__actions">
              <Button
                to={`/contact?audience=${profile.slug}`}
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                {profile.ctaText}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconLeft={<BookOpen size={18} />}
                onClick={() => openGuideModal(`Solar Guide for ${profile.title}`)}
              >
                Get a Free Solar Guide
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label={profile.image}
              sublabel={profile.title}
              aspectRatio="16/10"
              variant="white"
              src={profile.imageSrc}
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      {/* Challenges & Key Considerations */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Site & Planning Factors"
            title={`What We Evaluate for ${profile.title}`}
          />

          <div className="grid-3">
            {profile.considerations.map((item) => (
              <Card key={item.title} variant="soft-green" padding="lg">
                <div className="benefit-card__icon">
                  <Compass size={22} />
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Solar Solutions */}
      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="Recommended Pathways"
            title={`Solar Solutions for ${profile.title}`}
          />

          <div className="grid-2">
            {profile.recommendedSolutions.map((rec) => (
              <Card key={rec.title} variant="white" padding="lg" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <CheckCircle2 size={20} color="var(--color-forest-green)" />
                  <h3 style={{ fontSize: 'var(--text-xl)' }}>{rec.title}</h3>
                </div>
                <p style={{ marginBottom: '1rem' }}>{rec.description}</p>
                <Link to={rec.path} className="ui-text-link">
                  <span>Explore {rec.title}</span>
                  <ArrowRight size={16} />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="4 Simple Steps"
            title="From Discussion to On-Site Execution"
            align="center"
          />
          <ProcessTimeline />
        </Container>
      </section>

      <CTASection
        headline={`Plan a Solar Solution for ${profile.title}.`}
        supportingCopy="Speak with our team in Kalahandi for a site-based assessment."
        prefillTopic={`Enquiry from ${profile.title}`}
        image={profile.image}
      />
    </div>
  );
};
