import React, { useState } from 'react';
import {
  Quote,
  Star,
  ShieldCheck,
  CheckCircle2,
  Send,
  Building2,
  Home,
  Sprout,
  TreePine,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO } from '../../components/common/SEO';
import { CTASection } from '../../components/common/CTASection';
import { companyConfig } from '../../data/company';
import { UnifiedLead, saveLead } from '../../services/enquiryService';

type TestimonialCategory = 'All' | 'Residential Rooftop' | 'Agricultural Solar Pumps' | 'Commercial & Institutional' | 'Government Projects';

interface TestimonialPlaceholderSlot {
  id: string;
  category: 'Residential Rooftop' | 'Agricultural Solar Pumps' | 'Commercial & Institutional' | 'Government Projects';
  segmentTitle: string;
  locationScope: string;
  systemHighlight: string;
  statusBadge: string;
  verificationBadge: string;
}

const placeholderSlots: TestimonialPlaceholderSlot[] = [
  {
    id: 'res-slot-1',
    category: 'Residential Rooftop',
    segmentTitle: 'PM Surya Ghar Residential Rooftop Customer',
    locationScope: 'Bhubaneswar / Khordha, Odisha',
    systemHighlight: '3 kW – 5 kW Grid-Tied On-Grid Net-Meter Installation',
    statusBadge: 'Verified PM Surya Ghar Beneficiary',
    verificationBadge: 'DISCOM Net-Meter Synchronized',
  },
  {
    id: 'res-slot-2',
    category: 'Residential Rooftop',
    segmentTitle: 'Urban Independent Residence Solar Client',
    locationScope: 'Bhawanipatna / Kalahandi, Odisha',
    systemHighlight: '3 kW DCR Solar Array with PM Surya Ghar Subsidy',
    statusBadge: 'Verified Residential System',
    verificationBadge: 'TPWODL Utility Connected',
  },
  {
    id: 'agri-slot-1',
    category: 'Agricultural Solar Pumps',
    segmentTitle: 'Agricultural Borewell Solar Pump Farmer',
    locationScope: 'Narla Road / Kalahandi, Odisha',
    systemHighlight: '5 HP Dual-Mode DC/AC Solar Pumping & Irrigation Array',
    statusBadge: 'Daytime Farm Irrigation',
    verificationBadge: 'Zero Diesel Operation',
  },
  {
    id: 'agri-slot-2',
    category: 'Agricultural Solar Pumps',
    segmentTitle: 'Farmland Solar Irrigation Beneficiary',
    locationScope: 'Balangir District, Odisha',
    systemHighlight: 'Solar Water Pump with Automated Water Level Controller',
    statusBadge: 'Verified Agricultural Execution',
    verificationBadge: 'Continuous Water Supply',
  },
  {
    id: 'comm-slot-1',
    category: 'Commercial & Institutional',
    segmentTitle: 'Commercial Three-Phase Solar Client',
    locationScope: 'Industrial & Institutional Sector, Odisha',
    systemHighlight: '15 kW – 30 kW High-Efficiency Commercial Power Plant',
    statusBadge: 'Commercial Net-Meter Plant',
    verificationBadge: 'High-Capacity Generation',
  },
  {
    id: 'govt-slot-1',
    category: 'Government Projects',
    segmentTitle: 'Public & Environmental Solar Infrastructure',
    locationScope: 'Forest Department / Agro Odisha Programs',
    systemHighlight: 'Solar Water Pumping & Non-Lethal Wildlife Protection Fencing',
    statusBadge: 'Government Sector Execution',
    verificationBadge: 'Institutional Quality Assured',
  },
];

export const TestimonialsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TestimonialCategory>('All');
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const [feedbackProject, setFeedbackProject] = useState('');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredSlots =
    selectedCategory === 'All'
      ? placeholderSlots
      : placeholderSlots.filter((slot) => slot.category === selectedCategory);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackName.trim() || !feedbackPhone.trim()) return;

    const reviewLead: UnifiedLead = {
      id: `REV-${Date.now().toString().slice(-6)}`,
      source: 'Customer Review',
      name: feedbackName.trim(),
      phone: feedbackPhone.trim(),
      location: 'Odisha',
      category: feedbackProject.trim() || 'Customer Experience / Review',
      details: feedbackNotes.trim() || 'Client submitted experience feedback on Testimonials page',
      preferredContactMethod: 'WhatsApp',
      status: 'New',
      submittedAt: new Date().toISOString(),
    };

    await saveLead(reviewLead);
    setSubmitSuccess(true);
  };

  return (
    <div className="testimonials-page">
      <SEO
        title="Customer Experiences & Testimonials | Shreshtanshi Solar Solutions"
        description="Customer satisfaction and trust are at the heart of everything we do. Explore the experiences and verified feedback of our customers and partners across Odisha."
        canonicalPath="/testimonials"
      />

      <Breadcrumbs items={[{ label: 'Testimonials' }]} />

      {/* Hero Section */}
      <section className="page-hero bg-soft-green">
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Client Trust &amp; Verified Feedback
            </span>
            <h1 className="page-hero__title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
              Customer Experiences &amp; Feedback.
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
              Customer satisfaction and trust are at the heart of everything we do. Explore the experiences and feedback of our customers and partners as we continue delivering reliable solar energy solutions across Bhubaneswar, Kalahandi, and all Odisha districts.
            </p>
          </div>
        </Container>
      </section>

      {/* Trust Credibility Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-subtle)', padding: '2rem 0' }}>
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '1rem' }}>
              <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                350+
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-body)', fontWeight: 600 }}>
                PM Surya Ghar Rooftop Installations
              </span>
            </div>
            <div style={{ padding: '1rem' }}>
              <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                100%
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-body)', fontWeight: 600 }}>
                DISCOM Net-Meter Synchronization
              </span>
            </div>
            <div style={{ padding: '1rem' }}>
              <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                District #1
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-body)', fontWeight: 600 }}>
                Highest Verified Installations Award
              </span>
            </div>
            <div style={{ padding: '1rem' }}>
              <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                Zero Diesel
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-body)', fontWeight: 600 }}>
                Clean Farmland Solar Irrigation
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Testimonial Layout with Categories */}
      <section className="section bg-soft-green" style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <SectionHeading
                eyebrow="Verified Experiences"
                title="Customer &amp; Partner Feedback Hub"
                subtitle="Organized by sector. Client feedback and verified installation records are uploaded as certified documentation is received."
              />
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(['All', 'Residential Rooftop', 'Agricultural Solar Pumps', 'Commercial & Institutional', 'Government Projects'] as TestimonialCategory[]).map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1.5px solid',
                      borderColor: selectedCategory === category ? 'var(--color-forest-green)' : 'var(--border-medium)',
                      backgroundColor: selectedCategory === category ? 'var(--color-forest-green)' : '#FFFFFF',
                      color: selectedCategory === category ? '#FFFFFF' : 'var(--color-forest-green)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Cards Grid — Clean, Transparent, Ready for Real Client Feedback */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '1.75rem',
              alignItems: 'stretch',
            }}
          >
            {filteredSlots.map((slot) => (
              <Card
                key={slot.id}
                variant="white"
                padding="lg"
                hoverable
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '18px',
                  border: '1.5px solid var(--border-medium)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative Quote Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-soft-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-forest-green)',
                    }}
                  >
                    <Quote size={20} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      backgroundColor: 'var(--color-soft-green)',
                      color: 'var(--color-forest-green)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                    }}
                  >
                    {slot.statusBadge}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--color-forest-green)',
                    marginBottom: '0.45rem',
                  }}
                >
                  {slot.segmentTitle}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 500 }}>
                  📍 {slot.locationScope}
                </p>

                {/* Scope Highlight */}
                <div
                  style={{
                    backgroundColor: '#F7FAF7',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                    marginBottom: '1.25rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.5,
                  }}
                >
                  <strong>System Specification:</strong> {slot.systemHighlight}
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-forest-green)',
                    fontWeight: 600,
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>{slot.verificationBadge}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Submission Callout for Existing Customers */}
          <div
            style={{
              marginTop: '3.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid var(--border-medium)',
              padding: 'clamp(2rem, 4vw, 3rem)',
              boxShadow: '0 8px 24px rgba(23, 75, 53, 0.06)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="badge" style={{ marginBottom: '0.75rem' }}>
                  Are You a Shreshtanshi Customer?
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.75rem' }}>
                  Share Your Verified Solar Experience.
                </h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  Your feedback helps households and farmers across Odisha make informed, confident decisions about solar energy and borewell irrigation. We publish verified experiences along with net-metering synchronization documentation.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-forest-green)', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={16} />
                    <span>Direct WhatsApp &amp; Call: <strong>{companyConfig.contact.primaryPhoneDisplay}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} />
                    <span>Email: <strong>{companyConfig.contact.email}</strong></span>
                  </div>
                </div>
              </div>

              <div>
                {submitSuccess ? (
                  <div
                    style={{
                      backgroundColor: 'var(--color-soft-green)',
                      padding: '2rem',
                      borderRadius: '14px',
                      textAlign: 'center',
                      border: '1.5px solid var(--border-medium)',
                    }}
                  >
                    <CheckCircle2 size={40} style={{ color: 'var(--color-forest-green)', margin: '0 auto 1rem' }} />
                    <h4 style={{ color: 'var(--color-forest-green)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                      Thank You for Reaching Out!
                    </h4>
                    <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      Our team will verify your installation record and add your testimonial and project photographs to this verified hub.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-medium)',
                          fontSize: '0.9rem',
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Contact Number *"
                        required
                        value={feedbackPhone}
                        onChange={(e) => setFeedbackPhone(e.target.value)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-medium)',
                          fontSize: '0.9rem',
                        }}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Project Type (e.g., 3 kW Rooftop Solar / 5 HP Solar Pump)"
                      value={feedbackProject}
                      onChange={(e) => setFeedbackProject(e.target.value)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.9rem',
                      }}
                    />
                    <textarea
                      rows={3}
                      placeholder="Brief note about your solar generation, savings, or installation experience..."
                      value={feedbackNotes}
                      onChange={(e) => setFeedbackNotes(e.target.value)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.9rem',
                        resize: 'vertical',
                      }}
                    />
                    <Button type="submit" variant="primary" size="md" iconRight={<Send size={15} />}>
                      Submit Feedback for Verification
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        headline="Ready to Experience Dependable Solar Energy?"
        supportingCopy="Speak with our engineering team at our Kalahandi Head Office or our Bhubaneswar sub-branch for a transparent site assessment."
        primaryLabel="Request Solar Assessment"
        secondaryLabel={`Call ${companyConfig.contact.primaryPhoneDisplay}`}
      />
    </div>
  );
};
