import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BatteryCharging,
  Zap,
  Building,
  MapPin,
  Flame,
  Award,
  Droplets,
  Wind,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { getSolarSolutions } from '../../data/solutions';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';
import { useQuoteModal } from '../../hooks/useQuoteModal';

export const SolarStreetLightingPage: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();
  const { openQuoteModal } = useQuoteModal();
  const solution = getSolarSolutions().find((s) => s.id === 'solar-street-lighting') || {
    title: 'Solar Street Lighting Systems',
    tagline: 'Autonomous outdoor lighting engineered for rural roads, panchayats, and campuses across Odisha.',
    suitabilityFactors: [],
    components: [],
    subsidyNote: 'Street lighting projects can be funded through Gram Panchayat 15th Finance Commission grants, CSR funds, and local development funds.',
  };

  const applications = [
    {
      title: 'Gram Panchayat & Village Roads',
      desc: 'Stand-alone dusk-to-dawn street lighting for rural roads, community intersections, and village gathering spots.',
      imageSrc: '/images/solar/solar-street-light-road.jpg',
      tag: 'Rural Infrastructure',
    },
    {
      title: 'Commercial & Industrial Compounds',
      desc: 'Perimeter and internal roadway lighting for rice mills, warehouses, workshops, and commercial facilities.',
      imageSrc: '/images/solar/solar-street-light-commercial.jpg',
      tag: 'Commercial Security',
    },
    {
      title: 'Educational Campuses & Ashrams',
      desc: 'Safe and dependable nighttime illumination for schools, college campuses, hostels, and sports grounds.',
      imageSrc: '/images/solar/solar-street-light-campus.jpg',
      tag: 'Institutional Lighting',
    },
    {
      title: 'Public Parks & Community Squares',
      desc: 'Solar pole luminaires for public squares, parks, temple approaches, and rural market yards (haats).',
      imageSrc: '/images/solar/solar-street-light-park.jpg',
      tag: 'Public Amenities',
    },
  ];

  const hardwareSpecs = [
    {
      icon: <Zap size={16} />,
      component: 'LED Luminaire',
      rating: '15W / 24W / 30W / 45W / 60W',
      detail: 'Die-cast aluminum luminaire with high-efficacy tier-1 LEDs (>140 lm/W), IP66 waterproof sealing, and wide-beam optical lens.',
      badge: 'IP66 Rated',
      imageSrc: '/images/solar/spec-led-luminaire.jpg',
      imageAlt: 'High-power IP66 LED solar street light luminaire',
      keyParams: ['>140 lm/W Efficacy', 'IP66 Waterproof', 'Die-Cast Aluminum'],
    },
    {
      icon: <Sun size={16} />,
      component: 'Photovoltaic Module',
      rating: '50Wp – 150Wp Tier-1 PV',
      detail: 'High-efficiency monocrystalline/poly solar panel with toughened anti-reflective glass and corrosion-proof aluminum frame.',
      badge: '25-Yr Efficiency',
      imageSrc: '/images/solar/spec-solar-module.jpg',
      imageAlt: 'Monocrystalline solar street lighting PV module',
      keyParams: ['21+% Efficiency', 'Anti-Reflective Glass', 'Anodized Frame'],
    },
    {
      icon: <BatteryCharging size={16} />,
      component: 'Battery Storage',
      rating: 'Deep-Cycle LiFePO4 / Tubular',
      detail: 'High-temperature thermal stability designed for Odisha summers, providing 2 to 3 days continuous cloudy-weather autonomy.',
      badge: '3-Day Autonomy',
      imageSrc: '/images/solar/spec-lifepo4-battery.jpg',
      imageAlt: 'LiFePO4 solar street light lithium battery pack with BMS',
      keyParams: ['3,000+ Deep Cycles', 'Smart BMS Protection', '55°C Thermal Stability'],
    },
    {
      icon: <Clock size={16} />,
      component: 'Automation & Controller',
      rating: 'Dusk-to-Dawn MPPT/PWM',
      detail: 'Microcontroller optical lux sensor switches on at dusk and off at sunrise with multi-stage dimming and deep-discharge protection.',
      badge: '100% Autonomous',
      imageSrc: '/images/solar/spec-mppt-controller.jpg',
      imageAlt: 'Intelligent solar dusk-to-dawn MPPT charge controller',
      keyParams: ['Automatic Lux Sensing', 'Multi-Stage Dimming', 'Surge Protection'],
    },
    {
      icon: <Building size={16} />,
      component: 'Pole & Civil Foundation',
      rating: '4m to 7m Hot-Dip Galvanized',
      detail: 'Heavy-duty tubular/octagonal steel pole hot-dip galvanized to IS standards with cast anchor bolts and robust RCC civil pedestal.',
      badge: 'IS Galvanized',
      imageSrc: '/images/solar/spec-galvanized-pole.jpg',
      imageAlt: 'Hot-dip galvanized octagonal street light pole base with anchor bolts',
      keyParams: ['IS 2629 Galvanized', '86µm Zinc Layer', 'RCC Anchor Pedestal'],
    },
    {
      icon: <ShieldCheck size={16} />,
      component: 'Security & Enclosure',
      rating: 'Anti-Theft Elevated Cage',
      detail: 'Lockable high-altitude battery cage positioned high on the pole prevents tampering, theft, and monsoon ground moisture.',
      badge: 'Tamper Resistant',
      imageSrc: '/images/solar/spec-antitheft-cage.jpg',
      imageAlt: 'Elevated anti-theft battery cage for solar street lights',
      keyParams: ['Elevated Pole Mounting', 'Padlock Locking Hasp', 'Monsoon Ventilated'],
    },
  ];

  return (
    <div>
      <SEO
        title="Solar Street Lighting Systems in Odisha — Autonomous LED Street Lights"
        description="Field-tested solar street lighting systems by Shresthanshi Solar Solutions. Dusk-to-dawn sensors, hot-dip galvanized poles, IP66 LED luminaires, and anti-theft battery enclosures across Bhubaneswar, Kalahandi and Odisha."
        canonicalPath="/solar-solutions/solar-street-lighting"
      />

      <Breadcrumbs
        items={[
          { label: 'Solar Solutions', path: '/solar-solutions' },
          { label: 'Solar Street Lighting' },
        ]}
      />

      {/* Hero Section */}
      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Autonomous Outdoor Lighting • Bhubaneswar, Kalahandi &amp; Across Odisha
            </span>
            <h1 className="page-hero__title">Solar Street Lighting Systems</h1>
            <p className="page-hero__subtitle">
              High-efficiency solar LED street lights with intelligent dusk-to-dawn sensors, hot-dip galvanized steel poles, and elevated anti-theft battery backup. Reliable illumination for rural roads, panchayats, and commercial premises with zero recurring electric bills.
            </p>
            <div className="page-hero__actions">
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
                onClick={() => openQuoteModal('Solar Street Lighting')}
              >
                Request Street Light Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconLeft={<BookOpen size={18} />}
                onClick={() => openGuideModal('Solar Street Lighting')}
              >
                Get Free Guide
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
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/images/solar/solar-street-light-road.jpg"
                alt="Solar Street Light installed along road by Shresthanshi Solar Solutions"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(23, 75, 53, 0.9)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backdropFilter: 'blur(4px)',
                  fontSize: 'var(--text-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <ShieldCheck size={16} style={{ color: '#E8F2E8', flexShrink: 0 }} />
                <span>Field-tested hot-dip galvanized solar street light with elevated anti-theft battery enclosure</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Key Advantages */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Engineered for Odisha"
            title="Why Standalone Solar Street Lighting?"
            subtitle="Eliminate grid cabling costs, transformer load, and recurring power outages with independent solar outdoor poles."
            align="center"
          />

          <div className="grid-3" style={{ marginTop: '2rem' }}>
            <Card variant="soft-green" padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Clock size={24} style={{ color: 'var(--color-forest-green)' }} />
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>Dusk-to-Dawn Automation</h3>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 1.6 }}>
                Optical lux sensing turns lights on automatically at sunset and shuts off at daybreak, ensuring zero manual intervention or wasted energy.
              </p>
            </Card>

            <Card variant="soft-green" padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={24} style={{ color: 'var(--color-forest-green)' }} />
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>Galvanized Anti-Theft Pole</h3>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 1.6 }}>
                Hot-dip galvanized steel poles withstand high winds and monsoon humidity. Batteries are locked inside high-altitude tamper-resistant security cages.
              </p>
            </Card>

            <Card variant="soft-green" padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <BatteryCharging size={24} style={{ color: 'var(--color-forest-green)' }} />
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>3-Day Monsoon Autonomy</h3>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 1.6 }}>
                Engineered with high-grade LiFePO4 or tubular solar batteries sized for 48–72 hours of uninterrupted lighting through continuous rain and overcast skies.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Applications Grid */}
      <section className="section bg-soft-green">
        <Container>
          <SectionHeading
            eyebrow="Key Use Cases"
            title="Solar Street Light Deployments"
            subtitle="Custom-fabricated poles and luminaire configurations for diverse public and private infrastructure."
          />

          <div className="grid-4" style={{ marginTop: '2rem' }}>
            {applications.map((app) => (
              <Card key={app.title} variant="white" padding="none" hoverable className="visual-card">
                <div className="visual-card__media">
                  <img
                    src={app.imageSrc}
                    alt={app.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  <span className="visual-card__tag">{app.tag}</span>
                </div>
                <div className="visual-card__body">
                  <h3 className="visual-card__title" style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                    {app.title}
                  </h3>
                  <p className="visual-card__desc" style={{ fontSize: '0.85rem' }}>
                    {app.desc}
                  </p>
                  <div className="visual-card__footer" style={{ marginTop: '0.75rem' }}>
                    <button
                      type="button"
                      className="ui-text-link"
                      onClick={() => openQuoteModal('Solar Street Lighting')}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      <span>Get a Quote</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Technical Specifications */}
      <section className="section bg-white">
        <Container>
          <SectionHeading
            eyebrow="Engineering Specifications"
            title="Technical Standards & Hardware Quality"
            subtitle="Built to withstand harsh outdoor conditions with tier-1 components and verified engineering."
          />

          {/* Engineering Standards & Certifications Ribbon */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
              margin: '2rem 0 2.5rem',
            }}
          >
            {[
              {
                icon: <Award size={22} style={{ color: 'var(--color-forest-green)' }} />,
                title: 'MNRE Benchmark Compliant',
                desc: 'Government technical standards for autonomous outdoor solar lighting',
              },
              {
                icon: <ShieldCheck size={22} style={{ color: 'var(--color-forest-green)' }} />,
                title: 'IS 2629 Hot-Dip Galvanizing',
                desc: '86+ microns uniform zinc layer for 25+ years rust-free pole durability',
              },
              {
                icon: <Droplets size={22} style={{ color: 'var(--color-forest-green)' }} />,
                title: 'IP66 Waterproof & Dustproof',
                desc: 'Hermetically sealed optical chamber impervious to monsoon downpours',
              },
              {
                icon: <Wind size={22} style={{ color: 'var(--color-forest-green)' }} />,
                title: '150 km/h Cyclone Wind Rated',
                desc: 'Reinforced tubular/octagonal base flange with high-tensile anchor bolts',
              },
              {
                icon: <BatteryCharging size={22} style={{ color: 'var(--color-forest-green)' }} />,
                title: 'LiFePO4 & Smart BMS',
                desc: '3,000+ deep cycles, 55°C thermal stability with active cell balancing',
              },
            ].map((std) => (
              <div
                key={std.title}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  backgroundColor: 'var(--color-soft-green)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: '14px',
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 6px rgba(23,75,53,0.08)',
                  }}
                >
                  {std.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-forest-green)', lineHeight: 1.3 }}>
                    {std.title}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-body)', marginTop: '0.2rem', lineHeight: 1.45 }}>
                    {std.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6-Card Hardware Specifications Grid with Authentic Component Visuals */}
          <div className="grid-3" style={{ gap: '1.75rem', marginBottom: '2.5rem' }}>
            {hardwareSpecs.map((spec) => (
              <Card
                key={spec.component}
                variant="white"
                padding="none"
                hoverable
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '18px',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--color-white)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 18px rgba(23, 75, 53, 0.05)',
                }}
              >
                {/* Hardware Component Image Header */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#F3F6F4',
                  }}
                >
                  <img
                    src={spec.imageSrc}
                    alt={spec.imageAlt}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 350ms ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(23,75,53,0.35) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Component Category Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--color-forest-green)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    {spec.icon}
                    <span>{spec.component}</span>
                  </div>

                  {/* Rating / Standard Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0.85rem',
                      right: '0.85rem',
                      backgroundColor: 'rgba(23, 75, 53, 0.92)',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                    }}
                  >
                    {spec.badge}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem 1.35rem 1.35rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--color-forest-green)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {spec.rating}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.86rem',
                      color: 'var(--text-body)',
                      lineHeight: 1.6,
                      margin: '0 0 1rem',
                      flex: 1,
                    }}
                  >
                    {spec.detail}
                  </p>

                  {/* Key Parameter Pills */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    {spec.keyParams.map((param) => (
                      <span
                        key={param}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          backgroundColor: 'var(--color-soft-green)',
                          color: 'var(--color-forest-green)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                        }}
                      >
                        ✓ {param}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Funding & Panchayat Support Card */}
          <Card
            variant="soft-green"
            padding="lg"
            style={{
              borderRadius: '20px',
              border: '1.5px solid var(--border-medium)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 540px' }}>
                <span className="badge" style={{ marginBottom: '0.75rem' }}>
                  Public Infrastructure &amp; Panchayat Procurement
                </span>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--color-forest-green)' }}>
                  Gram Panchayat &amp; Institutional Procurement Support
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, margin: 0 }}>
                  We assist Gram Panchayats, Block Development Offices, and CSR committees with detailed Bill of Quantities (BOQ), technical compliance documentation, structural drawings, and installation schedules aligned with Odisha public procurement standards.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: '220px' }}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => openQuoteModal('Solar Street Lighting')}
                >
                  Request Commercial BOQ
                </Button>
                <Button to="/contact?intent=street-lights" variant="outline" size="md">
                  Contact Our Engineering Office
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Illuminating Streets & Rural Communities."
        supportingCopy="Speak with our engineering team in Bhubaneswar or our established Kalahandi department to plan street lighting layouts, pole counts, and technical specifications."
        prefillTopic="Solar Street Lighting Enquiry"
      />
    </div>
  );
};
