import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sun,
  Droplets,
  Wrench,
  Building,
  Paintbrush,
  Printer,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  MapPin,
  Info,
} from 'lucide-react';
import { Container } from '@views/components/ui/Container';
import { Card } from '@views/components/ui/Card';
import { Button } from '@views/components/ui/Button';
import { Breadcrumbs } from '@views/components/common/Breadcrumbs';
import { CTASection } from '@views/components/common/CTASection';
import { SEO } from '@views/components/common/SEO';
import { ServiceDetailsModal } from './ServiceDetailsModal';
import { companyServices } from '@models/data/services';
import { companyConfig } from '@models/data/company';
import { CompanyService } from '@models/types';

export const ServicesPage: React.FC = () => {
  const categories = [
    'All Solar Services',
    'Rooftop Solar',
    'Solar Water Pumps',
    'Solar Street Lighting',
    'Solar Maintenance',
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>('All Solar Services');
  const [selectedDetailService, setSelectedDetailService] = useState<CompanyService | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#solar-street-lighting' || location.search.toLowerCase().includes('street-light')) {
      setSelectedCategory('Solar Street Lighting');
    } else if (location.hash === '#solar-water-pumps' || location.search.toLowerCase().includes('water-pump')) {
      setSelectedCategory('Solar Water Pumps');
    } else if (location.hash === '#rooftop-solar' || location.search.toLowerCase().includes('rooftop')) {
      setSelectedCategory('Rooftop Solar');
    }
  }, [location]);

  const filteredServices =
    selectedCategory === 'All Solar Services'
      ? companyServices
      : companyServices.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Rooftop Solar':
      case 'Commercial Solar':
        return <Sun size={15} />;
      case 'Solar Water Pumps':
        return <Droplets size={15} />;
      case 'Solar Street Lighting':
        return <Building size={15} />;
      case 'Solar Maintenance':
        return <Wrench size={15} />;
      default:
        return <CheckCircle2 size={15} />;
    }
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'All Solar Services') return companyServices.length;
    return companyServices.filter((s) => s.category === cat).length;
  };

  return (
    <div>
      <SEO
        title="Solar Services — Rooftop Solar, Solar Pumps & Street Lights | Shresthanshi Solar Solutions"
        description="Comprehensive solar engineering services by Shresthanshi Solar Solutions (Prop. Mrs. Sinjita Shikha Mohapatra): residential & commercial rooftop solar, solar water pump controllers, community sensor pumping, street lights, and AMC care across Odisha."
        canonicalPath="/services"
      />

      <Breadcrumbs items={[{ label: 'Our Solar Services' }]} />

      {/* Page Hero */}
      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Turnkey Solar Engineering • Kalahandi &amp; Across Odisha
            </span>
            <h1 className="page-hero__title">
              Complete Solar Energy Services &amp; Solutions.
            </h1>
            <p className="page-hero__subtitle">
              M/s Shreshtanshi Construction &amp; Suppliers (Shresthanshi Solar Solutions) delivers field-tested rooftop solar systems, solar agricultural pump controllers, automated overhead sensor pumps, and street lighting installations engineered for Odisha.
            </p>
            <div className="page-hero__actions">
              <Button
                to="/contact?intent=service-consultation"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                Request Solar Consultation
              </Button>
              <Button to="/projects" variant="outline" size="lg">
                View Solar Projects
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1.5px solid var(--border-medium)',
                aspectRatio: '16/10',
                backgroundColor: 'var(--color-white)',
              }}
            >
              <img
                src="/images/agricultural-tubewell-borewell.jpg"
                alt="Agricultural solar and borewell infrastructure by Shreshtanshi"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Verification Notice Banner */}
      <section style={{ backgroundColor: 'var(--color-white)', padding: '1.25rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <Container>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-forest-green)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <ShieldCheck size={18} />
              <span>
                <strong>Verified Enterprise Contractor:</strong> Registered GSTIN: {companyConfig.gstin} • Kalahandi (Head Office) • Bhubaneswar Sub-Branch
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={15} /> Statewide Execution Across Odisha
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileCheck2 size={15} /> Swachh Bharat &amp; DWSM Partner
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Showcase */}
      <section className="section bg-soft-green">
        <Container>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>
              Complete Services Portfolio
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', marginBottom: '0.75rem', color: 'var(--color-forest-green)' }}>
              Our Turnkey Solar &amp; Clean Energy Services
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-body)', lineHeight: 1.65 }}>
              Explore our certified engineering services across Odisha — spanning on-grid rooftop solar plants, agricultural irrigation pumps, community drinking water systems, and long-term maintenance.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="filter-tabs" role="tablist" aria-label="Service categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`filter-tab ${selectedCategory === cat ? 'filter-tab--active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <span className="filter-tab__count">{getCategoryCount(cat)}</span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="service-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--color-white)',
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-medium)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 18px rgba(23, 75, 53, 0.05)',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
                }}
              >
                {/* Image Header */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: 'var(--color-soft-green)' }}>
                  <img
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  {/* Category Badge on Top-Left */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      color: 'var(--color-forest-green)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {getCategoryIcon(service.category)}
                    <span>{service.category}</span>
                  </div>

                  {/* Quick Details Icon Pill on Top-Right */}
                  <button
                    type="button"
                    onClick={() => setSelectedDetailService(service)}
                    title={`View Technical Scope & Details for ${service.title}`}
                    aria-label={`View full scope and specifications for ${service.title}`}
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      color: 'var(--color-forest-green)',
                      border: '1px solid rgba(23, 75, 53, 0.15)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Info size={14} />
                    <span>Details</span>
                  </button>
                </div>

                {/* Body */}
                <div style={{ padding: '1.35rem 1.35rem 1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--color-forest-green)',
                      marginBottom: '0.35rem',
                      opacity: 0.9,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={service.specsOrHighlight}
                  >
                    {service.specsOrHighlight}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: 'var(--color-forest-green)',
                      marginBottom: '0.45rem',
                      minHeight: '3.1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      color: 'var(--text-body)',
                      marginBottom: '0.9rem',
                      minHeight: '4.1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Actions Footer */}
                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedDetailService(service)}
                      className="service-card__details-btn"
                      title={`View full technical scope and specifications for ${service.title}`}
                    >
                      <Info size={14} />
                      <span>Scope &amp; Technical Details</span>
                    </button>

                    <Link
                      to={service.actionPath}
                      className="end-to-end-card__btn"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>{service.actionText}</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Details Modal Popup */}
          <ServiceDetailsModal
            service={selectedDetailService}
            onClose={() => setSelectedDetailService(null)}
          />
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Need a Custom Solar Assessment or System Quotation?"
        supportingCopy="Our engineering team at our Kalahandi Head Office and Bhubaneswar sub-branch will review your rooftop space, monthly electricity bills, or agricultural pump specifications to design the optimal solar system."
        prefillTopic="Solar Services Enquiry"
      />
    </div>
  );
};
