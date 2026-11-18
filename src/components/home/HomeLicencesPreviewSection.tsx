import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { licencesAndCertifications } from '../../data/licencesData';

export const HomeLicencesPreviewSection: React.FC = () => {
  // Top 3 representative credentials (TPCODL Registration, TPCODL Empanelment, ISO 9001)
  const previewItems = licencesAndCertifications.slice(0, 3);

  return (
    <section
      className="home-licences-section section bg-white"
      id="licences-certifications-preview"
      style={{ paddingTop: '4rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <Container>
        {/* Header with Title and "View All Licences & Certifications" button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '2rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '750px' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} style={{ marginRight: '0.35rem' }} />
              Verifiable Government &amp; DISCOM Accreditations
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
                fontWeight: 800,
                color: 'var(--color-forest-green)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '0.65rem',
              }}
            >
              Licences, Registrations &amp; Certifications
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>
              Official PM Surya Ghar vendor registration by TPCODL (Tata Power JV), ISO 9001:2015 quality certification, UDYAM MSME, and GSTIN registered enterprise.
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

        {/* 3 Visual Image-Forward Cards (Little Text, More Image) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
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
                borderRadius: '18px',
                border: '1.5px solid var(--border-medium)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(23, 75, 53, 0.04)',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
              }}
            >
              <Link
                to="/licences-and-certifications"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Visual Certificate Frame */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1.22',
                    backgroundColor: '#F3F6F4',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.65rem',
                  }}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s ease',
                    }}
                    loading="lazy"
                  />

                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(23, 75, 53, 0.94)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  >
                    {item.badge}
                  </span>

                  <div
                    title="Inspect Document"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--color-forest-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(23, 75, 53, 0.2)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    <Maximize2 size={14} />
                  </div>
                </div>

                {/* Minimal Text Footer */}
                <div style={{ padding: '1.15rem 1.35rem 1.15rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: '#15803D',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      marginBottom: '0.35rem',
                    }}
                  >
                    <ShieldCheck size={13} style={{ flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.issuingAuthority}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.02rem',
                      fontWeight: 800,
                      color: 'var(--color-forest-green)',
                      lineHeight: 1.3,
                      margin: '0 0 0.45rem 0',
                    }}
                  >
                    {item.title}
                  </h3>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <code
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--color-forest-green)',
                        backgroundColor: 'var(--color-soft-green)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '5px',
                        display: 'inline-block',
                        wordBreak: 'break-all',
                      }}
                    >
                      {item.documentNumber}
                    </code>
                  </div>

                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.65rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {item.validityOrDate}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: 'var(--color-forest-green)',
                      }}
                    >
                      <span>Inspect</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
