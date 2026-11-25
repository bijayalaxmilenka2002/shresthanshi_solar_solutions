import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  Calendar,
  MapPin,
  ExternalLink,
  Building2,
  FileCheck2,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { FullscreenMediaModal } from '../ui/FullscreenMediaModal';

export interface FeaturedAward {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  category: string;
  authority: string;
  date: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  shortTagline: string;
  summary: string;
  fullDescription: string;
  highlights: string[];
}

export const featuredAwards: FeaturedAward[] = [
  {
    id: 'summit-bre-mnre-tpwodl-leader',
    title: 'National Solar Summit Delegate (Bharat Mandapam, New Delhi)',
    shortTitle: 'National Solar Summit Delegate',
    badge: 'National Conclave Delegate',
    category: 'Govt of India Recognition',
    authority: 'Ministry of New & Renewable Energy (MNRE)',
    date: 'November 2026',
    location: 'Bharat Mandapam, New Delhi',
    imageSrc: '/media/summits-leadership/bre-summit-mnre-tpwodl-er-satyabrata-panda.jpg',
    imageAlt: 'National Solar Summit Delegate alongside Er. Satyabrata Panda of TPWODL',
    shortTagline: 'Top 100 Vendor Invitation at Bharat Mandapam, New Delhi with TPWODL leadership.',
    summary:
      'Invited as one of the Top 100 Renewable Energy Vendors of Odisha at Bharat Mandapam, New Delhi alongside TPWODL leadership.',
    fullDescription:
      'Invited by the Ministry of New and Renewable Energy (MNRE), Govt of India, as one of the Top 100 Renewable Energy Vendors of Odisha. Team Shresthanshi represented the enterprise at Bharat Mandapam, New Delhi in high-level policy discussions on PM Surya Ghar acceleration and rural electrification alongside Er. Satyabrata Panda (TPWODL RE Cell).',
    highlights: [
      'Govt of India (MNRE) official invitation',
      'Top 100 Renewable Energy Vendors in Odisha',
      'Policy delegation at Bharat Mandapam, New Delhi',
    ],
  },
  {
    id: 'award-kalahandi-highest-pm-surya-ghar',
    title: 'District 1st Place Award — Highest PM Surya Ghar Installations',
    shortTitle: 'District 1st Place Award',
    badge: 'District 1st Place',
    category: 'PM Surya Ghar Muft Bijli Yojana',
    authority: 'District Administration & RE Cell',
    date: '2025 – 2026',
    location: 'Bhawanipatna, Kalahandi',
    imageSrc: '/media/awards-certificates/pm-surya-ghar-kalahandi-district-award.jpg',
    imageAlt: 'District 1st Place Award for Highest PM Surya Ghar Solar Installations',
    shortTagline: 'Highest number of verified residential rooftop solar installations across Kalahandi.',
    summary:
      'Awarded First Place for executing the highest number of verified residential rooftop solar installations across Kalahandi district.',
    fullDescription:
      'Official district award presented to M/s Shresthanshi Construction & Suppliers for achieving the highest volume of verified residential rooftop solar installations under PM Surya Ghar Muft Bijli Yojana across Kalahandi district, with full subsidy approvals and zero customer defect reports.',
    highlights: [
      '#1 District Rank in rooftop installations',
      'Direct District Administration & RE Cell honor',
      '100% verified beneficiary subsidy sanctions',
    ],
  },
  {
    id: 'award-tpwodl-utility-aggregation',
    title: 'TPWODL Utility-Led Aggregation Award (Tata Power JV)',
    shortTitle: 'TPWODL Utility Aggregation Award',
    badge: 'Top DISCOM Partner Award',
    category: 'Utility Solar Excellence',
    authority: 'TPWODL (Tata Power & Govt of Odisha JV)',
    date: '2025 – 2026',
    location: 'Western Odisha DISCOM',
    imageSrc: '/media/awards-certificates/tpwodl-utility-led-aggregation-award.jpg',
    imageAlt: 'TPWODL Utility-Led Solar Aggregation Award',
    shortTagline: 'Top solar EPC partner in Western Odisha for residential & commercial aggregation.',
    summary:
      'Honored by TP Western Odisha Distribution Limited as the top solar EPC partner for residential and commercial aggregation.',
    fullDescription:
      'Prestigious utility award from TP Western Odisha Distribution Limited (TPWODL — Joint Venture of Tata Power & Govt of Odisha) recognizing Shresthanshi as Western Odisha’s leading solar EPC partner for rapid grid aggregation, technical compliance, and customer satisfaction.',
    highlights: [
      'Tata Power & Govt of Odisha Joint Venture',
      'Top solar EPC partner in Western Odisha',
      'Honored by DISCOM executive leadership',
    ],
  },
  {
    id: 'cert-tpwodl-nov-2025',
    title: 'DISCOM Certified Net-Meter Synchronization Certificate',
    shortTitle: 'DISCOM Net-Meter Certificate',
    badge: 'Official DISCOM Certificate',
    category: 'Rapid Grid Synchronization',
    authority: 'Chief Technology & RE Officer, TPWODL',
    date: 'November 2025',
    location: 'Balangir & Kalahandi, Odisha',
    imageSrc: '/media/awards-certificates/tpwodl-certificate-nov-2025.jpg',
    imageAlt: 'TPWODL Official Appreciation Certificate for Rooftop Solar Synchronizations',
    shortTagline: 'Official appreciation certifying 26 verified rapid rooftop solar synchronizations.',
    summary:
      'Official letter of appreciation certifying 26 verified rooftop solar installations with seamless net-meter synchronizations.',
    fullDescription:
      'Official certificate of appreciation signed by the Chief of Technology & Renewable Energy and executive leadership of TPWODL certifying 26 verified rooftop solar installations across Balangir and Kalahandi with zero delay in DISCOM net-meter grid synchronization and 100% safety protocol compliance.',
    highlights: [
      'Certified by Chief of Renewable Energy, TPWODL',
      '26 rapid net-meter synchronizations honored',
      'Zero safety non-compliance audit record',
    ],
  },
];

export const AwardsAndCertificationsSection: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<FeaturedAward | null>(null);
  const [fullscreenAward, setFullscreenAward] = useState<FeaturedAward | null>(null);

  return (
    <section
      className="home-awards-section"
      aria-label="National Awards & Official Certifications"
      id="awards-certifications"
    >
      <Container>
        {/* Section Header */}
        <div className="home-awards-header">
          <div className="home-awards-header__text">
            <span className="home-awards-badge">
              <Trophy size={15} className="home-awards-badge__icon" />
              <span>Government &amp; DISCOM Recognized</span>
            </span>
            <h2 className="home-awards-header__title">
              National Recognition &amp; Official Certifications
            </h2>
            <p className="home-awards-header__subtitle">
              Honored by the <strong>Ministry of New &amp; Renewable Energy (MNRE, Govt of India)</strong>,{' '}
              <strong>TPWODL (Tata Power &amp; Govt of Odisha JV)</strong>, and District Renewable Energy Authorities for excellence in rooftop solar execution.
            </p>
          </div>
          <div className="home-awards-header__action">
            <Link to="/about#media" className="suncharge-pill-btn suncharge-pill-btn--solid">
              <span className="suncharge-pill-btn__text">VIEW ALL MEDIA</span>
              <span className="suncharge-pill-btn__circle" aria-hidden="true">
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-first" />
                <ArrowRight size={17} className="suncharge-pill-btn__arrow-second" />
              </span>
            </Link>
          </div>
        </div>

        {/* 4 Featured Award Cards Grid */}
        <div className="home-awards-grid">
          {featuredAwards.map((award) => (
            <article
              key={award.id}
              className="home-award-card"
              onClick={() => setSelectedAward(award)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedAward(award);
                }
              }}
              aria-label={`View full details of ${award.title}`}
            >
              {/* Card Media with Image & Badges */}
              <div className="home-award-card__media">
                <img
                  src={award.imageSrc}
                  alt={award.imageAlt}
                  className="home-award-card__img"
                  style={{
                    objectPosition: award.id === 'summit-bre-mnre-tpwodl-leader' ? 'center 15%' : 'center center',
                  }}
                  loading="lazy"
                />
                <span className="home-award-card__tag">{award.badge}</span>
                <button
                  type="button"
                  className="home-award-card__zoom-btn"
                  title="Inspect Certificate"
                  aria-label={`Inspect ${award.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAward(award);
                  }}
                >
                  <Maximize2 size={15} />
                </button>
              </div>

              {/* Card Body — Clean, Focused & High-Impact */}
              <div className="home-award-card__body">
                <div className="home-award-card__meta">
                  <span className="home-award-card__authority">
                    <ShieldCheck size={14} className="home-award-card__authority-icon" />
                    <span>{award.authority}</span>
                  </span>
                </div>

                <h3 className="home-award-card__title">{award.shortTitle}</h3>

                <p className="home-award-card__tagline">{award.shortTagline}</p>

                {/* Card Action Footer */}
                <div className="home-award-card__footer">
                  <span className="home-award-card__btn-text">
                    <span>Inspect Document</span>
                    <ArrowRight size={14} />
                  </span>
                  <span className="home-award-card__date">
                    <Calendar size={12} /> {award.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* High-Trust Metrics Ribbon */}
        <div className="home-awards-metrics-ribbon">
          <div className="home-awards-metric-box">
            <span className="home-awards-metric-number">Top 100</span>
            <span className="home-awards-metric-label">MNRE National Delegate</span>
            <p className="home-awards-metric-sub">Govt of India RE Conclave, Bharat Mandapam</p>
          </div>
          <div className="home-awards-metric-divider" />
          <div className="home-awards-metric-box">
            <span className="home-awards-metric-number">#1 Rank</span>
            <span className="home-awards-metric-label">District Highest Solar</span>
            <p className="home-awards-metric-sub">PM Surya Ghar verified installations award</p>
          </div>
          <div className="home-awards-metric-divider" />
          <div className="home-awards-metric-box">
            <span className="home-awards-metric-number">Utility Partner</span>
            <span className="home-awards-metric-label">TPWODL Aggregation</span>
            <p className="home-awards-metric-sub">Tata Power &amp; Govt of Odisha joint venture</p>
          </div>
          <div className="home-awards-metric-divider" />
          <div className="home-awards-metric-box">
            <span className="home-awards-metric-number">100% Certified</span>
            <span className="home-awards-metric-label">Net-Meter Synchronized</span>
            <p className="home-awards-metric-sub">Official DISCOM appreciation letters</p>
          </div>
        </div>

        {/* Verification Guarantee & Consultation CTA Strip */}
        <div className="home-awards-trust-banner">
          <div className="home-awards-trust-banner__left">
            <div className="home-awards-trust-banner__icon-wrap">
              <Building2 size={24} />
            </div>
            <div>
              <h4 className="home-awards-trust-banner__title">
                Verified Odisha Enterprise • GSTIN: 21AVUPM9359D1Z6
              </h4>
              <p className="home-awards-trust-banner__desc">
                Every solar installation is backed by official PM Surya Ghar portal compliance, DISCOM net-metering approvals, Tier-1 DCR solar modules, and certified in-house engineering.
              </p>
            </div>
          </div>
          <div className="home-awards-trust-banner__right">
            <Button
              to="/contact?intent=assessment"
              variant="primary"
              size="md"
              iconRight={<ArrowRight size={16} />}
            >
              Get Free Assessment
            </Button>
          </div>
        </div>
      </Container>

      {/* Lightbox Modal for Inspecting Certificates & Awards */}
      {selectedAward && (
        <Modal
          isOpen={Boolean(selectedAward)}
          onClose={() => setSelectedAward(null)}
          maxWidth="780px"
          titleId="award-modal-title"
          className="award-lightbox-modal"
        >
          <div className="award-modal-content">
            {/* Visual Container */}
            <div className="award-modal-media">
              <img
                src={selectedAward.imageSrc}
                alt={selectedAward.imageAlt}
                className="award-modal-img"
              />
              <span className="award-modal-badge">{selectedAward.badge}</span>
            </div>

            {/* Content Details */}
            <div className="award-modal-info">
              <div className="award-modal-meta-row">
                <span className="award-modal-authority">
                  <ShieldCheck size={16} />
                  <strong>{selectedAward.authority}</strong>
                </span>
                <span className="award-modal-pill">
                  <Calendar size={14} /> {selectedAward.date}
                </span>
                <span className="award-modal-pill">
                  <MapPin size={14} /> {selectedAward.location}
                </span>
              </div>

              <h2 id="award-modal-title" className="award-modal-title">
                {selectedAward.title}
              </h2>

              <p className="award-modal-desc">{selectedAward.fullDescription}</p>

              <div className="award-modal-highlights-card">
                <h4>
                  <FileCheck2 size={16} /> Key Verified Credentials
                </h4>
                <ul>
                  {selectedAward.highlights.map((hl, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={15} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="award-modal-actions">
                <button
                  type="button"
                  className="ui-btn ui-btn--primary ui-btn--md"
                  onClick={() => setFullscreenAward(selectedAward)}
                >
                  <Maximize2 size={16} />
                  <span>View Full Size Photo (With Close ✕)</span>
                </button>
                <Link
                  to="/media"
                  className="ui-btn ui-btn--outline ui-btn--md"
                  onClick={() => setSelectedAward(null)}
                >
                  <Award size={16} />
                  <span>Browse All Gallery &amp; Media</span>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Fullscreen Document Viewer with Close ✕ button */}
      {fullscreenAward && (
        <FullscreenMediaModal
          isOpen={Boolean(fullscreenAward)}
          onClose={() => setFullscreenAward(null)}
          mediaUrl={fullscreenAward.imageSrc}
          mediaType="image"
          title={fullscreenAward.title}
          badge={fullscreenAward.badge}
          location={fullscreenAward.location}
          date={fullscreenAward.date}
        />
      )}
    </section>
  );
};

