import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { companyConfig } from '../../data/company';

export const HomeAchievementsSection: React.FC = () => {
  return (
    <section
      className="home-achievements-section section bg-white"
      id="major-achievements"
      style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <Container>
        {/* Section Header */}
        <div style={{ maxWidth: '820px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '0.85rem' }}>
            <Award size={15} style={{ marginRight: '0.4rem' }} />
            Core Business &amp; Key Milestones
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.1rem, 3.8vw, 3.1rem)',
              fontWeight: 800,
              color: 'var(--color-forest-green)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Major Solar Execution Achievements
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.12rem)',
              lineHeight: 1.68,
              color: 'var(--text-body)',
              margin: 0,
            }}
          >
            Delivering clean, affordable, and sustainable electricity across Odisha through rapid on-grid execution and verified utility partnerships.
          </p>
        </div>

        {/* 2-Column Split: A) PM Surya Ghar (350+ Installations) & B) Utility-Led Aggregation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Achievement A: PM Surya Ghar Rooftop Solar */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid var(--border-medium)',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(23, 75, 53, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Visual Frame */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#0B2419' }}>
              <img
                src="/images/solar/pm-surya-ghar-residential-350.jpg"
                alt="350+ PM Surya Ghar Residential Rooftop Solar Installations in Odisha"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  backgroundColor: 'rgba(23, 75, 53, 0.95)',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                PM Surya Ghar Muft Bijli Yojana
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                Residential On-Grid Solar
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)',
                  fontWeight: 800,
                  color: 'var(--color-forest-green)',
                  marginBottom: '0.85rem',
                  lineHeight: 1.25,
                }}
              >
                Powering Homes with Solar Energy
              </h3>
              <p
                style={{
                  fontSize: '0.94rem',
                  lineHeight: 1.65,
                  color: 'var(--text-body)',
                  marginBottom: '1.5rem',
                }}
              >
                With <strong>350+ successful PM Surya Ghar rooftop solar installations in just two years</strong>, Shreshtanshi Solar Solutions is helping households transition towards clean, affordable, and sustainable energy.
              </p>

              {/* Prominent Numerical Counter Boxes */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
                  gap: '1rem',
                  backgroundColor: 'var(--color-soft-green)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  border: '1.5px solid rgba(23, 75, 53, 0.15)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      color: 'var(--color-forest-green)',
                      lineHeight: 1.1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    350+
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                    Successful Installations
                  </span>
                </div>
                <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(23, 75, 53, 0.2)' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      color: 'var(--color-forest-green)',
                      lineHeight: 1.1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    2 Years
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                    Of Achievement
                  </span>
                </div>
              </div>

              {/* Bullet Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[
                  'Full facilitation of Central Financial Assistance (Subsidy up to ₹78,000)',
                  'Direct bidirectional DISCOM net-meter synchronization',
                  'Tier-1 DCR ALMM-compliant mono-PERC solar panels',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--color-forest-green)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.86rem', color: 'var(--text-body)' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <Link
                  to="/solar-solutions/residential-rooftop-solar"
                  className="ui-btn ui-btn--primary ui-btn--md"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Explore PM Surya Ghar Solutions</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Achievement B: Utility-Led Aggregation */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid var(--border-medium)',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(23, 75, 53, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Visual Frame */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#0B2419' }}>
              <img
                src="/media/awards-certificates/tpwodl-utility-led-aggregation-award.jpg"
                alt="Utility-Led Aggregation Award from TPWODL (Tata Power & Odisha Govt JV)"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  backgroundColor: 'rgba(23, 75, 53, 0.95)',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                TPWODL (Tata Power JV) Partner
              </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                Utility Partnership Model
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)',
                  fontWeight: 800,
                  color: 'var(--color-forest-green)',
                  marginBottom: '0.85rem',
                  lineHeight: 1.25,
                }}
              >
                Utility-Led Aggregation
              </h3>
              <p
                style={{
                  fontSize: '0.94rem',
                  lineHeight: 1.65,
                  color: 'var(--text-body)',
                  marginBottom: '1.5rem',
                }}
              >
                Delivering reliable solar energy solutions through <strong>Utility-Led Aggregation</strong>, supporting household adoption of clean and sustainable electricity across Western Odisha.
              </p>

              {/* Prominent Numerical Counter Boxes */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
                  gap: '1rem',
                  backgroundColor: 'var(--color-soft-green)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  border: '1.5px solid rgba(23, 75, 53, 0.15)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      color: 'var(--color-forest-green)',
                      lineHeight: 1.1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    1 Year
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                    Milestone Record
                  </span>
                </div>
                <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(23, 75, 53, 0.2)' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.6rem, 2.4vw, 2rem)',
                      fontWeight: 800,
                      color: 'var(--color-forest-green)',
                      lineHeight: 1.1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    Top EPC
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                    Utility Awarded Partner
                  </span>
                </div>
              </div>

              {/* Bullet Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[
                  'Honored with TPWODL Utility-Led Aggregation Partner Award',
                  'Seamless consumer grid synchronizations and DISCOM compliance',
                  'Standardized balance-of-system safety and high-yield engineering',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--color-forest-green)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.86rem', color: 'var(--text-body)' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <Link
                  to="/licences-and-certifications"
                  className="ui-btn ui-btn--primary ui-btn--md"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>View Aggregation Award &amp; Credentials</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
