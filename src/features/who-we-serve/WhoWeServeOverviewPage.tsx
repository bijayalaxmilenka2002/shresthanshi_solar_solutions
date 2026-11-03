import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { audienceProfiles } from '../../data/solutions';

export const WhoWeServeOverviewPage: React.FC = () => {
  return (
    <div>
      <SEO
        title="Who We Serve — Homeowners, Farmers & Businesses in Odisha"
        description="Explore targeted solar energy solutions for homeowners, farmers, and commercial establishments in Kalahandi, Sambalpur, Bolangir, and across Odisha."
        canonicalPath="/who-we-serve"
      />
      <Breadcrumbs items={[{ label: 'Who We Serve' }]} />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Who We Serve Across Odisha
            </span>
            <h1 className="page-hero__title">
              Solar Tailored to Your Property &amp; Livelihood.
            </h1>
            <p className="page-hero__subtitle">
              Select your profile to explore solar solutions for homes, agricultural farms, and commercial buildings.
            </p>
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
            eyebrow="Customer Profiles"
            title="Select Your Category"
            align="center"
          />

          <div className="solutions-stack">
            {audienceProfiles.map((profile, idx) => (
              <Card
                key={profile.id}
                variant={idx % 2 === 0 ? 'soft-green' : 'white'}
                padding="lg"
                className="solution-detail-row"
              >
                <div className="solution-detail-row__grid">
                  <div className="solution-detail-row__media">
                    <ImagePlaceholder
                      label={profile.image}
                      sublabel={profile.title}
                      aspectRatio="16/10"
                      variant={idx % 2 === 0 ? 'white' : 'soft-green'}
                      src={profile.imageSrc}
                      imgFit="cover"
                    />
                  </div>
                  <div className="solution-detail-row__content">
                    <span className="badge" style={{ marginBottom: '0.65rem' }}>
                      {profile.title}
                    </span>
                    <h2>{profile.headline}</h2>
                    <p style={{ marginTop: '0.4rem' }}>{profile.subtitle}</p>
                    <ul className="feature-list" style={{ margin: '1rem 0' }}>
                      {profile.challenges.slice(0, 3).map((ch) => (
                        <li key={ch} className="feature-list-item">
                          <span className="feature-list-icon"><CheckCircle2 size={14} /></span>
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="solution-detail-row__actions">
                      <Button
                        to={profile.path}
                        variant="primary"
                        size="md"
                        iconRight={<ArrowRight size={16} />}
                      >
                        Explore for {profile.title}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        prefillTopic="Who We Serve Consultation"
        image="[Image: rooftop solar installation]"
      />
    </div>
  );
};
