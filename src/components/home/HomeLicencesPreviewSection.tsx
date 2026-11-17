import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  ExternalLink,
  Award,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { licencesAndCertifications } from '../../data/licencesData';

export const HomeLicencesPreviewSection: React.FC = () => {
  // Select top 3 representative licence and certification credentials
  const previewItems = licencesAndCertifications.slice(0, 3);

  return (
    <section
      className="home-licences-section section bg-white"
      id="licences-certifications-preview"
      style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <Container>
        {/* Header with Title and "View All Licences & Certifications" button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '750px' }}>
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              <ShieldCheck size={14} style={{ marginRight: '0.4rem' }} />
              Official Credentials &amp; Approvals
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)',
                fontWeight: 800,
                color: 'var(--color-forest-green)',
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                marginBottom: '0.85rem',
              }}
            >
              Licences, Registrations &amp; Certifications
            </h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: 'var(--text-body)', margin: 0 }}>
              Officially registered GSTIN enterprise, PM Surya Ghar empaneled vendor, and TPWODL (Tata Power JV) utility-approved solar contractor.
            </p>
          </div>

          <div>
            <Link to="/licences-and-certifications" className="suncharge-pill-btn suncharge-pill-btn--solid">
              <span className="suncharge-pill-btn__text">VIEW ALL LICENCES &amp; CERTIFICATIONS</span>
              <span className="suncharge-pill-btn__circle" aria-hidden="true">
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-first" />
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-second" />
              </span>
            </Link>
          </div>
        </div>

        {/* 3 Compact Preview Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}
        >
          {previewItems.map((item) => (
            <Card
              key={item.id}
              variant="white"
              padding="none"
              hoverable
              style={{
                borderRadius: '20px',
                border: '1.5px solid var(--border-medium)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', backgroundColor: '#0B2419', overflow: 'hidden' }}>
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(23, 75, 53, 0.94)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-forest-green)', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                  <ShieldCheck size={15} />
                  <span>{item.issuingAuthority}</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--color-forest-green)',
                    lineHeight: 1.3,
                    marginBottom: '0.65rem',
                  }}
                >
                  {item.shortTitle}
                </h3>

                {item.registrationNumber && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-forest-green)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Ref: <span style={{ fontFamily: 'monospace' }}>{item.registrationNumber}</span>
                  </div>
                )}

                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flexGrow: 1 }}>
                  {item.description}
                </p>

                <div style={{ paddingTop: '0.85rem', marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link to="/licences-and-certifications" className="ui-text-link" style={{ fontSize: '0.84rem', fontWeight: 700 }}>
                    <span>Inspect Document</span>
                    <ArrowRight size={14} />
                  </Link>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.date}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
