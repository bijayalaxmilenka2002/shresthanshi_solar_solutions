import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  TreePine,
  Sprout,
  Waves,
  Zap,
  Building2,
  Phone,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO } from '../../components/common/SEO';
import { CTASection } from '../../components/common/CTASection';
import { companyConfig } from '../../data/company';

export const GovernmentSectorPage: React.FC = () => {
  return (
    <div className="government-sector-page">
      <SEO
        title="Government & Public Sector Solar Projects — Agro Odisha & Forest Department"
        description="Explore Shreshtanshi's government collaborations with Agro Odisha and the Forest Department: solar water pumps, solar irrigation, plantation support, and solar fencing for elephant protection."
        canonicalPath="/who-we-serve/government"
      />

      <Breadcrumbs
        items={[
          { label: 'Who We Serve', path: '/who-we-serve' },
          { label: 'Government & Public Sector' },
        ]}
      />

      {/* Hero Section */}
      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Government Collaborations &amp; Public Sector
            </span>
            <h1 className="page-hero__title" style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.1rem)' }}>
              Solar Infrastructure for Agro Odisha &amp; Forest Department.
            </h1>
            <p className="page-hero__subtitle">
              Delivering high-reliability solar energy engineering for state agricultural development, forestry water management, afforestation nurseries, and wildlife conflict mitigation across Odisha.
            </p>
            <div className="page-hero__actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Button href="#agro-odisha" variant="primary" size="md">
                Agro Odisha Projects
              </Button>
              <Button href="#forest-department" variant="outline" size="md">
                Forest Department Services
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(23, 75, 53, 0.12)',
                border: '1.5px solid var(--border-medium)',
              }}
            >
              <img
                src="/images/government/solar-water-pump-forest.jpg"
                alt="Solar Water Pumping Installation for Forest Water Management in Odisha"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '16/11' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Overview Stat Strip */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-subtle)', padding: '1.75rem 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1.8rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                Agro Odisha
              </strong>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-body)', fontWeight: 600 }}>
                Agricultural Solar Irrigation Partner
              </span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.8rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                Forest Dept
              </strong>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-body)', fontWeight: 600 }}>
                Wildlife &amp; Forestry Infrastructure
              </span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.8rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                Non-Lethal
              </strong>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-body)', fontWeight: 600 }}>
                Solar Elephant Protection Fencing
              </span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.8rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                100% Empaneled
              </strong>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-body)', fontWeight: 600 }}>
                GSTIN &amp; Tender Quality Compliant
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 1: Government — Agro Odisha */}
      <section id="agro-odisha" className="section bg-soft-green" style={{ paddingTop: '4rem', paddingBottom: '4.5rem' }}>
        <Container>
          <div className="split-showcase">
            <div className="split-showcase__content">
              <span className="badge" style={{ marginBottom: '0.85rem' }}>
                <Sprout size={14} style={{ marginRight: '0.35rem' }} />
                Government Initiative — Agricultural Sector
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--color-forest-green)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.25 }}>
                Government – Agro Odisha
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Shreshtanshi Solar Solutions actively supports <strong>Agro Odisha</strong> programs by deploying robust solar energy and deep borewell irrigation systems designed specifically for agrarian communities across rural Odisha.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[
                  'Turnkey Solar-Powered Agricultural Irrigation Systems for smallholder and community farmlands.',
                  'Dual-Mode DC/AC Solar Water Pump Controllers providing uninterrupted daytime irrigation without costly diesel fuel.',
                  'Integration with government subsidies and agricultural assistance schemes for verified farmers.',
                  'Complete civil foundations, galvanized anti-theft module mounting structures, and lightning protection.',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={17} style={{ color: 'var(--color-forest-green)', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/solar-solutions/solar-water-pumps" variant="primary" size="md" iconRight={<ArrowRight size={16} />}>
                  Explore Solar Water Pumps
                </Button>
                <Button href={`tel:${companyConfig.contact.primaryPhone}`} variant="outline" size="md" iconLeft={<Phone size={16} />}>
                  Speak with Agri Solar Engineer
                </Button>
              </div>
            </div>

            <div className="split-showcase__media">
              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(23, 75, 53, 0.12)',
                  border: '1.5px solid var(--border-medium)',
                }}
              >
                <img
                  src="/images/government/solar-irrigation-agro.jpg"
                  alt="Solar Irrigation System in Agricultural Land — Agro Odisha Projects"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }}
                />
                <div style={{ padding: '1rem 1.25rem', backgroundColor: '#FFFFFF' }}>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-forest-green)' }}>
                    Agro Odisha Solar Irrigation
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Solar-powered furrow &amp; sprinkler irrigation in agricultural farmlands.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: Government — Forest Department */}
      <section id="forest-department" className="section bg-white" style={{ paddingTop: '4.5rem', paddingBottom: '5rem' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              <TreePine size={14} style={{ marginRight: '0.35rem' }} />
              Forestry &amp; Wildlife Conservation
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-forest-green)', fontWeight: 800, marginBottom: '1rem' }}>
              Government – Forest Department
            </h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Providing specialized, mission-critical solar solutions tailored to the environmental, plantation, and wildlife management requirements of the Odisha Forest Department.
            </p>
          </div>

          {/* 4 Core Forest Department Services Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Service 1: Solar Water Pumps */}
            <Card variant="white" padding="none" hoverable style={{ borderRadius: '18px', border: '1.5px solid var(--border-medium)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', aspectRatio: '16/11', overflow: 'hidden', backgroundColor: '#0B2419' }}>
                <img
                  src="/images/government/solar-water-pump-forest.jpg"
                  alt="Solar Water Pumps for Forest & Water Management"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-forest-green)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Waves size={15} />
                  <span>Activity 01 • Water Management</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                  1. Solar Water Pumps
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem', flexGrow: 1 }}>
                  Solar-powered water pumping solutions engineered for forest reserves, wildlife water bodies, and departmental water management requirements in remote, off-grid ecological zones.
                </p>
                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--color-forest-green)', fontWeight: 600 }}>
                  ✓ Continuous water replenishment for wildlife
                </div>
              </div>
            </Card>

            {/* Service 2: Solar Irrigation Systems */}
            <Card variant="white" padding="none" hoverable style={{ borderRadius: '18px', border: '1.5px solid var(--border-medium)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', aspectRatio: '16/11', overflow: 'hidden', backgroundColor: '#0B2419' }}>
                <img
                  src="/images/government/solar-irrigation-agro.jpg"
                  alt="Solar Irrigation Systems for Plantation & Agriculture"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-forest-green)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Sprout size={15} />
                  <span>Activity 02 • Green Canopy</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                  2. Solar Irrigation Systems
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem', flexGrow: 1 }}>
                  Solar-powered irrigation solutions designed to support agricultural fringe zones, silviculture plots, and nursery plantation activities with automated daytime water delivery.
                </p>
                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--color-forest-green)', fontWeight: 600 }}>
                  ✓ Drip &amp; furrow solar water systems
                </div>
              </div>
            </Card>

            {/* Service 3: Plantation Support */}
            <Card variant="white" padding="none" hoverable style={{ borderRadius: '18px', border: '1.5px solid var(--border-medium)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', aspectRatio: '16/11', overflow: 'hidden', backgroundColor: '#0B2419' }}>
                <img
                  src="/images/government/solar-plantation-support.jpg"
                  alt="Solar-Powered Plantation Support and Afforestation"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-forest-green)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <TreePine size={15} />
                  <span>Activity 03 • Afforestation</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                  3. Plantation Support
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem', flexGrow: 1 }}>
                  Solar-powered infrastructure supporting large-scale afforestation campaigns, departmental tree nurseries, and intensive plantation activities throughout western and southern Odisha.
                </p>
                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--color-forest-green)', fontWeight: 600 }}>
                  ✓ Solar energy for nursery greenhouses &amp; saplings
                </div>
              </div>
            </Card>

            {/* Service 4: Solar Fencing for Elephant Protection */}
            <Card id="elephant-fencing" variant="white" padding="none" hoverable style={{ borderRadius: '18px', border: '2px solid var(--color-forest-green)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', aspectRatio: '16/11', overflow: 'hidden', backgroundColor: '#0B2419', position: 'relative' }}>
                <img
                  src="/images/government/solar-fencing-elephant-protection.jpg"
                  alt="Solar Fencing for Elephant Protection and Wildlife Mitigation"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(23, 75, 53, 0.95)', color: '#FFFFFF', fontSize: '0.74rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '999px', textTransform: 'uppercase' }}>
                  Wildlife Protection Focus
                </span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-forest-green)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Zap size={15} />
                  <span>Activity 04 • Human-Wildlife Mitigation</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                  4. Solar Fencing for Elephant Protection
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem', flexGrow: 1 }}>
                  High-tensile, non-lethal solar fencing solutions designed to prevent elephant movement into vulnerable human settlements and agricultural farmlands, effectively mitigating human-elephant conflict while preserving wildlife safety.
                </p>
                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--color-forest-green)', fontWeight: 600 }}>
                  ✓ Non-lethal pulsed energizer technology
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Technical Standards & Tender Readiness */}
      <section className="section bg-soft-green" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <span className="badge" style={{ marginBottom: '0.75rem' }}>
                Institutional Quality &amp; Compliance
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.75rem' }}>
                Departmental Standards &amp; Tender Execution.
              </h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                M/s Shreshtanshi Construction &amp; Suppliers operates under strict adherence to state and central tender norms, electrical safety guidelines, anti-theft galvanization protocols, and environmental impact assessments.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { title: 'Registered GSTIN Enterprise', desc: '21AVUPM9359D1Z6 — Full tax and billing compliance for institutional tenders.' },
                { title: 'In-House Fabrication & Assembly', desc: 'Galvanized iron poles, anti-theft battery enclosures, and robust field foundations.' },
                { title: 'Dedicated Field Maintenance Team', desc: 'On-ground operational support across Kalahandi, Balangir, Koraput, and western Odisha.' },
              ].map((spec, i) => (
                <div key={i} style={{ backgroundColor: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-medium)' }}>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-forest-green)', marginBottom: '0.2rem' }}>
                    {spec.title}
                  </strong>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    {spec.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        headline="Collaborate on Public Sector &amp; Environmental Solar Projects."
        supportingCopy="Connect with our institutional project engineers at our Kalahandi Head Office and Bhubaneswar sub-branch for tender inquiries and technical site evaluations."
        primaryLabel="Consult Government Project Desk"
        secondaryLabel={`Call ${companyConfig.contact.primaryPhoneDisplay}`}
      />
    </div>
  );
};
