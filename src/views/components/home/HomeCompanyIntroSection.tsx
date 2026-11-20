import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  MapPin,
  Building2,
  Zap,
  Sparkles,
  TreePine,
  Award,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { companyConfig } from '@models/data/company';

interface GalleryDoc {
  src: string;
  caption: string;
}

interface IntroHighlightCard {
  id: string;
  tag: string;
  category: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  galleryImages: GalleryDoc[];
  highlights: string[];
  linkPath: string;
  linkLabel: string;
  modalDetails: {
    fullTitle: string;
    description: string;
    points: string[];
  };
}

const introCards: IntroHighlightCard[] = [
  {
    id: 'pm-surya-ghar-350',
    tag: '350+ Rooftop Installs',
    category: 'PM Surya Ghar Muft Bijli Yojana',
    title: 'Rooftop Solar EPC & Subsidy Facilitation',
    summary:
      'Over 350+ residential on-grid installations executed across Odisha within 2 years, securing up to ₹78,000 direct central DBT subsidy assistance.',
    imageSrc: '/images/solar/pm-surya-ghar-residential-350.jpg',
    imageAlt: 'PM Surya Ghar Rooftop Solar Installation in Odisha',
    galleryImages: [
      {
        src: '/images/solar/pm-surya-ghar-residential-350.jpg',
        caption: 'Turnkey On-Grid Rooftop Solar Installation under PM Surya Ghar',
      },
      {
        src: '/images/solar/residential-rooftop.jpg',
        caption: 'High-Efficiency Mono PERC Solar Panels on RCC Terrace Structure',
      },
      {
        src: '/images/for-your-home-solar.jpg',
        caption: 'Residential Rooftop Solar System Lowering Household Electricity Tariffs',
      },
    ],
    highlights: [
      '350+ verified residential rooftop solar plants',
      'Up to ₹78,000 DBT direct central subsidy credited',
      'Bi-directional DISCOM net-meter synchronization',
    ],
    linkPath: '/solutions/residential',
    linkLabel: 'Explore Rooftop Solar',
    modalDetails: {
      fullTitle: 'PM Surya Ghar: Muft Bijli Yojana — Turnkey On-Grid Execution',
      description:
        'Shreshtanshi Solar Solutions has established itself as the leading rooftop solar EPC in Western Odisha. In just two years, over 350 households have transitioned to clean energy with 1 kW to 10 kW grid-tied solar systems, saving up to 90% on electricity tariffs while receiving direct bank subsidies.',
      points: [
        '350+ completed installations across Kalahandi, Nuapada, Balangir & neighboring districts',
        'Direct subsidy coordination on the National PM Surya Ghar Portal',
        'Tier-1 Mono PERC / TopCon panels with 25-year performance warranty',
        'Complete DISCOM inspection, testing, and bidirectional meter installation',
      ],
    },
  },
  {
    id: 'utility-led-aggregation',
    tag: 'Utility-Led Aggregation',
    category: 'DISCOM Utility Programs',
    title: 'Utility-Led Aggregation Solar Installations',
    summary:
      'Delivering reliable solar power through Utility-Led Aggregation within 1 year, accelerating household adoption of clean electricity across Odisha.',
    imageSrc: '/images/solar/commercial-rooftop.jpg',
    imageAlt: 'Utility-Led Aggregation Solar Installation in Odisha',
    galleryImages: [
      {
        src: '/images/solar/commercial-rooftop.jpg',
        caption: 'Multi-Row Rooftop Solar Array Commissioned under Utility-Led Aggregation',
      },
      {
        src: '/images/for-your-business-solar.jpg',
        caption: 'High-Yield Grid-Tied Solar System with Bi-Directional Net-Meter Synchronization',
      },
      {
        src: '/images/cta-solar-rooftop.jpg',
        caption: 'Elevated Solar Mounting Structures Engineered for Utility-Led Rooftops',
      },
    ],
    highlights: [
      'Successful household solar installations under Utility-Led Aggregation within 1 year',
      'End-to-end DISCOM feasibility clearances and bi-directional net-meter sync',
      'Accelerating adoption of clean, sustainable, and affordable household electricity',
    ],
    linkPath: '/solutions/residential',
    linkLabel: 'Explore Aggregation Solar',
    modalDetails: {
      fullTitle: 'Utility-Led Aggregation — 1-Year Household Solar Achievement',
      description:
        'Delivering reliable solar energy solutions through Utility-Led Aggregation, Shreshtanshi Solar Solutions has successfully completed household rooftop solar installations within just one year, accelerating clean energy adoption with verified DISCOM grid synchronization.',
      points: [
        'Executed household rooftop solar plants under the utility-led aggregation framework within 1 year',
        'Direct coordination with DISCOM technical divisions for rapid net-meter synchronization',
        'High-efficiency tier-1 PV modules paired with digital grid-interactive inverters',
        'Substantial tariff reduction for participating households and commercial establishments',
      ],
    },
  },
  {
    id: 'agro-forest-government',
    tag: 'Agro & Forest Dept Works',
    category: 'Government & Public Infrastructure',
    title: 'Solar Water Pumps & Elephant Protection Fencing',
    summary:
      'Partnering with Agro Odisha and Forest Department on high-capacity solar borewells, nursery irrigation, and solar fencing for wildlife safety.',
    imageSrc: '/images/government/solar-water-pump-forest.jpg',
    imageAlt: 'Solar Water Pumping and Forest Infrastructure in Odisha',
    galleryImages: [
      {
        src: '/images/government/solar-water-pump-forest.jpg',
        caption: 'Solar-Powered Submersible Water Pumping for Forest Management',
      },
      {
        src: '/images/government/solar-irrigation-agro.jpg',
        caption: 'Agro Odisha Solar Irrigation Farmland Systems',
      },
      {
        src: '/images/government/solar-fencing-elephant-protection.jpg',
        caption: 'High-Tensile Pulsed Solar Fencing for Elephant Conflict Mitigation',
      },
    ],
    highlights: [
      'Solar submersible borewell systems for remote forest beats',
      'Forest nursery & plantation drip irrigation infrastructure',
      'Non-lethal solar perimeter fencing for elephant safety',
    ],
    linkPath: '/who-we-serve/government',
    linkLabel: 'View Government Projects',
    modalDetails: {
      fullTitle: 'Government Sector: Agro Odisha & Forest Department Projects',
      description:
        'From deep interior forest beats to sprawling community farmlands, Shreshtanshi delivers resilient off-grid and hybrid solar installations. Our infrastructure includes solar deep borewells, nursery irrigation networks, and specialized pulsating solar fencing to safely deter wild elephant herds from human settlements.',
      points: [
        'Agro Odisha farm irrigation & community tube-wells',
        'Forest Department solar water pumps for remote wildlife waterholes & nurseries',
        'High-voltage pulsed solar fencing for humane elephant corridor mitigation',
        'Rugged galvanized structures designed for harsh terrain and remote maintenance',
      ],
    },
  },
  {
    id: 'kalahandi-bhubaneswar-hubs',
    tag: 'Dual Strategic Hubs',
    category: 'Statewide Technical Presence',
    title: 'Head Office Kalahandi & Bhubaneswar Sub-Branch',
    summary:
      'Operating from our Head Office in Narla Road, Kalahandi and regional branch in Bhubaneswar with rapid 24–48 hr statewide engineering dispatch.',
    imageSrc: '/images/solar/residential-rooftop.jpg',
    imageAlt: 'Shreshtanshi Solar Engineering Team and Operations Hub',
    galleryImages: [
      {
        src: '/images/solar/residential-rooftop.jpg',
        caption: 'Engineering & Operational Dispatch Center in Kalahandi',
      },
      {
        src: '/images/solar/commercial-rooftop.jpg',
        caption: 'Statewide Technical Team Executing Turnkey Solar Projects',
      },
      {
        src: '/images/solar/solar-site-assessment.jpg',
        caption: 'On-Site Technical Feasibility Assessment & Engineering Survey',
      },
    ],
    highlights: [
      'Head Office: Kalahandi (Plot No- 406, Narla Road)',
      'Sub-Branch: Bhubaneswar central hub for coastal coordination',
      '24–48 hr on-site certified engineering field deployment',
    ],
    linkPath: '/contact',
    linkLabel: 'Connect With Our Team',
    modalDetails: {
      fullTitle: 'Regional Engineering Centers: Kalahandi Head Office & Bhubaneswar Branch',
      description:
        'Our strategic two-hub operational model ensures immediate engineering presence across both Western and Coastal Odisha. With in-house design, surveying, and certified installation technicians, we offer dependable lifetime maintenance support.',
      points: [
        'Head Office: Plot No- 406, Khata No- 225/51, Sargiguda, Narla Road, Kalahandi - 766110',
        'Sub-Branch Office: Bhubaneswar, Odisha for coastal coordination and corporate liaison',
        'Rapid spare parts inventory and 24 to 48-hour technician field deployment',
        'Certified ISO 9001:2015 quality engineering practices',
      ],
    },
  },
];

export const HomeCompanyIntroSection: React.FC = () => {
  const [activeModalCard, setActiveModalCard] = useState<IntroHighlightCard | null>(null);
  const [modalImageIdx, setModalImageIdx] = useState<number>(0);

  const openCardModal = (card: IntroHighlightCard) => {
    setModalImageIdx(0);
    setActiveModalCard(card);
  };

  return (
    <section
      className="home-intro-section"
      id="company-introduction"
      aria-label="Welcome to Shreshtanshi Solar Solutions"
    >
      <Container>
        {/* =================================================================
            1. TOP HERO HEADER & VERIFIED STATUS BADGE
        ================================================================= */}
        <div className="home-intro-header">
          {/* Animated Pulsing Status Pill */}
          <div className="home-intro-badge">
            <span className="home-intro-badge__pulse" aria-hidden="true" />
            <Sparkles size={14} className="home-intro-badge__icon" />
            <span>WELCOME TO {companyConfig.shortName.toUpperCase()}</span>
          </div>

          <h2 className="home-intro-title">
            Odisha’s Verified Engineering Partner for Clean Solar Power &amp; Sustainable Water.
          </h2>

          <p className="home-intro-desc">
            Operating from our <strong>Head Office in Kalahandi</strong> with a dedicated <strong>sub-branch office in Bhubaneswar</strong>,{' '}
            <strong>{companyConfig.legalName}</strong> ({companyConfig.shortName}) (GSTIN: {companyConfig.gstin}) delivers turnkey on-grid rooftop solar plants, agricultural solar pumping infrastructure, and government-sector projects across Odisha with verified DISCOM synchronization.
          </p>

          {/* Quick Action CTA Pill Buttons */}
          <div className="home-intro-actions">
            <Link to="/about" className="ui-btn ui-btn--primary ui-btn--md home-intro-btn--primary">
              <span>Learn About Our Company</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/licences-and-certifications" className="ui-btn ui-btn--outline ui-btn--md home-intro-btn--outline">
              <ShieldCheck size={17} style={{ color: 'var(--color-forest-green)' }} />
              <span>View Licences &amp; Certifications</span>
            </Link>
          </div>
        </div>

        {/* =================================================================
            2. INTERACTIVE TRUST & CREDENTIALS METRICS RIBBON
        ================================================================= */}
        <div className="home-intro-metrics-ribbon" role="region" aria-label="Key Company Credentials">
          <div className="home-intro-metric-box">
            <div className="home-intro-metric-header">
              <Zap size={18} className="home-intro-metric-icon" />
              <span className="home-intro-metric-val">350+</span>
            </div>
            <span className="home-intro-metric-title">Rooftop Solar Plants</span>
            <span className="home-intro-metric-sub">PM Surya Ghar in 2 Years</span>
          </div>

          <div className="home-intro-metric-divider" aria-hidden="true" />

          <div className="home-intro-metric-box">
            <div className="home-intro-metric-header">
              <ShieldCheck size={18} className="home-intro-metric-icon" />
              <span className="home-intro-metric-val">₹78,000</span>
            </div>
            <span className="home-intro-metric-title">Direct DBT Subsidy</span>
            <span className="home-intro-metric-sub">Central Govt Assistance</span>
          </div>

          <div className="home-intro-metric-divider" aria-hidden="true" />

          <div className="home-intro-metric-box">
            <div className="home-intro-metric-header">
              <Building2 size={18} className="home-intro-metric-icon" />
              <span className="home-intro-metric-val">1-Year Milestone</span>
            </div>
            <span className="home-intro-metric-title">Utility Aggregation</span>
            <span className="home-intro-metric-sub">Household Solar Execution</span>
          </div>

          <div className="home-intro-metric-divider" aria-hidden="true" />

          <div className="home-intro-metric-box">
            <div className="home-intro-metric-header">
              <MapPin size={18} className="home-intro-metric-icon" />
              <span className="home-intro-metric-val">2 Regional Hubs</span>
            </div>
            <span className="home-intro-metric-title">Kalahandi &amp; Bhubaneswar</span>
            <span className="home-intro-metric-sub">Statewide Rapid Dispatch</span>
          </div>
        </div>

        {/* =================================================================
            3. 4 RICH VISUAL SHOWCASE CARDS (UNIFIED CLEAN DESIGN)
               - Aligned images with tag & zoom
               - Bold fixed headline
               - Clean description
               - Single solid Details button (no extra text, no empty space)
        ================================================================= */}
        <div className="home-intro-grid">
          {introCards.map((card) => (
            <article key={card.id} className="home-intro-card">
              {/* Media Container with Zoom action */}
              <div className="home-intro-card__media">
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  className="home-intro-card__img"
                  loading="lazy"
                />
                <span className="home-intro-card__tag">{card.tag}</span>
                <button
                  type="button"
                  className="home-intro-card__zoom-btn"
                  onClick={() => openCardModal(card)}
                  title={`Inspect ${card.title}`}
                  aria-label={`Inspect ${card.title}`}
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Card Body */}
              <div className="home-intro-card__body">
                <div className="home-intro-card__meta">
                  <span className="home-intro-card__category">
                    <ShieldCheck size={13} className="home-intro-card__category-icon" />
                    <span>{card.category}</span>
                  </span>
                </div>

                <h3 className="home-intro-card__title">{card.title}</h3>

                <p className="home-intro-card__summary">{card.summary}</p>

                {/* Unified Clickable Details Button — Clean, Bold, No Extra Text */}
                <div className="home-intro-card__action-wrap">
                  <button
                    type="button"
                    className="home-intro-card__details-btn--solid"
                    onClick={() => openCardModal(card)}
                  >
                    <span>Details</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* =================================================================
            4. LIGHTBOX DETAIL MODAL (WITH MULTI-IMAGE GALLERY SUPPORT)
        ================================================================= */}
        {activeModalCard && (
          <Modal
            isOpen={true}
            onClose={() => setActiveModalCard(null)}
            className="home-intro-modal"
          >
            <div className="home-intro-modal-content">
              {/* Media viewer with current active image */}
              <div className="home-intro-modal-media">
                <img
                  src={
                    activeModalCard.galleryImages && activeModalCard.galleryImages.length > 0
                      ? activeModalCard.galleryImages[modalImageIdx].src
                      : activeModalCard.imageSrc
                  }
                  alt={
                    activeModalCard.galleryImages && activeModalCard.galleryImages.length > 0
                      ? activeModalCard.galleryImages[modalImageIdx].caption
                      : activeModalCard.imageAlt
                  }
                  className="home-intro-modal-img"
                />
                <span className="home-intro-modal-badge">{activeModalCard.tag}</span>
              </div>

              {/* Multi-Image Gallery Selector if multiple images available */}
              {activeModalCard.galleryImages && activeModalCard.galleryImages.length > 1 && (
                <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', padding: '0.4rem 0' }}>
                  {activeModalCard.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setModalImageIdx(idx)}
                      title={img.caption}
                      style={{
                        flex: '0 0 auto',
                        width: '78px',
                        height: '52px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: modalImageIdx === idx ? '2.5px solid var(--color-forest-green)' : '1px solid var(--border-medium)',
                        opacity: modalImageIdx === idx ? 1 : 0.65,
                        cursor: 'pointer',
                        padding: 0,
                        backgroundColor: '#0B2419',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="home-intro-modal-body">
                <span className="home-intro-card__category" style={{ marginBottom: '0.4rem' }}>
                  <ShieldCheck size={14} className="home-intro-card__category-icon" />
                  <span>{activeModalCard.category}</span>
                </span>

                <h3 className="home-intro-modal-title">
                  {activeModalCard.modalDetails?.fullTitle || activeModalCard.title}
                </h3>

                <p className="home-intro-modal-desc">
                  {activeModalCard.modalDetails?.description || activeModalCard.summary}
                </p>

                {activeModalCard.modalDetails?.points && (
                  <div className="home-intro-modal-points">
                    <h4 className="home-intro-modal-points-title">Key Highlights:</h4>
                    <ul className="home-intro-modal-points-list">
                      {activeModalCard.modalDetails.points.map((pt, i) => (
                        <li key={i} className="home-intro-modal-point-item">
                          <CheckCircle2 size={15} className="home-intro-card__check-icon" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="home-intro-modal-actions">
                  <Link
                    to={activeModalCard.linkPath}
                    className="ui-btn ui-btn--primary ui-btn--md"
                    onClick={() => setActiveModalCard(null)}
                  >
                    <span>{activeModalCard.linkLabel}</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setActiveModalCard(null)}
                  >
                    Close Window
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    </section>
  );
};
