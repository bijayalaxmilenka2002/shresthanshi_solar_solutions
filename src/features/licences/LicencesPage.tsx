import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Award,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Calendar,
  MapPin,
  Building2,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO } from '../../components/common/SEO';
import { Modal } from '../../components/ui/Modal';
import { CTASection } from '../../components/common/CTASection';
import { licencesAndCertifications, LicenceItem } from '../../data/licencesData';
import { companyConfig } from '../../data/company';

export const LicencesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDoc, setSelectedDoc] = useState<LicenceItem | null>(null);

  const categories = [
    'All',
    'Registration & Tax',
    'Government Empanelment',
    'DISCOM Accreditations',
    'Awards & Recognitions',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? licencesAndCertifications
      : licencesAndCertifications.filter((item) => item.category === selectedCategory);

  return (
    <div className="licences-page">
      <SEO
        title="Official Licences, Registrations & Certifications | Shreshtanshi Solar Solutions"
        description="Review official GSTIN registration, PM Surya Ghar empanelment, TPWODL utility aggregation agreements, and DISCOM certificates of appreciation for Shreshtanshi Solar Solutions."
        canonicalPath="/licences-and-certifications"
      />

      <Breadcrumbs items={[{ label: 'Licences & Certifications' }]} />

      {/* Hero Section */}
      <section className="page-hero bg-soft-green">
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Official Accreditations &amp; Compliance
            </span>
            <h1 className="page-hero__title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
              Licences, Registrations &amp; Certifications.
            </h1>
            <p
              className="page-hero__subtitle"
              style={{
                fontSize: 'clamp(1.05rem, 1.35vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'var(--text-body)',
                marginTop: '1rem',
              }}
            >
              Transparency and compliance are foundational to our work. Review our verified government registrations, national portal empanelments, TPWODL DISCOM utility agreements, and official certificates of appreciation.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="section bg-white" style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem' }}>
        <Container>
          {/* Header & Filter Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '2.5rem',
            }}
          >
            <div>
              <SectionHeading
                eyebrow="Verified Documentation"
                title="Official Accreditations Directory"
                subtitle="Select a category to inspect verified government documents, DISCOM approvals, and performance certificates."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1.5px solid',
                    borderColor: selectedCategory === cat ? 'var(--color-forest-green)' : 'var(--border-medium)',
                    backgroundColor: selectedCategory === cat ? 'var(--color-forest-green)' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-forest-green)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Licences Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.75rem',
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
                  borderRadius: '18px',
                  border: '1.5px solid var(--border-medium)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Image Frame */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 11',
                    backgroundColor: '#0E291D',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    loading="lazy"
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      backgroundColor: 'rgba(23, 75, 53, 0.94)',
                      color: '#FFFFFF',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {item.badge}
                  </span>
                  <button
                    type="button"
                    title="Enlarge Document"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDoc(item);
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--color-forest-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(23, 75, 53, 0.15)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                    }}
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>

                {/* Card Body */}
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1.25rem 1.4rem 1.15rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem', fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase' }}>
                    <ShieldCheck size={14} />
                    <span>{item.issuingAuthority}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--color-forest-green)',
                      lineHeight: 1.35,
                      marginBottom: '0.65rem',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Metadata Specs Box */}
                  <div
                    style={{
                      backgroundColor: '#F8FAF8',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '0.65rem 0.85rem',
                      marginBottom: '0.85rem',
                      fontSize: '0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                    }}
                  >
                    {item.registrationNumber && (
                      <div>
                        <strong>Reg / Ref:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{item.registrationNumber}</span>
                      </div>
                    )}
                    {item.validity && (
                      <div>
                        <strong>Status / Validity:</strong> <span style={{ color: 'var(--color-forest-green)', fontWeight: 600 }}>{item.validity}</span>
                      </div>
                    )}
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: '1rem', flexGrow: 1 }}>
                    {item.description}
                  </p>

                  {/* Card Action Footer */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border-subtle)',
                      marginTop: 'auto',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                      <span>Inspect Document</span>
                      <ArrowRight size={14} />
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {item.date}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Verified Guarantee Banner */}
          <div
            style={{
              marginTop: '3.5rem',
              backgroundColor: 'var(--color-soft-green)',
              borderRadius: '20px',
              border: '1.5px solid var(--border-medium)',
              padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', maxWidth: '780px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-forest-green)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Building2 size={26} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.3rem' }}>
                  Need a Copy of Our Empanelment or GSTIN for Official Tenders?
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
                  Contact our compliance desk directly for verified tender documents, net-metering credentials, GST tax invoices, and state utility vendor certificates.
                </p>
              </div>
            </div>
            <div>
              <Button
                href={companyConfig.contact.primaryPhoneHref}
                variant="primary"
                size="md"
                iconLeft={<Phone size={16} />}
              >
                Call {companyConfig.contact.primaryPhoneDisplay}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Lightbox Modal */}
      {selectedDoc && (
        <Modal
          isOpen={Boolean(selectedDoc)}
          onClose={() => setSelectedDoc(null)}
          maxWidth="780px"
          titleId="licence-modal-title"
          className="award-lightbox-modal"
        >
          <div className="award-modal-content">
            <div className="award-modal-media">
              <img src={selectedDoc.imageSrc} alt={selectedDoc.imageAlt} className="award-modal-img" />
              <span className="award-modal-badge">{selectedDoc.badge}</span>
            </div>

            <div className="award-modal-info">
              <div className="award-modal-meta-row">
                <span className="award-modal-authority">
                  <ShieldCheck size={16} />
                  <strong>{selectedDoc.issuingAuthority}</strong>
                </span>
                {selectedDoc.registrationNumber && (
                  <span className="award-modal-pill">
                    <strong>Ref:</strong> {selectedDoc.registrationNumber}
                  </span>
                )}
                {selectedDoc.date && (
                  <span className="award-modal-pill">
                    <Calendar size={14} /> {selectedDoc.date}
                  </span>
                )}
              </div>

              <h2 id="licence-modal-title" className="award-modal-title">
                {selectedDoc.title}
              </h2>

              <p className="award-modal-desc">{selectedDoc.description}</p>

              <div className="award-modal-highlights-card">
                <h4>
                  <FileCheck2 size={16} /> Verified Key Compliance Points
                </h4>
                <ul>
                  {selectedDoc.highlights.map((hl, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="award-modal-actions">
                <a
                  href={selectedDoc.imageSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn ui-btn--primary ui-btn--md"
                >
                  <ExternalLink size={16} />
                  <span>Open Full Resolution Document</span>
                </a>
                <button
                  type="button"
                  className="ui-btn ui-btn--outline ui-btn--md"
                  onClick={() => setSelectedDoc(null)}
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Bottom CTA */}
      <CTASection
        headline="Work with a Fully Certified &amp; Empaneled Solar Team."
        supportingCopy="Registered GSTIN enterprise prioritizing Bhubaneswar headquarters and an established department in Kalahandi."
        primaryLabel="Schedule Site Assessment"
        secondaryLabel={`Call ${companyConfig.contact.primaryPhoneDisplay}`}
      />
    </div>
  );
};
