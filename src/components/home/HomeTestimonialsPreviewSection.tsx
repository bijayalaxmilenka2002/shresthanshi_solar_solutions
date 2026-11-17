import React from 'react';
import { Link } from 'react-router-dom';
import {
  Quote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Users,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const HomeTestimonialsPreviewSection: React.FC = () => {
  const previewCards = [
    {
      id: 'res-home-slot',
      segment: 'Residential Rooftop Solar',
      beneficiary: 'PM Surya Ghar Household Client',
      location: 'Bhubaneswar / Khordha',
      specs: '3 kW – 5 kW On-Grid Rooftop Array',
      status: 'Verified Beneficiary',
      badge: 'DISCOM Net-Meter Synchronized',
    },
    {
      id: 'agri-home-slot',
      segment: 'Agricultural Solar Irrigation',
      beneficiary: 'Farmland Borewell Solar Pump Farmer',
      location: 'Kalahandi & Western Odisha',
      specs: '5 HP Dual-Mode DC/AC Solar Pump',
      status: 'Daytime Farm Irrigation',
      badge: 'Zero Diesel Operation',
    },
    {
      id: 'comm-home-slot',
      segment: 'Commercial & Institutional',
      beneficiary: 'Commercial Rooftop Solar Client',
      location: 'Odisha Industrial / Institutional Sector',
      specs: 'Three-Phase High-Efficiency Solar Plant',
      status: 'Commercial Net-Meter Plant',
      badge: 'Tariff Cost Reduction',
    },
  ];

  return (
    <section
      className="home-testimonials-section section bg-soft-green"
      id="customer-testimonials"
      style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <Container>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '780px' }}>
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              <MessageSquare size={14} style={{ marginRight: '0.4rem' }} />
              Customer Trust &amp; Satisfaction
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
              Customer Experiences &amp; Verified Feedback
            </h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.68, color: 'var(--text-body)', margin: 0 }}>
              Customer satisfaction and trust are at the heart of everything we do. Explore the experiences and feedback of our customers and partners as we continue delivering reliable solar energy solutions.
            </p>
          </div>

          <div>
            <Link to="/testimonials" className="suncharge-pill-btn suncharge-pill-btn--solid">
              <span className="suncharge-pill-btn__text">EXPLORE TESTIMONIALS HUB</span>
              <span className="suncharge-pill-btn__circle" aria-hidden="true">
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-first" />
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-second" />
              </span>
            </Link>
          </div>
        </div>

        {/* 3 Ready Testimonial Layout Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}
        >
          {previewCards.map((card) => (
            <Card
              key={card.id}
              variant="white"
              padding="lg"
              hoverable
              style={{
                borderRadius: '20px',
                border: '1.5px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
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
                    backgroundColor: 'var(--color-soft-green)',
                    color: 'var(--color-forest-green)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                  }}
                >
                  {card.status}
                </span>
              </div>

              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                {card.segment}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: 'var(--color-forest-green)',
                  marginBottom: '0.35rem',
                  lineHeight: 1.3,
                }}
              >
                {card.beneficiary}
              </h3>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                📍 {card.location}
              </p>

              <div
                style={{
                  backgroundColor: '#F8FAF8',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.86rem',
                  color: 'var(--text-body)',
                  marginBottom: '1.25rem',
                }}
              >
                <strong>System Capacity:</strong> {card.specs}
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  color: 'var(--color-forest-green)',
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={16} />
                <span>{card.badge}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
