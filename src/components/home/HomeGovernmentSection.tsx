import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  TreePine,
  Sprout,
  Waves,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

export const HomeGovernmentSection: React.FC = () => {
  const govtActivities = [
    {
      id: 'gov-pump',
      title: 'Solar Water Pumps',
      dept: 'Forest Department',
      desc: 'Solar-powered water pumping solutions for forest water bodies and wildlife water management.',
      image: '/images/government/solar-water-pump-forest.jpg',
      icon: <Waves size={16} />,
    },
    {
      id: 'gov-irrig',
      title: 'Solar Irrigation Systems',
      dept: 'Agro Odisha & Forest Dept',
      desc: 'Solar-powered irrigation solutions to support agricultural farmlands and plantation activities.',
      image: '/images/government/solar-irrigation-agro.jpg',
      icon: <Sprout size={16} />,
    },
    {
      id: 'gov-plant',
      title: 'Plantation Support',
      dept: 'Forest Department',
      desc: 'Solar-powered infrastructure supporting afforestation campaigns, tree nurseries, and plantations.',
      image: '/images/government/solar-plantation-support.jpg',
      icon: <TreePine size={16} />,
    },
    {
      id: 'gov-fence',
      title: 'Solar Fencing for Elephant Protection',
      dept: 'Forest Department',
      desc: 'Solar fencing solutions designed to prevent elephant movement into vulnerable settlements and crops.',
      image: '/images/government/solar-fencing-elephant-protection.jpg',
      icon: <Zap size={16} />,
    },
  ];

  return (
    <section
      className="home-government-section section bg-soft-green"
      id="government-projects"
      style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <Container>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '750px' }}>
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              <Building2 size={14} style={{ marginRight: '0.4rem' }} />
              Who We Serve • Government Sector
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
              Government Projects — Agro Odisha &amp; Forest Department
            </h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: 'var(--text-body)', margin: 0 }}>
              Serving state environmental and agricultural initiatives with specialized solar water pumping, plantation infrastructure, and non-lethal wildlife mitigation across Odisha.
            </p>
          </div>

          <div>
            <Link to="/who-we-serve/government" className="suncharge-pill-btn suncharge-pill-btn--solid">
              <span className="suncharge-pill-btn__text">EXPLORE ALL GOVT PROJECTS</span>
              <span className="suncharge-pill-btn__circle" aria-hidden="true">
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-first" />
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-second" />
              </span>
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}
        >
          {govtActivities.map((act) => (
            <Card
              key={act.id}
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
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/11', backgroundColor: '#0B2419', overflow: 'hidden' }}>
                <img
                  src={act.image}
                  alt={act.title}
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
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {act.dept}
                </span>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-forest-green)', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                  {act.icon}
                  <span>Verified Service Scope</span>
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
                  {act.title}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flexGrow: 1 }}>
                  {act.desc}
                </p>

                <div style={{ paddingTop: '0.85rem', marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link to="/who-we-serve/government" className="ui-text-link" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </Link>
                  <span style={{ fontSize: '0.76rem', color: 'var(--color-forest-green)', fontWeight: 600 }}>
                    Odisha Programs
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
