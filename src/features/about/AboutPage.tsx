import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  GraduationCap,
  CheckCircle2,
  Compass,
  Wrench,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { companyConfig } from '../../data/company';
import { projectItems } from '../../data/projects';

export const AboutPage: React.FC = () => {
  const approachPillars = [
    {
      icon: <Compass size={22} />,
      title: 'Site-First Assessment',
      description:
        'We inspect your electricity consumption, roof space, or agricultural water pumping load before recommending any system capacity.',
    },
    {
      icon: <Wrench size={22} />,
      title: 'Engineered Solar Mounting',
      description:
        'Heavy-duty elevated galvanized mounting frames and solar pump structures built for Odisha climate conditions and wind loads.',
    },
    {
      icon: <FileCheck2 size={22} />,
      title: 'Honest Guidance',
      description:
        'Clear hardware specifications, transparent pricing, and straightforward PM Surya Ghar and PM-KUSUM subsidy guidance.',
    },
  ];

  return (
    <div>
      <SEO
        title="About Us — Shresthanshi Solar Solutions, Kalahandi, Odisha"
        description="Learn about M/s Shreshtanshi Construction & Suppliers (Shresthanshi Solar Solutions, Prop. Shubham Pratap Singh, GSTIN: 21AVUPM9359D1Z6). Field-proven solar energy and water pumping."
        canonicalPath="/about"
      />
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* 1. Company Introduction Hero */}
      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              About {companyConfig.shortName}
            </span>
            <h1 className="page-hero__title">
              Practical Solar Energy &amp; Water Pumping in Odisha.
            </h1>
            <p className="page-hero__subtitle">
              Headquartered at Sargiguda, Narla Road in Kalahandi, <strong>{companyConfig.legalName}</strong> (GSTIN: {companyConfig.gstin}) delivers turnkey residential rooftop solar, commercial solar plants, agricultural solar water pump controllers, and community solar street lighting.
            </p>
            <div className="page-hero__actions">
              <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
                Get a Solar Assessment
              </Button>
              <Button to="/projects" variant="outline" size="lg">
                View Projects
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Hero image: solar panels on a modern home]"
              sublabel="Kalahandi & Across Odisha"
              aspectRatio="16/10"
              variant="white"
              src="/images/page-hero-solar-home.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      {/* 2. Company Approach */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="How We Operate"
            title="Our Approach to Solar Delivery"
          />

          <div className="grid-3">
            {approachPillars.map((pillar) => (
              <Card key={pillar.title} variant="soft-green" padding="lg">
                <div className="benefit-card__icon">{pillar.icon}</div>
                <h3 style={{ marginBottom: '0.4rem' }}>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Founder Section */}
      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Founder &amp; Proprietor Profile"
          />

          <Card variant="white" padding="lg" className="founder-profile-card">
            <div className="founder-profile-card__grid">
              <div className="founder-profile-card__photo-col">
                <div className="founder-profile-card__img-wrap">
                  <ImagePlaceholder
                    label={companyConfig.founder.image}
                    sublabel={companyConfig.founder.name}
                    aspectRatio="3/4"
                    variant="soft-green"
                    src={companyConfig.founder.imageSrc}
                    imgFit="cover"
                  />
                </div>
                <div className="founder-profile-card__meta">
                  <h3>{companyConfig.founder.name}</h3>
                  <p className="founder-profile-card__role">{companyConfig.founder.role}</p>
                  <p className="founder-profile-card__subrole">{companyConfig.founder.additionalRole}</p>
                  <div className="founder-profile-card__loc">
                    <MapPin size={15} />
                    <span>{companyConfig.founder.hometown}</span>
                  </div>
                </div>
              </div>

              <div className="founder-profile-card__bio-col">
                <span className="badge" style={{ marginBottom: '0.85rem' }}>
                  Verified Biography
                </span>
                <h2>Committed to Kalahandi &amp; Odisha</h2>
                {companyConfig.founder.bioParagraphs.map((para, i) => (
                  <p key={i} style={{ marginTop: '0.75rem' }}>
                    {para}
                  </p>
                ))}

                <div className="founder-profile-card__education">
                  <h4>
                    <GraduationCap size={18} /> Academic Background
                  </h4>
                  <ul className="feature-list" style={{ marginTop: '0.65rem' }}>
                    {companyConfig.founder.education.map((edu) => (
                      <li key={edu} className="feature-list-item">
                        <span className="feature-list-icon">
                          <CheckCircle2 size={14} />
                        </span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* 4. Verified Business Capabilities (Image-Led Cards) */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Verified Experience"
            title="Multi-Disciplinary Field Capabilities"
          />

          <div className="grid-2">
            {companyConfig.verifiedCapabilities.map((cap) => (
              <Card
                key={cap.title}
                variant={cap.coreSolar ? 'soft-green' : 'outlined'}
                padding="none"
                className="visual-card"
              >
                <div className="visual-card__media">
                  <ImagePlaceholder
                    label={cap.imageLabel}
                    aspectRatio="16/10"
                    variant={cap.coreSolar ? 'white' : 'soft-green'}
                    src={cap.imageSrc}
                    imgFit="cover"
                  />
                </div>
                <div className="visual-card__body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge">
                      {cap.coreSolar ? 'Core Solar & Water' : 'Allied Infrastructure'}
                    </span>
                    <ShieldCheck size={18} color="var(--color-forest-green)" />
                  </div>
                  <h3 className="visual-card__title">{cap.title}</h3>
                  <p className="visual-card__desc">{cap.description}</p>
                  <div className="visual-card__footer" style={{ marginTop: '0.75rem' }}>
                    <Link to={cap.coreSolar ? '/solar-solutions' : '/projects'} className="ui-text-link">
                      <span>{cap.coreSolar ? 'Explore Solutions' : 'View Related Works'}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Field Work Highlights */}
      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="On-Ground Presence"
            title="Project Highlights"
          />

          <div className="grid-3">
            {projectItems.slice(0, 3).map((proj) => (
              <Card key={proj.id} variant="white" padding="none" className="visual-card">
                <div className="visual-card__media">
                  <ImagePlaceholder
                    label="[Project gallery image]"
                    sublabel={proj.title}
                    aspectRatio="4/3"
                    variant="soft-green"
                    src={proj.imageSrc}
                    imgFit="cover"
                  />
                </div>
                <div className="visual-card__body">
                  <span className="project-preview-card__loc">
                    <MapPin size={14} /> {proj.district}
                  </span>
                  <h4 style={{ marginBottom: '0.35rem' }}>{proj.title}</h4>
                  <p style={{ fontSize: 'var(--text-sm)' }}>{proj.description}</p>
                  <div className="visual-card__footer" style={{ marginTop: '0.75rem' }}>
                    <Link to="/projects" className="ui-text-link">
                      <span>View in Projects</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button to="/projects" variant="primary" size="md" iconRight={<ArrowRight size={16} />}>
              Explore Full Projects Portfolio
            </Button>
          </div>
        </Container>
      </section>

      <CTASection
        headline="Speak With a Local Odisha Team You Can Verify."
        supportingCopy="Visit our office at Sargiguda, Narla Road, Kalahandi or request a solar assessment."
        prefillTopic="About Us Page Enquiry"
        image="[Image: rooftop solar installation]"
      />
    </div>
  );
};
