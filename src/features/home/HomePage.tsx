import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Accordion } from '../../components/ui/Accordion';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { ProcessTimeline } from '../../components/common/ProcessTimeline';
import { CTASection } from '../../components/common/CTASection';
import { SunchargeShowcaseSections } from '../../components/home/SunchargeShowcaseSections';
import { SEO } from '../../components/common/SEO';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';
import { useSiteSettings } from '../../app/providers';
import { faqItems } from '../../data/faqs';
import { companyConfig } from '../../data/company';

export const HomePage: React.FC = () => {
  const { openGuideModal } = useSolarGuideModal();
  const { settings } = useSiteSettings();

  const applicationCards: {
    title: string;
    tag: string;
    imageLabel: string;
    imageSrc?: string;
    imgFit?: 'cover' | 'contain';
    summary: string;
    linkPath: string;
    linkLabel: string;
  }[] = [
    {
      title: 'For Your Home',
      tag: 'Residential',
      imageLabel: '[Image: rooftop solar installation]',
      imageSrc: '/images/for-your-home-solar.jpg',
      imgFit: 'cover',
      summary: 'Offset daytime electricity bills with a rooftop system sized for your terrace.',
      linkPath: '/solar-solutions/residential-rooftop-solar',
      linkLabel: 'Residential Solar',
    },
    {
      title: 'For Your Farm',
      tag: 'Agriculture',
      imageLabel: '[Image: solar water pump in a farm]',
      imageSrc: '/images/for-your-farm-solar.jpg',
      imgFit: 'cover',
      summary: 'Irrigate crops during daylight hours with agricultural borewells and solar water pumps.',
      linkPath: '/solar-solutions/solar-water-pumps',
      linkLabel: 'Solar Water Pumps',
    },
    {
      title: 'For Your Business',
      tag: 'Commercial',
      imageLabel: '[Image: commercial solar installation]',
      imageSrc: '/images/for-your-business-solar.jpg',
      imgFit: 'cover',
      summary: 'Convert RCC roofs and industrial sheds into dependable daytime power.',
      linkPath: '/solar-solutions/commercial-solar',
      linkLabel: 'Commercial Solar',
    },
  ];

  const homepageFieldHighlights = [
    {
      id: 'home-highlight-rooftop',
      title: 'Residential & Commercial Rooftop Solar',
      district: 'Kalahandi & Across Odisha',
      category: 'Rooftop Solar',
      description: 'Turnkey on-grid and hybrid rooftop solar installations lowering daytime electricity bills.',
      imageLabel: '[Project gallery image: rooftop solar installation]',
      imageSrc: '/images/homeowners-rooftop-solar.jpg',
      imgFit: 'cover' as const,
    },
    {
      id: 'home-highlight-street-light',
      title: 'Solar Street Light Installations',
      district: 'Kalahandi, Odisha',
      category: 'Solar Street Lighting',
      description: 'Raised solar street light units powered by integrated PV panels for village and road lighting.',
      imageLabel: '[Project gallery image: solar street light unit]',
      imageSrc: '/images/solar/solar-street-light-road.jpg',
      imgFit: 'cover' as const,
    },
    {
      id: 'home-highlight-water-pumping',
      title: 'Agricultural Solar Water Pumping',
      district: 'Narla & Bhawanipatna, Kalahandi',
      category: 'Solar Water Pumping',
      description: 'Standalone solar water pump arrays delivering daytime crop irrigation across Odisha farms.',
      imageLabel: '[Project gallery image: agricultural solar water pump]',
      imageSrc: '/images/solar/agricultural-solar-pump.jpg',
      imgFit: 'cover' as const,
    },
  ];

  return (
    <div className="home-page">
      <SEO
        title="Solar Energy, Rooftop Solar & Agricultural Solar Pumps | Shresthanshi Solar Solutions"
        description="Shreshtanshi Construction & Suppliers provides practical solar solutions for homes, farms, businesses, and institutions across Kalahandi and Odisha—including rooftop solar, solar water pumps, and routine maintenance."
        canonicalPath="/"
      />
      {/* =================================================================
          SECTION 1 — IMAGE-LED HERO
      ================================================================= */}
      <section className="hero-section">
        <Container className="hero-section__grid">
          <div className="hero-section__content">
            <span className="badge hero-fade-up" style={{ marginBottom: '1rem' }}>
              {settings.hero.badge || 'Homes • Farms • Businesses in Odisha'}
            </span>
            <h1 className="hero-section__title hero-fade-up hero-delay-1">
              {settings.hero.title || 'Make the Sun Work for You.'}
            </h1>
            <p className="hero-section__copy hero-fade-up hero-delay-2">
              {settings.hero.subtitle || 'Practical rooftop solar, commercial daytime power, and agricultural solar water pumping—sized around what your property actually needs.'}
            </p>
            <div className="hero-section__actions hero-fade-up hero-delay-3">
              <Button
                to="/contact?intent=assessment"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                Get a Solar Assessment
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconLeft={<BookOpen size={18} />}
                onClick={() => openGuideModal()}
              >
                Get a Free Solar Guide
              </Button>
            </div>
            <div className="hero-section__trust hero-fade-up hero-delay-4">
              <CheckCircle2 size={17} className="hero-section__trust-icon" />
              <span>No-obligation assessment • Verified Odisha enterprise (GSTIN: {companyConfig.gstin})</span>
            </div>
          </div>

          <div className="hero-section__visual">
            <div className="hero-section__image-frame">
              <ImagePlaceholder
                label="[Hero image: solar panels on a modern home]"
                sublabel="16:10 Hero Visual • Replaceable AI Image Slot"
                aspectRatio="16/10"
                variant="white"
                src="/images/hero-solar-home.jpg"
              />
              {settings.sections.heroCaption && (
                <div className="hero-section__caption-card">
                  <MapPin size={18} />
                  <div>
                    <strong>Rooted in Kalahandi, Serving Odisha</strong>
                    <span>Rooftop Solar • Solar Water Pumps • Solar Street Lighting</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* =================================================================
          SECTION 2 — WHERE SOLAR FITS IN (3 Visual Image Cards)
      ================================================================= */}
      {settings.sections.applications && (
        <section id="applications" className="section bg-soft-green">
          <Container>
            <SectionHeading
              eyebrow="Where Solar Fits In"
              title="Built for Every Property Type."
              subtitle="Choose your application to see how solar fits your daily energy or water needs."
              align="center"
            />

            <div className="grid-3">
              {applicationCards.map((card) => (
                <Card key={card.title} variant="white" padding="none" hoverable className="visual-card">
                  <div className="visual-card__media">
                    <ImagePlaceholder
                      label={card.imageLabel}
                      aspectRatio="4/3"
                      variant="soft-green"
                      src={card.imageSrc}
                      imgFit={card.imgFit}
                    />
                    <span className="visual-card__tag">{card.tag}</span>
                  </div>
                  <div className="visual-card__body">
                    <h3 className="visual-card__title">{card.title}</h3>
                    <p className="visual-card__desc">{card.summary}</p>
                    <div className="visual-card__footer">
                      <Link to={card.linkPath} className="ui-text-link">
                        <span>{card.linkLabel}</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* =================================================================
          SECTION 3 & 4 — SUNCHARGE REFERENCE SHOWCASE:
          1) END-TO-END SERVICE (Sticky Left + Tiered Stacking Cards Right)
          2) OUR SOLUTIONS (Staggered 2-Column Parallax Showcase)
      ================================================================= */}
      <SunchargeShowcaseSections />

      {/* =================================================================
          SECTION 5 — HOW THE PROCESS WORKS
      ================================================================= */}
      {settings.sections.processTimeline && (
        <section className="section bg-white">
          <Container>
            <SectionHeading
              eyebrow="4 Simple Steps"
              title="From First Question to Solar Installation."
              align="center"
            />

            <ProcessTimeline />

            <div className="process-cta-bar">
              <p>Ready to review your electricity bill, terrace space, or agricultural pumping load?</p>
              <Button
                to="/contact?intent=assessment"
                variant="primary"
                size="md"
                iconRight={<ArrowRight size={16} />}
              >
                Get a Solar Assessment
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* =================================================================
          CORE SOLAR SERVICES — 100% SOLAR ENERGY SOLUTIONS
      ================================================================= */}
      {settings.sections.coreServices && (
        <section className="section bg-soft-green" aria-label="Solar Energy Services">
          <Container>
            <div className="trust-projects-preview__header">
              <SectionHeading
                eyebrow="Our Core Offerings • 100% Solar Energy"
                title="Comprehensive Solar Energy Services"
                subtitle="Field-tested solar installations engineered for homes, farms, institutions, and rural habitations across Odisha."
              />
              <Button to="/services" variant="primary" size="md" iconRight={<ArrowRight size={16} />}>
                Explore All Solar Services
              </Button>
            </div>

            <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
              <Card variant="white" padding="none" hoverable className="visual-card">
                <div className="visual-card__media">
                  <img
                    src="/images/homeowners-rooftop-solar.jpg"
                    alt="Residential rooftop solar installation in Kalahandi"
                    loading="lazy"
                  />
                  <span className="visual-card__tag">Homes &amp; Residences</span>
                </div>
                <div className="visual-card__body">
                  <h3 className="visual-card__title">Residential Rooftop Solar</h3>
                  <p className="visual-card__desc">
                    Turnkey on-grid and hybrid solar installations for independent homes, lowering monthly electricity bills with PM Surya Ghar assistance.
                  </p>
                  <div className="visual-card__footer">
                    <Link to="/solar-solutions/residential-rooftop-solar" className="ui-text-link">
                      <span>Learn More</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Card>

              <Card variant="white" padding="none" hoverable className="visual-card">
                <div className="visual-card__media">
                  <img
                    src="/images/agricultural-tubewell-borewell.jpg"
                    alt="Agricultural solar water pump and controller in Odisha"
                    loading="lazy"
                  />
                  <span className="visual-card__tag">Farms &amp; Irrigation</span>
                </div>
                <div className="visual-card__body">
                  <h3 className="visual-card__title">Solar Water Pump Panels</h3>
                  <p className="visual-card__desc">
                    Dual-mode DC-to-AC solar pumping controllers that run on solar by day and electric grid by night for reliable farmland irrigation.
                  </p>
                  <div className="visual-card__footer">
                    <Link to="/solar-solutions/solar-water-pumps" className="ui-text-link">
                      <span>Learn More</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Card>

              <Card variant="white" padding="none" hoverable className="visual-card">
                <div className="visual-card__media">
                  <img
                    src="/images/rural-water-pipeline-distribution.jpg"
                    alt="Solar overhead water sensor pump system in Odisha"
                    loading="lazy"
                  />
                  <span className="visual-card__tag">Automated Drinking Water</span>
                </div>
                <div className="visual-card__body">
                  <h3 className="visual-card__title">Overhead Sensor Pumps</h3>
                  <p className="visual-card__desc">
                    Automated solar water lifting with water-level sensors in elevated tanks to prevent overflow and deliver continuous filtered water.
                  </p>
                  <div className="visual-card__footer">
                    <Link to="/services" className="ui-text-link">
                      <span>Learn More</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Card>

              <Card variant="white" padding="none" hoverable className="visual-card">
                <div className="visual-card__media">
                  <img
                    src="/images/solar/solar-street-light-road.jpg"
                    alt="Solar street lighting installation along road in Odisha"
                    loading="lazy"
                  />
                  <span className="visual-card__tag">Public &amp; Campus</span>
                </div>
                <div className="visual-card__body">
                  <h3 className="visual-card__title">Solar Street Lighting</h3>
                  <p className="visual-card__desc">
                    Autonomous dusk-to-dawn outdoor solar LED street lights with high-capacity battery storage and galvanized anti-theft poles.
                  </p>
                  <div className="visual-card__footer">
                    <Link to="/solar-solutions/solar-street-lighting" className="ui-text-link">
                      <span>Learn More</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </section>
      )}

      {/* =================================================================
          SECTION 6 — PROJECT GALLERY PREVIEW & VERIFIED CREDENTIALS
      ================================================================= */}
      {settings.sections.fieldHighlights && (
        <section className="section bg-white">
          <Container>
            <div className="trust-projects-preview__header">
              <SectionHeading
                eyebrow="Field Portfolio"
                title="Executed Works Across Odisha."
                subtitle="Solar water pumping, community water systems, street lighting, and rooftop structures."
              />
              <Button to="/gallery" variant="outline" size="md" iconRight={<ArrowRight size={16} />}>
                View Full Gallery
              </Button>
            </div>

            <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
              {homepageFieldHighlights.map((proj) => (
                <Card key={proj.id} variant="white" padding="none" hoverable className="visual-card">
                  <div className="visual-card__media">
                    <ImagePlaceholder
                      label={proj.imageLabel}
                      sublabel={proj.category}
                      aspectRatio="4/3"
                      variant="soft-green"
                      src={proj.imageSrc}
                      imgFit={proj.imgFit}
                    />
                  </div>
                  <div className="visual-card__body">
                    <span className="project-preview-card__loc">
                      <MapPin size={14} /> {proj.district}
                    </span>
                    <h3 className="visual-card__title">{proj.title}</h3>
                    <p className="visual-card__desc">{proj.description}</p>
                    <div className="visual-card__footer">
                      <Link to="/gallery" className="ui-text-link">
                        <span>View in Gallery</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Compact Verified Enterprise & Leadership Split */}
            <div className="trust-proof-grid">
              <Card variant="white" padding="lg" className="trust-proof-card">
                <div className="trust-proof-card__badge">
                  <ShieldCheck size={18} />
                  <span>Verified Odisha Enterprise • GSTIN: {companyConfig.gstin}</span>
                </div>
                <h3>{companyConfig.legalName}</h3>
                <p style={{ marginTop: '0.35rem' }}>{companyConfig.contact.address.full}</p>
                <ul className="trust-proof-list">
                  <li>
                    <CheckCircle2 size={15} />
                    <span>Solar water pump panels, sensor pumps &amp; community water filters</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} />
                    <span>Rooftop solar, commercial solar &amp; solar street lighting</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} />
                    <span>Heavy-duty elevated galvanized solar mounting structures</span>
                  </li>
                </ul>
                <div style={{ marginTop: '1.25rem' }}>
                  <Link to="/about" className="ui-text-link">
                    <span>About Our Company</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </Card>

              <Card variant="white" padding="lg" className="trust-proof-card">
                <div className="trust-proof-card__founder">
                  <div className="trust-proof-card__avatar-placeholder">
                    <ImagePlaceholder
                      label={companyConfig.founder.name}
                      sublabel={companyConfig.founder.role}
                      aspectRatio="3/4"
                      variant="soft-green"
                      src={companyConfig.founder.imageSrc}
                      imgFit="cover"
                    />
                  </div>
                  <div>
                    <span className="badge" style={{ marginBottom: '0.4rem' }}>Leadership</span>
                    <h3>{companyConfig.founder.name}</h3>
                    <p className="trust-proof-card__role">{companyConfig.founder.role}</p>
                    <p className="trust-proof-card__edu">MBA (BPUT) • Bhawanipatna, Kalahandi</p>
                  </div>
                </div>
                <p className="visual-card__desc">
                  Delivering practical solar energy, clean water infrastructure, and developmental supply works across Kalahandi and Odisha.
                </p>
                <div className="trust-proof-note">
                  <span>Client Reference Note:</span> [Placeholder: Verified client references shared during consultation]
                </div>
              </Card>
            </div>
          </Container>
        </section>
      )}

      {/* =================================================================
          SECTION 7 — SUBSIDY & SCHEME CLARITY (Side-by-Side Image + Text)
      ================================================================= */}
      {settings.sections.trustBanner && (
        <section className="section bg-white">
          <Container>
            <div className="subsidy-banner">
              <div className="split-showcase">
                <div className="split-showcase__content">
                  <span className="badge" style={{ marginBottom: '0.85rem' }}>
                    Subsidy &amp; Scheme Guidance
                  </span>
                  <h2 className="subsidy-banner__title">
                    Understand Costs &amp; Scheme Eligibility Upfront.
                  </h2>
                  <p className="subsidy-banner__desc">
                    System pricing and government support depend on your consumer category, sanctioned load, and official portal norms.
                  </p>
                  <div className="subsidy-banner__points">
                    <div className="subsidy-banner__point">
                      <div>
                        <strong>PM Surya Ghar (Residential)</strong>
                        <p>For eligible grid-tied home rooftops using approved DCR panels and net metering.</p>
                      </div>
                    </div>
                    <div className="subsidy-banner__point">
                      <div>
                        <strong>PM-KUSUM (Agricultural)</strong>
                        <p>For eligible farmers installing solar water pumps during official state portal windows.</p>
                      </div>
                    </div>
                  </div>
                  <div className="subsidy-banner__actions">
                    <Button
                      to="/contact?intent=subsidy"
                      variant="primary"
                      size="md"
                      iconRight={<ArrowRight size={16} />}
                    >
                      Get a Solar Assessment
                    </Button>
                    <Button
                      to="/resources/subsidy-scheme-guidance"
                      variant="secondary"
                      size="md"
                    >
                      View Subsidy Guide
                    </Button>
                  </div>
                </div>
                <div className="split-showcase__media">
                  <ImagePlaceholder
                    label="[Image: solar water pump in a farm]"
                    sublabel="PM Surya Ghar & PM-KUSUM Guidance"
                    aspectRatio="4/3"
                    variant="white"
                    src="/images/solar-pump-irrigation-field.jpg"
                    imgFit="cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =================================================================
          SECTION 8 — CONCISE FAQS
      ================================================================= */}
      {settings.sections.faqSection && (
        <section className="section bg-soft-green">
          <Container>
            <SectionHeading
              eyebrow="Key Questions"
              title="Common Solar Questions."
              align="center"
            />

            <div className="faq-container">
              <Accordion items={faqItems.slice(0, 5)} defaultOpenIndex={0} />
              <div className="faq-container__footer">
                <Button to="/resources/solar-faqs" variant="outline" size="md" iconRight={<ArrowRight size={16} />}>
                  View All Solar FAQs
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =================================================================
          SECTION 9 — FINAL CONVERSION BANNER
      ================================================================= */}
      <CTASection
        headline="Your Solar Journey Starts With One Conversation."
        supportingCopy="Request a clear, no-obligation site and energy assessment for your home, farm, or business in Odisha."
        primaryLabel="Get a Solar Assessment"
        secondaryLabel="Call Our Team"
        image="[Image: rooftop solar installation]"
        imageSrc="/images/cta-solar-rooftop.jpg"
      />
    </div>
  );
};
