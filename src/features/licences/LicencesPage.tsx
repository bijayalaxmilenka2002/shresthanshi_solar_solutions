import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Award,
  CheckCircle2,
  Maximize2,
  Calendar,
  Building2,
  ArrowRight,
  ExternalLink,
  Download,
  X,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO } from '../../components/common/SEO';
import { Modal } from '../../components/ui/Modal';
import { CTASection } from '../../components/common/CTASection';
import { licencesAndCertifications, LicenceItem } from '../../data/licencesData';

export const LicencesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDoc, setSelectedDoc] = useState<LicenceItem | null>(null);

  const categories = [
    'All',
    'DISCOM Empanelment',
    'Government & MSME',
    'Quality Standards',
    'Awards & Honors',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? licencesAndCertifications
      : licencesAndCertifications.filter((item) => item.category === selectedCategory);

  return (
    <div className="licences-page" style={{ backgroundColor: '#F9FBF9', minHeight: '100vh' }}>
      <SEO
        title="Official Licences, Registrations & Certifications | Shresthanshi Solar Solutions"
        description="Official government licences, TPCODL PM Surya Ghar empanelment order, ISO 9001:2015 quality certificate, UDYAM MSME, and GSTIN registration of Shreshtanshi Construction and Suppliers."
        canonicalPath="/licences-and-certifications"
      />

      <Breadcrumbs items={[{ label: 'Licences & Certifications' }]} />

      {/* Hero Section */}
      <section className="page-hero bg-soft-green" style={{ padding: '3.5rem 0 3rem' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              <ShieldCheck size={14} style={{ marginRight: '0.35rem' }} />
              Verified Government &amp; DISCOM Accreditations
            </span>
            <h1 className="page-hero__title" style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', color: 'var(--color-forest-green)' }}>
              Official Licences &amp; Certifications
            </h1>
            <p
              className="page-hero__subtitle"
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                lineHeight: 1.65,
                color: 'var(--text-body)',
                marginTop: '0.85rem',
              }}
            >
              Excellence backed by verifiable credentials. Review our official TPCODL PM Surya Ghar vendor empanelment order, ISO 9001:2015 quality certification, UDYAM MSME registration, and central GSTIN certificate.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Licences Gallery Section */}
      <section className="section" style={{ paddingTop: '2.5rem', paddingBottom: '4.5rem' }}>
        <Container>
          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: selectedCategory === cat ? 'var(--color-forest-green)' : 'var(--border-medium)',
                  backgroundColor: selectedCategory === cat ? 'var(--color-forest-green)' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-forest-green)',
                  transition: 'all 0.15s ease',
                  boxShadow: selectedCategory === cat ? '0 2px 8px rgba(23,75,53,0.2)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image-First Document Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch',
            }}
          >
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                variant="white"
                padding="none"
                hoverable
                onClick={() => setSelectedDoc(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-medium)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 18px rgba(23, 75, 53, 0.04)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                }}
              >
                {/* Visual Certificate Frame (Prominent Image Showcase) */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1.25',
                    backgroundColor: '#F3F6F4',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.6rem',
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
                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s ease',
                    }}
                    loading="lazy"
                  />

                  {/* Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      backgroundColor: 'rgba(23, 75, 53, 0.92)',
                      color: '#FFFFFF',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}
                  >
                    {item.badge}
                  </span>

                  {/* Enlarge Trigger Button */}
                  <div
                    title="Click to Enlarge"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--color-forest-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(23, 75, 53, 0.2)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>

                {/* Minimalist, Clean Card Footer with Crisp Metadata */}
                <div
                  style={{
                    padding: '1.15rem 1.25rem 1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                  }}
                >
                  {/* Authority line */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#15803D',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      marginBottom: '0.35rem',
                    }}
                  >
                    <ShieldCheck size={13} style={{ flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.issuingAuthority}
                    </span>
                  </div>

                  {/* Document Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: 'var(--color-forest-green)',
                      lineHeight: 1.3,
                      margin: '0 0 0.45rem 0',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Document Number / Reference */}
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

                  {/* Bottom Strip: Validity & Enlarge Button */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.65rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {item.validityOrDate}
                    </span>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        color: 'var(--color-forest-green)',
                      }}
                    >
                      <span>Inspect</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Full-Screen Lightbox Modal for Inspection */}
      {selectedDoc && (
        <Modal
          isOpen={Boolean(selectedDoc)}
          onClose={() => setSelectedDoc(null)}
          maxWidth="900px"
        >
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            {/* Meta Header */}
            <div
              style={{
                backgroundColor: 'var(--color-soft-green)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.25rem',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {selectedDoc.issuingAuthority}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                  {selectedDoc.documentNumber}
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  backgroundColor: '#FFFFFF',
                  color: '#15803D',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  border: '1px solid #86EFAC',
                }}
              >
                {selectedDoc.validityOrDate}
              </span>
            </div>

            {/* High-Resolution Document Image */}
            <div
              style={{
                maxHeight: '75vh',
                overflowY: 'auto',
                borderRadius: '10px',
                border: '1px solid var(--border-medium)',
                backgroundColor: '#FAFAFA',
                padding: '0.5rem',
              }}
            >
              <img
                src={selectedDoc.imageSrc}
                alt={selectedDoc.imageAlt}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '6px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>

            {/* Summary & Actions */}
            <div
              style={{
                marginTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-body)', textAlign: 'left', flex: 1, minWidth: '220px' }}>
                {selectedDoc.summary}
              </p>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <a
                  href={selectedDoc.imageSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: 'var(--color-forest-green)',
                    color: '#FFFFFF',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={14} />
                  <span>Open Full Size</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Reassurance CTA */}
      <CTASection
        headline="Partner With a Fully Certified Solar EPC Enterprise."
        supportingCopy="All rooftop solar, agricultural pump, and grid infrastructure projects are executed strictly in compliance with MNRE guidelines and state DISCOM standards."
        primaryLabel="Schedule Solar Consultation"
        secondaryLabel="Direct Helpline"
      />
    </div>
  );
};
