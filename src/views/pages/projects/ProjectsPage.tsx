import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Container } from '@views/components/ui/Container';
import { SectionHeading } from '@views/components/ui/SectionHeading';
import { Card } from '@views/components/ui/Card';
import { Button } from '@views/components/ui/Button';
import { ImagePlaceholder } from '@views/components/ui/ImagePlaceholder';
import { Breadcrumbs } from '@views/components/common/Breadcrumbs';
import { CTASection } from '@views/components/common/CTASection';
import { SEO } from '@views/components/common/SEO';
import { projectItems } from '@models/data/projects';
import { companyConfig } from '@models/data/company';

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
      : projectItems.filter((p) => {
          if (selectedCategory === 'Solar Street Lighting & Community') {
            return (
              p.category === 'Solar Street Lighting & Community' ||
              p.category === 'Solar Street Lighting' ||
              p.category.toLowerCase().includes('street light')
            );
          }
          if (selectedCategory === 'Rooftop & Institutional Solar') {
            return (
              p.category === 'Rooftop & Institutional Solar' ||
              p.category === 'Commercial Rooftop Solar' ||
              p.category === 'Residential Rooftop Solar' ||
              p.category.toLowerCase().includes('rooftop')
            );
          }
          if (selectedCategory === 'Solar Water Pumping') {
            return (
              p.category === 'Solar Water Pumping' ||
              p.category.toLowerCase().includes('pump')
            );
          }
          if (selectedCategory === 'Borewell & Rural Infrastructure') {
            return (
              p.category === 'Borewell & Rural Infrastructure' ||
              p.category.toLowerCase().includes('borewell') ||
              p.category.toLowerCase().includes('tank')
            );
          }
          return p.category === selectedCategory;
        });

  return (
    <div>
      <SEO
        title="Field Projects & Executed Works | Kalahandi (Head Office) & Across Odisha"
        description="Review field-executed projects by Shreshtanshi: solar water pumps, rural drinking water pipelines, rooftop solar, and community infrastructure from our Kalahandi Head Office and Bhubaneswar sub-branch across Odisha."
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
              Solar water pumps, overhead sensor pumps, community water filtration, solar street lights, and structural fabrication across Bhubaneswar, Kalahandi, and all Odisha districts.
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
              <Card key={project.id} variant="white" padding="none" hoverable className="project-card" style={{ borderRadius: '18px', border: '1.5px solid var(--border-medium)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="project-card__media" style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#0B2419', position: 'relative' }}>
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                  <span className="project-card__category">{project.category}</span>
                </div>
                <div className="project-card__body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div className="project-card__meta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-forest-green)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    <MapPin size={14} />
                    <span>{project.location} • {project.district}</span>
                  </div>
                  <h3 className="project-card__title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-green)', lineHeight: 1.3, marginBottom: '0.65rem' }}>
                    {project.title}
                  </h3>
                  <p className="project-card__desc" style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-body)', margin: '0 0 1.25rem', flexGrow: 1 }}>
                    {project.description}
                  </p>
                  <div className="project-card__action" style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
                    <Link to={`/contact?intent=${encodeURIComponent(project.title)}`} className="ui-text-link" style={{ fontWeight: 700 }}>
                      <span>Enquire About This Work</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card variant="outlined" padding="lg" style={{ marginTop: '2.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.6rem' }}>
              Allied Engineering &amp; Community Works
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
        supportingCopy="Speak with our team at our Kalahandi Head Office or our Bhubaneswar sub-branch to evaluate your site."
        prefillTopic="Project Consultation Enquiry"
        image="[Project gallery image]"
      />
    </div>
  );
};
