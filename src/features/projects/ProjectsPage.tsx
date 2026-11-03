import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { projectItems } from '../../data/projects';
import { companyConfig } from '../../data/company';

export const ProjectsPage: React.FC = () => {
  const categories = [
    'All',
    'Solar Water Pumping',
    'Solar Street Lighting & Community',
    'Rooftop & Institutional Solar',
    'Borewell & Rural Infrastructure',
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projectItems
      : projectItems.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <SEO
        title="Field Projects & Executed Works in Kalahandi & Odisha"
        description="Review field-executed projects by Shreshtanshi: solar water pumps, rural drinking water pipelines, tubewell drilling, and community infrastructure."
        canonicalPath="/projects"
      />
      <Breadcrumbs items={[{ label: 'Our Projects' }]} />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Field Execution Across Odisha
            </span>
            <h1 className="page-hero__title">
              Solar, Water &amp; Infrastructure Projects.
            </h1>
            <p className="page-hero__subtitle">
              Solar water pumps, overhead sensor pumps, community water filtration, solar street lights, and structural fabrication in Kalahandi and across Odisha.
            </p>
            <div className="page-hero__actions">
              <Button
                to="/contact?intent=project-enquiry"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                Get a Solar Assessment
              </Button>
              <Button to="/gallery" variant="outline" size="lg">
                View Photo Gallery
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Project gallery image]"
              sublabel="Odisha Solar & Water Infrastructure Portfolio"
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
            eyebrow="Portfolio Categories"
            title="Executed Works &amp; Capabilities"
          />

          <div className="filter-tabs" role="tablist" aria-label="Project categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`filter-tab ${selectedCategory === cat ? 'filter-tab--active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-2" key={selectedCategory}>
            {filteredProjects.map((project) => (
              <Card key={project.id} variant="soft-green" padding="none" hoverable className="project-card">
                <div className="project-card__media">
                  <ImagePlaceholder
                    label={project.image}
                    sublabel={project.title}
                    aspectRatio="16/10"
                    variant="white"
                    src={project.imageSrc}
                    imgFit={
                      project.id === 'proj-borewell-irrigation-odisha' ||
                      project.id === 'proj-solar-street-lighting'
                        ? 'contain'
                        : 'cover'
                    }
                  />
                  <span className="project-card__category">{project.category}</span>
                </div>
                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span>
                      <MapPin size={15} /> {project.location} • {project.district}
                    </span>
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__scope">
                    <ul className="feature-list">
                      {project.scope.map((item) => (
                        <li key={item} className="feature-list-item">
                          <span className="feature-list-icon"><CheckCircle2 size={13} /></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-card__verified">
                    <ShieldCheck size={15} />
                    <span>{project.verifiedSource}</span>
                  </div>
                  <div className="project-card__action" style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <Link to={`/contact?intent=${encodeURIComponent(project.title)}`} className="ui-text-link">
                      <span>Enquire About This Work</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card variant="outlined" padding="lg" style={{ marginTop: '2.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.6rem' }}>
              Additional Verified Works (shresthanshi.com)
            </span>
            <h3>Allied Fabrication &amp; Public Utility Works</h3>
            <p style={{ marginTop: '0.4rem' }}>
              Alongside solar and borewell works, <strong>{companyConfig.legalName}</strong> executes metal and iron furniture fabrication in Kalahandi, Swachh Bharat Mission wall-painting campaigns (Jajpur, Sundargarh, Kalahandi), and institutional printing (DWSM Rourkela).
            </p>
          </Card>
        </Container>
      </section>

      <CTASection
        headline="Planning a Solar or Water Project in Odisha?"
        supportingCopy="Speak with our team in Sargiguda, Kalahandi to evaluate your site."
        prefillTopic="Project Consultation Enquiry"
        image="[Project gallery image]"
      />
    </div>
  );
};
